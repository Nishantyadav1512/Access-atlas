import puppeteer from 'puppeteer';
import { AxePuppeteer } from '@axe-core/puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const runAxeAudit = async (url) => {
  let browser;

  try {
    console.log(`🚀 Launching browser for Axe-core on ${url}`);

    // Load axe-core source explicitly
    let axeSource = null;
    try {
      const axeCorePath = path.join(__dirname, '../../node_modules/axe-core/axe.min.js');
      axeSource = fs.readFileSync(axeCorePath, 'utf8');
    } catch (err) {
      console.warn('⚠️ Could not load axe-core source, will use default:', err.message);
    }

    // Use Puppeteer's bundled Chrome (works on Render)
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();

    console.log('📄 Loading page...');
    await page.goto(url, {
      waitUntil: 'load',
      timeout: 60000
    });

    // Wait for page to be fully ready
    await page.evaluate(() => {
      return new Promise((resolve) => {
        if (document.readyState === 'complete') {
          resolve();
        } else {
          window.addEventListener('load', resolve, { once: true });
        }
      });
    });

    // Wait for network to be idle (for dynamic content)
    try {
      await page.waitForFunction(
        () => document.readyState === 'complete',
        { timeout: 10000 }
      );
    } catch (e) {
      // Continue if timeout, page might still be loading
    }

    // Additional wait for dynamic content to settle (especially for SPAs like ChatGPT)
    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log('🔍 Running Axe-core analysis...');
    const results = await new AxePuppeteer(page, axeSource).analyze();

    const violations = results.violations.map(violation => ({
      id: violation.id,
      description: violation.description,
      impact: violation.impact || 'unknown',
      help: violation.help,
      helpUrl: violation.helpUrl,
      nodes: violation.nodes.map(node => ({
        html: node.html,
        target: node.target,
        failureSummary: node.failureSummary
      }))
    }));

    console.log(`✅ Axe-core found ${violations.length} violations`);

    return {
      violations,
      passes: results.passes.length,
      incomplete: results.incomplete.length
    };

  } catch (error) {
    console.error('❌ Axe-core error:', error.message);
    // Fall back gracefully if axe-core or its dependencies are not available
    console.log('⚠️ Returning empty Axe-core results due to error above.');
    return {
      violations: [],
      passes: 0,
      incomplete: 0,
      error: error.message,
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export { runAxeAudit };
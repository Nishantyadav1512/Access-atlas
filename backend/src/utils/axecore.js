import puppeteer from 'puppeteer';
import puppeteerCore from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
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

    // Detect if running on Render or similar serverless environment
    const isServerless = !!process.env.RENDER || !!process.env.AWS_LAMBDA_FUNCTION_NAME;

    if (isServerless) {
      // Use @sparticuz/chromium for serverless environments
      browser = await puppeteerCore.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    } else {
      // Use regular puppeteer for local development
      browser = await puppeteer.launch({
        headless: 'new',
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu'
        ]
      });
    }

    const page = await browser.newPage();

    console.log('📄 Loading page...');
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 90000
    });

    // Try to wait for network idle, but don't fail if it times out
    try {
      await page.waitForNetworkIdle({ timeout: 5000 });
    } catch (e) {
      console.log('⚠️ Network not idle, continuing anyway...');
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
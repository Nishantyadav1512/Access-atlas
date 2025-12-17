import puppeteer from 'puppeteer';
import { AxePuppeteer } from '@axe-core/puppeteer';

const runAxeAudit = async (url) => {
  let browser;

  try {
    console.log(`🚀 Launching browser for Axe-core on ${url}`);

    const puppeteerConfig = {
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080'
      ]
    };

    browser = await puppeteer.launch(puppeteerConfig);

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
    const results = await new AxePuppeteer(page).analyze();

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
    console.error('Error stack:', error.stack);
    console.error('Error details:', JSON.stringify(error, null, 2));
    throw new Error(`Axe-core audit failed: ${error.message}`);
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error('Error closing browser:', closeError.message);
      }
    }
  }
};

export { runAxeAudit };
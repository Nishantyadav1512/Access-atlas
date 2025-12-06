import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';

const runLighthouseAudit = async (url) => {
  let browser;

  try {
    console.log(`🚀 Launching Chrome for ${url}`);

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

    // Get the debugging port from Puppeteer's browser
    const browserWSEndpoint = browser.wsEndpoint();
    const browserURL = new URL(browserWSEndpoint);
    const port = parseInt(browserURL.port);

    const options = {
      logLevel: 'error',
      output: 'json',
      onlyCategories: ['accessibility', 'performance', 'best-practices', 'seo'],
      port: port
    };

    console.log('🔍 Running Lighthouse audit...');
    const runnerResult = await lighthouse(url, options);

    const scores = {
      accessibility: Math.round(runnerResult.lhr.categories.accessibility.score * 100),
      performance: Math.round(runnerResult.lhr.categories.performance.score * 100),
      bestPractices: Math.round(runnerResult.lhr.categories['best-practices'].score * 100),
      seo: Math.round(runnerResult.lhr.categories.seo.score * 100)
    };

    console.log('✅ Lighthouse audit completed');
    return scores;

  } catch (error) {
    console.error('❌ Lighthouse error:', error.message);
    throw new Error(`Lighthouse audit failed: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export { runLighthouseAudit };
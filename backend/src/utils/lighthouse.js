import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

// Detect Chrome path for different environments
const getChromePath = () => {
  // On Render, Chrome is installed at /usr/bin/chromium or /usr/bin/google-chrome
  if (process.env.RENDER) {
    return '/usr/bin/chromium';
  }
  // Let chrome-launcher auto-detect on local/other environments
  return undefined;
};

const runLighthouseAudit = async (url) => {
  let chrome;

  try {
    console.log(`🚀 Launching Chrome for ${url}`);

    const chromePath = getChromePath();
    const launchOptions = {
      chromeFlags: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox'
      ]
    };

    // Add chromePath only if detected (for Render)
    if (chromePath) {
      launchOptions.chromePath = chromePath;
    }

    chrome = await chromeLauncher.launch(launchOptions);

    const options = {
      logLevel: 'error',
      output: 'json',
      onlyCategories: ['accessibility', 'performance', 'best-practices', 'seo'],
      port: chrome.port
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
    if (chrome) {
      await chrome.kill();
    }
  }
};

export { runLighthouseAudit };
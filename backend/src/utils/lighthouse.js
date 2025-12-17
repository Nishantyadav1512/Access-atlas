import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const runLighthouseAudit = async (url) => {
  let chrome;

  try {
    console.log(`🚀 Launching Chrome for ${url}`);

    const chromeFlags = [
      '--headless',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox'
    ];

    chrome = await chromeLauncher.launch({ chromeFlags });

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
    console.error('Error stack:', error.stack);
    console.error('Error details:', JSON.stringify(error, null, 2));
    throw new Error(`Lighthouse audit failed: ${error.message}`);
  } finally {
    if (chrome) {
      try {
        await chrome.kill();
      } catch (killError) {
        console.error('Error killing Chrome:', killError.message);
      }
    }
  }
};

export { runLighthouseAudit };
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const runLighthouseAudit = async (url) => {
  let chrome;
  
  try {
    console.log(`🚀 Launching Chrome for ${url}`);
    
    chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
    });

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
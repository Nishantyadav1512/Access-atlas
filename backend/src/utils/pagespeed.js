import axios from 'axios';

/**
 * Alternative implementation using Google PageSpeed Insights API
 * This doesn't require Puppeteer/Chrome and works on Render free tier
 */

const PAGESPEED_API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

const runPageSpeedAudit = async (url) => {
    try {
        console.log(`🚀 Running PageSpeed Insights for ${url}`);

        const categories = ['accessibility', 'performance', 'best-practices', 'seo'];
        const params = {
            url: url,
            category: categories,
            strategy: 'desktop'
        };

        // Add API key if available (optional but recommended to avoid rate limits)
        if (process.env.PAGESPEED_API_KEY) {
            params.key = process.env.PAGESPEED_API_KEY;
            console.log('✅ Using PageSpeed API key');
        } else {
            console.log('⚠️ No API key - using free tier (limited requests)');
        }

        const response = await axios.get(PAGESPEED_API_URL, {
            params,
            timeout: 60000 // 60 second timeout
        });
        const { lighthouseResult } = response.data;

        // Extract scores
        const scores = {
            accessibility: Math.round(lighthouseResult.categories.accessibility.score * 100),
            performance: Math.round(lighthouseResult.categories.performance.score * 100),
            bestPractices: Math.round(lighthouseResult.categories['best-practices'].score * 100),
            seo: Math.round(lighthouseResult.categories.seo.score * 100)
        };

        // Extract accessibility audits
        const accessibilityAudits = lighthouseResult.categories.accessibility.auditRefs
            .map(ref => lighthouseResult.audits[ref.id])
            .filter(audit => audit.score !== null && audit.score < 1);

        console.log('✅ PageSpeed Insights audit completed');
        return {
            scores,
            audits: accessibilityAudits
        };

    } catch (error) {
        console.error('❌ PageSpeed Insights error:', error.message);
        if (error.response) {
            console.error('API Response Status:', error.response.status);
            console.error('API Response Data:', JSON.stringify(error.response.data, null, 2));

            // Handle rate limiting
            if (error.response.status === 429) {
                throw new Error('PageSpeed API rate limit exceeded. Please add PAGESPEED_API_KEY to environment variables or try again later. Get a free API key at: https://developers.google.com/speed/docs/insights/v5/get-started');
            }
        }
        throw new Error(`PageSpeed Insights audit failed: ${error.message}`);
    }
};

/**
 * Convert PageSpeed audits to Axe-like format for compatibility
 */
const convertToAxeFormat = (audits) => {
    const violations = audits.map(audit => ({
        id: audit.id,
        description: audit.description,
        impact: audit.score === 0 ? 'serious' : 'moderate',
        help: audit.title,
        helpUrl: audit.scoreDisplayMode === 'informative' ? '' : `https://web.dev/${audit.id}`,
        nodes: [{
            html: audit.displayValue || '',
            target: ['document'],
            failureSummary: audit.description
        }]
    }));

    return {
        violations,
        passes: 0, // PageSpeed doesn't provide pass count
        incomplete: 0
    };
};

export { runPageSpeedAudit, convertToAxeFormat };

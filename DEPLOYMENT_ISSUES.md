# Accessibility Analyzer - Deployment Issues

## Current Issue: Puppeteer/Chrome on Render Free Tier

The `/api/analyze` endpoint is failing because **Render's free tier doesn't have enough resources to run Puppeteer and Chrome**.

### Why This Happens:
- Puppeteer requires Chrome/Chromium (~200MB)
- Chrome needs significant memory (512MB+) to run
- Render free tier has limited resources (512MB RAM total)
- Running both Node.js server + Chrome exceeds available memory

### Solutions:

#### Option 1: Upgrade Render Plan (Recommended for Production)
- Upgrade to Render's **Starter plan** ($7/month)
- Provides 512MB RAM dedicated to your app
- Should be sufficient for occasional analysis requests

#### Option 2: Use Alternative Deployment Platform
Deploy to platforms with better free tier support for Puppeteer:
- **Railway** (free tier with 512MB RAM)
- **Fly.io** (free tier with better resource allocation)
- **Google Cloud Run** (free tier with 1GB RAM)

#### Option 3: Use External API Services
Replace Puppeteer/Lighthouse with API-based services:
- **Google PageSpeed Insights API** (free, 25k requests/day)
- **WebPageTest API** (free tier available)
- **Axe DevTools API** (paid service)

#### Option 4: Client-Side Analysis Only
- Remove server-side Puppeteer dependency
- Use browser extensions or client-side libraries
- Limited to same-origin URLs

### Immediate Workaround:

For testing purposes, you can:
1. Run the backend locally (`npm run dev` in backend folder)
2. Update frontend `.env` to point to `http://localhost:5000/api`
3. Test the full functionality locally

### Recommended Next Step:

I recommend **Option 3** - using the Google PageSpeed Insights API, which provides:
- Lighthouse scores (including accessibility)
- Free tier (no credit card required)
- Reliable and fast
- No server resources needed

Would you like me to implement this solution?

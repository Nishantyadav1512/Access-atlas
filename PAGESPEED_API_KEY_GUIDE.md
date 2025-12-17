# How to Get a Google PageSpeed Insights API Key

## Why You Need It
The PageSpeed Insights API has rate limits without an API key. To avoid "429 Too Many Requests" errors, you need to add an API key.

## Steps to Get a Free API Key

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2. Create a New Project (or select existing)
- Click on the project dropdown at the top
- Click "New Project"
- Name it something like "Accessibility Analyzer"
- Click "Create"

### 3. Enable PageSpeed Insights API
- Go to: https://console.cloud.google.com/apis/library/pagespeedonline.googleapis.com
- Click "Enable"
- Wait for it to be enabled (~30 seconds)

### 4. Create API Credentials
- Go to: https://console.cloud.google.com/apis/credentials
- Click "+ CREATE CREDENTIALS" at the top
- Select "API key"
- Copy the generated API key

### 5. (Optional) Restrict the API Key
For security, restrict the key to only PageSpeed Insights API:
- Click on the API key you just created
- Under "API restrictions", select "Restrict key"
- Check "PageSpeed Insights API"
- Click "Save"

### 6. Add to Render Environment Variables
- Go to your Render dashboard: https://dashboard.render.com/
- Select your `accessibility-analyzer-backend` service
- Go to "Environment" tab
- Add a new environment variable:
  - **Key**: `PAGESPEED_API_KEY`
  - **Value**: (paste your API key)
- Click "Save Changes"
- Render will automatically redeploy

## Free Tier Limits
- **With API Key**: 25,000 requests per day (more than enough!)
- **Without API Key**: Very limited (causes 429 errors quickly)

## Testing Locally
Add to your `backend/.env` file:
```
PAGESPEED_API_KEY=your_api_key_here
```

## Alternative: Wait Between Requests
If you don't want to use an API key, you can:
- Wait a few minutes between analysis requests
- The free tier resets periodically

But for production use, **getting an API key is highly recommended**!

#!/bin/bash

echo "📦 Installing dependencies..."
npm install

echo "🔍 Checking Puppeteer installation..."
if [ -d "node_modules/puppeteer/.local-chromium" ] || [ -d "node_modules/puppeteer/.local-chrome" ]; then
  echo "✅ Puppeteer Chromium found"
else
  echo "⚠️ Puppeteer Chromium not found, installing..."
  npm install puppeteer --force
fi

echo "✅ Build complete!"

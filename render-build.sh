#!/usr/bin/env bash
# Render build script for installing dependencies and Chromium

echo "📦 Installing Node.js dependencies..."
cd backend
npm install

echo "🌐 Installing Chromium for Lighthouse and Puppeteer..."
# Install Chromium on Render's Ubuntu environment
apt-get update
apt-get install -y chromium chromium-driver

echo "✅ Build complete!"

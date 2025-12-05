# Deployment Guide

This guide will help you deploy your Accessibility Analyzer application.
The frontend will be hosted on **Vercel**, and the backend on **Render**.

## Prerequisites

- GitHub account
- Vercel account (linked to GitHub)
- Render account (linked to GitHub)

## 1. Push Code to GitHub

Ensure your project is pushed to a GitHub repository.
If you haven't done this yet:

```bash
git init
git add .
git commit -m "Initial commit"
# Create a new repo on GitHub, then:
git remote add origin <your-repo-url>
git push -u origin main
```
## 2. Deploy Backend (Render)

We will deploy the backend first so we can get the API URL.

1.  Log in to [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** and select **Blueprint**.
3.  Connect your GitHub repository.
4.  Render will automatically detect the `render.yaml` file I created.
5.  Click **Apply**.
6.  **Environment Variables**:
    - The blueprint sets `mongdb_uri` and `frontend_url` as placeholders.
    - Go to the **Environment** tab of your new service.
    - Add your real `MONGODB_URI` (from MongoDB Atlas).
    - For `FRONTEND_URL`, you can add it later once the frontend is deployed, or put your Vercel project URL if you know it (e.g., `https://<project-name>.vercel.app`).

**Note about Puppeteer**: The `Dockerfile` I included installs Chrome and necessary dependencies so Puppeteer and Lighthouse will work correctly on Render.

## 3. Deploy Frontend (Vercel)

1.  Log in to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New** > **Project**.
3.  Import your GitHub repository.
4.  **Framework Preset**: Select **Vite**.
5.  **Root Directory**: Click "Edit" and select `frontend`.
6.  **Environment Variables**:
    - Add `VITE_API_URL` and set it to your Render Backend URL (e.g., `https://accessibility-analyzer-backend.onrender.com/api`).
7.  Click **Deploy**.

## 4. Final Configuration

1.  Once Frontend is deployed, copy its URL (e.g., `https://your-app.vercel.app`).
2.  Go back to Render Dashboard > Your Backend Service > Environment.
3.  Update `CLIENT_URL` or `FRONTEND_URL` (based on what your `index.js` uses) to your Vercel URL.
    - *Note: Your code uses `CLIENT_URL` in `index.js` line 20.*
4.  The backend will redeploy (or you can manually trigger a deploy).

## Troubleshooting

- **CORS Issues**: Ensure `CLIENT_URL` in backend env variables matches your Vercel frontend URL exactly (no trailing slash).
- **Puppeteer/Lighthouse failures**: Check the Render logs. The Dockerfile is designed to handle this, but ensure your service has enough memory (Standard plan is recommended for Chrome, but Free might work for light testing).

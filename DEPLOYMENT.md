# Deployment Guide - Access Atlas

This guide will help you deploy the Access Atlas application to production.

## 📋 Prerequisites

- GitHub account
- MongoDB Atlas account (free tier available)
- Render account (for backend)
- Vercel account (for frontend)

## 🗄️ Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with password
4. Whitelist all IP addresses (0.0.0.0/0) for development
5. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)

## 🚀 Step 2: Deploy Backend to Render

### Option A: Using Render Dashboard (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `https://github.com/Nishantyadav1512/Access-atlas`
4. Configure the service:
   - **Name**: `access-atlas-backend`
   - **Region**: Choose closest to you
   - **Branch**: `master` or `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables (click "Advanced" → "Add Environment Variable"):
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/access-atlas
   JWT_SECRET=your-super-secret-random-string-here
   CLIENT_URL=https://your-frontend-url.vercel.app
   NODE_VERSION=18.17.0
   ```

6. Click **"Create Web Service"**
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL (e.g., `https://access-atlas-backend.onrender.com`)

### Option B: Using render.yaml (Automatic)

The `render.yaml` file is already configured. Just:
1. Connect your repo to Render
2. It will auto-detect the configuration
3. Add environment variables manually in the dashboard

## 🌐 Step 3: Deploy Frontend to Vercel

### Update API URL in Frontend

Before deploying, update the API URL in your frontend:

1. Open `frontend/src/services/api.services.js`
2. Update the `BASE_URL`:
   ```javascript
   const BASE_URL = 'https://your-backend-url.onrender.com/api';
   ```

### Deploy to Vercel

1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - **Set up and deploy**: Yes
   - **Which scope**: Your account
   - **Link to existing project**: No
   - **Project name**: access-atlas
   - **Directory**: `./` (current directory)
   - **Override settings**: No

5. For production deployment:
   ```bash
   vercel --prod
   ```

### Alternative: Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**

## 🔄 Step 4: Update Environment Variables

After both deployments:

1. **Update Backend `CLIENT_URL`**:
   - Go to Render dashboard → Your service → Environment
   - Update `CLIENT_URL` to your Vercel URL
   - Example: `https://access-atlas.vercel.app`

2. **Update Frontend API URL**:
   - Update `frontend/src/services/api.services.js`
   - Set `BASE_URL` to your Render backend URL
   - Commit and push changes (Vercel will auto-redeploy)

## ✅ Step 5: Verify Deployment

1. Visit your frontend URL
2. Try to register a new account
3. Login and test the analyzer
4. Check if reports are being saved

## 🔧 Troubleshooting

### Backend Issues

**Error: "Cannot connect to MongoDB"**
- Check your MongoDB Atlas IP whitelist (should include 0.0.0.0/0)
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas cluster is running

**Error: "Module not found"**
- Ensure all dependencies are in `package.json`
- Try manual redeploy on Render

**Chrome/Puppeteer Issues**
- Render free tier includes Chrome
- Check Render logs for specific errors

### Frontend Issues

**Error: "Network Error" or "Failed to fetch"**
- Check if backend URL is correct in `api.services.js`
- Verify CORS is configured correctly in backend
- Check if backend is running (visit backend URL)

**404 on page refresh**
- Ensure `vercel.json` is properly configured
- Check Vercel deployment logs

## 📝 Post-Deployment Checklist

- [ ] MongoDB Atlas cluster is running
- [ ] Backend is deployed and accessible
- [ ] Frontend is deployed and accessible
- [ ] Environment variables are set correctly
- [ ] CORS is configured with correct frontend URL
- [ ] Can register new users
- [ ] Can login
- [ ] Can analyze URLs
- [ ] Reports are saved to database
- [ ] Can view report history

## 🔐 Security Notes

1. **Never commit `.env` files** - They're in `.gitignore`
2. **Use strong JWT_SECRET** - Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
3. **Restrict MongoDB IP whitelist** in production (optional)
4. **Use HTTPS** for all production URLs

## 🎉 You're Done!

Your Access Atlas application is now live! Share the URL and start analyzing websites for accessibility issues.

## 📞 Support

If you encounter issues:
1. Check Render logs (Backend)
2. Check Vercel logs (Frontend)
3. Check browser console for errors
4. Verify all environment variables are set

---

**Frontend URL**: https://your-app.vercel.app  
**Backend URL**: https://your-backend.onrender.com  
**Repository**: https://github.com/Nishantyadav1512/Access-atlas

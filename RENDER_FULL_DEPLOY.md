# 🚀 Deploy to Render - Complete Guide

## ✅ Prerequisites

1. **MongoDB Atlas** - Get your connection string ready
2. **Render Account** - Sign up at https://render.com
3. **GitHub** - Your code is already pushed!

---

## 📋 Step-by-Step Deployment

### Step 1: Go to Render Dashboard

1. Visit: https://dashboard.render.com/
2. Sign in with GitHub

### Step 2: Create New Blueprint

1. Click **"New +"** → **"Blueprint"**
2. Connect your GitHub repository: `Nishantyadav1512/Access-atlas`
3. Render will detect `render.yaml` automatically
4. Click **"Apply"**

### Step 3: Configure Environment Variables

Render will create 2 services:
- `access-atlas-backend`
- `access-atlas-frontend`

**For Backend Service:**

1. Click on `access-atlas-backend`
2. Go to **"Environment"** tab
3. Add these variables:

   **MONGODB_URI**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/access-atlas
   ```
   *(Get this from MongoDB Atlas)*

   **JWT_SECRET**
   ```
   Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   *(Or use any random 32+ character string)*

   **CLIENT_URL**
   ```
   https://access-atlas-frontend.onrender.com
   ```
   *(This will be your frontend URL - update after frontend deploys)*

4. Click **"Save Changes"**

### Step 4: Wait for Deployment

- Backend: ~5-10 minutes
- Frontend: ~3-5 minutes

Watch the logs for any errors.

### Step 5: Update Backend API URL

Once backend is deployed:

1. Copy your backend URL (e.g., `https://access-atlas-backend.onrender.com`)
2. Update `frontend/src/services/api.js`:
   ```javascript
   return import.meta.env.VITE_API_URL || 'https://YOUR-BACKEND-URL.onrender.com/api';
   ```
3. Commit and push:
   ```bash
   git add .
   git commit -m "Update backend URL"
   git push origin master
   ```
4. Render will auto-redeploy frontend

### Step 6: Update CLIENT_URL

1. Copy your frontend URL (e.g., `https://access-atlas-frontend.onrender.com`)
2. Go to backend service → Environment
3. Update `CLIENT_URL` to your frontend URL
4. Backend will auto-restart

---

## ✅ Verify Deployment

1. Visit your frontend URL
2. Register a new account
3. Login
4. Try analyzing a website
5. Check if reports are saved

---

## 🔧 Alternative: Manual Service Creation

If Blueprint doesn't work, create services manually:

### Backend:
1. New + → Web Service
2. Connect GitHub repo
3. Settings:
   - Name: `access-atlas-backend`
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
   - Add environment variables

### Frontend:
1. New + → Static Site
2. Connect GitHub repo
3. Settings:
   - Name: `access-atlas-frontend`
   - Root Directory: `frontend`
   - Build: `npm install && npm run build`
   - Publish: `dist`

---

## 📝 Your URLs

After deployment:
- **Frontend**: `https://access-atlas-frontend.onrender.com`
- **Backend**: `https://access-atlas-backend.onrender.com`
- **API**: `https://access-atlas-backend.onrender.com/api`

---

## 🆘 Troubleshooting

**Backend won't start:**
- Check MongoDB connection string
- Verify all environment variables are set
- Check logs for specific errors

**Frontend shows blank page:**
- Check if build completed successfully
- Verify API URL is correct
- Check browser console for errors

**CORS errors:**
- Make sure CLIENT_URL matches frontend URL exactly
- Check backend logs

---

## 💡 Important Notes

1. **Free Tier Limitations:**
   - Services sleep after 15 minutes of inactivity
   - First request after sleep takes ~30 seconds
   - 750 hours/month free

2. **Custom Domains:**
   - You can add custom domains in Render dashboard
   - Both frontend and backend support custom domains

3. **Auto-Deploy:**
   - Render auto-deploys on every push to master
   - You can disable this in settings

---

## 🎉 You're Done!

Your full-stack app is now deployed on Render!

**Repository**: https://github.com/Nishantyadav1512/Access-atlas

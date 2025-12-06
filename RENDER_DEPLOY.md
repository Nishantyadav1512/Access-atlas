# 🚀 Deploy Backend to Render - Step by Step

## What We Fixed:
✅ CORS now accepts all Vercel URLs (including preview deployments)
✅ Frontend automatically uses the right API URL based on environment
✅ Code pushed to GitHub

## 📋 Now Deploy Your Backend:

### Step 1: Go to Render Dashboard
1. Open: https://dashboard.render.com/
2. Sign in (or create account with GitHub)

### Step 2: Create New Web Service
1. Click **"New +"** button (top right)
2. Select **"Web Service"**

### Step 3: Connect GitHub Repository
1. Click **"Connect account"** if not connected
2. Search for: **Access-atlas**
3. Click **"Connect"** next to your repository

### Step 4: Configure Service
Fill in these settings:

**Basic Settings:**
- **Name**: `access-atlas-backend` (or any name you prefer)
- **Region**: Choose closest to you (e.g., Oregon, Frankfurt)
- **Branch**: `master`
- **Root Directory**: `backend`
- **Runtime**: `Node`

**Build & Deploy:**
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Select **"Free"** (for testing)

### Step 5: Add Environment Variables
Click **"Advanced"** → Scroll to **"Environment Variables"**

Add these 3 variables (click "+ Add Environment Variable" for each):

1. **MONGODB_URI**
   - Value: `your-mongodb-connection-string`
   - (Get this from MongoDB Atlas - see below if you don't have it)

2. **JWT_SECRET**
   - Value: Generate a random string
   - Run this in your terminal to generate one:
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```

3. **CLIENT_URL**
   - Value: `https://access-atlas-6fayp7dwc-nishant-yadavs-projects-5b223bed.vercel.app`
   - (Or your actual Vercel production URL once you have it)

### Step 6: Deploy!
1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Watch the logs for any errors

### Step 7: Copy Your Backend URL
Once deployed, you'll see a URL like:
`https://access-atlas-backend.onrender.com`

**Copy this URL!** You'll need it.

---

## 🗄️ Don't Have MongoDB Yet?

### Quick MongoDB Atlas Setup:
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"**
3. Create account
4. Create a **FREE** cluster (M0)
5. Create database user:
   - Username: `admin` (or any name)
   - Password: Generate secure password (save it!)
6. Network Access:
   - Click **"Network Access"**
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Click **"Confirm"**
7. Get connection string:
   - Go to **"Database"**
   - Click **"Connect"**
   - Choose **"Connect your application"**
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with `access-atlas`

Example:
```
mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/access-atlas?retryWrites=true&w=majority
```

---

## ✅ After Backend Deploys Successfully:

### Update Frontend (if needed):
The frontend will automatically use your Render backend URL because of the changes we made!

The default URL in the code is: `https://access-atlas-backend.onrender.com/api`

**If your Render URL is different**, update it:
1. Open `frontend/src/services/api.js`
2. Change line 10 to your actual Render URL
3. Commit and push (Vercel will auto-redeploy)

---

## 🧪 Test Your Deployment:

1. Visit your Vercel frontend URL
2. Try to register a new account
3. If it works → Success! 🎉
4. If not → Check Render logs for errors

---

## 🔍 Troubleshooting:

### Backend won't start:
- Check Render logs (click on your service → "Logs")
- Verify MongoDB connection string is correct
- Make sure all environment variables are set

### Still getting CORS errors:
- Make sure backend is deployed and running
- Check that CLIENT_URL matches your Vercel URL
- Try adding your exact Vercel URL to the allowedOrigins in backend/index.js

### Frontend can't connect:
- Verify backend URL in browser (should show API info)
- Check browser console for exact error
- Make sure backend is not sleeping (Render free tier sleeps after inactivity)

---

## 📞 Need Help?
Check the Render logs first - they usually show the exact problem!

**Your URLs:**
- Frontend: https://access-atlas-6fayp7dwc-nishant-yadavs-projects-5b223bed.vercel.app
- Backend: (will be) https://access-atlas-backend.onrender.com
- GitHub: https://github.com/Nishantyadav1512/Access-atlas

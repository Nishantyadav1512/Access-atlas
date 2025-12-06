# 🚀 Quick Start - Deployment Steps

## ✅ Completed
- [x] Git repository initialized
- [x] Code pushed to GitHub: https://github.com/Nishantyadav1512/Access-atlas
- [x] Deployment configurations created
- [x] Documentation added

## 📋 Next Steps to Deploy

### 1️⃣ Set Up MongoDB (5 minutes)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create database user
4. Get connection string
5. Whitelist IP: 0.0.0.0/0

### 2️⃣ Deploy Backend to Render (10 minutes)
1. Go to https://dashboard.render.com/
2. Click "New +" → "Web Service"
3. Connect GitHub repo: `Nishantyadav1512/Access-atlas`
4. Settings:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add Environment Variables:
   - `MONGODB_URI` = your MongoDB connection string
   - `JWT_SECRET` = generate random string
   - `CLIENT_URL` = will add after frontend deployment
6. Deploy and copy backend URL

### 3️⃣ Update Frontend API URL (2 minutes)
1. Open `frontend/src/services/api.services.js`
2. Change `BASE_URL` to your Render backend URL
3. Commit and push:
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push origin master
   ```

### 4️⃣ Deploy Frontend to Vercel (5 minutes)
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import `Nishantyadav1512/Access-atlas`
4. Settings:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Deploy and copy frontend URL

### 5️⃣ Update Backend CORS (2 minutes)
1. Go back to Render dashboard
2. Update `CLIENT_URL` environment variable with Vercel URL
3. Service will auto-restart

## 🎉 Done!
Your app is now live!

## 📚 Detailed Instructions
See `DEPLOYMENT.md` for complete step-by-step guide with troubleshooting.

## 🔗 Important Links
- **GitHub**: https://github.com/Nishantyadav1512/Access-atlas
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **Render**: https://dashboard.render.com/
- **Vercel**: https://vercel.com/dashboard

## 💡 Tips
- Use strong JWT_SECRET (generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- Keep `.env` files secure (never commit them)
- Test locally before deploying
- Check logs if something doesn't work

## 🆘 Need Help?
Check `DEPLOYMENT.md` for troubleshooting section.

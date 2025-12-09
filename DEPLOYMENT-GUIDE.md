# Deployment Guide - E-Learning Platform

## ✅ Backend Deployed Successfully!
**URL:** https://wad-project-2.onrender.com

---

## 🚀 Deploy Frontend on Vercel

### Step 1: Push Code to GitHub
Already done! ✅

### Step 2: Deploy on Vercel

1. Go to **https://vercel.com**
2. Click **"Sign Up"** or **"Login"** (use GitHub account)
3. Click **"Add New Project"**
4. Click **"Import Git Repository"**
5. Select: **Devibala22/WAD_PROJECT**
6. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
7. Add Environment Variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://wad-project-2.onrender.com`
8. Click **"Deploy"**

### Step 3: Wait for Deployment
- Takes 2-3 minutes
- You'll get a URL like: `https://your-project.vercel.app`

---

## 🔧 Update CORS After Frontend Deployment

After frontend is deployed, update Render environment variables:

1. Go to **Render Dashboard**
2. Select your backend service
3. Go to **Environment** tab
4. Update these variables:
   - `CORS` = `https://your-project.vercel.app`
   - `FRONTEND_URL` = `https://your-project.vercel.app`
5. Save and redeploy

---

## 📝 Alternative: Deploy Frontend on Render

1. Go to **Render Dashboard**
2. Click **"New"** → **"Static Site"**
3. Connect your GitHub repo
4. Configure:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
5. Add Environment Variable:
   - `VITE_API_URL` = `https://wad-project-2.onrender.com`
6. Click **"Create Static Site"**

---

## ✅ Your Setup

- ✅ Backend: https://wad-project-2.onrender.com
- ✅ MongoDB: Connected to Atlas
- ✅ Frontend: Ready to deploy
- ✅ API Config: Configured

---

## 🧪 Test Locally First

```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:5173

The frontend will connect to your deployed backend!

---

## 📌 Important URLs

- **Backend API:** https://wad-project-2.onrender.com
- **Health Check:** https://wad-project-2.onrender.com/health
- **GitHub Repo:** https://github.com/Devibala22/WAD_PROJECT
- **Vercel:** https://vercel.com
- **Render:** https://dashboard.render.com

---

## 🎉 You're Done!

Your e-Learning platform is ready to go live!

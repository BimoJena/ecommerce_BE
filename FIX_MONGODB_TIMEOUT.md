# Fix MongoDB Timeout on Vercel

## Problem:
```
"Operation `users.findOne()` buffering timed out after 10000ms"
```

## Solution: 2 Steps

### Step 1: Whitelist Vercel IPs in MongoDB Atlas ⚠️ IMPORTANT

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com
2. **Login** to your account
3. **Select your cluster** (Cluster0)
4. Click **"Network Access"** in left sidebar
5. Click **"Add IP Address"** button
6. Select **"Allow Access from Anywhere"**
   - IP Address: `0.0.0.0/0`
   - Comment: `Vercel Deployment`
7. Click **"Confirm"**

**Why?** Vercel serverless functions use dynamic IPs, so you need to allow all IPs.

---

### Step 2: Redeploy to Vercel

Your code has been updated to handle serverless connections better.

**Option A: Auto Deploy (if connected to GitHub)**
```bash
git add .
git commit -m "Fix MongoDB timeout for Vercel"
git push
```
Vercel will auto-deploy in 1-2 minutes.

**Option B: Manual Deploy**
```bash
vercel --prod
```

---

## What Changed in Code:

### `src/config/db.js`
- ✅ Added connection reuse (prevents creating new connections on every request)
- ✅ Added timeout settings optimized for Vercel
- ✅ Old code is commented, not deleted

### Why This Fixes the Issue:
1. **Connection Reuse**: Serverless functions reuse existing MongoDB connections instead of creating new ones
2. **Faster Timeouts**: Fails faster if MongoDB is unreachable
3. **IP Whitelisting**: MongoDB allows connections from Vercel's servers

---

## Test After Deployment:

```bash
curl --location 'https://ecommerce-be-live.vercel.app/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "verceltest",
    "email": "verceltest@gmail.com",
    "password": "verceltest@gmail.com"
}'
```

Should work now! ✅

---

## Still Having Issues?

### Check MongoDB Connection String:
In Vercel Dashboard → Settings → Environment Variables

Make sure `MONGODB_URI` is:
```
mongodb+srv://username:password@cluster0.1utbwpa.mongodb.net/ecommerceBE_APIs?retryWrites=true&w=majority&appName=Cluster0
```

### Check Vercel Logs:
1. Go to Vercel Dashboard
2. Click your project
3. Click "Deployments"
4. Click latest deployment
5. Click "Functions" tab
6. Check for errors

---

## Local Development Still Works:
```bash
npm run dev
```
No changes needed for local development! 🎉

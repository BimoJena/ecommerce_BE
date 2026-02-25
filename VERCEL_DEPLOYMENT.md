# Vercel Deployment Guide

## What Changed for Vercel Deployment?

### 1. Created `vercel.json` file
This file tells Vercel how to build and route your Express app as a serverless function.

### 2. Modified `server.js`
- **OLD**: Server always runs with `app.listen()` (for Render/traditional hosting)
- **NEW**: Server only runs locally, Vercel handles it automatically in production
- **Added**: `export default app` so Vercel can use your Express app

### 3. Updated `.gitignore`
Added `.vercel` folder to ignore Vercel's local configuration files.

---

## How to Deploy on Vercel

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Vercel deployment setup"
   git push
   ```

2. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub

3. **Click "Add New Project"**

4. **Import your GitHub repository**

5. **Configure Project**:
   - Framework Preset: **Other**
   - Root Directory: `./` (leave as default)
   - Build Command: (leave empty)
   - Output Directory: (leave empty)

6. **Add Environment Variables** (IMPORTANT!):
   Click "Environment Variables" and add all your `.env` variables:
   - `MONGODB_URI` = your MongoDB connection string
   - `JWT_SECRET` = your JWT secret key
   - `PORT` = 3000
   - `IMAGEKIT_PUBLIC_KEY` = your ImageKit public key
   - `IMAGEKIT_PRIVATE_KEY` = your ImageKit private key
   - `IMAGEKIT_URL_ENDPOINT` = your ImageKit URL
   - `EMAIL_USER` = your email for nodemailer
   - `EMAIL_PASS` = your email password
   - Any other environment variables from your `.env` file

7. **Click "Deploy"**

8. **Wait for deployment** (usually takes 1-2 minutes)

9. **Your API will be live!** Vercel will give you a URL like:
   ```
   https://your-project-name.vercel.app
   ```

---

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy** (from your project root):
   ```bash
   vercel
   ```
   - Follow the prompts
   - Choose your project settings

4. **Add Environment Variables**:
   ```bash
   vercel env add MONGODB_URI
   vercel env add JWT_SECRET
   vercel env add PORT
   # Add all other environment variables
   ```

5. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

## Testing Your Deployment

Once deployed, test your API by replacing the base URL in your cURL commands:

**OLD (Render)**:
```
https://ecommerce-be-slrr.onrender.com
```

**NEW (Vercel)**:
```
https://your-project-name.vercel.app
```

Example:
```bash
curl --location 'https://your-project-name.vercel.app/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "test",
    "email": "test@gmail.com",
    "password": "test123"
}'
```

---

## Important Notes

### ✅ What Works on Vercel:
- All your API routes
- Database connections (MongoDB)
- Authentication with JWT
- Cookie-based sessions
- JSON requests/responses

### ⚠️ Limitations on Vercel:
- **Request size limit**: 4.5MB (file uploads might need adjustment)
- **Execution timeout**: 10 seconds on free plan, 60 seconds on Pro
- **Cold starts**: First request after inactivity may be slower
- **Serverless**: Each request is a separate function invocation

### 🔧 If File Uploads Don't Work:
Consider using external storage like:
- ImageKit (you're already using this ✅)
- Cloudinary
- AWS S3

---

## Running Locally (Still Works!)

Your local development is unchanged:
```bash
npm run dev
```

The code automatically detects if it's running locally or on Vercel.

---

## Troubleshooting

### Issue: "Module not found" error
**Solution**: Make sure all dependencies are in `package.json` dependencies (not devDependencies)

### Issue: Environment variables not working
**Solution**: Add them in Vercel Dashboard → Project Settings → Environment Variables

### Issue: Database connection fails
**Solution**: 
1. Check MongoDB connection string is correct
2. Whitelist Vercel's IP (0.0.0.0/0) in MongoDB Atlas Network Access

### Issue: API returns 404
**Solution**: Check `vercel.json` routes configuration is correct

---

## Both Deployments Active

You can keep BOTH Render and Vercel deployments active:
- **Render**: `https://ecommerce-be-slrr.onrender.com`
- **Vercel**: `https://your-project-name.vercel.app`

Both will work independently! 🚀

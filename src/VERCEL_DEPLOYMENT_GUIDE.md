# Onboard.AI - Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign in with your Vercel account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - If this is a local project, you'll need to push it to GitHub first (see Option 2)

3. **Configure Project**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   
   ```
   VITE_SUPABASE_URL = your_supabase_project_url
   VITE_SUPABASE_ANON_KEY = your_supabase_anon_key
   ```
   
   You can find these values in your Supabase Dashboard → Project Settings → API

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at `https://your-app-name.vercel.app`

---

### Option 2: Deploy via Vercel CLI

If you prefer using the command line:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```
   Follow the prompts to authenticate

3. **Deploy from Project Directory**
   ```bash
   cd /path/to/your/project
   vercel
   ```

4. **Configure on First Deploy**
   - Set up and deploy: **Y**
   - Which scope: Select your account
   - Link to existing project: **N** (for first time)
   - Project name: `onboard-ai` (or your preferred name)
   - Directory: `./`
   - Override settings: **N**

5. **Add Environment Variables**
   ```bash
   vercel env add VITE_SUPABASE_URL
   # Paste your Supabase URL when prompted
   
   vercel env add VITE_SUPABASE_ANON_KEY
   # Paste your Supabase anon key when prompted
   ```

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

### Option 3: Deploy from GitHub (Best for Continuous Deployment)

1. **Push Your Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/onboard-ai.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Authorize Vercel to access your GitHub account
   - Select your repository

3. **Configure as in Option 1**
   - Add environment variables
   - Deploy

4. **Automatic Deployments**
   - Every push to `main` branch will auto-deploy to production
   - Pull requests will create preview deployments

---

## 🔧 Important Configuration

### Environment Variables Required

Your app needs these environment variables to work:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Where to find these:**
1. Go to Supabase Dashboard
2. Select your project
3. Click Settings (gear icon) → API
4. Copy "Project URL" and "anon public" key

### Update Supabase CORS Settings

After deploying, update your Supabase CORS settings:

1. Go to Supabase Dashboard → Project Settings → API
2. Scroll to "CORS Settings"
3. Add your Vercel domain:
   ```
   https://your-app-name.vercel.app
   ```

### Update OAuth Redirect URLs

If using Google/LinkedIn OAuth:

1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add Vercel URL to "Site URL":
   ```
   https://your-app-name.vercel.app
   ```
3. Add to "Redirect URLs":
   ```
   https://your-app-name.vercel.app/**
   ```

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] ✅ Supabase Edge Functions are deployed
- [ ] ✅ OpenAI API key is added to Supabase secrets
- [ ] ✅ All required environment variables are ready
- [ ] ✅ Code is committed and pushed (if using GitHub)
- [ ] ✅ package.json has all dependencies
- [ ] ✅ Build works locally (`npm run build`)

---

## 🎨 Custom Domain (Optional)

After deployment, you can add a custom domain:

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Vercel will automatically provision SSL certificate

---

## 🔍 Troubleshooting

### Build Fails

**Error**: `Command "npm run build" exited with 1`

**Solution**:
1. Check build logs in Vercel dashboard
2. Make sure all dependencies are in package.json
3. Test build locally: `npm run build`
4. Check for TypeScript errors

### Environment Variables Not Working

**Error**: App shows errors about missing Supabase configuration

**Solution**:
1. Verify variables are prefixed with `VITE_`
2. Redeploy after adding variables
3. Check variable names match exactly

### 404 on Page Refresh

**Error**: Refreshing a route returns 404

**Solution**:
- This should be handled by vercel.json rewrites
- If issue persists, add this to vercel.json:
  ```json
  {
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```

### API Calls Failing

**Error**: Fetch requests to Supabase fail

**Solution**:
1. Check browser console for CORS errors
2. Add Vercel domain to Supabase CORS settings
3. Verify environment variables are set correctly

---

## 📊 Deployment Analytics

Vercel provides built-in analytics:

1. Go to your project dashboard
2. Click "Analytics" tab
3. View:
   - Page views
   - Top pages
   - Top referrers
   - Devices
   - Performance metrics

---

## 🔄 Redeployment

### Redeploy Same Version
```bash
vercel --prod
```

### Deploy New Changes
```bash
git add .
git commit -m "Update feature"
git push
# Auto-deploys if connected to GitHub
```

### Rollback to Previous Deployment
1. Go to Vercel Dashboard → Deployments
2. Find previous successful deployment
3. Click "..." → "Promote to Production"

---

## 💡 Best Practices

1. **Use GitHub Integration** - Enables automatic deployments and preview URLs for PRs
2. **Preview Deployments** - Test changes in preview before promoting to production
3. **Environment Variables** - Keep production and development variables separate
4. **Custom Domain** - Use a custom domain for professional appearance
5. **Monitor Performance** - Check Vercel Analytics regularly
6. **SSL Certificate** - Vercel provides this automatically

---

## 🚨 Important Notes

### About Supabase Edge Functions
- Your Supabase Edge Functions run on Supabase infrastructure (not Vercel)
- They are already deployed when you deployed to Supabase
- Vercel only hosts your React frontend
- Frontend makes API calls to: `https://YOUR_PROJECT.supabase.co/functions/v1/...`

### About Environment Variables
- Environment variables must start with `VITE_` to be accessible in frontend
- They are bundled at build time (not runtime)
- Redeploy after changing environment variables

### About Costs
- Vercel Free Tier includes:
  - Unlimited deployments
  - 100GB bandwidth/month
  - Automatic HTTPS
  - Preview deployments
- Your Supabase costs remain separate

---

## 📞 Getting Help

If you encounter issues:

1. Check Vercel build logs for errors
2. Check browser console for runtime errors
3. Verify environment variables in Vercel dashboard
4. Check Supabase Edge Function logs
5. Contact Vercel support: https://vercel.com/support

---

## ✅ Post-Deployment Testing

After deployment, test:

1. ✅ Homepage loads correctly
2. ✅ Navigation works between pages
3. ✅ Supabase connection works
4. ✅ AI features work (requires OpenAI key in Supabase)
5. ✅ OAuth flows work (if configured)
6. ✅ All images and assets load
7. ✅ Mobile responsiveness

---

## 🎉 Your App is Live!

Once deployed, your Onboard.AI platform will be accessible at:

**Preview URL**: `https://your-project-name-user.vercel.app`
**Production URL**: `https://your-project-name.vercel.app`
**Custom Domain**: `https://yourdomain.com` (if configured)

Share the link and start using your AI-powered recruitment platform!

---

**Need Help?** Check the Vercel documentation: https://vercel.com/docs

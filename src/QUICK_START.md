# 🚀 Onboard.AI - Quick Start Deployment

Get your Onboard.AI platform deployed to Vercel in under 10 minutes!

## 📋 Prerequisites Checklist

Before you begin, make sure you have:

- [ ] Vercel account (free: https://vercel.com/signup)
- [ ] Supabase account (free: https://supabase.com)
- [ ] OpenAI API key (https://platform.openai.com/api-keys)
- [ ] GitHub account (if deploying from Git)

## ⚡ 3-Minute Deploy (Fastest)

### Step 1: Prepare Your Keys (2 minutes)

**Get Supabase Keys:**
1. Go to https://supabase.com/dashboard
2. Select your project (or create one)
3. Go to Settings → API
4. Copy these two values:
   - `Project URL` → This is your `VITE_SUPABASE_URL`
   - `anon public` key → This is your `VITE_SUPABASE_ANON_KEY`

**Get OpenAI Key:**
1. Go to https://platform.openai.com/api-keys
2. Create a new key or use existing
3. Copy it → This is your `OPENAI_API_KEY`

### Step 2: Deploy to Vercel (1 minute)

**Option A: Using Vercel Dashboard**
1. Go to https://vercel.com/new
2. Click "Import Git Repository" OR "Browse Template"
3. Select your repository or template
4. Add environment variables:
   ```
   VITE_SUPABASE_URL = [paste your Supabase URL]
   VITE_SUPABASE_ANON_KEY = [paste your anon key]
   ```
5. Click "Deploy"
6. Wait 2-3 minutes ⏱️
7. ✅ Done! Your app is live!

**Option B: Using Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts, then add environment variables
vercel env add VITE_SUPABASE_URL
# Paste your Supabase URL

vercel env add VITE_SUPABASE_ANON_KEY
# Paste your anon key

# Deploy to production
vercel --prod
```

### Step 3: Configure OpenAI in Supabase

Your Supabase Edge Functions need the OpenAI key:

1. Go to Supabase Dashboard
2. Click your project
3. Go to Project Settings → Edge Functions → Secrets
4. Click "Add Secret"
5. Name: `OPENAI_API_KEY`
6. Value: [paste your OpenAI API key]
7. Click "Save"

**✅ Your deployment is complete!**

---

## 🧪 Test Your Deployment

1. Visit your Vercel URL (found in deployment confirmation)
2. Click "Test AI Features" button
3. Run "Test #0: API Key Configuration"
4. If successful, test the 6 AI features

---

## 🔧 Post-Deployment Configuration

### Enable OAuth (Optional)

**For Google OAuth:**
1. Supabase Dashboard → Authentication → Providers
2. Enable "Google"
3. Follow setup instructions
4. Add redirect URL: `https://YOUR_APP.vercel.app/**`

**For LinkedIn OAuth:**
1. Same process but select "LinkedIn"
2. Add redirect URL: `https://YOUR_APP.vercel.app/**`

### Update CORS Settings

1. Supabase Dashboard → Project Settings → API
2. Scroll to "CORS Settings"
3. Add your Vercel domain:
   ```
   https://your-app-name.vercel.app
   ```

---

## 📊 What You Get

After deployment, you'll have:

✅ Full AI-powered recruitment platform
✅ 6 AI features (analyze, score, curriculum, etc.)
✅ Professional & Recruiter dashboards
✅ Global Professional Records (GPR)
✅ Assessment system
✅ Automatic HTTPS & SSL
✅ Global CDN delivery
✅ Preview deployments for changes

---

## 🎯 Your Deployment URLs

After deployment, you'll get:

- **Production**: `https://your-app.vercel.app`
- **Preview**: `https://your-app-git-branch.vercel.app` (for each branch)
- **Deployment**: `https://your-app-hash.vercel.app` (unique per deploy)

---

## 🆘 Troubleshooting

### Build Failed
- Check Vercel build logs
- Verify all dependencies in package.json
- Test build locally: `npm run build`

### AI Tests Failing
- Check that OpenAI key is added to Supabase secrets
- Verify Supabase Edge Functions are deployed
- See `/DEBUGGING_GUIDE.md` for detailed help

### Environment Variables Not Working
- Make sure they start with `VITE_`
- Redeploy after adding variables
- Check spelling matches exactly

---

## 📞 Next Steps

1. ✅ Test all AI features on the TestAI page
2. 📱 Test on mobile devices
3. 🎨 Customize branding (logo, colors)
4. 🔐 Enable OAuth providers
5. 📊 Monitor analytics in Vercel dashboard
6. 🌐 Add custom domain (optional)

---

## 💡 Pro Tips

1. **Automatic Deployments**: Connect GitHub for auto-deploy on push
2. **Preview Deployments**: Each PR gets its own preview URL
3. **Rollback**: Easy rollback to previous deployments in Vercel dashboard
4. **Environment Variables**: Use different values for production vs preview
5. **Analytics**: Check Vercel Analytics for usage stats

---

## 🎉 Congratulations!

Your Onboard.AI platform is now live and ready to transform recruitment with AI-powered skills-first hiring!

**Your Platform Features:**
- ✨ 6 AI-powered features
- 📊 Comprehensive dashboards
- 🎓 Learning curriculum generation
- 🔍 Smart candidate matching
- 📈 Analytics & insights
- 🌐 Global accessibility

---

**Questions?** Check:
- `/VERCEL_DEPLOYMENT_GUIDE.md` - Detailed deployment guide
- `/DEBUGGING_GUIDE.md` - Troubleshooting help
- `/README.md` - Complete documentation

**Happy Hiring! 🚀**

# Onboard.AI - AI-Powered Skills-First Hiring Intelligence Platform

Transform recruitment with Global Professional Records (GPR) that replace traditional resumes with verified, portable digital records of real work, skills, and accomplishments.

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/onboard-ai)

### Quick Deploy Steps:

1. Click the "Deploy with Vercel" button above
2. Sign in to your Vercel account
3. Add these environment variables:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Click "Deploy"
5. Your app will be live in 2-3 minutes! 🎉

## 📋 What's Included

### Core Platform Features
- **Global Professional Records (GPR)** - Verified digital records of real work
- **6-Step Professional Profile Creation** - Comprehensive onboarding flow
- **Unified Recruiter Dashboard** - Modern interface with 6 pages (Dashboard, Define, Talent, Activation, Onboarding, Analytics)
- **Skills & Tools Tracking** - Comprehensive tracking across Materials, Accomplishments, and Analytics
- **37-Question Assessment System** - Professional cognitive and technical evaluations

### AI-Powered Features (6 Functions)
1. **Artifact Analysis** - Extract skills and quality scores from work samples
2. **Job Ready Score** - Comprehensive job readiness assessment
3. **Curriculum Generation** - Personalized week-by-week learning paths
4. **Resume Analysis** - Extract structured data from resumes
5. **Candidate Matching** - AI-powered candidate-job fit analysis
6. **Feedback Generation** - Constructive feedback on work artifacts

### Authentication
- ID.me verification system
- Supabase Auth integration
- Google OAuth support (configurable)
- LinkedIn OAuth support (configurable)

### Design System
- **Typography**: Inter + Space Grotesk fonts
- **Color Palette**: Vibrant purple (#8B5CF6) + indigo + coral
- **Framework**: React + Tailwind CSS v4
- **Routing**: React Router (Data mode)

## 🔧 Local Development

### Prerequisites
- Node.js 16+ and npm
- Supabase account
- OpenAI API key

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd onboard-ai
   npm install
   ```

2. **Set up Supabase**
   - Create a project at https://supabase.com
   - Deploy Edge Functions (see `/supabase/functions/server/`)
   - Add your OpenAI API key to Supabase secrets
   - Copy your project URL and anon key

3. **Configure environment**
   Create a `.env` file:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🧪 Testing AI Features

Access the comprehensive testing dashboard:
1. Visit your app
2. Click "Test AI Features" button on homepage
3. Run diagnostic tests to verify:
   - Server connectivity
   - OpenAI API integration
   - All 6 AI-powered features
   - OAuth authentication flows

See `/DEBUGGING_GUIDE.md` for detailed testing instructions.

## 📚 Documentation

- **[Vercel Deployment Guide](/VERCEL_DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[AI Integration Guide](/AI_INTEGRATION_GUIDE.md)** - AI features implementation details
- **[Debugging Guide](/DEBUGGING_GUIDE.md)** - Troubleshooting AI tests
- **[Testing Guide](/TESTING_GUIDE.md)** - How to test all features
- **[Setup Complete](/SETUP_COMPLETE.md)** - Initial setup summary

## 🏗️ Architecture

### Frontend (Vercel)
- React + TypeScript
- Tailwind CSS v4
- React Router
- Supabase Client

### Backend (Supabase Edge Functions)
- Hono web framework
- OpenAI API integration
- PostgreSQL database (KV store)
- Authentication & OAuth

### Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Supabase Edge Functions (Deno), Hono
- **Database**: Supabase PostgreSQL
- **AI**: OpenAI GPT-4o-mini
- **Auth**: Supabase Auth, ID.me, Google, LinkedIn
- **Deployment**: Vercel (Frontend) + Supabase (Backend)

## 🔐 Environment Variables

### Required for Deployment

```env
# Frontend (Vercel)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key

# Backend (Supabase Edge Functions - add via Supabase Dashboard)
OPENAI_API_KEY=sk-your-openai-key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_DB_URL=postgresql://...
```

## 🚦 Deployment Checklist

Before deploying to Vercel:

- [ ] ✅ Supabase project created
- [ ] ✅ Edge Functions deployed to Supabase
- [ ] ✅ OpenAI API key added to Supabase secrets
- [ ] ✅ Environment variables configured
- [ ] ✅ Build works locally (`npm run build`)
- [ ] ✅ Tests pass (run Test #0 on TestAIPage)

After deploying to Vercel:

- [ ] ✅ Add Vercel domain to Supabase CORS settings
- [ ] ✅ Update OAuth redirect URLs (if using OAuth)
- [ ] ✅ Test all features on production URL
- [ ] ✅ Monitor Vercel Analytics

## 🎨 Features by Account Type

### Professional Account
- 6-step profile creation flow
- Global Professional Record (GPR)
- Skills & tools tracking
- Work artifact upload & analysis
- AI-powered job ready scores
- Personalized learning curriculum
- Portfolio showcase

### Recruiter Account
- **Dashboard**: Overview metrics & recent activity
- **Define**: Job posting & requirements definition
- **Talent**: Browse GPRs, skills tracking, candidate matching
- **Activation**: Candidate engagement & outreach
- **Onboarding**: New hire management
- **Analytics**: Hiring metrics & insights

## 📊 AI Features Details

### 1. Analyze Artifacts
Extracts skills, tools, and quality scores from work samples (code, documents, projects)

### 2. Job Ready Score
Calculates comprehensive job readiness based on:
- Skills alignment
- Project experience
- Assessment results
- Work quality

### 3. Generate Curriculum
Creates personalized week-by-week learning paths including:
- Weekly modules
- Resources (videos, articles, courses)
- Hands-on projects
- Estimated timeline

### 4. Analyze Resume
Parses resumes and extracts:
- Contact information
- Skills
- Experience
- Education
- Projects

### 5. Match Candidate
AI-powered matching that provides:
- Match score (0-100)
- Matched vs missing skills
- Strengths & concerns
- Interview questions

### 6. Generate Feedback
Provides constructive feedback on work:
- Overall quality score
- Strengths
- Areas for improvement
- Specific suggestions
- Next steps

## 🤝 Contributing

This is a comprehensive recruitment platform built with modern tech. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

Copyright © 2025 Onboard.AI

## 🆘 Support

- **Documentation**: Check `/VERCEL_DEPLOYMENT_GUIDE.md` and other guides
- **Debugging**: See `/DEBUGGING_GUIDE.md` for troubleshooting
- **Testing**: Use the built-in testing dashboard (`/test-ai` page)

## 🎉 Get Started

1. Deploy to Vercel using the button above
2. Configure your environment variables
3. Visit the app and click "Test AI Features"
4. Start building your skills-first hiring platform!

---

**Built with ❤️ using React, Supabase, OpenAI, and Vercel**

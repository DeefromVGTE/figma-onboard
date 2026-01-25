# Onboard.AI - Testing Guide for AI & OAuth Features

## 🎯 Quick Access to Testing Dashboard

### Method 1: From Product Page
1. Visit the app
2. Click the **"Test AI Features"** button on the homepage (purple button next to "Get Started")

### Method 2: Direct Navigation
In your browser's console, run:
```javascript
// Navigate to test page
window.location.hash = 'test-ai';
```

---

## ✅ Pre-Testing Checklist

### Required Setup:

#### 1. **OpenAI API Key** (REQUIRED for AI features to work)
- [ ] Go to https://platform.openai.com/api-keys
- [ ] Create a new API key
- [ ] Copy the key (starts with `sk-`)
- [ ] Add it to the secret modal that appeared in Figma Make
- [ ] OR add it via Supabase Dashboard → Settings → Secrets → Add `OPENAI_API_KEY`

**How to verify it's set up:**
- Run any AI test on the testing page
- If you see "OpenAI API key not configured" error, the key is missing
- If you see actual results (skills, scores, etc.), it's working!

#### 2. **Google OAuth** (Optional but recommended)
- [ ] Go to Supabase Dashboard → Authentication → Providers
- [ ] Find "Google" and toggle "Enable"
- [ ] Get credentials from Google Cloud Console
- [ ] Add authorized redirect URI: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
- [ ] Copy Client ID and Client Secret to Supabase

**How to verify:**
- Click "Test Google OAuth" button on testing page
- If redirects to Google login → ✅ Working
- If shows error about provider not enabled → Need to enable in Supabase

#### 3. **LinkedIn OAuth** (Optional but recommended)
- [ ] Go to Supabase Dashboard → Authentication → Providers
- [ ] Find "LinkedIn" and toggle "Enable"
- [ ] Get credentials from LinkedIn Developers
- [ ] Add redirect URI: `https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`
- [ ] Copy Client ID and Client Secret to Supabase

**How to verify:**
- Click "Test LinkedIn OAuth" button on testing page
- If redirects to LinkedIn login → ✅ Working
- If shows error → Check Supabase setup

---

## 🧪 Testing Each AI Feature

### Test 1: Analyze Work Artifacts ✨

**What it does:** Extracts skills, tools used, and quality scores from work samples (code, projects, documents)

**How to test:**
1. Click "Run Test" button under "1. Analyze Work Artifacts"
2. Wait 5-10 seconds for AI response
3. Check the results panel

**What to look for:**
- ✅ **Quality Score**: Should show a percentage (e.g., 85%)
- ✅ **Skills**: Should list technical skills (e.g., "React", "Node.js", "API Integration")
- ✅ **Skills Gained**: New skills acquired (e.g., "Payment Processing", "Stripe Integration")
- ✅ **Tools Used**: Technologies used (e.g., "Stripe", "MongoDB", "AWS")

**Sample Expected Output:**
```json
{
  "qualityScore": 88,
  "skills": ["React", "Node.js", "TypeScript", "MongoDB", "API Design"],
  "skillsGained": ["Payment Integration", "E-commerce Systems"],
  "toolsUsed": ["Stripe", "AWS", "Docker"],
  "analysis": "High-quality full-stack implementation..."
}
```

**Troubleshooting:**
- ❌ "OpenAI API key not configured" → Add your API key
- ❌ "Failed to analyze artifacts" → Check network/API key validity
- ❌ Takes too long → Normal for first request (cold start)

---

### Test 2: Calculate Job Ready Score 🎯

**What it does:** AI-powered comprehensive job readiness assessment with skills gap analysis

**How to test:**
1. Click "Run Test" button under "2. Calculate Job Ready Score"
2. Wait for AI to analyze the candidate profile
3. Review the comprehensive breakdown

**What to look for:**
- ✅ **Job Ready Score**: Overall percentage (e.g., 82%)
- ✅ **Skills Gap**: Missing skills for the target role
- ✅ **Skills Gap Percentage**: % of required skills missing
- ✅ **Strengths**: Candidate's strong points
- ✅ **Recommendations**: Personalized suggestions
- ✅ **Breakdown**: Scores for each area (Technical, Coding, etc.)

**Sample Expected Output:**
```json
{
  "jobReadyScore": 82,
  "skillsGap": ["Advanced System Design", "Kubernetes", "Leadership"],
  "skillsGapPercentage": 18,
  "strengths": ["Strong React skills", "Good API design"],
  "recommendations": ["Focus on system design", "Take leadership course"],
  "breakdown": {
    "technicalAssessment": 90,
    "codingChallenges": 85,
    "behavioralAssessment": 88,
    "problemSolving": 82,
    "systemDesign": 75,
    "communicationSkills": 92
  }
}
```

---

### Test 3: Generate Personalized Curriculum 📚

**What it does:** Creates week-by-week learning paths based on skills gap

**How to test:**
1. Click "Run Test" button under "3. Generate Personalized Curriculum"
2. Wait for AI to create the curriculum (may take 10-15 seconds)
3. Review the learning path

**What to look for:**
- ✅ **Estimated Completion**: Timeline (e.g., "8-12 weeks")
- ✅ **Total Hours**: Time commitment (e.g., "120 hours")
- ✅ **Weekly Modules**: Number of weeks in the plan
- ✅ **Each Week Should Include**:
  - Title and description
  - Skills covered
  - Resources (videos, articles, courses)
  - Hands-on projects

**Sample Expected Output:**
```json
{
  "estimatedCompletion": "10-12 weeks",
  "totalHours": 140,
  "curriculum": [
    {
      "week": 1,
      "title": "TensorFlow Fundamentals",
      "description": "Learn the basics of TensorFlow...",
      "skills": ["TensorFlow Basics", "Neural Networks"],
      "resources": [...],
      "projects": [...]
    },
    // ... more weeks
  ]
}
```

---

### Test 4: Analyze Resume 📄

**What it does:** Extracts structured data from resume text (auto-fill profiles)

**How to test:**
1. Click "Run Test" button under "4. Analyze Resume"
2. AI will parse a sample resume
3. Check extracted information

**What to look for:**
- ✅ **Name**: Full name extracted
- ✅ **Contact Info**: Email and phone
- ✅ **Skills**: List of technical skills
- ✅ **Experience**: Work history with details
- ✅ **Education**: Degrees and institutions
- ✅ **Projects**: Personal/work projects

**Use Case:** When a professional signs up, they can paste their resume and the AI auto-fills their profile!

---

### Test 5: Match Candidate to Job 🎯

**What it does:** AI-powered candidate-job fit analysis

**How to test:**
1. Click "Run Test" button under "5. Match Candidate to Job"
2. AI analyzes fit between GPR and job description
3. Review match results

**What to look for:**
- ✅ **Match Score**: Percentage fit (e.g., 78%)
- ✅ **Matched Skills**: Skills they have that match
- ✅ **Missing Skills**: Required skills they lack
- ✅ **Strengths**: Why they're a good fit
- ✅ **Concerns**: Potential weak points
- ✅ **Recommendation**: Hire/interview/pass decision
- ✅ **Interview Questions**: Suggested questions to ask

**Use Case:** Recruiters use this to quickly assess if a GPR matches a job opening!

---

### Test 6: Generate Feedback 💬

**What it does:** Provides constructive feedback on submitted work

**How to test:**
1. Click "Run Test" button under "6. Generate Feedback"
2. AI reviews a sample project
3. Read the feedback

**What to look for:**
- ✅ **Overall Score**: Quality rating (e.g., 85%)
- ✅ **Strengths**: What was done well
- ✅ **Improvements**: What could be better
- ✅ **Suggestions**: Specific recommendations
- ✅ **Next Steps**: What to work on next

**Use Case:** When professionals submit projects during training, they get AI feedback!

---

## 🔐 Testing OAuth Flows

### Test Google OAuth

**How to test:**
1. Click "Test Google OAuth" button
2. Should redirect to Google login page
3. Sign in with Google account
4. Gets redirected back to app
5. Click "Check Current Session" to verify logged in

**Success Indicators:**
- ✅ Redirects to Google
- ✅ Shows list of Google accounts
- ✅ After login, redirects back to app
- ✅ Session shows: `{ provider: "google", user: {...} }`

**Common Issues:**
- ❌ "Provider is not enabled" → Enable Google in Supabase Dashboard
- ❌ "Redirect URI mismatch" → Check authorized URIs in Google Console
- ❌ "Invalid client ID" → Verify credentials in Supabase

---

### Test LinkedIn OAuth

**How to test:**
1. Click "Test LinkedIn OAuth" button
2. Should redirect to LinkedIn login page
3. Authorize the app
4. Gets redirected back
5. Check session

**Success Indicators:**
- ✅ Redirects to LinkedIn
- ✅ Shows authorization page
- ✅ After auth, redirects back
- ✅ Session shows: `{ provider: "linkedin_oidc", user: {...} }`

**Common Issues:**
- ❌ "Provider is not enabled" → Enable LinkedIn in Supabase
- ❌ Need to request "Sign In with LinkedIn" product access
- ❌ Redirect URI issues → Check LinkedIn app settings

---

## 📊 Understanding the Results

### What Makes a Good Test Result?

#### AI Features:
- **Response time**: 3-15 seconds is normal
- **Quality**: Results should be detailed and relevant
- **Structure**: Should return proper JSON with expected fields
- **Accuracy**: Skills/analysis should make sense for the input

#### OAuth:
- **Redirect**: Should smoothly redirect to provider
- **Return**: Should come back to your app
- **Session**: Should have user data and provider info

---

## 🐛 Common Issues & Solutions

### Issue: "OpenAI API key not configured"
**Solution:** 
1. Get API key from https://platform.openai.com/api-keys
2. Add to Figma Make secrets or Supabase environment variables
3. Restart the function if needed

### Issue: "Failed to analyze artifacts"
**Solutions:**
1. Check if API key is valid
2. Verify you have credits in OpenAI account
3. Check network connection
4. Look at browser console for detailed error

### Issue: OAuth buttons show errors
**Solutions:**
1. Check Supabase Dashboard → Auth → Providers
2. Verify provider is enabled
3. Confirm credentials are correct
4. Check redirect URIs match exactly

### Issue: Tests are slow
**Normal:** First request may take 10-20 seconds (cold start)
**If persistent:** Check OpenAI API status, network speed

---

## ✅ Success Checklist

After testing, you should see:

- [ ] ✅ All 6 AI tests return results (not errors)
- [ ] ✅ Skills extraction works correctly
- [ ] ✅ Job Ready Scores are calculated
- [ ] ✅ Curriculum generation creates learning paths
- [ ] ✅ Resume analysis extracts info correctly
- [ ] ✅ Candidate matching provides scores
- [ ] ✅ Feedback generation gives constructive suggestions
- [ ] ✅ Google OAuth redirects properly (if enabled)
- [ ] ✅ LinkedIn OAuth redirects properly (if enabled)
- [ ] ✅ Sessions are created after OAuth login

---

## 🚀 Next Steps After Testing

Once all tests pass:

1. **Integrate into UI**
   - Add AI features to Professional profile creation
   - Show Job Ready Scores in Recruiter Talent page
   - Generate curriculums in Training section
   - Provide feedback on submitted work

2. **Monitor Usage**
   - Check OpenAI usage in dashboard
   - Monitor API costs
   - Track response times

3. **Production Deployment**
   - Export from Figma Make
   - Deploy to Vercel/your hosting
   - Set up production environment variables

---

## 📞 Need Help?

If tests aren't working:

1. **Check browser console** for detailed errors
2. **Check Supabase Functions logs**: Supabase Dashboard → Functions → make-server-455660d1 → Logs
3. **Verify all secrets** are set correctly
4. **Review** `/AI_INTEGRATION_GUIDE.md` for setup details

---

**Happy Testing! 🎉**

Your AI-powered recruitment platform is ready to revolutionize hiring!

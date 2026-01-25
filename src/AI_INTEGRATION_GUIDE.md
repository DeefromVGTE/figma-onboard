# Onboard.AI - OpenAI Integration & Social Auth Setup Guide

## ✅ Completed Setup

### 1. OpenAI API Integration ✨
- **Status**: Backend integration complete
- **API Key**: Secret created (you need to add your OpenAI API key)
- **Model**: Using `gpt-4o-mini` for cost-effective, high-quality responses

#### Available AI-Powered Endpoints:

1. **Analyze Work Artifacts** (`/ai/analyze-artifacts`)
   - Extracts skills, tools used, and quality scores from code/projects
   - Returns: skills demonstrated, skills gained, tools used, quality score (0-100)

2. **Calculate Job Ready Score** (`/ai/calculate-job-ready-score`)
   - AI-powered comprehensive job readiness assessment
   - Returns: overall score, skills gap, breakdown by assessment area, recommendations

3. **Generate Personalized Curriculum** (`/ai/generate-curriculum`)
   - Creates week-by-week learning paths based on skills gap
   - Personalized to learning style and time commitment
   - Returns: weekly modules, resources, projects, estimated timeline

4. **Analyze Resume** (`/ai/analyze-resume`)
   - Extracts structured data from resume text
   - Returns: contact info, skills, experience, education, projects

5. **Match Candidate to Job** (`/ai/match-candidate`)
   - AI-powered candidate-job fit analysis
   - Returns: match score, matched/missing skills, strengths, concerns, interview questions

6. **Generate Feedback** (`/ai/generate-feedback`)
   - Provides constructive feedback on work artifacts
   - Returns: quality score, strengths, improvements, suggestions, next steps

### 2. Backend Server Files

#### `/supabase/functions/server/ai.tsx`
All OpenAI integration logic with these functions:
- `analyzeArtifacts()`
- `calculateJobReadyScore()`
- `generateCurriculum()`
- `analyzeResume()`
- `matchCandidateToJob()`
- `generateFeedback()`

#### `/supabase/functions/server/index.tsx`
Server routes for all AI endpoints (see list above)

---

## 🔧 REQUIRED: Add Your OpenAI API Key

### Step 1: Get an OpenAI API Key
1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

### Step 2: Add to Supabase
1. A modal should have appeared asking for your `OPENAI_API_KEY`
2. If not, you can access it through Figma Make's secrets management
3. Paste your OpenAI API key
4. Save

**Important**: Your OpenAI API key is stored securely as an environment variable and never exposed to the frontend.

---

## 🔐 TODO: Setup Social Authentication (Google & LinkedIn)

### Why Social Auth?
- Faster signup/login experience
- Professional credential verification (LinkedIn)
- Reduces friction for users

### Setup Instructions

#### **GOOGLE AUTHENTICATION**

1. **Go to Supabase Dashboard**
   - Navigate to your project at https://supabase.com/dashboard
   - Go to Authentication → Providers

2. **Enable Google Provider**
   - Find "Google" in the providers list
   - Toggle "Enable"

3. **Get Google OAuth Credentials**
   - Go to https://console.cloud.google.com/
   - Create a new project or select existing
   - Enable Google+ API
   - Go to "Credentials" → "Create Credentials" → "OAuth client ID"
   - Application type: "Web application"
   - Add authorized redirect URI:
     ```
     https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
     ```
   - Copy Client ID and Client Secret

4. **Add to Supabase**
   - Paste Client ID and Client Secret in Supabase
   - Save

#### **LINKEDIN AUTHENTICATION**

1. **Go to Supabase Dashboard**
   - Authentication → Providers
   - Find "LinkedIn"
   - Toggle "Enable"

2. **Get LinkedIn OAuth Credentials**
   - Go to https://www.linkedin.com/developers/apps
   - Create a new app
   - Fill in app details
   - In "Auth" tab, add redirect URL:
     ```
     https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
     ```
   - Copy Client ID and Client Secret

3. **Add to Supabase**
   - Paste Client ID and Client Secret in Supabase
   - Request access to "Sign In with LinkedIn" product
   - Save

---

## 📝 How to Use AI Features in Your App

### Example 1: Analyze Work Artifacts

```typescript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-455660d1/ai/analyze-artifacts`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${publicAnonKey}`,
    },
    body: JSON.stringify({
      artifacts: [
        {
          type: "code",
          name: "User Authentication System",
          description: "Implemented JWT-based auth",
          content: "// code snippet here..."
        }
      ]
    }),
  }
);

const { analysis } = await response.json();
console.log("Skills:", analysis.skills);
console.log("Tools Used:", analysis.toolsUsed);
console.log("Quality Score:", analysis.qualityScore);
```

### Example 2: Generate Personalized Curriculum

```typescript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-455660d1/ai/generate-curriculum`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${publicAnonKey}`,
    },
    body: JSON.stringify({
      targetRole: "Full Stack Developer",
      currentSkills: ["HTML", "CSS", "JavaScript"],
      skillsGap: ["React", "Node.js", "PostgreSQL", "Docker"],
      learningStyle: "hands-on",
      timeCommitment: "10 hours/week"
    }),
  }
);

const { curriculum } = await response.json();
console.log("Estimated Completion:", curriculum.estimatedCompletion);
console.log("Total Hours:", curriculum.totalHours);
curriculum.curriculum.forEach(week => {
  console.log(`Week ${week.week}: ${week.title}`);
});
```

### Example 3: Calculate Job Ready Score

```typescript
const response = await fetch(
  `https://${projectId}.supabase.co/functions/v1/make-server-455660d1/ai/calculate-job-ready-score`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${publicAnonKey}`,
    },
    body: JSON.stringify({
      targetRole: "AI Engineer",
      gprData: {
        skills: ["Python", "TensorFlow", "React"],
        projects: [...],
        experience: [...]
      },
      assessmentResults: {
        technicalScore: 85,
        codingScore: 90,
        // ... other scores
      }
    }),
  }
);

const { result } = await response.json();
console.log("Job Ready Score:", result.jobReadyScore);
console.log("Skills Gap:", result.skillsGap);
console.log("Recommendations:", result.recommendations);
```

---

## 🎨 Next Steps: Integrate AI into Your UI

### Recommended Integration Points:

1. **Professional Profile Creation**
   - Use `analyzeResume()` to auto-fill profile from uploaded resume
   - Use `analyzeArtifacts()` when professionals upload portfolio items

2. **Training/Curriculum Page**
   - Use `generateCurriculum()` after job readiness assessment
   - Show personalized week-by-week learning path

3. **Recruiter Talent Page**
   - Use `matchCandidateToJob()` to show match scores for job postings
   - Use `calculateJobReadyScore()` to display comprehensive GPR analysis

4. **Professional Dashboard**
   - Use `generateFeedback()` to provide AI feedback on submitted work
   - Use `calculateJobReadyScore()` to show current job readiness

---

## 💰 Cost Considerations

- **Model**: gpt-4o-mini (most cost-effective)
- **Estimated cost**: ~$0.15 per 1M input tokens, ~$0.60 per 1M output tokens
- **Typical analysis**: $0.001-0.005 per request
- **Budget recommendation**: Start with $10/month, monitor usage

---

## 🐛 Debugging

Check server logs in Supabase:
1. Go to Supabase Dashboard → Functions → make-server-455660d1
2. View logs to see AI requests and responses
3. All AI operations are logged with contextual information

---

## ✅ Checklist

- [x] OpenAI API integration code complete
- [x] AI endpoints created in backend
- [ ] Add OpenAI API key to environment variables
- [ ] Setup Google OAuth in Supabase
- [ ] Setup LinkedIn OAuth in Supabase  
- [ ] Test AI features in production
- [ ] Integrate AI features into UI components
- [ ] Monitor API usage and costs

---

**Ready to transform your recruitment platform with AI!** 🚀

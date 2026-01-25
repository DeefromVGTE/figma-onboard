// OpenAI Integration for Onboard.AI
// Provides AI-powered features for curriculum generation, skill analysis, and more

interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

/**
 * Call OpenAI API with messages
 */
async function callOpenAI(messages: OpenAIMessage[], temperature: number = 0.7): Promise<string> {
  if (!OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY environment variable is not set");
    throw new Error("OpenAI API key not configured. Please add OPENAI_API_KEY to Supabase secrets.");
  }

  console.log("🤖 Calling OpenAI API with model: gpt-4o-mini");
  
  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
      temperature,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ OpenAI API error:", response.status, errorText);
    
    // Provide more specific error messages
    if (response.status === 401) {
      throw new Error("OpenAI API authentication failed. Please check your API key.");
    } else if (response.status === 429) {
      throw new Error("OpenAI API rate limit exceeded. Please try again later.");
    } else if (response.status === 500) {
      throw new Error("OpenAI API server error. Please try again later.");
    }
    
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
  }

  const data: OpenAIResponse = await response.json();
  console.log("✅ OpenAI API response received");
  return data.choices[0].message.content;
}

/**
 * Strip markdown code blocks from AI response
 * Handles both ```json and ``` wrapped responses
 */
function stripMarkdownCodeBlocks(text: string): string {
  // Remove ```json\n...\n``` or ```\n...\n```
  let cleaned = text.trim();
  
  // Match and remove markdown code blocks
  const codeBlockRegex = /^```(?:json)?\s*\n?([\s\S]*?)\n?```$/;
  const match = cleaned.match(codeBlockRegex);
  
  if (match) {
    cleaned = match[1].trim();
  }
  
  return cleaned;
}

/**
 * Analyze work artifacts (code, documents, projects) to extract skills
 */
export async function analyzeArtifacts(artifacts: any[]): Promise<{
  skills: string[];
  skillsGained: string[];
  toolsUsed: string[];
  qualityScore: number;
  analysis: string;
}> {
  const artifactsSummary = artifacts.map(a => ({
    type: a.type,
    name: a.name,
    description: a.description || "",
    content: a.content ? a.content.substring(0, 500) : "",
  }));

  const messages: OpenAIMessage[] = [
    {
      role: "system",
      content: `You are an expert technical recruiter and skills analyst for Onboard.AI, a skills-first hiring intelligence platform. 
      
Your job is to analyze work artifacts (code, documents, projects, tasks) and extract:
1. Skills demonstrated in the work
2. New skills gained through completing the work
3. Tools and technologies used
4. Quality score (0-100) based on complexity, completeness, and best practices
5. Brief analysis summary

Return your response as a JSON object with this structure:
{
  "skills": ["skill1", "skill2"],
  "skillsGained": ["newSkill1", "newSkill2"],
  "toolsUsed": ["tool1", "tool2"],
  "qualityScore": 85,
  "analysis": "Brief analysis summary"
}`,
    },
    {
      role: "user",
      content: `Analyze these work artifacts and extract skills, tools, and provide quality assessment:\n\n${JSON.stringify(artifactsSummary, null, 2)}`,
    },
  ];

  try {
    const response = await callOpenAI(messages, 0.3);
    const cleaned = stripMarkdownCodeBlocks(response);
    console.log("📄 Cleaned response:", cleaned.substring(0, 200));
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("❌ Error parsing analyzeArtifacts response:", error);
    throw new Error(`Failed to parse AI response: ${error.message}`);
  }
}

/**
 * Calculate Job Ready Score using AI analysis
 */
export async function calculateJobReadyScore(
  targetRole: string,
  gprData: any,
  assessmentResults: any
): Promise<{
  jobReadyScore: number;
  skillsGap: string[];
  skillsGapPercentage: number;
  strengths: string[];
  recommendations: string[];
  breakdown: {
    technicalAssessment: number;
    codingChallenges: number;
    behavioralAssessment: number;
    problemSolving: number;
    systemDesign: number;
    communicationSkills: number;
  };
}> {
  const messages: OpenAIMessage[] = [
    {
      role: "system",
      content: `You are an AI career coach and technical assessor for Onboard.AI. 
      
Your job is to calculate a comprehensive Job Ready Score for a professional based on:
- Their target role
- Their GPR (Global Professional Record) - skills, projects, experience
- Their assessment results

Provide:
1. Overall Job Ready Score (0-100)
2. Skills gap analysis (what skills they're missing)
3. Skills gap percentage
4. Their strengths
5. Personalized recommendations
6. Breakdown scores for each assessment area (0-100 each):
   - Technical Assessment
   - Coding Challenges
   - Behavioral Assessment
   - Problem Solving
   - System Design
   - Communication Skills

Return response as JSON with this structure:
{
  "jobReadyScore": 85,
  "skillsGap": ["skill1", "skill2"],
  "skillsGapPercentage": 15,
  "strengths": ["strength1", "strength2"],
  "recommendations": ["rec1", "rec2"],
  "breakdown": {
    "technicalAssessment": 90,
    "codingChallenges": 85,
    "behavioralAssessment": 88,
    "problemSolving": 82,
    "systemDesign": 78,
    "communicationSkills": 92
  }
}`,
    },
    {
      role: "user",
      content: `Calculate Job Ready Score for this professional:

Target Role: ${targetRole}

GPR Data:
${JSON.stringify(gprData, null, 2)}

Assessment Results:
${JSON.stringify(assessmentResults, null, 2)}`,
    },
  ];

  try {
    const response = await callOpenAI(messages, 0.3);
    const cleaned = stripMarkdownCodeBlocks(response);
    console.log("📄 Cleaned response:", cleaned.substring(0, 200));
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("❌ Error parsing calculateJobReadyScore response:", error);
    throw new Error(`Failed to parse AI response: ${error.message}`);
  }
}

/**
 * Generate personalized learning curriculum
 */
export async function generateCurriculum(
  targetRole: string,
  currentSkills: string[],
  skillsGap: string[],
  learningStyle: string,
  timeCommitment: string
): Promise<{
  curriculum: Array<{
    week: number;
    title: string;
    description: string;
    skills: string[];
    resources: Array<{
      type: "video" | "article" | "course" | "project";
      title: string;
      description: string;
      estimatedTime: string;
    }>;
    projects: Array<{
      title: string;
      description: string;
      skills: string[];
      difficulty: "beginner" | "intermediate" | "advanced";
    }>;
  }>;
  estimatedCompletion: string;
  totalHours: number;
}> {
  const messages: OpenAIMessage[] = [
    {
      role: "system",
      content: `You are an expert curriculum designer for Onboard.AI's skills-first training platform.

Your job is to create personalized, week-by-week learning paths that:
1. Bridge the skills gap for the target role
2. Match the learner's learning style (${learningStyle})
3. Fit their time commitment (${timeCommitment})
4. Include practical projects that generate portfolio artifacts
5. Build skills progressively from current level

Create a comprehensive curriculum with:
- Weekly modules (title, description, skills covered)
- Learning resources for each week (videos, articles, courses, projects)
- Hands-on projects that create real portfolio pieces
- Estimated completion timeline
- Total hours required

Return as JSON:
{
  "curriculum": [
    {
      "week": 1,
      "title": "Week title",
      "description": "What you'll learn",
      "skills": ["skill1", "skill2"],
      "resources": [
        {
          "type": "video",
          "title": "Resource title",
          "description": "What it covers",
          "estimatedTime": "2 hours"
        }
      ],
      "projects": [
        {
          "title": "Project title",
          "description": "Project description",
          "skills": ["skill1", "skill2"],
          "difficulty": "beginner"
        }
      ]
    }
  ],
  "estimatedCompletion": "8-12 weeks",
  "totalHours": 120
}`,
    },
    {
      role: "user",
      content: `Create a personalized learning curriculum:

Target Role: ${targetRole}
Current Skills: ${currentSkills.join(", ")}
Skills to Learn: ${skillsGap.join(", ")}
Learning Style: ${learningStyle}
Time Commitment: ${timeCommitment}`,
    },
  ];

  try {
    const response = await callOpenAI(messages, 0.7);
    const cleaned = stripMarkdownCodeBlocks(response);
    console.log("📄 Cleaned response:", cleaned.substring(0, 200));
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("❌ Error parsing generateCurriculum response:", error);
    throw new Error(`Failed to parse AI response: ${error.message}`);
  }
}

/**
 * Analyze resume/CV and extract structured data
 */
export async function analyzeResume(resumeText: string): Promise<{
  name: string;
  email: string;
  phone: string;
  summary: string;
  skills: string[];
  experience: Array<{
    company: string;
    title: string;
    duration: string;
    responsibilities: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    year: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
  }>;
}> {
  const messages: OpenAIMessage[] = [
    {
      role: "system",
      content: `You are a resume parser for Onboard.AI. Extract structured information from resumes.

Return JSON:
{
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "+1234567890",
  "summary": "Professional summary",
  "skills": ["skill1", "skill2"],
  "experience": [
    {
      "company": "Company Name",
      "title": "Job Title",
      "duration": "Jan 2020 - Present",
      "responsibilities": ["resp1", "resp2"]
    }
  ],
  "education": [
    {
      "institution": "University",
      "degree": "Bachelor's",
      "field": "Computer Science",
      "year": "2020"
    }
  ],
  "projects": [
    {
      "title": "Project Name",
      "description": "Description",
      "technologies": ["tech1", "tech2"]
    }
  ]
}`,
    },
    {
      role: "user",
      content: `Extract information from this resume:\n\n${resumeText}`,
    },
  ];

  try {
    const response = await callOpenAI(messages, 0.2);
    const cleaned = stripMarkdownCodeBlocks(response);
    console.log("📄 Cleaned response:", cleaned.substring(0, 200));
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("❌ Error parsing analyzeResume response:", error);
    throw new Error(`Failed to parse AI response: ${error.message}`);
  }
}

/**
 * Match candidates to job requirements
 */
export async function matchCandidateToJob(
  gprData: any,
  jobDescription: string,
  jobRequirements: string[]
): Promise<{
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  concerns: string[];
  recommendation: string;
  interviewQuestions: string[];
}> {
  const messages: OpenAIMessage[] = [
    {
      role: "system",
      content: `You are an AI recruiter for Onboard.AI analyzing candidate-job fit.

Analyze the candidate's GPR against job requirements and provide:
1. Match score (0-100)
2. Matched skills
3. Missing skills
4. Candidate strengths for this role
5. Potential concerns
6. Hiring recommendation
7. Suggested interview questions

Return JSON:
{
  "matchScore": 85,
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill3"],
  "strengths": ["strength1", "strength2"],
  "concerns": ["concern1"],
  "recommendation": "Strong match - recommend interview",
  "interviewQuestions": ["question1", "question2"]
}`,
    },
    {
      role: "user",
      content: `Match this candidate to the job:

Candidate GPR:
${JSON.stringify(gprData, null, 2)}

Job Description:
${jobDescription}

Requirements:
${jobRequirements.join("\n")}`,
    },
  ];

  try {
    const response = await callOpenAI(messages, 0.4);
    const cleaned = stripMarkdownCodeBlocks(response);
    console.log("📄 Cleaned response:", cleaned.substring(0, 200));
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("❌ Error parsing matchCandidateToJob response:", error);
    throw new Error(`Failed to parse AI response: ${error.message}`);
  }
}

/**
 * Generate personalized feedback on projects/work
 */
export async function generateFeedback(
  artifact: any,
  targetRole: string
): Promise<{
  overallScore: number;
  strengths: string[];
  improvements: string[];
  suggestions: string[];
  nextSteps: string[];
}> {
  const messages: OpenAIMessage[] = [
    {
      role: "system",
      content: `You are a technical mentor providing constructive feedback on work artifacts for Onboard.AI professionals.

Provide:
1. Overall quality score (0-100)
2. What they did well (strengths)
3. What could be improved
4. Specific suggestions for improvement
5. Recommended next steps

Return JSON:
{
  "overallScore": 85,
  "strengths": ["strength1", "strength2"],
  "improvements": ["improvement1", "improvement2"],
  "suggestions": ["suggestion1", "suggestion2"],
  "nextSteps": ["step1", "step2"]
}`,
    },
    {
      role: "user",
      content: `Provide feedback on this work for a ${targetRole}:

${JSON.stringify(artifact, null, 2)}`,
    },
  ];

  try {
    const response = await callOpenAI(messages, 0.6);
    const cleaned = stripMarkdownCodeBlocks(response);
    console.log("📄 Cleaned response:", cleaned.substring(0, 200));
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("❌ Error parsing generateFeedback response:", error);
    throw new Error(`Failed to parse AI response: ${error.message}`);
  }
}
import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import * as ai from "./ai.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-455660d1/health", (c) => {
  return c.json({ status: "ok" });
});

// ==================== ID.ME VERIFICATION ENDPOINTS ====================

// Initiate ID.ME verification
app.post("/make-server-455660d1/idme/initiate", async (c) => {
  try {
    const { email, accountType } = await c.req.json();
    
    if (!email || !accountType) {
      return c.json({ error: "Email and account type are required" }, 400);
    }

    // In production, this would initiate actual ID.ME OAuth flow
    // For now, we'll create a pending verification record
    const verificationId = `idme_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    await kv.set(`verification:${verificationId}`, {
      email,
      accountType,
      status: "pending",
      createdAt: new Date().toISOString(),
      verificationUrl: `https://api.id.me/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=military`,
    });

    console.log(`ID.ME verification initiated for ${email} (${accountType})`);

    return c.json({
      verificationId,
      // In production, return actual ID.ME authorization URL
      authUrl: `https://api.id.me/oauth/authorize?client_id=YOUR_CLIENT_ID&state=${verificationId}`,
      status: "pending"
    });
  } catch (error) {
    console.error("Error initiating ID.ME verification:", error);
    return c.json({ error: "Failed to initiate ID.ME verification" }, 500);
  }
});

// Complete ID.ME verification (OAuth callback)
app.post("/make-server-455660d1/idme/callback", async (c) => {
  try {
    const { code, state } = await c.req.json();
    
    if (!code || !state) {
      return c.json({ error: "Code and state are required" }, 400);
    }

    // Retrieve verification record
    const verification = await kv.get(`verification:${state}`);
    
    if (!verification) {
      return c.json({ error: "Invalid verification session" }, 404);
    }

    // In production, exchange code for ID.ME access token and fetch user data
    // For now, we'll simulate successful verification
    const verifiedData = {
      email: verification.email,
      accountType: verification.accountType,
      status: "verified",
      verifiedAt: new Date().toISOString(),
      idmeUserId: `idme_user_${Math.random().toString(36).substr(2, 9)}`,
      firstName: "John", // Would come from ID.ME
      lastName: "Doe",   // Would come from ID.ME
    };

    await kv.set(`verification:${state}`, verifiedData);
    await kv.set(`user:${verification.email}`, {
      ...verifiedData,
      verificationId: state,
    });

    console.log(`ID.ME verification completed for ${verification.email}`);

    return c.json({
      success: true,
      verificationId: state,
      userData: verifiedData,
    });
  } catch (error) {
    console.error("Error completing ID.ME verification:", error);
    return c.json({ error: "Failed to complete ID.ME verification" }, 500);
  }
});

// Check verification status
app.get("/make-server-455660d1/idme/status/:verificationId", async (c) => {
  try {
    const verificationId = c.req.param("verificationId");
    const verification = await kv.get(`verification:${verificationId}`);
    
    if (!verification) {
      return c.json({ error: "Verification not found" }, 404);
    }

    return c.json({
      status: verification.status,
      data: verification.status === "verified" ? verification : null,
    });
  } catch (error) {
    console.error("Error checking verification status:", error);
    return c.json({ error: "Failed to check verification status" }, 500);
  }
});

// Mock endpoint to simulate ID.ME verification (for development)
app.post("/make-server-455660d1/idme/mock-verify", async (c) => {
  try {
    const { verificationId } = await c.req.json();
    
    const verification = await kv.get(`verification:${verificationId}`);
    
    if (!verification) {
      return c.json({ error: "Verification not found" }, 404);
    }

    const verifiedData = {
      email: verification.email,
      accountType: verification.accountType,
      status: "verified",
      verifiedAt: new Date().toISOString(),
      idmeUserId: `idme_user_${Math.random().toString(36).substr(2, 9)}`,
      firstName: "John",
      lastName: "Doe",
    };

    await kv.set(`verification:${verificationId}`, verifiedData);
    await kv.set(`user:${verification.email}`, {
      ...verifiedData,
      verificationId,
    });

    console.log(`Mock ID.ME verification completed for ${verification.email}`);

    return c.json({
      success: true,
      userData: verifiedData,
    });
  } catch (error) {
    console.error("Error in mock verification:", error);
    return c.json({ error: "Failed to complete mock verification" }, 500);
  }
});

// ==================== GLOBAL PROFESSIONAL RECORD (GPR) ENDPOINTS ====================

// Create new GPR (for professional profile creation)
app.post("/make-server-455660d1/gpr/create", async (c) => {
  try {
    const { email, personalInfo, portfolioItems, assessments, jobReadyScore } = await c.req.json();
    
    if (!email) {
      return c.json({ error: "Email is required" }, 400);
    }

    const newGPR = {
      userId: email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      personalInfo,
      portfolioItems,
      assessments,
      jobReadyScore,
      workHistory: [],
      skills: [],
      projects: [],
      achievements: [],
      artifacts: portfolioItems || [],
    };

    await kv.set(`gpr:${email}`, newGPR);
    
    console.log(`New GPR created for ${email} with Job Readiness Score: ${jobReadyScore}%`);

    return c.json({
      success: true,
      gpr: newGPR,
    });
  } catch (error) {
    console.error("Error creating GPR:", error);
    return c.json({ error: "Failed to create GPR" }, 500);
  }
});

// Create or update GPR
app.post("/make-server-455660d1/gpr/upsert", async (c) => {
  try {
    const { userId, gprData } = await c.req.json();
    
    if (!userId) {
      return c.json({ error: "User ID is required" }, 400);
    }

    const existingGPR = await kv.get(`gpr:${userId}`) || {
      userId,
      createdAt: new Date().toISOString(),
      workHistory: [],
      skills: [],
      projects: [],
      achievements: [],
      artifacts: [],
    };

    const updatedGPR = {
      ...existingGPR,
      ...gprData,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`gpr:${userId}`, updatedGPR);
    
    console.log(`GPR updated for user ${userId}`);

    return c.json({
      success: true,
      gpr: updatedGPR,
    });
  } catch (error) {
    console.error("Error upserting GPR:", error);
    return c.json({ error: "Failed to update GPR" }, 500);
  }
});

// Get GPR by user ID
app.get("/make-server-455660d1/gpr/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const gpr = await kv.get(`gpr:${userId}`);
    
    if (!gpr) {
      return c.json({ error: "GPR not found" }, 404);
    }

    return c.json({
      success: true,
      gpr,
    });
  } catch (error) {
    console.error("Error fetching GPR:", error);
    return c.json({ error: "Failed to fetch GPR" }, 500);
  }
});

// Add work artifact to GPR (for AI analysis)
app.post("/make-server-455660d1/gpr/:userId/artifact", async (c) => {
  try {
    const userId = c.req.param("userId");
    const artifact = await c.req.json();
    
    const gpr = await kv.get(`gpr:${userId}`) || {
      userId,
      createdAt: new Date().toISOString(),
      workHistory: [],
      skills: [],
      projects: [],
      achievements: [],
      artifacts: [],
    };

    const newArtifact = {
      id: `artifact_${Date.now()}`,
      ...artifact,
      uploadedAt: new Date().toISOString(),
      analyzed: false,
    };

    gpr.artifacts = [...(gpr.artifacts || []), newArtifact];
    gpr.updatedAt = new Date().toISOString();

    await kv.set(`gpr:${userId}`, gpr);
    
    console.log(`Artifact added to GPR for user ${userId}`);

    return c.json({
      success: true,
      artifact: newArtifact,
    });
  } catch (error) {
    console.error("Error adding artifact to GPR:", error);
    return c.json({ error: "Failed to add artifact" }, 500);
  }
});

// Calculate Job Readiness Score
app.post("/make-server-455660d1/gpr/job-readiness", async (c) => {
  try {
    const { userId, jobRequirements } = await c.req.json();
    
    if (!userId || !jobRequirements) {
      return c.json({ error: "User ID and job requirements are required" }, 400);
    }

    const gpr = await kv.get(`gpr:${userId}`);
    
    if (!gpr) {
      return c.json({ error: "GPR not found" }, 404);
    }

    // Simple job readiness calculation (in production, this would use AI)
    const userSkills = gpr.skills || [];
    const requiredSkills = jobRequirements.skills || [];
    
    const matchedSkills = requiredSkills.filter((req: string) => 
      userSkills.some((skill: any) => 
        skill.name?.toLowerCase().includes(req.toLowerCase())
      )
    );

    const readinessScore = requiredSkills.length > 0 
      ? (matchedSkills.length / requiredSkills.length) * 100 
      : 0;

    const skillGap = requiredSkills.filter((req: string) => 
      !userSkills.some((skill: any) => 
        skill.name?.toLowerCase().includes(req.toLowerCase())
      )
    );

    const result = {
      userId,
      jobTitle: jobRequirements.jobTitle,
      readinessScore: Math.round(readinessScore),
      matchedSkills,
      skillGap,
      transferableSkills: matchedSkills,
      calculatedAt: new Date().toISOString(),
    };

    await kv.set(`job_readiness:${userId}:${jobRequirements.jobTitle}`, result);
    
    console.log(`Job readiness calculated for user ${userId}: ${readinessScore}%`);

    return c.json({
      success: true,
      jobReadiness: result,
    });
  } catch (error) {
    console.error("Error calculating job readiness:", error);
    return c.json({ error: "Failed to calculate job readiness" }, 500);
  }
});

// ==================== USER MANAGEMENT ====================

// Get user by email
app.get("/make-server-455660d1/user/:email", async (c) => {
  try {
    const email = c.req.param("email");
    const user = await kv.get(`user:${email}`);
    
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return c.json({ error: "Failed to fetch user" }, 500);
  }
});

// ==================== AI-POWERED ENDPOINTS ====================

// Analyze work artifacts with AI
app.post("/make-server-455660d1/ai/analyze-artifacts", async (c) => {
  try {
    const { artifacts } = await c.req.json();
    
    if (!artifacts || !Array.isArray(artifacts)) {
      return c.json({ error: "Artifacts array is required" }, 400);
    }

    console.log(`Analyzing ${artifacts.length} artifacts with AI...`);
    const analysis = await ai.analyzeArtifacts(artifacts);
    
    console.log(`AI analysis complete - Quality Score: ${analysis.qualityScore}%`);

    return c.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("Error analyzing artifacts with AI:", error);
    return c.json({ error: `Failed to analyze artifacts: ${error.message}` }, 500);
  }
});

// Calculate Job Ready Score with AI
app.post("/make-server-455660d1/ai/calculate-job-ready-score", async (c) => {
  try {
    const { targetRole, gprData, assessmentResults } = await c.req.json();
    
    if (!targetRole || !gprData) {
      return c.json({ error: "Target role and GPR data are required" }, 400);
    }

    console.log(`Calculating AI-powered Job Ready Score for ${targetRole}...`);
    const result = await ai.calculateJobReadyScore(targetRole, gprData, assessmentResults);
    
    console.log(`Job Ready Score calculated: ${result.jobReadyScore}%`);

    return c.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Error calculating job ready score with AI:", error);
    return c.json({ error: `Failed to calculate score: ${error.message}` }, 500);
  }
});

// Generate personalized curriculum with AI
app.post("/make-server-455660d1/ai/generate-curriculum", async (c) => {
  try {
    const { targetRole, currentSkills, skillsGap, learningStyle, timeCommitment } = await c.req.json();
    
    if (!targetRole || !skillsGap) {
      return c.json({ error: "Target role and skills gap are required" }, 400);
    }

    console.log(`Generating AI-powered curriculum for ${targetRole}...`);
    const curriculum = await ai.generateCurriculum(
      targetRole,
      currentSkills || [],
      skillsGap,
      learningStyle || "hands-on",
      timeCommitment || "10 hours/week"
    );
    
    console.log(`Curriculum generated: ${curriculum.estimatedCompletion}, ${curriculum.totalHours} hours`);

    return c.json({
      success: true,
      curriculum,
    });
  } catch (error) {
    console.error("Error generating curriculum with AI:", error);
    return c.json({ error: `Failed to generate curriculum: ${error.message}` }, 500);
  }
});

// Analyze resume with AI
app.post("/make-server-455660d1/ai/analyze-resume", async (c) => {
  try {
    const { resumeText } = await c.req.json();
    
    if (!resumeText) {
      return c.json({ error: "Resume text is required" }, 400);
    }

    console.log("Analyzing resume with AI...");
    const analysis = await ai.analyzeResume(resumeText);
    
    console.log(`Resume analyzed for ${analysis.name}`);

    return c.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("Error analyzing resume with AI:", error);
    return c.json({ error: `Failed to analyze resume: ${error.message}` }, 500);
  }
});

// Match candidate to job with AI
app.post("/make-server-455660d1/ai/match-candidate", async (c) => {
  try {
    const { gprData, jobDescription, jobRequirements } = await c.req.json();
    
    if (!gprData || !jobDescription) {
      return c.json({ error: "GPR data and job description are required" }, 400);
    }

    console.log("Matching candidate to job with AI...");
    const match = await ai.matchCandidateToJob(gprData, jobDescription, jobRequirements || []);
    
    console.log(`Match score: ${match.matchScore}%`);

    return c.json({
      success: true,
      match,
    });
  } catch (error) {
    console.error("Error matching candidate with AI:", error);
    return c.json({ error: `Failed to match candidate: ${error.message}` }, 500);
  }
});

// Generate feedback on work with AI
app.post("/make-server-455660d1/ai/generate-feedback", async (c) => {
  try {
    const { artifact, targetRole } = await c.req.json();
    
    if (!artifact || !targetRole) {
      return c.json({ error: "Artifact and target role are required" }, 400);
    }

    console.log(`Generating AI feedback for ${targetRole}...`);
    const feedback = await ai.generateFeedback(artifact, targetRole);
    
    console.log(`Feedback generated - Score: ${feedback.overallScore}%`);

    return c.json({
      success: true,
      feedback,
    });
  } catch (error) {
    console.error("Error generating feedback with AI:", error);
    return c.json({ error: `Failed to generate feedback: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);
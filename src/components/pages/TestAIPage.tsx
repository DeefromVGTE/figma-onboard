import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { 
  Sparkles, Brain, BookOpen, FileText, Target, MessageSquare,
  CheckCircle2, AlertCircle, Loader2, Chrome, Linkedin
} from "lucide-react";
import { projectId, publicAnonKey } from "../../utils/supabase/info";
import { createClient } from "@supabase/supabase-js";

export function TestAIPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [results, setResults] = useState<any>({});
  const [error, setError] = useState<string | null>(null);

  // Create a single Supabase client instance (memoized to avoid recreating)
  const supabase = useMemo(() => createClient(
    `https://${projectId}.supabase.co`,
    publicAnonKey
  ), []);

  // Test API Key Configuration
  const testAPIKeyConfiguration = async () => {
    setLoading("api-key-test");
    setError(null);
    
    try {
      console.log("🔍 Testing API key configuration...");
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-455660d1/health`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();
      console.log("✅ Health check response:", data);
      
      if (response.ok) {
        setResults(prev => ({ 
          ...prev, 
          apiKeyTest: "✅ Server is reachable and healthy" 
        }));
      } else {
        setError(`❌ Server health check failed: ${JSON.stringify(data)}`);
      }
    } catch (err: any) {
      console.error("❌ Health check error:", err);
      setError(`❌ Cannot reach server: ${err.message}`);
    } finally {
      setLoading(null);
    }
  };

  // Test 1: Analyze Artifacts
  const testAnalyzeArtifacts = async () => {
    setLoading("analyze-artifacts");
    setError(null);
    
    try {
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
                name: "E-commerce Checkout System",
                description: "Built a full-stack checkout system with React, Node.js, and Stripe",
                content: "Implemented shopping cart, payment processing, order management, and email notifications"
              },
              {
                type: "project",
                name: "Machine Learning Model",
                description: "Developed a sentiment analysis model using Python and TensorFlow",
                content: "Trained on 10k+ samples, achieved 92% accuracy, deployed with FastAPI"
              }
            ]
          }),
        }
      );

      const data = await response.json();
      console.log("Analyze Artifacts Response:", data);
      
      if (data.error) {
        setError(`Error: ${data.error}`);
      } else {
        setResults(prev => ({ ...prev, analyzeArtifacts: data.analysis }));
      }
    } catch (err: any) {
      console.error("Error:", err);
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(null);
    }
  };

  // Test 2: Calculate Job Ready Score
  const testJobReadyScore = async () => {
    setLoading("job-ready-score");
    setError(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-455660d1/ai/calculate-job-ready-score`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            targetRole: "Full Stack Developer",
            gprData: {
              skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
              projects: [
                { title: "E-commerce Platform", technologies: ["React", "Node.js", "MongoDB"] },
                { title: "Social Media App", technologies: ["React Native", "Firebase"] }
              ],
              experience: [
                { title: "Junior Developer", duration: "2 years", company: "Tech Startup" }
              ]
            },
            assessmentResults: {
              technicalScore: 85,
              codingScore: 90,
              problemSolvingScore: 88,
              communicationScore: 92
            }
          }),
        }
      );

      const data = await response.json();
      console.log("Job Ready Score Response:", data);
      
      if (data.error) {
        setError(`Error: ${data.error}`);
      } else {
        setResults(prev => ({ ...prev, jobReadyScore: data.result }));
      }
    } catch (err: any) {
      console.error("Error:", err);
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(null);
    }
  };

  // Test 3: Generate Curriculum
  const testGenerateCurriculum = async () => {
    setLoading("generate-curriculum");
    setError(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-455660d1/ai/generate-curriculum`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            targetRole: "AI Engineer",
            currentSkills: ["Python", "JavaScript", "SQL"],
            skillsGap: ["TensorFlow", "PyTorch", "Machine Learning", "Deep Learning", "MLOps"],
            learningStyle: "hands-on",
            timeCommitment: "10 hours/week"
          }),
        }
      );

      const data = await response.json();
      console.log("Generate Curriculum Response:", data);
      
      if (data.error) {
        setError(`Error: ${data.error}`);
      } else {
        setResults(prev => ({ ...prev, curriculum: data.curriculum }));
      }
    } catch (err: any) {
      console.error("Error:", err);
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(null);
    }
  };

  // Test 4: Analyze Resume
  const testAnalyzeResume = async () => {
    setLoading("analyze-resume");
    setError(null);
    
    const sampleResume = `
John Doe
Email: john.doe@email.com
Phone: +1 (555) 123-4567

SUMMARY
Experienced Full Stack Developer with 5 years of expertise in React, Node.js, and cloud technologies.

SKILLS
JavaScript, TypeScript, React, Node.js, Python, PostgreSQL, MongoDB, AWS, Docker, Git

EXPERIENCE
Senior Full Stack Developer - Tech Corp (2021 - Present)
- Led development of microservices architecture serving 1M+ users
- Implemented CI/CD pipelines reducing deployment time by 60%
- Mentored team of 5 junior developers

Full Stack Developer - StartupXYZ (2019 - 2021)
- Built e-commerce platform from scratch using MERN stack
- Integrated payment systems (Stripe, PayPal)
- Optimized database queries improving performance by 40%

EDUCATION
Bachelor of Science in Computer Science
University of Technology, 2019

PROJECTS
- Real-time Chat Application: Built using Socket.io and React
- Machine Learning Model: Sentiment analysis using Python and TensorFlow
    `;
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-455660d1/ai/analyze-resume`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            resumeText: sampleResume
          }),
        }
      );

      const data = await response.json();
      console.log("Analyze Resume Response:", data);
      
      if (data.error) {
        setError(`Error: ${data.error}`);
      } else {
        setResults(prev => ({ ...prev, resume: data.analysis }));
      }
    } catch (err: any) {
      console.error("Error:", err);
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(null);
    }
  };

  // Test 5: Match Candidate to Job
  const testMatchCandidate = async () => {
    setLoading("match-candidate");
    setError(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-455660d1/ai/match-candidate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            gprData: {
              skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
              experience: [
                { title: "Full Stack Developer", years: 3, company: "Tech Startup" }
              ],
              projects: [
                { title: "E-commerce Platform", technologies: ["React", "Node.js"] }
              ]
            },
            jobDescription: "We're looking for a Senior Full Stack Developer to join our team. You'll work on building scalable web applications using modern technologies.",
            jobRequirements: [
              "5+ years of experience with React",
              "Strong Node.js and TypeScript skills",
              "Experience with cloud platforms (AWS/Azure)",
              "Database design and optimization",
              "Leadership and mentoring experience"
            ]
          }),
        }
      );

      const data = await response.json();
      console.log("Match Candidate Response:", data);
      
      if (data.error) {
        setError(`Error: ${data.error}`);
      } else {
        setResults(prev => ({ ...prev, match: data.match }));
      }
    } catch (err: any) {
      console.error("Error:", err);
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(null);
    }
  };

  // Test 6: Generate Feedback
  const testGenerateFeedback = async () => {
    setLoading("generate-feedback");
    setError(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-455660d1/ai/generate-feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            artifact: {
              type: "project",
              name: "Task Management App",
              description: "Built a full-stack task management application",
              technologies: ["React", "Node.js", "MongoDB"],
              features: [
                "User authentication",
                "Real-time updates",
                "Drag-and-drop interface",
                "Email notifications"
              ],
              codeQuality: "Clean code with good separation of concerns, some areas could use more comments"
            },
            targetRole: "Full Stack Developer"
          }),
        }
      );

      const data = await response.json();
      console.log("Generate Feedback Response:", data);
      
      if (data.error) {
        setError(`Error: ${data.error}`);
      } else {
        setResults(prev => ({ ...prev, feedback: data.feedback }));
      }
    } catch (err: any) {
      console.error("Error:", err);
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(null);
    }
  };

  // Test Google OAuth
  const testGoogleOAuth = async () => {
    setLoading("google-oauth");
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) {
        setError(`Google OAuth Error: ${error.message}. Make sure Google is enabled in Supabase Dashboard → Auth → Providers`);
        console.error("Google OAuth error:", error);
      } else {
        console.log("Google OAuth initiated:", data);
        setResults(prev => ({ ...prev, googleOAuth: "Redirecting to Google..." }));
      }
    } catch (err: any) {
      console.error("Error:", err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(null);
    }
  };

  // Test LinkedIn OAuth
  const testLinkedInOAuth = async () => {
    setLoading("linkedin-oauth");
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) {
        setError(`LinkedIn OAuth Error: ${error.message}. Make sure LinkedIn is enabled in Supabase Dashboard → Auth → Providers`);
        console.error("LinkedIn OAuth error:", error);
      } else {
        console.log("LinkedIn OAuth initiated:", data);
        setResults(prev => ({ ...prev, linkedinOAuth: "Redirecting to LinkedIn..." }));
      }
    } catch (err: any) {
      console.error("Error:", err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(null);
    }
  };

  // Check current auth session
  const checkAuthSession = async () => {
    setLoading("check-session");
    setError(null);
    
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        setError(`Error: ${error.message}`);
      } else if (session) {
        setResults(prev => ({ 
          ...prev, 
          session: {
            user: session.user,
            provider: session.user.app_metadata.provider
          }
        }));
      } else {
        setResults(prev => ({ ...prev, session: "No active session" }));
      }
    } catch (err: any) {
      console.error("Error:", err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            AI & OAuth Testing Dashboard
          </h1>
          <p className="text-muted-foreground">
            Test all AI-powered features and authentication flows
          </p>
        </div>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-900">Error</p>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* OAuth Testing */}
          <Card className="border-2 border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Chrome className="w-5 h-5 text-indigo-600" />
                OAuth Authentication Tests
              </CardTitle>
              <CardDescription>
                Test Google and LinkedIn authentication flows
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={testGoogleOAuth}
                disabled={loading === "google-oauth"}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
              >
                {loading === "google-oauth" ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Chrome className="w-4 h-4 mr-2" />
                )}
                Test Google OAuth
              </Button>

              <Button
                onClick={testLinkedInOAuth}
                disabled={loading === "linkedin-oauth"}
                className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white"
              >
                {loading === "linkedin-oauth" ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Linkedin className="w-4 h-4 mr-2" />
                )}
                Test LinkedIn OAuth
              </Button>

              <Button
                onClick={checkAuthSession}
                disabled={loading === "check-session"}
                variant="outline"
                className="w-full"
              >
                {loading === "check-session" ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                )}
                Check Current Session
              </Button>

              {results.session && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-semibold text-green-900 mb-2">Session Info:</p>
                  <pre className="text-xs text-green-800 overflow-auto">
                    {JSON.stringify(results.session, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Feature Status */}
          <Card className="border-2 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                AI Features Status
              </CardTitle>
              <CardDescription>
                Quick overview of AI capabilities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium">Artifact Analysis</span>
                  <Badge variant="secondary">Ready</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium">Job Ready Score</span>
                  <Badge variant="secondary">Ready</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium">Curriculum Generator</span>
                  <Badge variant="secondary">Ready</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium">Resume Analysis</span>
                  <Badge variant="secondary">Ready</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium">Candidate Matching</span>
                  <Badge variant="secondary">Ready</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium">Feedback Generation</span>
                  <Badge variant="secondary">Ready</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Tests Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Test API Key Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                0. Test API Key Configuration
              </CardTitle>
              <CardDescription>
                Verify that the API key is correctly configured
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={testAPIKeyConfiguration}
                disabled={loading === "api-key-test"}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading === "api-key-test" ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Brain className="w-4 h-4 mr-2" />
                )}
                Run Test
              </Button>

              {results.apiKeyTest && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-semibold text-blue-900 mb-2">Results:</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <Label className="text-blue-700">API Key Test:</Label>
                      <p className="font-bold text-blue-900">{results.apiKeyTest}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test 1: Analyze Artifacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                1. Analyze Work Artifacts
              </CardTitle>
              <CardDescription>
                Extract skills, tools, and quality scores from work samples
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={testAnalyzeArtifacts}
                disabled={loading === "analyze-artifacts"}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading === "analyze-artifacts" ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Brain className="w-4 h-4 mr-2" />
                )}
                Run Test
              </Button>

              {results.analyzeArtifacts && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-semibold text-blue-900 mb-2">Results:</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <Label className="text-blue-700">Quality Score:</Label>
                      <p className="font-bold text-blue-900">{results.analyzeArtifacts.qualityScore}%</p>
                    </div>
                    <div>
                      <Label className="text-blue-700">Skills:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {results.analyzeArtifacts.skills?.map((skill: string, idx: number) => (
                          <Badge key={idx} variant="outline">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-blue-700">Tools Used:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {results.analyzeArtifacts.toolsUsed?.map((tool: string, idx: number) => (
                          <Badge key={idx} variant="secondary">{tool}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test 2: Job Ready Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                2. Calculate Job Ready Score
              </CardTitle>
              <CardDescription>
                AI-powered comprehensive job readiness assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={testJobReadyScore}
                disabled={loading === "job-ready-score"}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {loading === "job-ready-score" ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Target className="w-4 h-4 mr-2" />
                )}
                Run Test
              </Button>

              {results.jobReadyScore && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="font-semibold text-green-900 mb-2">Results:</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <Label className="text-green-700">Job Ready Score:</Label>
                      <p className="font-bold text-green-900 text-2xl">{results.jobReadyScore.jobReadyScore}%</p>
                    </div>
                    <div>
                      <Label className="text-green-700">Skills Gap ({results.jobReadyScore.skillsGapPercentage}%):</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {results.jobReadyScore.skillsGap?.slice(0, 5).map((skill: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="bg-orange-50">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test 3: Generate Curriculum */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                3. Generate Personalized Curriculum
              </CardTitle>
              <CardDescription>
                Create week-by-week learning paths based on skills gap
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={testGenerateCurriculum}
                disabled={loading === "generate-curriculum"}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {loading === "generate-curriculum" ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <BookOpen className="w-4 h-4 mr-2" />
                )}
                Run Test
              </Button>

              {results.curriculum && (
                <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg max-h-64 overflow-y-auto">
                  <p className="font-semibold text-purple-900 mb-2">Results:</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <Label className="text-purple-700">Estimated Completion:</Label>
                      <p className="font-bold text-purple-900">{results.curriculum.estimatedCompletion}</p>
                    </div>
                    <div>
                      <Label className="text-purple-700">Total Hours:</Label>
                      <p className="font-bold text-purple-900">{results.curriculum.totalHours} hours</p>
                    </div>
                    <div>
                      <Label className="text-purple-700">Weeks:</Label>
                      <p className="text-purple-800">{results.curriculum.curriculum?.length} weeks of learning</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test 4: Analyze Resume */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-600" />
                4. Analyze Resume
              </CardTitle>
              <CardDescription>
                Extract structured data from resume text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={testAnalyzeResume}
                disabled={loading === "analyze-resume"}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                {loading === "analyze-resume" ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <FileText className="w-4 h-4 mr-2" />
                )}
                Run Test
              </Button>

              {results.resume && (
                <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="font-semibold text-orange-900 mb-2">Results:</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <Label className="text-orange-700">Name:</Label>
                      <p className="font-bold text-orange-900">{results.resume.name}</p>
                    </div>
                    <div>
                      <Label className="text-orange-700">Email:</Label>
                      <p className="text-orange-800">{results.resume.email}</p>
                    </div>
                    <div>
                      <Label className="text-orange-700">Skills Found:</Label>
                      <p className="text-orange-800">{results.resume.skills?.length || 0} skills</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test 5: Match Candidate */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-600" />
                5. Match Candidate to Job
              </CardTitle>
              <CardDescription>
                AI-powered candidate-job fit analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={testMatchCandidate}
                disabled={loading === "match-candidate"}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                {loading === "match-candidate" ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Target className="w-4 h-4 mr-2" />
                )}
                Run Test
              </Button>

              {results.match && (
                <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                  <p className="font-semibold text-indigo-900 mb-2">Results:</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <Label className="text-indigo-700">Match Score:</Label>
                      <p className="font-bold text-indigo-900 text-2xl">{results.match.matchScore}%</p>
                    </div>
                    <div>
                      <Label className="text-indigo-700">Recommendation:</Label>
                      <p className="text-indigo-800">{results.match.recommendation}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test 6: Generate Feedback */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-teal-600" />
                6. Generate Feedback
              </CardTitle>
              <CardDescription>
                Provide constructive feedback on work artifacts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={testGenerateFeedback}
                disabled={loading === "generate-feedback"}
                className="w-full bg-teal-600 hover:bg-teal-700"
              >
                {loading === "generate-feedback" ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <MessageSquare className="w-4 h-4 mr-2" />
                )}
                Run Test
              </Button>

              {results.feedback && (
                <div className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-lg">
                  <p className="font-semibold text-teal-900 mb-2">Results:</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <Label className="text-teal-700">Overall Score:</Label>
                      <p className="font-bold text-teal-900 text-2xl">{results.feedback.overallScore}%</p>
                    </div>
                    <div>
                      <Label className="text-teal-700">Strengths:</Label>
                      <p className="text-teal-800">{results.feedback.strengths?.length || 0} identified</p>
                    </div>
                    <div>
                      <Label className="text-teal-700">Improvements:</Label>
                      <p className="text-teal-800">{results.feedback.improvements?.length || 0} suggested</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
          <CardHeader>
            <CardTitle>Setup Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="text-sm">Backend AI endpoints created</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span className="text-sm">Add your OpenAI API key in secrets</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span className="text-sm">Enable Google OAuth in Supabase Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span className="text-sm">Enable LinkedIn OAuth in Supabase Dashboard</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
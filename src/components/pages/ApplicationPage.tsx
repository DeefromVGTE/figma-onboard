import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { 
  FileText, Upload, Brain, Target, BookOpen, Clock, CheckCircle, 
  AlertCircle, Star, Award, User, Mail, Phone, MapPin, Calendar,
  GraduationCap, Briefcase, Code, Zap, Users, TrendingUp
} from "lucide-react";
import { useRouter } from "../Router";

interface ApplicationData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    linkedIn: string;
    github: string;
  };
  targetRole: string;
  experience: string;
  availability: string;
  resume: File | null;
  skillsTest: {
    completed: boolean;
    score: number;
  };
  cognitiveTest: {
    completed: boolean;
    score: number;
  };
  profileAnalyzed: boolean;
  readinessScore: number;
  trainingRecommended: boolean;
}

export function ApplicationPage() {
  const { navigateTo } = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [applicationData, setApplicationData] = useState<ApplicationData>({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      linkedIn: "",
      github: ""
    },
    targetRole: "",
    experience: "",
    availability: "",
    resume: null,
    skillsTest: { completed: false, score: 0 },
    cognitiveTest: { completed: false, score: 0 },
    profileAnalyzed: false,
    readinessScore: 0,
    trainingRecommended: false
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const applicationSteps = [
    { id: 1, title: "Personal Information", icon: User },
    { id: 2, title: "Resume Upload", icon: FileText },
    { id: 3, title: "Skills Assessment", icon: Code },
    { id: 4, title: "Cognitive Test", icon: Brain },
    { id: 5, title: "Profile Analysis", icon: Target }
  ];

  const handlePersonalInfoChange = (field: string, value: string) => {
    setApplicationData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const handleResumeUpload = (file: File) => {
    setApplicationData(prev => ({ ...prev, resume: file }));
    // Mock resume analysis
    setTimeout(() => {
      alert("Resume uploaded and analyzed successfully! Skills automatically extracted.");
    }, 1000);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const simulateSkillsTest = () => {
    setApplicationData(prev => ({
      ...prev,
      skillsTest: { completed: true, score: Math.floor(Math.random() * 30) + 70 }
    }));
  };

  const simulateCognitiveTest = () => {
    setApplicationData(prev => ({
      ...prev,
      cognitiveTest: { completed: true, score: Math.floor(Math.random() * 25) + 75 }
    }));
  };

  const analyzeProfile = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const readinessScore = Math.floor(Math.random() * 40) + 60;
      const trainingRecommended = readinessScore < 85;
      
      setApplicationData(prev => ({
        ...prev,
        profileAnalyzed: true,
        readinessScore,
        trainingRecommended
      }));
      setIsAnalyzing(false);
    }, 3000);
  };

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "upcoming";
  };

  const allAssessmentsCompleted = () => {
    return applicationData.skillsTest.completed && 
           applicationData.cognitiveTest.completed && 
           applicationData.resume;
  };

  if (applicationData.profileAnalyzed) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Profile Analysis Complete!</h1>
            <p className="text-muted-foreground">
              Your application has been analyzed and your profile has been created.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Job Readiness Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {applicationData.readinessScore}%
                  </div>
                  <Progress value={applicationData.readinessScore} className="mb-4" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Skills Match</span>
                    <span className="font-medium">{applicationData.skillsTest.score}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cognitive Ability</span>
                    <span className="font-medium">{applicationData.cognitiveTest.score}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                {applicationData.trainingRecommended ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-orange-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-orange-600">Training Recommended</h4>
                        <p className="text-sm text-muted-foreground">
                          You've been placed in our tailored training queue to enhance your skills for {applicationData.targetRole} roles.
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="text-sm text-muted-foreground">
                      <p><strong>Expected Timeline:</strong> 4-8 weeks</p>
                      <p><strong>Training Focus:</strong> {applicationData.targetRole}-specific skills</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-medium text-green-600">Ready for Placement</h4>
                        <p className="text-sm text-muted-foreground">
                          Congratulations! You're job-ready and can be directly placed in available {applicationData.targetRole} roles.
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="text-sm text-muted-foreground">
                      <p><strong>Status:</strong> Active in talent pool</p>
                      <p><strong>Role Match:</strong> {applicationData.targetRole}</p>
                      <p><strong>Expected Placement:</strong> 1-2 weeks</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Application Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-muted-foreground">Full Name</Label>
                    <p className="font-medium">{applicationData.personalInfo.firstName} {applicationData.personalInfo.lastName}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Target Role</Label>
                    <p className="font-medium">{applicationData.targetRole}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Experience Level</Label>
                    <p className="font-medium">{applicationData.experience}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm text-muted-foreground">Location</Label>
                    <p className="font-medium">{applicationData.personalInfo.location}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Availability</Label>
                    <p className="font-medium">{applicationData.availability}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Application Status</Label>
                    <Badge className="bg-green-100 text-green-800">
                      {applicationData.trainingRecommended ? "In Training Queue" : "Ready for Placement"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              You'll receive updates on your application status and training progress via email.
            </p>
            <Button size="lg" className="px-8" onClick={() => navigateTo("profile")}>
              View My Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Job Application</h1>
          <p className="text-muted-foreground">
            Complete your application to join VIGILANTE's talent pipeline for AI and logistics roles
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            {applicationSteps.map((step, index) => {
              const Icon = step.icon;
              const status = getStepStatus(step.id);
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    status === "completed" ? "bg-green-600 text-white" :
                    status === "current" ? "bg-blue-600 text-white" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {status === "completed" ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className="text-xs text-center max-w-20">{step.title}</span>
                  {index < applicationSteps.length - 1 && (
                    <div className={`w-16 h-0.5 mt-2 ${
                      status === "completed" ? "bg-green-600" : "bg-muted"
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
          <Progress value={(currentStep / applicationSteps.length) * 100} className="mb-4" />
        </div>

        {/* Application Steps */}
        <Tabs value={currentStep.toString()}>
          {/* Step 1: Personal Information */}
          <TabsContent value="1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Tell us about yourself so we can create your profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={applicationData.personalInfo.firstName}
                      onChange={(e) => handlePersonalInfoChange("firstName", e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={applicationData.personalInfo.lastName}
                      onChange={(e) => handlePersonalInfoChange("lastName", e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={applicationData.personalInfo.email}
                      onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={applicationData.personalInfo.phone}
                      onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={applicationData.personalInfo.location}
                    onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
                    placeholder="City, State/Country"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="targetRole">Target Role</Label>
                    <Select value={applicationData.targetRole} onValueChange={(value) => setApplicationData(prev => ({ ...prev, targetRole: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select target role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Multi-Agent AI Engineer">Multi-Agent AI Engineer</SelectItem>
                        <SelectItem value="Logistics Systems Specialist">Logistics Systems Specialist</SelectItem>
                        <SelectItem value="Fashion Tech Integration Developer">Fashion Tech Integration Developer</SelectItem>
                        <SelectItem value="Supply Chain AI Specialist">Supply Chain AI Specialist</SelectItem>
                        <SelectItem value="Backend Systems Engineer">Backend Systems Engineer</SelectItem>
                        <SelectItem value="UI/UX Designer (Fashion Focus)">UI/UX Designer (Fashion Focus)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select value={applicationData.experience} onValueChange={(value) => setApplicationData(prev => ({ ...prev, experience: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Entry Level (0-2 years)">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="Mid Level (3-5 years)">Mid Level (3-5 years)</SelectItem>
                        <SelectItem value="Senior Level (6+ years)">Senior Level (6+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="availability">Availability</Label>
                  <Select value={applicationData.availability} onValueChange={(value) => setApplicationData(prev => ({ ...prev, availability: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="When can you start?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Immediate">Immediate</SelectItem>
                      <SelectItem value="1 week">1 week</SelectItem>
                      <SelectItem value="2 weeks">2 weeks</SelectItem>
                      <SelectItem value="1 month">1 month</SelectItem>
                      <SelectItem value="2+ months">2+ months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setCurrentStep(2)} disabled={!applicationData.personalInfo.firstName || !applicationData.personalInfo.lastName || !applicationData.personalInfo.email || !applicationData.targetRole}>
                    Continue to Resume Upload
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 2: Resume Upload */}
          <TabsContent value="2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Resume Upload
                </CardTitle>
                <CardDescription>
                  Upload your resume for AI-powered skill analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Upload your resume</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    PDF, DOC, or DOCX files up to 10MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleResumeUpload(file);
                    }}
                    className="hidden"
                  />
                  <Button 
                    variant="outline" 
                    onClick={triggerFileUpload}
                    className="cursor-pointer"
                  >
                    Choose File
                  </Button>
                  {applicationData.resume && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">Resume uploaded successfully!</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep(3)} disabled={!applicationData.resume}>
                    Continue to Skills Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 3: Skills Assessment */}
          <TabsContent value="3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Skills Assessment
                </CardTitle>
                <CardDescription>
                  Take a skills test to validate your technical abilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!applicationData.skillsTest.completed ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Code className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Technical Skills Test</h3>
                      <p className="text-sm text-muted-foreground">
                        This test will evaluate your technical skills for the {applicationData.targetRole} role.
                        It includes coding challenges, problem-solving, and role-specific questions.
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>Duration: 45 minutes</span>
                      </div>
                    </div>
                    <Button onClick={simulateSkillsTest} size="lg">
                      Start Skills Test
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-600 mb-2">Skills Test Completed!</h3>
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        {applicationData.skillsTest.score}%
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Great job! Your technical skills have been assessed and recorded.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep(4)} disabled={!applicationData.skillsTest.completed}>
                    Continue to Cognitive Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 4: Cognitive Test */}
          <TabsContent value="4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Cognitive Assessment
                </CardTitle>
                <CardDescription>
                  Assess your problem-solving and cognitive abilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!applicationData.cognitiveTest.completed ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <Brain className="w-8 h-8 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Cognitive Behavior Test</h3>
                      <p className="text-sm text-muted-foreground">
                        This assessment evaluates your logical reasoning, pattern recognition, 
                        and problem-solving approach - key indicators of success in AI and tech roles.
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>Duration: 30 minutes</span>
                      </div>
                    </div>
                    <Button onClick={simulateCognitiveTest} size="lg">
                      Start Cognitive Test
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-600 mb-2">Cognitive Test Completed!</h3>
                      <div className="text-2xl font-bold text-green-600 mb-2">
                        {applicationData.cognitiveTest.score}%
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Excellent cognitive performance! Your problem-solving abilities are well-suited for technical roles.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(3)}>
                    Back
                  </Button>
                  <Button onClick={() => setCurrentStep(5)} disabled={!applicationData.cognitiveTest.completed}>
                    Continue to Profile Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Step 5: Profile Analysis */}
          <TabsContent value="5">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Profile Analysis
                </CardTitle>
                <CardDescription>
                  AI analysis of your complete profile to determine job readiness
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    {isAnalyzing ? (
                      <div className="w-8 h-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                    ) : (
                      <Target className="w-8 h-8 text-blue-600" />
                    )}
                  </div>
                  
                  {!isAnalyzing ? (
                    <div>
                      <h3 className="font-medium mb-2">Ready for AI Profile Analysis</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Our AI will analyze your resume, assessment scores, and learning style to create 
                        a comprehensive profile and determine your job readiness level.
                      </p>
                      
                      <div className="bg-muted/50 rounded-lg p-4 text-left mb-6">
                        <h4 className="font-medium mb-2">Analysis includes:</h4>
                        <div className="grid md:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>Resume skills extraction</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>Skills test results ({applicationData.skillsTest.score}%)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>Cognitive assessment ({applicationData.cognitiveTest.score}%)</span>
                          </div>
                        </div>
                      </div>

                      <Button 
                        onClick={analyzeProfile} 
                        size="lg" 
                        disabled={!allAssessmentsCompleted()}
                        className="px-8"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Analyze My Profile
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-medium mb-2">Analyzing Your Profile...</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Our AI is processing your information to create your personalized profile and determine next steps.
                      </p>
                      <div className="space-y-2">
                        <div className="text-sm text-blue-600">✓ Analyzing resume and skills</div>
                        <div className="text-sm text-blue-600">✓ Processing assessment results</div>
                        <div className="text-sm text-blue-600">✓ Calculating job readiness score</div>
                        <div className="text-sm text-blue-600">⏳ Creating training recommendations...</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(4)} disabled={isAnalyzing}>
                    Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
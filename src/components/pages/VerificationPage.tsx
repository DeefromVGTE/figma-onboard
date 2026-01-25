import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Alert, AlertDescription } from "../ui/alert";
import { 
  Shield, CheckCircle, AlertTriangle, Camera, Phone, Mail, 
  Upload, Video, Lock, AlertCircle, 
  CreditCard, Linkedin, Github, Globe, Brain,
  Play, Square, RefreshCw, Eye, ChevronRight, Trophy, LogOut,
  ChevronLeft
} from "lucide-react";
import { Logo } from "../Logo";
import { useRouter } from "../Router";

export function VerificationPage() {
  const { navigateTo, setUserRole } = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationData, setVerificationData] = useState({
    email: { verified: false, score: 0 },
    phone: { verified: false, score: 0 },
    identity: { verified: false, score: 0 },
    video: { verified: false, score: 0 },
    social: { verified: false, score: 0 },
    behavioral: { verified: false, score: 0 }
  });
  const [videoRecording, setVideoRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [emailCodeSent, setEmailCodeSent] = useState(false);
  const [phoneCodeSent, setPhoneCodeSent] = useState(false);

  const verificationSteps = [
    {
      id: 1,
      title: "Email Verification",
      icon: Mail,
      description: "Verify your email address with a secure code",
      weight: 10,
      required: true
    },
    {
      id: 2,
      title: "Phone Verification",
      icon: Phone,
      description: "Confirm your phone number via SMS",
      weight: 10,
      required: true
    },
    {
      id: 3,
      title: "Identity Verification",
      icon: CreditCard,
      description: "Upload government-issued ID for verification",
      weight: 25,
      required: true
    },
    {
      id: 4,
      title: "Video Introduction",
      icon: Video,
      description: "Record a short video introducing yourself",
      weight: 20,
      required: true
    },
    {
      id: 5,
      title: "Professional Links",
      icon: Linkedin,
      description: "Connect your LinkedIn, GitHub, or portfolio",
      weight: 15,
      required: false
    },
    {
      id: 6,
      title: "Behavioral Assessment",
      icon: Brain,
      description: "AI-powered legitimacy check",
      weight: 20,
      required: true
    }
  ];

  const videoQuestions = [
    "Please introduce yourself and tell us your name",
    "What motivated you to join this program?",
    "Describe your current experience level in AI/tech",
    "What are your career goals for the next 6 months?"
  ];

  const behavioralQuestions = [
    {
      question: "A cohort member asks for help understanding a difficult concept. What do you do?",
      options: [
        "Ignore it - they should figure it out themselves",
        "Try to explain it in my own words and share resources",
        "Tell them to ask the instructor instead",
        "Copy-paste documentation without explanation"
      ],
      correctPattern: 1
    },
    {
      question: "You discover someone in your cohort is struggling but hasn't asked for help. How do you approach this?",
      options: [
        "Mind my own business - not my problem",
        "Reach out privately to offer support",
        "Publicly call them out for being behind",
        "Report them to the admin"
      ],
      correctPattern: 1
    },
    {
      question: "You're working on a group project and a team member isn't contributing. What's your response?",
      options: [
        "Do their work for them to get it done faster",
        "Have a respectful conversation to understand their situation",
        "Complain to other team members about them",
        "Exclude them from the project"
      ],
      correctPattern: 1
    }
  ];

  const calculateOverallScore = () => {
    let totalScore = 0;
    let maxScore = 0;
    
    verificationSteps.forEach(step => {
      maxScore += step.weight;
      const stepKey = step.title.toLowerCase().split(' ')[0];
      if (verificationData[stepKey]?.verified) {
        totalScore += step.weight;
      }
    });
    
    return Math.round((totalScore / maxScore) * 100);
  };

  const getTrustLevel = (score: number) => {
    if (score >= 90) return { label: "Highly Trusted", color: "bg-green-500", icon: Shield };
    if (score >= 70) return { label: "Trusted", color: "bg-blue-500", icon: CheckCircle };
    if (score >= 50) return { label: "Moderate", color: "bg-yellow-500", icon: AlertTriangle };
    return { label: "Needs Review", color: "bg-red-500", icon: AlertCircle };
  };

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "upcoming";
  };

  const handleStepComplete = (stepKey: string, score = 100) => {
    setVerificationData(prev => ({
      ...prev,
      [stepKey]: { verified: true, score }
    }));
    
    if (currentStep < verificationSteps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const overallScore = calculateOverallScore();
  const trustLevel = getTrustLevel(overallScore);
  const TrustIcon = trustLevel.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Logo size="md" showText={false} />
              <div>
                <div className="font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Onboard.AI</div>
                <div className="text-xs text-gray-500">Account Verification</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={`${trustLevel.color} text-white border-0`}>
                <TrustIcon className="w-3 h-3 mr-1" />
                {trustLevel.label}
              </Badge>
              <span className="text-sm text-gray-600 hidden sm:inline">{overallScore}% Complete</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setUserRole(null);
                  navigateTo("product");
                }}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Progress Overview */}
        <Card className="border-0 shadow-xl mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>
          <CardContent className="p-8 relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Identity Verification</h1>
                <p className="text-blue-100">Complete all steps to access the platform</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{overallScore}%</div>
                <div className="text-blue-100 text-sm">Trust Score</div>
              </div>
            </div>
            <Progress value={overallScore} className="h-3 bg-white/20" />
            <div className="flex justify-between text-sm mt-2 text-blue-100">
              <span>Step {currentStep} of {verificationSteps.length}</span>
              <span>{verificationSteps.filter((_, i) => verificationData[verificationSteps[i].title.toLowerCase().split(' ')[0]]?.verified).length} completed</span>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="border-0 shadow-lg mb-8 border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Why Verification Matters</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Our rigorous verification process ensures a safe, authentic learning community. Your information is encrypted and protected. We verify all candidates to maintain platform integrity and prevent fraud.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>100% Secure</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Encrypted Data</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>GDPR Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Steps Sidebar */}
          <div className="lg:col-span-4">
            <Card className="border-0 shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle>Verification Steps</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {verificationSteps.map((step) => {
                  const Icon = step.icon;
                  const status = getStepStatus(step.id);
                  const stepKey = step.title.toLowerCase().split(' ')[0];
                  const isVerified = verificationData[stepKey]?.verified;

                  return (
                    <div
                      key={step.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                        status === 'completed' ? 'bg-green-50 border-green-500' :
                        status === 'current' ? 'bg-blue-50 border-blue-500' :
                        'border-gray-200 opacity-60'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isVerified ? 'bg-green-600' :
                        status === 'current' ? 'bg-blue-600' :
                        'bg-gray-300'
                      }`}>
                        {isVerified ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <Icon className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{step.title}</span>
                          {step.required && (
                            <Badge variant="destructive" className="text-xs">Required</Badge>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">{step.weight}% weight</div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Step 1: Email Verification */}
            {currentStep === 1 && (
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>Email Verification</CardTitle>
                      <CardDescription>Confirm your email address to continue</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Address</label>
                    <Input 
                      type="email" 
                      placeholder="your.email@example.com"
                      className="mb-4"
                    />
                    <Button className="w-full" disabled={emailCodeSent}>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Verification Code
                    </Button>
                  </div>

                  <div className="bg-gray-50 border rounded-lg p-4">
                    <label className="text-sm font-medium mb-2 block">Enter 6-Digit Code</label>
                    <div className="flex gap-2 mb-4">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <Input 
                          key={i}
                          type="text" 
                          maxLength={1}
                          className="w-12 h-12 text-center font-bold"
                        />
                      ))}
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                      onClick={() => handleStepComplete('email', 100)}
                    >
                      Verify Email
                    </Button>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p>Check your spam folder if you don't see the code. Valid for 10 minutes.</p>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4 border-t">
                    <Button 
                      variant="outline" 
                      disabled={true}
                      className="opacity-50 cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(2)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                      Next Step
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Phone Verification */}
            {currentStep === 2 && (
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <CardTitle>Phone Verification</CardTitle>
                      <CardDescription>Verify your phone number via SMS</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone Number</label>
                    <div className="flex gap-2">
                      <select className="p-2 border rounded-lg w-24">
                        <option>+1</option>
                        <option>+44</option>
                        <option>+91</option>
                      </select>
                      <Input 
                        type="tel" 
                        placeholder="(555) 123-4567"
                        className="flex-1"
                      />
                    </div>
                    <Button className="w-full mt-4" disabled={phoneCodeSent}>
                      <Phone className="w-4 h-4 mr-2" />
                      Send SMS Code
                    </Button>
                  </div>

                  <div className="bg-gray-50 border rounded-lg p-4">
                    <label className="text-sm font-medium mb-2 block">Enter SMS Code</label>
                    <Input 
                      type="text" 
                      placeholder="Enter 6-digit code"
                      className="mb-4"
                    />
                    <Button 
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                      onClick={() => handleStepComplete('phone', 100)}
                    >
                      Verify Phone Number
                    </Button>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4 border-t">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(1)}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(3)}
                      className="bg-gradient-to-r from-green-600 to-emerald-600"
                    >
                      Next Step
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Identity Verification */}
            {currentStep === 3 && (
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle>Identity Verification</CardTitle>
                      <CardDescription>Upload government-issued ID (Driver's License, Passport, National ID)</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center bg-gray-50">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="font-medium mb-2">Upload ID Document</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Clear photo or scan of valid government-issued ID
                    </p>
                    <Button variant="outline">
                      <Camera className="w-4 h-4 mr-2" />
                      Choose File or Take Photo
                    </Button>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-medium mb-1">Important Guidelines:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Document must be valid and not expired</li>
                          <li>All text must be clearly readable</li>
                          <li>No glare or shadows covering information</li>
                          <li>Full document visible in frame</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium block">Document Type</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Driver's License</option>
                      <option>Passport</option>
                      <option>National ID Card</option>
                      <option>State ID</option>
                    </select>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                    onClick={() => handleStepComplete('identity', 100)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit for Verification
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    Your ID will be verified within 24 hours. We use bank-level encryption to protect your data.
                  </p>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4 border-t">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(2)}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(4)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600"
                    >
                      Next Step
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Video Introduction */}
            {currentStep === 4 && (
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Video className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <CardTitle>Video Introduction</CardTitle>
                      <CardDescription>Record a short video to verify your identity</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-lg p-6">
                    <h4 className="font-medium mb-3">Answer these questions in your video:</h4>
                    <ul className="space-y-2">
                      {videoQuestions.map((q, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="font-bold text-red-600">{i + 1}.</span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {!videoRecording ? (
                      <div className="text-center text-white">
                        <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="mb-2">Camera Preview</p>
                        <p className="text-sm text-gray-400">Click start to begin recording</p>
                      </div>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-2 animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <span className="text-sm font-medium">REC {recordingTime}s</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {!videoRecording ? (
                      <Button 
                        className="flex-1 bg-red-600 hover:bg-red-700"
                        onClick={() => {
                          setVideoRecording(true);
                          setRecordingTime(0);
                        }}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Recording
                      </Button>
                    ) : (
                      <>
                        <Button 
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            setVideoRecording(false);
                            setRecordingTime(0);
                          }}
                        >
                          <Square className="w-4 h-4 mr-2" />
                          Stop Recording
                        </Button>
                        <Button variant="outline">
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Eye className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Tips for a great video:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Speak clearly and at a natural pace</li>
                          <li>Ensure good lighting on your face</li>
                          <li>Look at the camera when speaking</li>
                          <li>Be authentic - we want to know the real you!</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-red-600 to-pink-600"
                    onClick={() => handleStepComplete('video', 100)}
                    disabled={videoRecording}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Video
                  </Button>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4 border-t">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(3)}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(5)}
                      className="bg-gradient-to-r from-red-600 to-pink-600"
                    >
                      Next Step
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 5: Professional Links */}
            {currentStep === 5 && (
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Linkedin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>Professional Links</CardTitle>
                      <CardDescription>Connect your professional profiles (Optional but recommended)</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                        LinkedIn Profile
                      </label>
                      <Input placeholder="https://linkedin.com/in/yourprofile" />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        GitHub Profile
                      </label>
                      <Input placeholder="https://github.com/yourusername" />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-purple-600" />
                        Portfolio/Website
                      </label>
                      <Input placeholder="https://yourportfolio.com" />
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-green-800">
                        <p className="font-medium mb-1">Why connect profiles?</p>
                        <p>Professional profiles help us verify your identity and showcase your experience. This increases your trust score and helps recruiters find you.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleStepComplete('social', 50)}
                    >
                      Skip for Now
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                      onClick={() => handleStepComplete('social', 100)}
                    >
                      Connect Profiles
                    </Button>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4 border-t">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(4)}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(6)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                      Next Step
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 6: Behavioral Assessment */}
            {currentStep === 6 && (
              <Card className="border-0 shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Brain className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <CardTitle>Behavioral Assessment</CardTitle>
                      <CardDescription>Quick scenarios to ensure community fit</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm text-orange-800">
                      <strong>No right or wrong answers</strong> - we want to understand your approach to collaboration and learning. Be honest!
                    </p>
                  </div>

                  {behavioralQuestions.map((q, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-white">
                      <h4 className="font-medium mb-3">Scenario {index + 1}</h4>
                      <p className="text-sm text-gray-700 mb-4">{q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((option, optIndex) => (
                          <button
                            key={optIndex}
                            className="w-full text-left p-3 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5"></div>
                              <span className="text-sm">{option}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <Button 
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600"
                    onClick={() => handleStepComplete('behavioral', 100)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Assessment
                  </Button>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4 border-t">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentStep(5)}
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep(7)}
                      className="bg-gradient-to-r from-orange-600 to-red-600"
                    >
                      Next Step
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Verification Complete */}
            {currentStep > verificationSteps.length && (
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Verification Complete!</h2>
                    <p className="text-gray-600 mb-6">
                      Your account has been verified. Welcome to the Onboard.AI community!
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mb-8">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-600">{overallScore}%</div>
                        <div className="text-sm text-gray-600">Trust Score</div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-600">{verificationSteps.length}</div>
                        <div className="text-sm text-gray-600">Steps Completed</div>
                      </div>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-purple-600">{trustLevel.label}</div>
                        <div className="text-sm text-gray-600">Status</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold mb-3">What Happens Next?</h3>
                      <div className="space-y-2 text-left text-sm text-gray-700">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Your profile will be reviewed by our team (usually within 24 hours)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>You'll receive an email confirmation once approved</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>Begin your learning journey with full platform access</span>
                        </div>
                      </div>
                    </div>

                    <Button 
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 px-8"
                      onClick={() => navigateTo("application")}
                    >
                      Continue to Application
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Trust Score Breakdown */}
        {currentStep <= verificationSteps.length && (
          <Card className="border-0 shadow-lg mt-8">
            <CardHeader>
              <CardTitle>Your Trust Score Breakdown</CardTitle>
              <CardDescription>How we calculate your verification score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {verificationSteps.map((step) => {
                  const Icon = step.icon;
                  const stepKey = step.title.toLowerCase().split(' ')[0];
                  const isVerified = verificationData[stepKey]?.verified;

                  return (
                    <div key={step.id} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isVerified ? 'bg-green-600' : 'bg-gray-300'
                      }`}>
                        {isVerified ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <Icon className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">{step.title}</span>
                          <span className="text-sm text-gray-600">
                            {isVerified ? step.weight : 0}/{step.weight} points
                          </span>
                        </div>
                        <Progress value={isVerified ? 100 : 0} className="h-2" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Total Trust Score</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{overallScore}%</div>
                    <Badge className={`${trustLevel.color} text-white border-0 mt-1`}>
                      {trustLevel.label}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Trophy, CheckCircle, Target, Calendar, FileText, Video,
  Users, Briefcase, Award, Clock, ChevronRight, Play, Star,
  MessageSquare, Download, Upload, Eye, Pen, Shield, Heart,
  TrendingUp, Zap, Building2, Mail, Phone, MapPin, Linkedin, LogOut, BookOpen, Menu
} from "lucide-react";
import { Logo } from "../Logo";
import { useRouter } from "../Router";

export function OnboardingDashboard() {
  const { navigateTo, setUserRole } = useRouter();
  const [selectedModule, setSelectedModule] = useState(null);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [signedDocuments, setSignedDocuments] = useState({
    nda: false,
    w4: false,
    i9: false,
    handbook: false
  });

  const candidateData = {
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    jobReadyScore: 98,
    company: "TechFlow AI",
    role: "AI Engineer",
    startDate: "December 1, 2024",
    onboardingProgress: 45
  };

  const onboardingModules = [
    {
      id: 1,
      title: "Professional Development",
      description: "Communication, collaboration, workplace etiquette, and professional standards",
      duration: "1.5 hours",
      status: "completed",
      score: 95,
      icon: Users,
      completedDate: "Nov 7"
    },
    {
      id: 2,
      title: "Personal Branding",
      description: "Building your professional presence, networking, and career growth strategies",
      duration: "1 hour",
      status: "completed",
      score: 92,
      icon: Star,
      completedDate: "Nov 8"
    },
    {
      id: 3,
      title: "Working with Others",
      description: "Team collaboration, cross-functional communication, and conflict resolution",
      duration: "1.5 hours",
      status: "in-progress",
      progress: 60,
      icon: Users
    },
    {
      id: 4,
      title: "Self-Managing",
      description: "Time management, goal setting, remote work best practices, and productivity",
      duration: "1 hour",
      status: "locked",
      icon: Target
    },
    {
      id: 5,
      title: "Managing Others",
      description: "Leadership fundamentals, mentoring, delegation, and project ownership",
      duration: "1.5 hours",
      status: "locked",
      icon: Award
    },
    {
      id: 6,
      title: "Company Culture & Values",
      description: "Understanding TechFlow AI's mission, vision, values, and team dynamics",
      duration: "45 min",
      status: "locked",
      icon: Heart
    },
    {
      id: 7,
      title: "Startup Environment",
      description: "Fast-paced environments, adaptability, innovation mindset, and startup dynamics",
      duration: "1 hour",
      status: "locked",
      icon: Building2
    }
  ];

  const legalDocuments = [
    {
      id: 'nda',
      title: "Non-Disclosure Agreement",
      description: "Protect confidential company information",
      required: true,
      signed: signedDocuments.nda,
      pages: 4
    },
    {
      id: 'w4',
      title: "W-4 Tax Form",
      description: "Federal tax withholding information",
      required: true,
      signed: signedDocuments.w4,
      pages: 2
    },
    {
      id: 'i9',
      title: "I-9 Employment Eligibility",
      description: "Verify authorization to work",
      required: true,
      signed: signedDocuments.i9,
      pages: 3
    },
    {
      id: 'handbook',
      title: "Employee Handbook",
      description: "Company policies and procedures",
      required: true,
      signed: signedDocuments.handbook,
      pages: 12
    }
  ];

  const upcomingMeetings = [
    {
      title: "Founder Meet & Greet",
      date: "Nov 15",
      time: "2:00 PM",
      duration: "45 min",
      attendees: ["Alex Chen (Founder)", "You"],
      type: "video",
      status: "scheduled"
    },
    {
      title: "Team Introduction",
      date: "Nov 20",
      time: "10:00 AM",
      duration: "1 hour",
      attendees: ["Engineering Team", "You"],
      type: "video",
      status: "scheduled"
    }
  ];

  const handleSignDocument = (docId: string) => {
    setSignedDocuments(prev => ({
      ...prev,
      [docId]: true
    }));
  };

  const allDocumentsSigned = Object.values(signedDocuments).every(signed => signed);
  const allModulesComplete = onboardingModules.every(m => m.status === 'completed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Logo size="md" showText={false} />
              <div>
                <div className="font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Onboard.AI</div>
                <div className="text-xs text-gray-500">Onboarding</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigateTo("public-profile")}>
                <Eye className="w-4 h-4 mr-2" />
                My Profile
              </Button>
              <Button variant="ghost" onClick={() => navigateTo("training")}>
                <BookOpen className="w-4 h-4 mr-2" />
                Training
              </Button>
              <Button variant="ghost" onClick={() => navigateTo("community")}>
                <Users className="w-4 h-4 mr-2" />
                Community
              </Button>
              <Button variant="ghost" onClick={() => navigateTo("onboarding")}>
                <Target className="w-4 h-4 mr-2" />
                Onboarding
              </Button>
            </nav>

            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setShowMobileNav(!showMobileNav)}
              >
                <Menu className="w-5 h-5" />
              </Button>

              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setUserRole(null);
                  navigateTo("product");
                }}
                className="hidden md:flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
              <Avatar className="w-8 h-8 ring-2 ring-green-500">
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                  {candidateData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileNav && (
            <div className="md:hidden border-t bg-white">
              <div className="container mx-auto px-4 py-2 space-y-1">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => {
                    navigateTo("public-profile");
                    setShowMobileNav(false);
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  My Profile
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => {
                    navigateTo("training");
                    setShowMobileNav(false);
                  }}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Training
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => {
                    navigateTo("community");
                    setShowMobileNav(false);
                  }}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Community
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => {
                    navigateTo("onboarding");
                    setShowMobileNav(false);
                  }}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Onboarding
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-600"
                  onClick={() => {
                    setUserRole(null);
                    navigateTo("product");
                    setShowMobileNav(false);
                  }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Celebration Banner */}
        <Card className="border-0 shadow-xl mb-8 overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">Congratulations, {candidateData.name.split(' ')[0]}! 🎉</h1>
                <p className="text-green-100 text-lg mb-3">
                  You're job-ready with a {candidateData.jobReadyScore}% score! Complete onboarding to join VIGILANTE's newest startup.
                </p>
                <div className="flex items-center gap-3">
                  <Badge className="bg-white/20 border-white/30 text-white">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {candidateData.role}
                  </Badge>
                  <Badge className="bg-white/20 border-white/30 text-white">
                    <Building2 className="w-3 h-3 mr-1" />
                    {candidateData.company}
                  </Badge>
                  <Badge className="bg-white/20 border-white/30 text-white">
                    <Calendar className="w-3 h-3 mr-1" />
                    Start: {candidateData.startDate}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">Onboarding Progress</h3>
              <span className="text-2xl font-bold text-green-600">{candidateData.onboardingProgress}%</span>
            </div>
            <Progress value={candidateData.onboardingProgress} className="h-3 mb-4" />
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>2 of 5 modules done</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-yellow-600" />
                <span>{Object.values(signedDocuments).filter(Boolean).length} of 4 docs signed</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>2 meetings scheduled</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Onboarding Modules */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Culture & Skills Training</CardTitle>
                <CardDescription>Complete these modules to prepare for your role</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {onboardingModules.map((module) => {
                  const Icon = module.icon;
                  return (
                    <div
                      key={module.id}
                      className={`border-2 rounded-lg p-4 transition-all ${
                        module.status === 'completed' ? 'bg-green-50 border-green-500' :
                        module.status === 'in-progress' ? 'bg-blue-50 border-blue-500 cursor-pointer hover:shadow-md' :
                        'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          module.status === 'completed' ? 'bg-green-600' :
                          module.status === 'in-progress' ? 'bg-blue-600' :
                          'bg-gray-400'
                        }`}>
                          {module.status === 'completed' ? (
                            <CheckCircle className="w-6 h-6 text-white" />
                          ) : (
                            <Icon className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{module.title}</h4>
                            {module.status === 'completed' && module.score && (
                              <Badge className="bg-green-100 text-green-800 border-0">
                                <Trophy className="w-3 h-3 mr-1" />
                                {module.score}%
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {module.duration}
                              </span>
                              {module.completedDate && (
                                <span className="text-green-600">Completed {module.completedDate}</span>
                              )}
                            </div>
                            {module.status === 'in-progress' && (
                              <Button size="sm">
                                <Play className="w-4 h-4 mr-1" />
                                Continue
                              </Button>
                            )}
                            {module.status === 'completed' && (
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                Review
                              </Button>
                            )}
                          </div>
                          {module.status === 'in-progress' && module.progress && (
                            <div className="mt-3">
                              <Progress value={module.progress} className="h-2" />
                              <div className="text-xs text-gray-500 mt-1">{module.progress}% complete</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Legal Documents */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Legal Documentation</CardTitle>
                <CardDescription>Review and sign required documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {legalDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className={`border rounded-lg p-4 ${
                      doc.signed ? 'bg-green-50 border-green-200' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          doc.signed ? 'bg-green-600' : 'bg-blue-100'
                        }`}>
                          {doc.signed ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <FileText className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{doc.title}</h4>
                            {doc.required && (
                              <Badge variant="destructive" className="text-xs">Required</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                          <div className="text-xs text-gray-500">{doc.pages} pages</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {!doc.signed ? (
                          <>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              Review
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleSignDocument(doc.id)}
                            >
                              <Pen className="w-4 h-4 mr-1" />
                              Sign
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                            <div className="text-sm text-green-600 font-medium px-3 py-2">
                              ✓ Signed
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {allDocumentsSigned && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-900">All documents signed!</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Summary */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{candidateData.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{candidateData.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{candidateData.location}</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Job Ready Score</span>
                    <span className="text-xl font-bold text-green-600">{candidateData.jobReadyScore}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Meetings */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Meetings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingMeetings.map((meeting, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <h4 className="font-medium text-sm mb-2">{meeting.title}</h4>
                    <div className="space-y-1 text-xs text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {meeting.date} at {meeting.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {meeting.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3" />
                        {meeting.attendees.join(', ')}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      <Video className="w-3 h-3 mr-1" />
                      Join Meeting
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Completion Status */}
            {allModulesComplete && allDocumentsSigned && (
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-green-900 mb-2">Ready to Start!</h3>
                  <p className="text-sm text-green-700 mb-4">
                    You've completed all onboarding requirements. Welcome to the team!
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    Go to Dashboard
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Need Help */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm mb-1">Need Help?</h4>
                    <p className="text-xs text-gray-600 mb-3">
                      Our team is here to assist with onboarding.
                    </p>
                    <Button size="sm" variant="outline" className="w-full text-xs">
                      Contact Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
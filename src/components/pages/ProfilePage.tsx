import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Input } from '../ui/input';
import {
  Clock, CheckCircle, Target, Mail, Bell, HelpCircle,
  User, Award, BookOpen, TrendingUp, MessageSquare, Calendar,
  Zap, Star, Heart, Settings, Eye, LogOut
} from 'lucide-react';
import { useRouter } from '../Router';
import { Logo } from '../Logo';

export function ProfilePage() {
  const { navigateTo, setUserRole } = useRouter();
  const [showEditModal, setShowEditModal] = useState(false);

  const candidateData = {
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    targetRole: "AI Engineer",
    appliedDate: "November 6, 2024",
    jobReadyScore: 67,
    verificationStatus: "Approved",
    assessmentScores: {
      skills: 87,
      cognitive: 92,
      learningStyle: "Visual"
    },
    estimatedTrainingTime: "14-16 weeks",
    nextSteps: [
      { id: 1, title: "Profile Review", status: "completed", date: "Nov 6" },
      { id: 2, title: "Verification Complete", status: "completed", date: "Nov 6" },
      { id: 3, title: "Awaiting Activation", status: "current", date: "Pending" },
      { id: 4, title: "Training Begins", status: "upcoming", date: "TBD" }
    ]
  };

  const whileYouWait = [
    {
      title: "Explore the Community",
      description: "Browse our learning community and see what others are working on",
      icon: MessageSquare,
      action: "View Community",
      color: "blue"
    },
    {
      title: "Watch Success Stories",
      description: "See how graduates landed their dream AI engineering roles",
      icon: Star,
      action: "Watch Videos",
      color: "yellow"
    },
    {
      title: "Preview Curriculum",
      description: "Get a sneak peek at what you'll be learning",
      icon: BookOpen,
      action: "View Curriculum",
      color: "purple"
    },
    {
      title: "Join Study Groups",
      description: "Connect with your cohort before training starts",
      icon: Heart,
      action: "Find Groups",
      color: "pink"
    }
  ];

  const faqs = [
    {
      question: "How long does activation take?",
      answer: "Most candidates are activated within 1-3 business days. High-scoring candidates (85%+) are often prioritized."
    },
    {
      question: "What determines activation order?",
      answer: "Job-ready score, verification completion time, and project needs all factor into activation decisions."
    },
    {
      question: "Can I improve my job-ready score?",
      answer: "Yes! You can retake assessments or add professional links to boost your score."
    },
    {
      question: "Will I be notified when activated?",
      answer: "Absolutely! You'll receive email and in-app notifications the moment you're activated for training."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-secondary">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Logo size="md" showText={false} />
              <div>
                <div className="font-bold text-gradient-multi">Onboard.AI</div>
                <div className="text-xs text-muted-foreground">Your Dashboard</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
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
              <Avatar className="w-8 h-8 ring-2 ring-purple-500">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
                  {candidateData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Status Banner */}
        <Card className="border-0 shadow-xl mb-8 overflow-hidden bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 border-l-4 border-l-purple-500">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-8 h-8 text-purple-600 animate-pulse" />
              </div>
              <div className="flex-1">
                <h2 className="heading-display text-2xl mb-2">You're in the Queue!</h2>
                <p className="text-purple-800 mb-4">
                  Your application has been verified and you're waiting to be activated for training. 
                  We're matching you with the right project and cohort.
                </p>
                <div className="flex items-center gap-4">
                  <Badge className="bg-green-100 text-green-800 border-0">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verification Complete
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 border-0">
                    <Clock className="w-3 h-3 mr-1" />
                    Awaiting Activation
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Your Profile Summary */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Profile</CardTitle>
                    <CardDescription>Here's what recruiters see</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowEditModal(true)}>
                    <Settings className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      {candidateData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl mb-1">{candidateData.name}</h3>
                    <p className="text-gray-600 mb-2">Aspiring {candidateData.targetRole}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      Applied {candidateData.appliedDate}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl text-blue-600 mb-1">{candidateData.jobReadyScore}%</div>
                    <div className="text-sm text-gray-600">Job Ready Score</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-purple-600" />
                      <span className="text-sm text-purple-900">Skills Test</span>
                    </div>
                    <div className="text-2xl text-purple-600">{candidateData.assessmentScores.skills}%</div>
                  </div>
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm text-indigo-900">Cognitive</span>
                    </div>
                    <div className="text-2xl text-indigo-600">{candidateData.assessmentScores.cognitive}%</div>
                  </div>
                  <div className="bg-coral-50 border border-coral-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-5 h-5 text-coral-600" />
                      <span className="text-sm text-coral-900">Learning Style</span>
                    </div>
                    <div className="text-lg text-coral-600">{candidateData.assessmentScores.learningStyle}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Your Journey</CardTitle>
                <CardDescription>Track your progress from application to training</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidateData.nextSteps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.status === 'completed' ? 'bg-green-600' :
                          step.status === 'current' ? 'bg-yellow-500 animate-pulse' :
                          'bg-gray-300'
                        }`}>
                          {step.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : step.status === 'current' ? (
                            <Clock className="w-5 h-5 text-white" />
                          ) : (
                            <span className="text-white text-sm">{index + 1}</span>
                          )}
                        </div>
                        {index < candidateData.nextSteps.length - 1 && (
                          <div className={`w-0.5 h-12 ${
                            step.status === 'completed' ? 'bg-green-600' : 'bg-gray-300'
                          }`}></div>
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={step.status === 'current' ? 'text-yellow-900' : ''}>
                            {step.title}
                          </h4>
                          <span className="text-sm text-gray-500">{step.date}</span>
                        </div>
                        {step.status === 'current' && (
                          <p className="text-sm text-yellow-700">
                            A recruiter will review your profile and activate you for training soon.
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* While You Wait */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>While You Wait</CardTitle>
                <CardDescription>Make the most of your time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {whileYouWait.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className={`border-2 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer bg-${item.color}-50 border-${item.color}-200`}>
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-10 h-10 bg-${item.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-5 h-5 text-${item.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="mb-1">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="w-full">
                          {item.action}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* FAQs */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="border rounded-lg">
                    <summary className="p-4 cursor-pointer hover:bg-gray-50">
                      {faq.question}
                    </summary>
                    <div className="px-4 pb-4 text-sm text-gray-600">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* View Public Profile */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg mb-2">Your Public Profile</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    View your profile as others see it and track your achievements.
                  </p>
                  <Button 
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                    onClick={() => navigateTo("public-profile")}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Public Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* What's Next */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg mb-2">What Happens Next?</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Once activated, you'll get instant access to your personalized AI curriculum and cohort.
                  </p>
                  <div className="space-y-2 text-left text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Email notification when activated</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Access to full learning platform</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Meet your cohort members</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Begin AI-generated training</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estimated Timeline */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Your Training Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress to Job Ready</span>
                      <span className="text-sm">Target: 98%</span>
                    </div>
                    <Progress value={candidateData.jobReadyScore} className="mb-1" />
                    <div className="text-xs text-gray-500">Current: {candidateData.jobReadyScore}%</div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="text-sm text-blue-900 mb-1">Estimated Training Time</div>
                    <div className="text-2xl text-blue-600">{candidateData.estimatedTrainingTime}</div>
                    <div className="text-xs text-blue-700 mt-1">Based on your current score and learning style</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Need Help */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="mb-2">Need Assistance?</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Our support team is here to help with any questions.
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Stay Updated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>Email Notifications</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-0">On</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-gray-500" />
                      <span>In-App Alerts</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-0">On</Badge>
                  </div>
                  <Button size="sm" variant="ghost" className="w-full mt-2">
                    Manage Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowEditModal(false)}>
          <Card className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm mb-2 block">Full Name</label>
                <Input defaultValue={candidateData.name} />
              </div>
              <div>
                <label className="text-sm mb-2 block">Email</label>
                <Input defaultValue={candidateData.email} />
              </div>
              <div>
                <label className="text-sm mb-2 block">Target Role</label>
                <Input defaultValue={candidateData.targetRole} />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-1">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
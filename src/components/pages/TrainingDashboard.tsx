import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { 
  BookOpen, Play, CheckCircle, Lock, Trophy, Flame, Target, 
  MessageSquare, HelpCircle, Calendar, Clock, Star, TrendingUp,
  Zap, Award, ChevronRight, AlertCircle, Brain, Code, Video,
  FileText, Users, BarChart3, Send, Bell, Settings, LogOut,
  User, Medal, Crown, Gift, Sparkles, Eye, Heart, MessageCircle,
  Share2, Bookmark, ThumbsUp, Filter, Search, ChevronDown, Menu
} from "lucide-react";
import { Logo } from "../Logo";
import { useRouter } from "../Router";

export function TrainingDashboard() {
  const { navigateTo, setUserRole } = useRouter();
  const [selectedModule, setSelectedModule] = useState(null);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showCommunityPanel, setShowCommunityPanel] = useState(true);
  const [activeTab, setActiveTab] = useState("learning");
  const [chatMessage, setChatMessage] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const userData = {
    name: "Sarah Chen",
    avatar: "",
    targetRole: "AI Engineer",
    jobReadyScore: 67,
    currentLevel: "Level 8",
    xp: 3240,
    xpToNextLevel: 500,
    streak: 7,
    totalHours: 12.5,
    modulesCompleted: 3,
    totalModules: 12,
    nextMilestone: "Complete Advanced AI Module",
    estimatedCompletion: "14 days",
    company: "TechFlow AI",
    rank: 12,
    totalCohort: 48,
    helpedOthers: 5,
    badges: 8
  };

  const cohortMembers = [
    {
      id: 1,
      name: "Marcus Rodriguez",
      avatar: "",
      level: "Level 9",
      xp: 3680,
      status: "online",
      currentModule: "Neural Networks Deep Dive",
      rank: 8,
      helpGiven: 12,
      badges: 11
    },
    {
      id: 2,
      name: "Elena Petrov",
      avatar: "",
      level: "Level 7",
      xp: 2890,
      status: "online",
      currentModule: "Computer Vision Applications",
      rank: 15,
      helpGiven: 7,
      badges: 9
    },
    {
      id: 3,
      name: "David Kim",
      avatar: "",
      level: "Level 10",
      xp: 4120,
      status: "away",
      currentModule: "MLOps & Deployment",
      rank: 3,
      helpGiven: 18,
      badges: 14
    }
  ];

  const chatMessages = [
    {
      id: 1,
      user: "Marcus Rodriguez",
      avatar: "",
      message: "Just finished the backpropagation exercise! Anyone else stuck on question 3?",
      timestamp: "2 min ago",
      replies: 2
    },
    {
      id: 2,
      user: "Elena Petrov",
      avatar: "",
      message: "Yes! I spent an hour on it. The key is understanding the chain rule. Happy to help if you need!",
      timestamp: "1 min ago",
      replies: 0
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Jasmine Williams", xp: 4580, level: "Level 11", streak: 14, avatar: "", change: "up" },
    { rank: 2, name: "Alex Chen", xp: 4320, level: "Level 10", streak: 12, avatar: "", change: "up" },
    { rank: 3, name: "David Kim", xp: 4120, level: "Level 10", streak: 9, avatar: "", change: "same" }
  ];

  const achievements = [
    {
      id: 1,
      title: "Speed Demon",
      description: "Complete 3 modules in one week",
      icon: Zap,
      rarity: "rare",
      progress: 100,
      unlocked: true,
      xp: 250
    },
    {
      id: 2,
      title: "Perfect Score",
      description: "Score 100% on any assessment",
      icon: Trophy,
      rarity: "epic",
      progress: 100,
      unlocked: true,
      xp: 500
    },
    {
      id: 3,
      title: "Helpful Hero",
      description: "Help 5 cohort members",
      icon: Heart,
      rarity: "rare",
      progress: 100,
      unlocked: true,
      xp: 300
    }
  ];

  const curriculum = [
    {
      id: 1,
      title: "AI Fundamentals",
      description: "Core concepts of artificial intelligence and machine learning",
      duration: "4.5 hours",
      modules: 6,
      completed: 6,
      status: "completed",
      difficulty: "Beginner",
      score: 94,
      unlocked: true,
      skills: ["Python Basics", "ML Concepts", "Data Structures"],
      xpReward: 500
    },
    {
      id: 2,
      title: "Neural Networks Deep Dive",
      description: "Understanding deep learning architectures and training",
      duration: "6 hours",
      modules: 8,
      completed: 5,
      status: "in-progress",
      difficulty: "Intermediate",
      score: 87,
      unlocked: true,
      skills: ["TensorFlow", "PyTorch", "Model Training"],
      currentLesson: "Lesson 6: Backpropagation",
      xpReward: 750
    },
    {
      id: 3,
      title: "Computer Vision Applications",
      description: "Build real-world CV models for image recognition",
      duration: "8 hours",
      modules: 10,
      completed: 0,
      status: "locked",
      difficulty: "Advanced",
      unlocked: false,
      skills: ["CNN", "Object Detection", "Image Processing"],
      prerequisite: "Complete Neural Networks",
      xpReward: 1000
    }
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'online': 'bg-green-500',
      'away': 'bg-yellow-500',
      'offline': 'bg-gray-300'
    };
    return colors[status] || 'bg-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Logo size="md" showText={false} />
              <div>
                <div className="font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">Onboard.AI</div>
                <div className="text-xs text-gray-500">Recruitment + Education</div>
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
              
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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
              <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded-lg p-2">
                <Avatar className="w-8 h-8 ring-2 ring-blue-500">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:block text-sm">
                  <div className="font-medium">{userData.name}</div>
                  <div className="text-xs text-gray-500">{userData.currentLevel}</div>
                </div>
              </div>
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

          <div className="pb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-sm font-medium text-gray-700">{userData.currentLevel}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${(userData.xp / (userData.xp + userData.xpToNextLevel)) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{userData.xp} XP</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-bold text-orange-500">{userData.streak}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            {activeTab === 'learning' && (
              <>
                <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white overflow-hidden relative">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-2">Welcome back, {userData.name}! 👋</h2>
                    <p className="text-blue-100 mb-4">Training for {userData.targetRole} at {userData.company}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/20">
                        <Target className="w-5 h-5 mb-1" />
                        <div className="text-xl font-bold">{userData.jobReadyScore}%</div>
                        <div className="text-xs text-blue-100">Job Ready</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/20">
                        <CheckCircle className="w-5 h-5 mb-1" />
                        <div className="text-xl font-bold">{userData.modulesCompleted}/{userData.totalModules}</div>
                        <div className="text-xs text-blue-100">Modules</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/20">
                        <Clock className="w-5 h-5 mb-1" />
                        <div className="text-xl font-bold">{userData.totalHours}h</div>
                        <div className="text-xs text-blue-100">This Week</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/20">
                        <Heart className="w-5 h-5 mb-1" />
                        <div className="text-xl font-bold">{userData.helpedOthers}</div>
                        <div className="text-xs text-blue-100">Helped</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Continue Learning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <Brain className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">Neural Networks Deep Dive</h3>
                        <p className="text-sm text-gray-600 mb-2">Lesson 6: Backpropagation</p>
                        <Progress value={62} className="h-2" />
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                      onClick={() => navigateTo("lesson-viewer")}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Your Learning Path</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {curriculum.map((module) => (
                      <div
                        key={module.id}
                        className="border-l-4 rounded-lg p-4 bg-white border-l-blue-500"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                            <CheckCircle className="w-7 h-7 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-1">{module.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                            <div className="flex items-center gap-2 text-sm">
                              <Badge>{module.difficulty}</Badge>
                              <span className="text-gray-500">{module.duration}</span>
                            </div>
                          </div>
                          <Button size="sm">Start</Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === 'community' && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Community Feed</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {chatMessages.map(msg => (
                    <div key={msg.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                            {msg.user.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium">{msg.user}</div>
                          <p className="text-sm text-gray-700 mt-1">{msg.message}</p>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" variant="ghost">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              Like
                            </Button>
                            <Button size="sm" variant="ghost">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {activeTab === 'leaderboard' && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Cohort Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {leaderboard.map((person) => (
                      <div key={person.rank} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-400 w-8">#{person.rank}</div>
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                            {person.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium">{person.name}</div>
                          <div className="text-sm text-gray-500">{person.level}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-blue-600">{person.xp} XP</div>
                          <div className="text-xs text-gray-500">{person.streak} day streak</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'achievements' && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Your Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement) => {
                      const Icon = achievement.icon;
                      return (
                        <div key={achievement.id} className="border rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold">{achievement.title}</div>
                              <div className="text-sm text-gray-600">{achievement.description}</div>
                              <Badge className="mt-2">+{achievement.xp} XP</Badge>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Cohort Members Online</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {cohortMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{member.name}</div>
                      <div className="text-xs text-gray-500 truncate">{member.currentModule}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">{member.level}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setShowSupportModal(true)}>
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Request Check-in
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showSupportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowSupportModal(false)}>
          <Card className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle>Request Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <select className="w-full p-2 border rounded-lg">
                <option>Technical question</option>
                <option>Stuck on exercise</option>
                <option>Schedule mentor call</option>
              </select>
              <textarea className="w-full p-2 border rounded-lg min-h-24" placeholder="Describe your question..."/>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowSupportModal(false)}>Cancel</Button>
                <Button className="flex-1">Submit</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
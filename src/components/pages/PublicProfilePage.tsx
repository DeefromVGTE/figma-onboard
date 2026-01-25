import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Trophy, Award, Star, Flame, Target, BookOpen, Code, Brain,
  Heart, Users, MessageSquare, Calendar, Clock, CheckCircle,
  TrendingUp, Zap, Medal, Crown, Gift, Sparkles, ThumbsUp,
  Share2, Mail, MapPin, Linkedin, Github, Globe, ChevronRight,
  Eye, Lightbulb, FileText, Video, LogOut, Menu
} from "lucide-react";
import { Logo } from "../Logo";
import { useRouter } from "../Router";

export function PublicProfilePage() {
  const { navigateTo, setUserRole } = useRouter();
  const [isOwnProfile] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showMenu, setShowMenu] = useState(false);

  const profileData = {
    name: "Sarah Chen",
    level: "Level 8",
    xp: 3240,
    rank: 12,
    totalCohort: 48,
    targetRole: "AI Engineer",
    company: "TechFlow AI",
    location: "San Francisco, CA",
    joinedDate: "March 2024",
    bio: "Passionate about AI and machine learning! Former data analyst making the transition to AI engineering. Love helping others in the community and sharing what I learn.",
    stats: {
      jobReadyScore: 67,
      streak: 7,
      modulesCompleted: 3,
      totalModules: 12,
      hoursLearned: 42.5,
      helpGiven: 5,
      postsCreated: 12,
      commentsPosted: 34
    },
    contact: {
      email: "sarah.chen@email.com",
      linkedin: "linkedin.com/in/sarach",
      github: "github.com/sarah-chen",
      portfolio: "sarachen.dev"
    }
  };

  const achievements = [
    {
      id: 1,
      title: "Speed Demon",
      description: "Complete 3 modules in one week",
      icon: Zap,
      rarity: "rare",
      unlocked: true,
      unlockedDate: "2 days ago",
      xp: 250
    },
    {
      id: 2,
      title: "Perfect Score",
      description: "Score 100% on any assessment",
      icon: Trophy,
      rarity: "epic",
      unlocked: true,
      unlockedDate: "5 days ago",
      xp: 500
    },
    {
      id: 3,
      title: "Helpful Hero",
      description: "Help 5 cohort members",
      icon: Heart,
      rarity: "rare",
      unlocked: true,
      unlockedDate: "1 week ago",
      xp: 300
    },
    {
      id: 4,
      title: "Week Warrior",
      description: "Maintain 7-day learning streak",
      icon: Flame,
      rarity: "common",
      unlocked: true,
      unlockedDate: "Today",
      xp: 150
    },
    {
      id: 5,
      title: "Code Master",
      description: "Complete 50 coding exercises",
      icon: Code,
      rarity: "legendary",
      unlocked: false,
      progress: 68,
      xp: 1000
    },
    {
      id: 6,
      title: "Community Leader",
      description: "Get 100 likes on posts",
      icon: Star,
      rarity: "epic",
      unlocked: false,
      progress: 45,
      xp: 500
    }
  ];

  const completedModules = [
    {
      title: "AI Fundamentals",
      completedDate: "1 week ago",
      score: 94,
      duration: "4.5 hours",
      skills: ["Python Basics", "ML Concepts", "Data Structures"]
    },
    {
      title: "Neural Networks Deep Dive",
      completedDate: "In Progress",
      score: 87,
      duration: "6 hours",
      progress: 62,
      skills: ["TensorFlow", "PyTorch", "Model Training"]
    }
  ];

  const recentActivity = [
    {
      type: "achievement",
      title: "Unlocked 'Week Warrior' achievement",
      timestamp: "2 hours ago",
      icon: Flame
    },
    {
      type: "post",
      title: "Posted in Community: Tips for backpropagation",
      likes: 24,
      timestamp: "5 hours ago",
      icon: MessageSquare
    },
    {
      type: "help",
      title: "Helped Marcus Rodriguez with gradient descent",
      timestamp: "1 day ago",
      icon: Heart
    },
    {
      type: "module",
      title: "Completed lesson: Forward Pass Walkthrough",
      timestamp: "1 day ago",
      icon: CheckCircle
    }
  ];

  const skillsProgress = [
    { skill: "Machine Learning", level: 85, category: "Core" },
    { skill: "Python", level: 92, category: "Programming" },
    { skill: "Deep Learning", level: 70, category: "Core" },
    { skill: "TensorFlow", level: 65, category: "Framework" },
    { skill: "Data Structures", level: 88, category: "Programming" },
    { skill: "Neural Networks", level: 78, category: "Core" }
  ];

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case 'legendary': return 'from-yellow-400 via-orange-500 to-red-500';
      case 'epic': return 'from-purple-500 via-pink-500 to-purple-600';
      case 'rare': return 'from-blue-500 via-cyan-500 to-blue-600';
      case 'common': return 'from-gray-400 to-gray-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch(rarity) {
      case 'legendary': return 'border-yellow-400';
      case 'epic': return 'border-purple-500';
      case 'rare': return 'border-blue-500';
      case 'common': return 'border-gray-400';
      default: return 'border-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-secondary">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size="md" showText={false} />
            <div>
              <div className="font-bold text-gradient-multi">Onboard.AI</div>
              <div className="text-xs text-muted-foreground">Profile</div>
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
              onClick={() => setShowMenu(!showMenu)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            {isOwnProfile && (
              <Button size="sm" className="hidden md:flex bg-gradient-to-r from-purple-600 to-indigo-600">Edit Profile</Button>
            )}
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

        {/* Mobile Menu */}
        {showMenu && (
          <div className="md:hidden border-t bg-white">
            <div className="container mx-auto px-4 py-2 space-y-1">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  navigateTo("public-profile");
                  setShowMenu(false);
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
                  setShowMenu(false);
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
                  setShowMenu(false);
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
                  setShowMenu(false);
                }}
              >
                <Target className="w-4 h-4 mr-2" />
                Onboarding
              </Button>
            </div>
          </div>
        )}
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="border-0 shadow-xl mb-6 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600"></div>
          <CardContent className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
              <Avatar className="w-32 h-32 ring-4 ring-white shadow-xl">
                <AvatarFallback className="text-3xl bg-gradient-to-br from-purple-500 to-indigo-500 text-white">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h1 className="text-3xl font-bold mb-1">{profileData.name}</h1>
                    <p className="text-gray-600 mb-2">{profileData.targetRole} @ {profileData.company}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      {profileData.location}
                      <span className="mx-2">•</span>
                      <Calendar className="w-4 h-4" />
                      Joined {profileData.joinedDate}
                    </div>
                  </div>
                  {!isOwnProfile && (
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <Mail className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Trophy className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-700">Rank</span>
                    </div>
                    <div className="text-xl font-bold text-blue-900">#{profileData.rank}</div>
                    <div className="text-xs text-blue-600">of {profileData.totalCohort}</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 border border-purple-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="w-4 h-4 text-purple-600" />
                      <span className="text-sm text-purple-700">Level</span>
                    </div>
                    <div className="text-xl font-bold text-purple-900">{profileData.level}</div>
                    <div className="text-xs text-purple-600">{profileData.xp} XP</div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 border border-orange-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Flame className="w-4 h-4 text-orange-600" />
                      <span className="text-sm text-orange-700">Streak</span>
                    </div>
                    <div className="text-xl font-bold text-orange-900">{profileData.stats.streak}</div>
                    <div className="text-xs text-orange-600">days</div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700">Helped</span>
                    </div>
                    <div className="text-xl font-bold text-green-900">{profileData.stats.helpGiven}</div>
                    <div className="text-xs text-green-600">people</div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{profileData.bio}</p>

                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Github className="w-4 h-4" />
                    GitHub
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Globe className="w-4 h-4" />
                    Portfolio
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 ml-auto">
                    <Share2 className="w-4 h-4" />
                    Share Profile
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">
              <Eye className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="achievements">
              <Award className="w-4 h-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="skills">
              <Code className="w-4 h-4 mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="activity">
              <TrendingUp className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Learning Progress */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Job Ready Score</span>
                      <span className="text-sm font-bold text-blue-600">{profileData.stats.jobReadyScore}%</span>
                    </div>
                    <Progress value={profileData.stats.jobReadyScore} className="h-3" />
                    <p className="text-xs text-gray-500 mt-1">Target: 98%</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <BookOpen className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <div className="text-xl font-bold text-blue-900">{profileData.stats.modulesCompleted}/{profileData.stats.totalModules}</div>
                      <div className="text-xs text-blue-600">Modules</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <Clock className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                      <div className="text-xl font-bold text-purple-900">{profileData.stats.hoursLearned}h</div>
                      <div className="text-xs text-purple-600">Learned</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Community Stats */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Community Engagement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <Heart className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <div className="text-xl font-bold text-green-900">{profileData.stats.helpGiven}</div>
                      <div className="text-xs text-green-600">Helped</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <MessageSquare className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <div className="text-xl font-bold text-blue-900">{profileData.stats.postsCreated}</div>
                      <div className="text-xs text-blue-600">Posts</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <ThumbsUp className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                      <div className="text-xl font-bold text-purple-900">{profileData.stats.commentsPosted}</div>
                      <div className="text-xs text-purple-600">Comments</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Community Contributor</span>
                      <Badge className="bg-yellow-100 text-yellow-800 border-0">
                        <Star className="w-3 h-3 mr-1" />
                        Top 25%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Active community member helping others learn and grow
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Completed Modules */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Learning Journey</CardTitle>
                <CardDescription>Modules completed and in progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {completedModules.map((module, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{module.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {module.duration}
                          </span>
                          <span>{module.completedDate}</span>
                        </div>
                      </div>
                      {module.progress ? (
                        <Badge className="bg-blue-100 text-blue-800 border-0">
                          {module.progress}% Complete
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-800 border-0">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {module.score}%
                        </Badge>
                      )}
                    </div>
                    {module.progress && (
                      <Progress value={module.progress} className="mb-3" />
                    )}
                    <div className="flex flex-wrap gap-2">
                      {module.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Achievement Showcase</CardTitle>
                <CardDescription>
                  {achievements.filter(a => a.unlocked).length} of {achievements.length} achievements unlocked
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={achievement.id}
                        className={`border-2 rounded-lg p-4 ${
                          achievement.unlocked 
                            ? `${getRarityBorder(achievement.rarity)} bg-white` 
                            : 'border-gray-200 bg-gray-50 opacity-60'
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${getRarityColor(achievement.rarity)}`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
                            <p className="text-xs text-gray-600">{achievement.description}</p>
                          </div>
                        </div>
                        {achievement.unlocked ? (
                          <div className="flex items-center justify-between">
                            <Badge className={`text-xs capitalize ${
                              achievement.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
                              achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                              achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            } border-0`}>
                              {achievement.rarity}
                            </Badge>
                            <span className="text-xs text-gray-500">{achievement.unlockedDate}</span>
                          </div>
                        ) : (
                          <div>
                            <Progress value={achievement.progress} className="mb-1" />
                            <div className="text-xs text-gray-500 text-right">{achievement.progress}%</div>
                          </div>
                        )}
                        <div className="mt-2 text-xs text-center font-medium text-blue-600">
                          +{achievement.xp} XP
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
                <CardDescription>Current proficiency levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillsProgress.map((skill, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{skill.skill}</span>
                          <Badge variant="outline" className="text-xs">{skill.category}</Badge>
                        </div>
                        <span className="text-sm font-bold text-blue-600">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions and contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'achievement' ? 'bg-yellow-100' :
                          activity.type === 'post' ? 'bg-blue-100' :
                          activity.type === 'help' ? 'bg-green-100' :
                          'bg-purple-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            activity.type === 'achievement' ? 'text-yellow-600' :
                            activity.type === 'post' ? 'text-blue-600' :
                            activity.type === 'help' ? 'text-green-600' :
                            'text-purple-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium mb-1">{activity.title}</p>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500">{activity.timestamp}</span>
                            {activity.likes && (
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <ThumbsUp className="w-3 h-3" />
                                {activity.likes} likes
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
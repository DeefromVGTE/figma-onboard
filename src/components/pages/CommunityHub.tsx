import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  MessageSquare, Users, TrendingUp, Calendar, Search, Plus,
  ThumbsUp, MessageCircle, Share2, Bookmark, MoreVertical,
  Filter, Clock, Flame, Star, Award, Code, HelpCircle,
  Lightbulb, CheckCircle, Flag, Heart, Eye, Send, Image,
  Video, FileText, ChevronRight, Bell, Settings, Trophy, LogOut, BookOpen, Target, Menu
} from "lucide-react";
import { Logo } from "../Logo";
import { useRouter } from "../Router";

export function CommunityHub() {
  const { navigateTo, setUserRole } = useRouter();
  const [activeTab, setActiveTab] = useState("feed");
  const [newPost, setNewPost] = useState("");
  const [showMobileNav, setShowMobileNav] = useState(false);

  const posts = [
    {
      id: 1,
      user: {
        name: "Marcus Rodriguez",
        level: "Level 9",
        badge: "Top Contributor"
      },
      timestamp: "2 hours ago",
      content: "Just cracked the backpropagation exercise! The key insight was drawing out the computational graph first. Anyone else find that helpful?",
      tags: ["Neural Networks", "Tips"],
      likes: 24,
      comments: 8,
      hasLiked: false,
      type: "discussion"
    },
    {
      id: 2,
      user: {
        name: "Elena Petrov",
        level: "Level 7",
        badge: "Helpful"
      },
      timestamp: "4 hours ago",
      content: "Need help with gradient descent optimization! I'm getting stuck on the learning rate selection. Any tips?",
      tags: ["Help Needed"],
      likes: 12,
      comments: 15,
      hasLiked: true,
      type: "question",
      solved: true
    }
  ];

  const studyGroups = [
    {
      id: 1,
      name: "Neural Networks Squad",
      members: 12,
      active: 8,
      topic: "Deep Learning Fundamentals",
      nextSession: "Today, 3:00 PM"
    },
    {
      id: 2,
      name: "CV Explorers", 
      members: 8,
      active: 3,
      topic: "Computer Vision Applications",
      nextSession: "Tomorrow, 10:00 AM"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-secondary">
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Logo size="md" showText={false} />
              <div>
                <div className="font-bold text-gradient-multi">Onboard.AI</div>
                <div className="text-xs text-muted-foreground">Community Hub</div>
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
              <Avatar className="w-8 h-8 ring-2 ring-purple-500">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white">SC</AvatarFallback>
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

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">SC</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input placeholder="Share what you're learning..." className="mb-3"/>
                    <div className="flex justify-between">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost"><Image className="w-4 h-4"/></Button>
                        <Button size="sm" variant="ghost"><Code className="w-4 h-4"/></Button>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                        <Send className="w-4 h-4 mr-1"/>Post
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="feed"><Flame className="w-4 h-4 mr-2"/>Feed</TabsTrigger>
                  <TabsTrigger value="trending"><TrendingUp className="w-4 h-4 mr-2"/>Trending</TabsTrigger>
                  <TabsTrigger value="questions"><HelpCircle className="w-4 h-4 mr-2"/>Questions</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="feed" className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                            {post.user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{post.user.name}</span>
                            <Badge variant="outline" className="text-xs">{post.user.level}</Badge>
                          </div>
                          <div className="text-sm text-gray-500">{post.timestamp}</div>
                        </div>
                      </div>
                      <p className="text-gray-800 mb-4">{post.content}</p>
                      <div className="flex gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">#{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 pt-4 border-t">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="w-4 h-4 mr-1"/>{post.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1"/>{post.comments}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="trending" className="space-y-4">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-center text-gray-500">
                      <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p>Trending posts will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="questions" className="space-y-4">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-center text-gray-500">
                      <HelpCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p>Questions will appear here</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Study Groups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studyGroups.map((group) => (
                  <div key={group.id} className="border rounded-lg p-3">
                    <div className="font-medium text-sm mb-1">{group.name}</div>
                    <div className="text-xs text-gray-500 mb-2">{group.topic}</div>
                    <div className="flex justify-between text-xs">
                      <span>{group.members} members</span>
                      <span className="text-green-600">{group.active} active</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2"/>Create Group
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigateTo("public-profile")}>
                  <Eye className="w-4 h-4 mr-2" />
                  My Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigateTo("training")}>
                  <Award className="w-4 h-4 mr-2" />
                  Training
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigateTo("onboarding")}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Onboarding
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
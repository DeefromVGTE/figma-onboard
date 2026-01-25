import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadialBarChart, RadialBar, Legend } from "recharts";
import { TrendingUp, Award, Clock, Calendar, Target, CheckCircle, AlertTriangle, Users } from "lucide-react";

const onboardingProgress = [
  { day: "Day 1", completed: 25, target: 30 },
  { day: "Day 2", completed: 45, target: 50 },
  { day: "Day 3", completed: 70, target: 70 },
  { day: "Day 4", completed: 85, target: 85 },
  { day: "Day 5", completed: 95, target: 100 },
];

const readinessMetrics = [
  { name: "Technical Skills", value: 85, fill: "#8884d8" },
  { name: "Company Processes", value: 70, fill: "#82ca9d" },
  { name: "AI Tools Proficiency", value: 90, fill: "#ffc658" },
  { name: "Team Integration", value: 60, fill: "#ff7300" },
];

const peerComparison = [
  { role: "Data Engineer", avgTime: "4.2 days", yourTime: "3.8 days", status: "ahead" },
  { role: "Frontend Dev", avgTime: "3.1 days", yourTime: "3.5 days", status: "behind" },
  { role: "Backend Dev", avgTime: "4.8 days", yourTime: "4.2 days", status: "ahead" },
  { role: "Full Stack", avgTime: "5.5 days", yourTime: "4.9 days", status: "ahead" },
];

export function ProgressAnalytics() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Onboarding Progress & Readiness</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track your preparation progress and readiness for your new role with detailed analytics
          </p>
        </div>

        <Tabs defaultValue="progress" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="progress">My Progress</TabsTrigger>
            <TabsTrigger value="readiness">Role Readiness</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-6">
            {/* Progress Overview Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">18h</div>
                      <div className="text-sm text-muted-foreground">Training Time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">3/5</div>
                      <div className="text-sm text-muted-foreground">Modules Complete</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">2</div>
                      <div className="text-sm text-muted-foreground">Days Until Start</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">87%</div>
                      <div className="text-sm text-muted-foreground">Role Ready</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Daily Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Onboarding Progress</CardTitle>
                  <CardDescription>
                    Daily completion vs target progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={onboardingProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="target" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="completed" stroke="#8884d8" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Peer Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Peer Comparison</CardTitle>
                  <CardDescription>
                    How you're progressing compared to others in similar roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {peerComparison.map((peer) => (
                      <div key={peer.role} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{peer.role}</div>
                          <div className="text-sm text-muted-foreground">
                            Your time: {peer.yourTime} | Average: {peer.avgTime}
                          </div>
                        </div>
                        <Badge 
                          className={peer.status === "ahead" ? "bg-green-100 text-green-800 border-0" : "bg-yellow-100 text-yellow-800 border-0"}
                        >
                          {peer.status === "ahead" ? "Ahead" : "On Track"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Module Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Current Training Progress</CardTitle>
                <CardDescription>
                  Progress in your active training modules
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium">Company AI Stack Onboarding</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Required</span>
                      <Badge className="bg-red-100 text-red-800 border-0 text-xs">2 days left</Badge>
                    </div>
                  </div>
                  <Progress value={75} />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium">Customer Data AI Pipeline</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">In Progress</span>
                      <Badge className="bg-blue-100 text-blue-800 border-0 text-xs">Week 1 goal</Badge>
                    </div>
                  </div>
                  <Progress value={45} />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">AI-Powered Code Review Process</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Completed</span>
                      <Badge className="bg-green-100 text-green-800 border-0 text-xs">✓ Done</Badge>
                    </div>
                  </div>
                  <Progress value={100} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="readiness" className="space-y-6">
            {/* Readiness Overview */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">87%</div>
                      <div className="text-sm text-muted-foreground">Overall Readiness</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">2</div>
                      <div className="text-sm text-muted-foreground">Skills to Improve</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">94%</div>
                      <div className="text-sm text-muted-foreground">Peer Ranking</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Role Readiness Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Role Readiness Breakdown</CardTitle>
                  <CardDescription>
                    Your proficiency across key skill areas for your role
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadialBarChart data={readinessMetrics}>
                      <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
                      <Legend />
                      <Tooltip />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Action Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Actions</CardTitle>
                  <CardDescription>
                    Priority items to maximize your readiness
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-l-red-500 bg-red-50 p-4 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span className="font-medium text-red-800">Critical</span>
                      </div>
                      <p className="text-sm text-red-700">Complete "Company AI Stack" training before your start date (2 days remaining)</p>
                    </div>
                    
                    <div className="border-l-4 border-l-yellow-500 bg-yellow-50 p-4 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-4 h-4 text-yellow-600" />
                        <span className="font-medium text-yellow-800">High Priority</span>
                      </div>
                      <p className="text-sm text-yellow-700">Strengthen team integration skills - schedule coffee chats with future teammates</p>
                    </div>
                    
                    <div className="border-l-4 border-l-blue-500 bg-blue-50 p-4 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Opportunity</span>
                      </div>
                      <p className="text-sm text-blue-700">Your AI tools proficiency is excellent - consider becoming a team mentor</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
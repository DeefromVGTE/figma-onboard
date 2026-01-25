import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Brain, Users, TrendingUp, Target, Clock, AlertTriangle, CheckCircle, Zap, Building2, Star } from "lucide-react";

const talentPipelineData = [
  { week: "Week 1", applied: 25, screening: 18, training: 12, qualified: 5 },
  { week: "Week 2", applied: 32, screening: 24, training: 16, qualified: 8 },
  { week: "Week 3", applied: 28, screening: 22, training: 18, qualified: 12 },
  { week: "Week 4", applied: 35, screening: 28, training: 20, qualified: 15 },
];

const skillDistribution = [
  { name: "ML/AI", value: 35, color: "#8884d8", demand: "High" },
  { name: "Backend", value: 25, color: "#82ca9d", demand: "Medium" },
  { name: "Frontend", value: 20, color: "#ffc658", demand: "Medium" },
  { name: "DevOps", value: 20, color: "#ff7300", demand: "High" },
];

const activeProjects = [
  {
    name: "AI Customer Service Platform",
    progress: 75,
    talentNeeded: 3,
    talentInTraining: 8,
    priority: "High",
    deadline: "6 weeks",
    status: "On Track"
  },
  {
    name: "Fraud Detection System", 
    progress: 45,
    talentNeeded: 5,
    talentInTraining: 12,
    priority: "Critical",
    deadline: "4 weeks",
    status: "Behind"
  },
  {
    name: "Medical AI Diagnostics",
    progress: 30,
    talentNeeded: 4,
    talentInTraining: 6,
    priority: "Medium",
    deadline: "10 weeks",
    status: "On Track"
  }
];

const recommendations = [
  {
    type: "urgent",
    title: "Accelerate Fraud Detection Hiring",
    description: "Project is behind schedule. Consider fast-tracking 3 candidates currently at 80% completion.",
    action: "Review Candidates",
    impact: "High"
  },
  {
    type: "opportunity",
    title: "Expand AI Training Program",
    description: "High demand for ML engineers. Starting new cohort could fill pipeline gaps.",
    action: "Launch Cohort",
    impact: "Medium"
  },
  {
    type: "optimization",
    title: "Improve Frontend Screening",
    description: "Frontend candidates have 85% completion rate vs 65% industry average.",
    action: "Scale Process",
    impact: "Low"
  }
];

export function BusinessCopilot() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-3xl font-bold">AI Business Co-Pilot</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-time insights and recommendations to optimize your talent pipeline and accelerate team building
          </p>
        </div>

        <Tabs defaultValue="overview" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Pipeline Overview</TabsTrigger>
            <TabsTrigger value="projects">Active Projects</TabsTrigger>
            <TabsTrigger value="talent">Talent Analytics</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">127</div>
                      <div className="text-sm text-muted-foreground">Active Candidates</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">23</div>
                      <div className="text-sm text-muted-foreground">Ready to Hire</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">87%</div>
                      <div className="text-sm text-muted-foreground">Completion Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">3.2w</div>
                      <div className="text-sm text-muted-foreground">Avg Time to Hire</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Talent Pipeline Flow */}
              <Card>
                <CardHeader>
                  <CardTitle>Talent Pipeline Flow</CardTitle>
                  <CardDescription>
                    Weekly progression through your hiring funnel
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={talentPipelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="applied" stackId="a" fill="#e2e8f0" />
                      <Bar dataKey="screening" stackId="a" fill="#cbd5e1" />
                      <Bar dataKey="training" stackId="a" fill="#94a3b8" />
                      <Bar dataKey="qualified" stackId="a" fill="#475569" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Skill Demand vs Supply */}
              <Card>
                <CardHeader>
                  <CardTitle>Skill Demand vs Supply</CardTitle>
                  <CardDescription>
                    Current distribution and market demand
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillDistribution.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{backgroundColor: skill.color}}></div>
                            <span className="font-medium">{skill.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={skill.demand === "High" ? "bg-red-100 text-red-800 border-0" : "bg-yellow-100 text-yellow-800 border-0"}>
                              {skill.demand} Demand
                            </Badge>
                            <span className="text-sm text-muted-foreground">{skill.value}%</span>
                          </div>
                        </div>
                        <Progress value={skill.value} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="space-y-6">
              {activeProjects.map((project, index) => (
                <Card key={index} className={`border-l-4 ${
                  project.status === "Behind" ? "border-l-red-500" : 
                  project.priority === "Critical" ? "border-l-orange-500" : "border-l-green-500"
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <CardDescription>
                            {project.talentNeeded} positions needed • {project.deadline} deadline
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={
                          project.priority === "Critical" ? "bg-red-100 text-red-800 border-0" :
                          project.priority === "High" ? "bg-orange-100 text-orange-800 border-0" :
                          "bg-blue-100 text-blue-800 border-0"
                        }>
                          {project.priority}
                        </Badge>
                        <Badge className={
                          project.status === "Behind" ? "bg-red-100 text-red-800 border-0" :
                          "bg-green-100 text-green-800 border-0"
                        }>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Hiring Progress</div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{project.progress}%</span>
                          <span className="text-sm text-muted-foreground">complete</span>
                        </div>
                        <Progress value={project.progress} />
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-2">Talent Pipeline</div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-lg font-bold">{project.talentInTraining}</div>
                            <div className="text-xs text-muted-foreground">In Training</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">{Math.floor(project.talentInTraining * 0.6)}</div>
                            <div className="text-xs text-muted-foreground">Almost Ready</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant={project.status === "Behind" ? "default" : "outline"}>
                          {project.status === "Behind" ? "Urgent Review" : "View Pipeline"}
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Zap className="w-3 h-3 mr-1" />
                          AI Recommendations
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="talent" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Training Completion Rates</CardTitle>
                  <CardDescription>
                    Success rates by skill area and experience level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Machine Learning</div>
                        <div className="text-sm text-muted-foreground">32 candidates</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">92%</div>
                        <div className="text-xs text-muted-foreground">completion</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Backend Development</div>
                        <div className="text-sm text-muted-foreground">28 candidates</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">89%</div>
                        <div className="text-xs text-muted-foreground">completion</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">DevOps Engineering</div>
                        <div className="text-sm text-muted-foreground">18 candidates</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-yellow-600">76%</div>
                        <div className="text-xs text-muted-foreground">completion</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Candidates</CardTitle>
                  <CardDescription>
                    Candidates ready for immediate consideration
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Sarah Chen", skill: "ML Engineer", progress: 95, rating: 4.9 },
                      { name: "Marcus Rodriguez", skill: "Backend Dev", progress: 92, rating: 4.8 },
                      { name: "Elena Petrov", skill: "NLP Specialist", progress: 88, rating: 4.7 }
                    ].map((candidate, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-medium">{candidate.name}</div>
                            <div className="text-sm text-muted-foreground">{candidate.skill}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{candidate.rating}</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800 border-0 text-xs">
                            {candidate.progress}% Complete
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          rec.type === "urgent" ? "bg-red-100" :
                          rec.type === "opportunity" ? "bg-green-100" : "bg-blue-100"
                        }`}>
                          {rec.type === "urgent" ? <AlertTriangle className="w-5 h-5 text-red-600" /> :
                           rec.type === "opportunity" ? <TrendingUp className="w-5 h-5 text-green-600" /> :
                           <Zap className="w-5 h-5 text-blue-600" />}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{rec.title}</CardTitle>
                          <CardDescription>{rec.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={
                          rec.impact === "High" ? "bg-red-100 text-red-800 border-0" :
                          rec.impact === "Medium" ? "bg-orange-100 text-orange-800 border-0" :
                          "bg-blue-100 text-blue-800 border-0"
                        }>
                          {rec.impact} Impact
                        </Badge>
                        <Button size="sm">
                          {rec.action}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  AI Learning Insights
                </CardTitle>
                <CardDescription>
                  How our AI is continuously improving your hiring process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">23%</div>
                    <div className="text-sm text-muted-foreground">Faster Time to Hire</div>
                    <div className="text-xs text-muted-foreground mt-1">vs last month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">94%</div>
                    <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
                    <div className="text-xs text-muted-foreground mt-1">candidate success rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">41%</div>
                    <div className="text-sm text-muted-foreground">Cost Reduction</div>
                    <div className="text-xs text-muted-foreground mt-1">vs traditional recruiting</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
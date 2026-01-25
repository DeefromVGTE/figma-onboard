import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Users, TrendingUp, Target, Clock, AlertTriangle, CheckCircle, DollarSign, Building2, Star, UserCheck, Calendar } from "lucide-react";

const overviewMetrics = [
  { label: "Active Candidates", value: 247, change: +23, changeType: "positive", icon: Users },
  { label: "Ready to Hire", value: 34, change: +8, changeType: "positive", icon: UserCheck },
  { label: "Avg. Time to Hire", value: "18 days", change: -5, changeType: "positive", icon: Clock },
  { label: "Cost per Hire", value: "$2,840", change: -320, changeType: "positive", icon: DollarSign },
];

const pipelineData = [
  { month: "Jan", applications: 45, screening: 32, training: 28, hired: 12 },
  { month: "Feb", applications: 52, screening: 38, training: 31, hired: 15 },
  { month: "Mar", applications: 68, screening: 45, training: 38, hired: 18 },
  { month: "Apr", applications: 71, screening: 52, training: 42, hired: 22 },
  { month: "May", applications: 89, screening: 61, training: 48, hired: 25 },
  { month: "Jun", applications: 94, screening: 68, training: 55, hired: 28 },
];

const departmentData = [
  { name: "Engineering", hired: 45, needed: 60, progress: 75 },
  { name: "Product", hired: 12, needed: 15, progress: 80 },
  { name: "Data Science", hired: 8, needed: 12, progress: 67 },
  { name: "DevOps", hired: 6, needed: 8, progress: 75 },
];

const roiData = [
  { metric: "Training ROI", value: "340%", description: "vs traditional hiring" },
  { metric: "Time Saved", value: "65%", description: "faster hiring process" },
  { metric: "Quality Score", value: "92%", description: "candidate success rate" },
  { metric: "Cost Reduction", value: "45%", description: "vs agency recruitment" },
];

const activeProjects = [
  {
    name: "AI Customer Service Platform",
    department: "Engineering",
    positions: 8,
    filled: 6,
    inTraining: 12,
    priority: "High",
    deadline: "2024-09-15",
    budget: 45000,
    spent: 28000
  },
  {
    name: "Fraud Detection System",
    department: "Data Science", 
    positions: 5,
    filled: 2,
    inTraining: 8,
    priority: "Critical",
    deadline: "2024-08-30",
    budget: 38000,
    spent: 31000
  },
  {
    name: "Mobile App Redesign",
    department: "Product",
    positions: 6,
    filled: 4,
    inTraining: 5,
    priority: "Medium",
    deadline: "2024-10-01",
    budget: 32000,
    spent: 18000
  }
];

export function BusinessAnalyticsPage() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Business Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your talent pipeline performance and hiring success
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="roi">ROI Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-4">
              {overviewMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <metric.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="text-2xl font-bold">{metric.value}</div>
                        <div className="text-sm text-muted-foreground">{metric.label}</div>
                        <div className={`text-xs flex items-center gap-1 mt-1 ${
                          metric.changeType === "positive" ? "text-green-600" : "text-red-600"
                        }`}>
                          <TrendingUp className="w-3 h-3" />
                          {metric.changeType === "positive" ? "+" : ""}{metric.change}
                          {metric.label.includes("Cost") ? "" : metric.label.includes("Time") ? " days" : ""}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pipeline Overview */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>6-Month Pipeline Trends</CardTitle>
                  <CardDescription>Applications through to successful hires</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={pipelineData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="applications" stroke="#8884d8" strokeWidth={2} />
                      <Line type="monotone" dataKey="screening" stroke="#82ca9d" strokeWidth={2} />
                      <Line type="monotone" dataKey="training" stroke="#ffc658" strokeWidth={2} />
                      <Line type="monotone" dataKey="hired" stroke="#ff7300" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Department Hiring Progress</CardTitle>
                  <CardDescription>Current vs target headcount by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departmentData.map((dept, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{dept.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {dept.hired}/{dept.needed} hired
                          </span>
                        </div>
                        <Progress value={dept.progress} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest hiring pipeline updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "hire", message: "Sarah Chen completed ML Engineer training - Ready for interview", time: "2 hours ago", priority: "high" },
                    { type: "alert", message: "Fraud Detection project behind schedule - 3 candidates need fast-tracking", time: "4 hours ago", priority: "critical" },
                    { type: "progress", message: "15 new candidates started training this week", time: "1 day ago", priority: "normal" },
                    { type: "completion", message: "Mobile App team reached 67% hiring target", time: "2 days ago", priority: "normal" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.priority === "critical" ? "bg-red-100" :
                        activity.priority === "high" ? "bg-orange-100" : "bg-blue-100"
                      }`}>
                        {activity.type === "hire" ? <UserCheck className="w-4 h-4 text-green-600" /> :
                         activity.type === "alert" ? <AlertTriangle className="w-4 h-4 text-red-600" /> :
                         activity.type === "completion" ? <CheckCircle className="w-4 h-4 text-blue-600" /> :
                         <TrendingUp className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Conversion Funnel</CardTitle>
                  <CardDescription>How candidates progress through your pipeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={pipelineData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="month" type="category" />
                      <Tooltip />
                      <Bar dataKey="applications" fill="#e2e8f0" />
                      <Bar dataKey="screening" fill="#cbd5e1" />
                      <Bar dataKey="training" fill="#94a3b8" />
                      <Bar dataKey="hired" fill="#475569" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pipeline Health Metrics</CardTitle>
                  <CardDescription>Key performance indicators for your talent pipeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Application to Screening</span>
                        <span className="text-sm text-muted-foreground">72%</span>
                      </div>
                      <Progress value={72} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Screening to Training</span>
                        <span className="text-sm text-muted-foreground">85%</span>
                      </div>
                      <Progress value={85} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Training Completion</span>
                        <span className="text-sm text-muted-foreground">91%</span>
                      </div>
                      <Progress value={91} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Training to Hire</span>
                        <span className="text-sm text-muted-foreground">68%</span>
                      </div>
                      <Progress value={68} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Department Hiring Status</CardTitle>
                  <CardDescription>Progress toward hiring goals by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {departmentData.map((dept, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h4 className="font-semibold">{dept.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {dept.hired} of {dept.needed} positions filled
                            </p>
                          </div>
                          <Badge className={dept.progress >= 75 ? "bg-green-100 text-green-800 border-0" : "bg-orange-100 text-orange-800 border-0"}>
                            {dept.progress}%
                          </Badge>
                        </div>
                        <Progress value={dept.progress} className="mb-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Remaining: {dept.needed - dept.hired}</span>
                          <span>Target: {dept.needed}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skill Demand Analysis</CardTitle>
                  <CardDescription>Most requested skills across departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { skill: "Machine Learning", demand: 32, trend: "up" },
                      { skill: "React/Frontend", demand: 28, trend: "up" },
                      { skill: "Python", demand: 25, trend: "stable" },
                      { skill: "Node.js", demand: 22, trend: "up" },
                      { skill: "DevOps/AWS", demand: 18, trend: "down" },
                      { skill: "Product Management", demand: 15, trend: "up" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{item.skill}</div>
                          <div className="text-sm text-muted-foreground">{item.demand} open positions</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className={`w-4 h-4 ${
                            item.trend === "up" ? "text-green-600" : 
                            item.trend === "down" ? "text-red-600" : "text-gray-600"
                          }`} />
                          <Badge variant="outline">{item.trend}</Badge>
                        </div>
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
                  project.priority === "Critical" ? "border-l-red-500" :
                  project.priority === "High" ? "border-l-orange-500" : "border-l-blue-500"
                }`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <CardDescription>{project.department} Department</CardDescription>
                        </div>
                      </div>
                      <Badge className={
                        project.priority === "Critical" ? "bg-red-100 text-red-800 border-0" :
                        project.priority === "High" ? "bg-orange-100 text-orange-800 border-0" :
                        "bg-blue-100 text-blue-800 border-0"
                      }>
                        {project.priority} Priority
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-6">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Hiring Progress</div>
                        <div className="text-2xl font-bold">{project.filled}/{project.positions}</div>
                        <div className="text-sm text-muted-foreground">positions filled</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">In Training</div>
                        <div className="text-2xl font-bold text-blue-600">{project.inTraining}</div>
                        <div className="text-sm text-muted-foreground">candidates</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Budget Status</div>
                        <div className="text-lg font-bold">${project.spent.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">of ${project.budget.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Deadline</div>
                        <div className="text-lg font-bold">{new Date(project.deadline).toLocaleDateString()}</div>
                        <div className="text-sm text-muted-foreground">
                          {Math.ceil((new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Progress value={(project.filled / project.positions) * 100} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="roi" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>ROI Metrics</CardTitle>
                  <CardDescription>Return on investment for your AI-powered hiring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {roiData.map((item, index) => (
                      <div key={index} className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{item.value}</div>
                        <div className="font-medium">{item.metric}</div>
                        <div className="text-xs text-muted-foreground">{item.description}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Analysis</CardTitle>
                  <CardDescription>Breakdown of hiring costs vs traditional methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 border rounded-lg bg-green-50">
                      <div>
                        <div className="font-medium text-green-800">Onboard.AI Platform</div>
                        <div className="text-sm text-green-600">AI-powered recruitment & training</div>
                      </div>
                      <div className="text-xl font-bold text-green-800">$2,840</div>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium text-muted-foreground">Traditional Recruiting</div>
                        <div className="text-sm text-muted-foreground">Agency fees + onboarding</div>
                      </div>
                      <div className="text-xl font-bold text-muted-foreground line-through">$5,160</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">$2,320</div>
                      <div className="text-sm text-blue-600">Average savings per hire</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quarterly Business Impact</CardTitle>
                <CardDescription>How Onboard.AI has transformed your hiring process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">156</div>
                    <div className="text-sm text-muted-foreground">Total Hires This Quarter</div>
                    <div className="text-xs text-green-600">+47% vs last quarter</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">94%</div>
                    <div className="text-sm text-muted-foreground">Employee Retention Rate</div>
                    <div className="text-xs text-green-600">+12% vs industry avg</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">$441K</div>
                    <div className="text-sm text-muted-foreground">Total Cost Savings</div>
                    <div className="text-xs text-green-600">This quarter alone</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
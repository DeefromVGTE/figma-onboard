import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, Area 
} from "recharts";
import { 
  Users, TrendingUp, Award, Clock, Target, Zap, 
  CheckCircle2, UserCheck, Briefcase, Calendar, Download,
  Brain, Star, Trophy, DollarSign, TrendingDown
} from "lucide-react";
import { RecruiterNav } from "../RecruiterNav";

const keyMetrics = [
  { 
    label: "Total Active Candidates", 
    value: "124", 
    change: "+12%", 
    trend: "up",
    icon: Users,
    color: "blue"
  },
  { 
    label: "Avg. Time to Placement", 
    value: "28 days", 
    change: "-15%", 
    trend: "up",
    icon: Clock,
    color: "green"
  },
  { 
    label: "Placement Success Rate", 
    value: "87%", 
    change: "+8%", 
    trend: "up",
    icon: Target,
    color: "purple"
  },
  { 
    label: "Avg. Job Readiness Score", 
    value: "78%", 
    change: "+5%", 
    trend: "up",
    icon: Award,
    color: "orange"
  }
];

const candidateDistribution = [
  { name: "Standby", value: 48, color: "#94a3b8" },
  { name: "In Training", value: 42, color: "#3b82f6" },
  { name: "Job Ready", value: 34, color: "#8b5cf6" },
  { name: "In Onboarding", value: 12, color: "#f59e0b" },
  { name: "Placed", value: 28, color: "#10b981" }
];

const monthlyPerformance = [
  { month: "Jan", placements: 18, activations: 25, avgReadiness: 72, revenue: 45000 },
  { month: "Feb", placements: 22, activations: 28, avgReadiness: 74, revenue: 55000 },
  { month: "Mar", placements: 25, activations: 32, avgReadiness: 76, revenue: 62500 },
  { month: "Apr", placements: 28, activations: 35, avgReadiness: 78, revenue: 70000 },
  { month: "May", placements: 32, activations: 38, avgReadiness: 78, revenue: 80000 }
];

const skillsInDemand = [
  { skill: "Machine Learning", candidates: 45, placements: 12, avgReadiness: 82 },
  { skill: "Python", candidates: 68, placements: 18, avgReadiness: 85 },
  { skill: "React", candidates: 52, placements: 15, avgReadiness: 80 },
  { skill: "Node.js", candidates: 48, placements: 14, avgReadiness: 78 },
  { skill: "AWS", candidates: 38, placements: 10, avgReadiness: 76 },
  { skill: "PostgreSQL", candidates: 35, placements: 9, avgReadiness: 79 }
];

const readinessDistribution = [
  { range: "0-20%", count: 8 },
  { range: "21-40%", count: 15 },
  { range: "41-60%", count: 28 },
  { range: "61-80%", count: 42 },
  { range: "81-100%", count: 31 }
];

const trainingEfficiency = [
  { week: "Week 1", completion: 65, engagement: 78, satisfaction: 82 },
  { week: "Week 2", completion: 72, engagement: 82, satisfaction: 85 },
  { week: "Week 3", completion: 78, engagement: 85, satisfaction: 87 },
  { week: "Week 4", completion: 85, engagement: 88, satisfaction: 89 },
  { week: "Week 5", completion: 88, engagement: 90, satisfaction: 91 },
  { week: "Week 6", completion: 92, engagement: 92, satisfaction: 93 }
];

const rolePerformance = [
  { role: "Full Stack Developer", avgReadiness: 82, placements: 8, timeToReady: 24 },
  { role: "Backend Engineer", avgReadiness: 79, placements: 7, timeToReady: 22 },
  { role: "ML Engineer", avgReadiness: 76, placements: 5, timeToReady: 28 },
  { role: "Frontend Developer", avgReadiness: 85, placements: 9, timeToReady: 20 },
  { role: "DevOps Engineer", avgReadiness: 74, placements: 4, timeToReady: 26 }
];

const comparisonMetrics = {
  industry: {
    avgTimeToHire: 42,
    placementRate: 68,
    retentionRate: 78,
    candidateSatisfaction: 72
  },
  platform: {
    avgTimeToHire: 28,
    placementRate: 87,
    retentionRate: 92,
    candidateSatisfaction: 89
  }
};

const COLORS = ["#3b82f6", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444"];

export function RecruiterAnalyticsPage() {
  return (
    <>
      <RecruiterNav />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Analytics & Insights
              </h1>
              <p className="text-muted-foreground">
                Comprehensive analytics for your talent pipeline and recruitment performance
              </p>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Analytics Report
            </Button>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {keyMetrics.map((metric, index) => (
              <Card key={index} className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 bg-${metric.color}-100 rounded-xl flex items-center justify-center`}>
                      <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
                    </div>
                    <Badge className={metric.trend === "up" ? "bg-green-100 text-green-700 border-0" : "bg-red-100 text-red-700 border-0"}>
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-white shadow-lg">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="pipeline">Pipeline Analysis</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="skills">Skills Analytics</TabsTrigger>
              <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Candidate Distribution</CardTitle>
                    <CardDescription>Current pipeline stage breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={candidateDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {candidateDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Monthly Performance Trends</CardTitle>
                    <CardDescription>Placements and activations over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={monthlyPerformance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="placements" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="activations" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Job Readiness Distribution</CardTitle>
                  <CardDescription>How candidates are distributed across readiness scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={readinessDistribution}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pipeline Analysis Tab */}
            <TabsContent value="pipeline" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Training Efficiency Metrics</CardTitle>
                    <CardDescription>Weekly completion, engagement, and satisfaction rates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={trainingEfficiency}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="completion" stroke="#10b981" strokeWidth={3} />
                        <Line type="monotone" dataKey="engagement" stroke="#3b82f6" strokeWidth={3} />
                        <Line type="monotone" dataKey="satisfaction" stroke="#8b5cf6" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Role Performance Analysis</CardTitle>
                    <CardDescription>Readiness scores and placement success by role</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {rolePerformance.map((role, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="font-semibold">{role.role}</div>
                            <Badge className="bg-purple-100 text-purple-700 border-0">
                              {role.avgReadiness}% Ready
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Placements</div>
                              <div className="font-semibold text-lg">{role.placements}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Avg. Time to Ready</div>
                              <div className="font-semibold text-lg">{role.timeToReady} days</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Revenue & Placements</CardTitle>
                    <CardDescription>Monthly revenue from successful placements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={monthlyPerformance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Bar yAxisId="left" dataKey="placements" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                        <Bar yAxisId="right" dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <CardTitle>Average Readiness Over Time</CardTitle>
                    <CardDescription>Track improvement in candidate quality</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={monthlyPerformance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Area type="monotone" dataKey="avgReadiness" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <Trophy className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-700 mb-1">96%</div>
                    <div className="text-sm font-medium text-green-600 mb-2">90-Day Retention Rate</div>
                    <div className="text-xs text-muted-foreground">Industry avg: 78%</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <Zap className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-700 mb-1">28</div>
                    <div className="text-sm font-medium text-blue-600 mb-2">Avg. Days to Placement</div>
                    <div className="text-xs text-muted-foreground">33% faster than industry</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <Star className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-purple-700 mb-1">4.8/5</div>
                    <div className="text-sm font-medium text-purple-600 mb-2">Client Satisfaction</div>
                    <div className="text-xs text-muted-foreground">Based on 142 reviews</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Skills Analytics Tab */}
            <TabsContent value="skills" className="space-y-6">
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Top Skills in Demand</CardTitle>
                  <CardDescription>Most requested skills with candidate availability and readiness</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillsInDemand.map((skill, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-semibold text-lg">{skill.skill}</div>
                          <Badge className="bg-blue-100 text-blue-700 border-0">
                            {skill.avgReadiness}% Avg. Readiness
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Active Candidates</div>
                            <div className="text-2xl font-bold text-blue-600">{skill.candidates}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Placements (30d)</div>
                            <div className="text-2xl font-bold text-green-600">{skill.placements}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Supply/Demand</div>
                            <div className="text-2xl font-bold text-purple-600">
                              {(skill.candidates / skill.placements).toFixed(1)}x
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Benchmarks Tab */}
            <TabsContent value="benchmarks" className="space-y-6">
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Platform vs. Industry Benchmarks</CardTitle>
                  <CardDescription>See how Onboard.AI performs against industry standards</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Average Time to Hire</span>
                          <div className="flex gap-4 text-sm">
                            <span className="text-blue-600 font-semibold">{comparisonMetrics.platform.avgTimeToHire} days</span>
                            <span className="text-gray-400">{comparisonMetrics.industry.avgTimeToHire} days</span>
                          </div>
                        </div>
                        <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="absolute h-full bg-blue-500 rounded-full"
                            style={{ width: `${(comparisonMetrics.platform.avgTimeToHire / comparisonMetrics.industry.avgTimeToHire) * 100}%` }}
                          />
                        </div>
                        <div className="text-xs text-green-600 mt-1 font-medium">
                          33% faster than industry average
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Placement Success Rate</span>
                          <div className="flex gap-4 text-sm">
                            <span className="text-purple-600 font-semibold">{comparisonMetrics.platform.placementRate}%</span>
                            <span className="text-gray-400">{comparisonMetrics.industry.placementRate}%</span>
                          </div>
                        </div>
                        <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="absolute h-full bg-purple-500 rounded-full"
                            style={{ width: `${comparisonMetrics.platform.placementRate}%` }}
                          />
                        </div>
                        <div className="text-xs text-green-600 mt-1 font-medium">
                          {comparisonMetrics.platform.placementRate - comparisonMetrics.industry.placementRate}% above industry
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">90-Day Retention Rate</span>
                          <div className="flex gap-4 text-sm">
                            <span className="text-green-600 font-semibold">{comparisonMetrics.platform.retentionRate}%</span>
                            <span className="text-gray-400">{comparisonMetrics.industry.retentionRate}%</span>
                          </div>
                        </div>
                        <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="absolute h-full bg-green-500 rounded-full"
                            style={{ width: `${comparisonMetrics.platform.retentionRate}%` }}
                          />
                        </div>
                        <div className="text-xs text-green-600 mt-1 font-medium">
                          {comparisonMetrics.platform.retentionRate - comparisonMetrics.industry.retentionRate}% above industry
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Candidate Satisfaction</span>
                          <div className="flex gap-4 text-sm">
                            <span className="text-orange-600 font-semibold">{comparisonMetrics.platform.candidateSatisfaction}%</span>
                            <span className="text-gray-400">{comparisonMetrics.industry.candidateSatisfaction}%</span>
                          </div>
                        </div>
                        <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="absolute h-full bg-orange-500 rounded-full"
                            style={{ width: `${comparisonMetrics.platform.candidateSatisfaction}%` }}
                          />
                        </div>
                        <div className="text-xs text-green-600 mt-1 font-medium">
                          {comparisonMetrics.platform.candidateSatisfaction - comparisonMetrics.industry.candidateSatisfaction}% above industry
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6">
                      <h3 className="font-semibold text-lg mb-4">Why Onboard.AI Outperforms</h3>
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">Skills-First Matching</div>
                            <div className="text-sm text-muted-foreground">
                              Verified abilities through GPR, not just resumes
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">AI-Powered Training</div>
                            <div className="text-sm text-muted-foreground">
                              Personalized learning paths for faster skill development
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">ID.ME Verification</div>
                            <div className="text-sm text-muted-foreground">
                              Trusted identity verification reduces fraud and improves quality
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium">Job Readiness Scoring</div>
                            <div className="text-sm text-muted-foreground">
                              Real-time insights into candidate preparedness
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

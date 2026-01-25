import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { 
  Users, Target, TrendingUp, Award, CheckCircle2, AlertCircle, 
  Clock, UserCheck, Briefcase, Calendar, Eye, MessageSquare, 
  Download, FileText, Brain, Zap, Star, ArrowRight
} from "lucide-react";
import { RecruiterNav } from "../RecruiterNav";
import { useRouter } from "../Router";

const dashboardMetrics = [
  { 
    label: "Active Candidates", 
    value: 124, 
    change: +12, 
    icon: Users,
    color: "blue"
  },
  { 
    label: "Avg Job Readiness", 
    value: "78%", 
    change: +5, 
    icon: Target,
    color: "purple"
  },
  { 
    label: "Placements This Month", 
    value: 28, 
    change: +8, 
    icon: UserCheck,
    color: "green"
  },
  { 
    label: "Roles to Fill", 
    value: 15, 
    change: -3, 
    icon: Briefcase,
    color: "orange"
  }
];

const pipelineData = [
  { stage: "Standby", count: 48, color: "#94a3b8" },
  { stage: "In Training", count: 42, color: "#3b82f6" },
  { stage: "Job Ready", count: 34, color: "#8b5cf6" },
  { stage: "In Onboarding", count: 12, color: "#f59e0b" },
  { stage: "Placed", count: 28, color: "#10b981" }
];

const monthlyTrends = [
  { month: "Jan", candidates: 85, placements: 18, readiness: 72 },
  { month: "Feb", candidates: 92, placements: 22, readiness: 74 },
  { month: "Mar", candidates: 108, placements: 25, readiness: 76 },
  { month: "Apr", candidates: 115, placements: 28, readiness: 78 },
  { month: "May", candidates: 124, placements: 32, readiness: 78 }
];

const topCandidates = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "AI Engineer",
    readinessScore: 94,
    skills: ["Python", "TensorFlow", "ML"],
    location: "San Francisco, CA",
    status: "Ready for Placement",
    matchScore: 96
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Backend Engineer",
    readinessScore: 89,
    skills: ["Node.js", "PostgreSQL", "Docker"],
    location: "Austin, TX",
    status: "In Training",
    matchScore: 92
  },
  {
    id: 3,
    name: "Elena Petrov",
    role: "Full Stack Developer",
    readinessScore: 91,
    skills: ["React", "Python", "AWS"],
    location: "Remote",
    status: "Ready for Placement",
    matchScore: 94
  }
];

const recentActivities = [
  {
    type: "placement",
    message: "Alex Johnson placed at DataFlow Inc as Senior ML Engineer",
    time: "2 hours ago",
    icon: CheckCircle2,
    color: "text-green-600"
  },
  {
    type: "ready",
    message: "Sarah Chen achieved 94% Job Readiness Score",
    time: "5 hours ago",
    icon: Star,
    color: "text-purple-600"
  },
  {
    type: "verification",
    message: "3 new candidates completed ID.ME verification",
    time: "1 day ago",
    icon: CheckCircle2,
    color: "text-blue-600"
  },
  {
    type: "training",
    message: "15 candidates completed technical assessments",
    time: "2 days ago",
    icon: Brain,
    color: "text-indigo-600"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Ready for Placement":
      return "bg-green-100 text-green-800 border-0";
    case "In Training":
      return "bg-blue-100 text-blue-800 border-0";
    case "Job Ready":
      return "bg-purple-100 text-purple-800 border-0";
    default:
      return "bg-gray-100 text-gray-800 border-0";
  }
};

export function RecruiterDashboard() {
  const { navigateTo } = useRouter();

  return (
    <>
      <RecruiterNav />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Recruiter Dashboard
              </h1>
              <p className="text-muted-foreground">
                Comprehensive overview of your talent pipeline and recruitment operations
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button onClick={() => navigateTo("define")}>
                <Briefcase className="w-4 h-4 mr-2" />
                Define Roles
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {dashboardMetrics.map((metric, index) => (
              <Card key={index} className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-${metric.color}-100 rounded-xl flex items-center justify-center`}>
                      <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                      <div className={`text-xs flex items-center gap-1 mt-1 ${
                        metric.change > 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        <span>{metric.change > 0 ? "+" : ""}{metric.change}</span>
                        <span className="text-muted-foreground">vs last month</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Pipeline Overview */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle>Talent Pipeline Status</CardTitle>
                <CardDescription>Current distribution across pipeline stages</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={pipelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Trends */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Candidate growth and placement trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="candidates" stroke="#3b82f6" strokeWidth={3} />
                    <Line type="monotone" dataKey="placements" stroke="#10b981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Top Candidates */}
            <Card className="lg:col-span-2 bg-white shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Top Candidates</CardTitle>
                  <CardDescription>Highest readiness scores in your pipeline</CardDescription>
                </div>
                <Button variant="ghost" onClick={() => navigateTo("talent")}>
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCandidates.map((candidate) => (
                    <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium">{candidate.name}</div>
                          <div className="text-sm text-muted-foreground">{candidate.role} • {candidate.location}</div>
                          <div className="flex gap-1 mt-1">
                            {candidate.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">{candidate.readinessScore}%</div>
                        <div className="text-xs text-muted-foreground mb-2">Job Ready</div>
                        <Badge className={getStatusColor(candidate.status)}>
                          {candidate.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white shadow-lg border-0">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0`}>
                        <activity.icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Access key features and workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex flex-col items-start gap-2"
                  onClick={() => navigateTo("define")}
                >
                  <Target className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <div className="font-semibold">Define New Roles</div>
                    <div className="text-xs text-muted-foreground">Set requirements for positions</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex flex-col items-start gap-2"
                  onClick={() => navigateTo("candidate-activation")}
                >
                  <Zap className="w-5 h-5 text-purple-600" />
                  <div className="text-left">
                    <div className="font-semibold">Activate Candidates</div>
                    <div className="text-xs text-muted-foreground">Start training for standby talent</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex flex-col items-start gap-2"
                  onClick={() => navigateTo("verification-management")}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div className="text-left">
                    <div className="font-semibold">Verify Candidates</div>
                    <div className="text-xs text-muted-foreground">Review ID.ME verifications</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

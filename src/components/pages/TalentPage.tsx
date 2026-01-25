import { useState } from 'react';
import { 
  Users, Search, Filter, Download, Mail, Phone, MapPin, 
  GraduationCap, Brain, TrendingUp, Star, Eye, UserCheck,
  Clock, Target, CheckCircle, AlertTriangle, MoreVertical,
  Calendar, Award, BookOpen, Briefcase, ChevronDown, Code,
  FileText, Zap, BarChart3, History, Activity, Trophy,
  Layers, GitBranch, Package, MessageSquare, X, Wrench, Sparkles
} from "lucide-react";
import { RecruiterNav } from "../RecruiterNav";
import { useRouter } from "../Router";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface AssessmentBreakdown {
  technicalAssessment: number;
  codingChallenges: number;
  behavioralAssessment: number;
  problemSolving: number;
  systemDesign: number;
  communicationSkills: number;
}

interface Material {
  type: "code" | "document" | "project" | "task";
  name: string;
  date: string;
  impact: number;
  skillsUsed: string[];
  toolsUsed: string[];
}

interface Accomplishment {
  id: string;
  title: string;
  description: string;
  date: string;
  category: "project" | "skill" | "certification" | "milestone";
  artifacts: string[];
  skillsUsed: string[];
  skillsGained: string[];
  toolsUsed: string[];
}

interface GPRRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  gprCreatedDate: string;
  targetRole: string;
  status: "Pending Activation" | "Training" | "Onboarding" | "Job Ready" | "Placed";
  jobReadyScore: number;
  skillsGapPercentage: number;
  progress: number;
  
  // Assessment Breakdown
  assessmentBreakdown: AssessmentBreakdown;
  
  // Materials used for calculation
  materials: Material[];
  
  // Accomplishments and History
  accomplishments: Accomplishment[];
  
  // Analytics
  totalProjectsCompleted: number;
  totalCodeCommits: number;
  learningHoursLogged: number;
  assessmentsPassed: number;
  certifications: string[];
  skills: string[];
  skillsGained: string[];
  toolsUsed: string[];
  
  // Additional info
  lastActivity: string;
  timeInPlatform: string;
}

const mockGPRRecords: GPRRecord[] = [
  {
    id: "GPR-001",
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    avatar: "",
    gprCreatedDate: "2024-11-15",
    targetRole: "AI Engineer",
    status: "Training",
    jobReadyScore: 78,
    skillsGapPercentage: 22,
    progress: 65,
    assessmentBreakdown: {
      technicalAssessment: 85,
      codingChallenges: 82,
      behavioralAssessment: 88,
      problemSolving: 79,
      systemDesign: 65,
      communicationSkills: 92
    },
    materials: [
      { type: "code", name: "ML Model Implementation", date: "2025-01-20", impact: 95, skillsUsed: ["Python", "TensorFlow"], toolsUsed: ["Jupyter Notebook"] },
      { type: "project", name: "Sentiment Analysis Tool", date: "2025-01-18", impact: 88, skillsUsed: ["Python", "Pandas"], toolsUsed: ["Scikit-learn"] },
      { type: "document", name: "AI Architecture Design Doc", date: "2025-01-15", impact: 82, skillsUsed: ["Python", "TensorFlow"], toolsUsed: ["Google Docs"] },
      { type: "code", name: "Data Pipeline Script", date: "2025-01-10", impact: 90, skillsUsed: ["Python", "Pandas"], toolsUsed: ["Apache Airflow"] }
    ],
    accomplishments: [
      {
        id: "acc-1",
        title: "Built Production ML Pipeline",
        description: "Designed and implemented end-to-end machine learning pipeline with automated data processing and model deployment",
        date: "2025-01-18",
        category: "project",
        artifacts: ["GitHub Repo", "Deployment Logs", "Performance Metrics"],
        skillsUsed: ["Python", "TensorFlow"],
        skillsGained: ["Model Deployment", "Data Processing"],
        toolsUsed: ["Jupyter Notebook", "Docker"]
      },
      {
        id: "acc-2",
        title: "Completed Advanced Python Certification",
        description: "Achieved 95% score in advanced Python programming assessment",
        date: "2025-01-05",
        category: "certification",
        artifacts: ["Certificate", "Assessment Results"],
        skillsUsed: ["Python"],
        skillsGained: ["Advanced Python"],
        toolsUsed: ["Jupyter Notebook"]
      },
      {
        id: "acc-3",
        title: "Mastered TensorFlow Framework",
        description: "Built 5 deep learning models demonstrating proficiency in TensorFlow",
        date: "2024-12-28",
        category: "skill",
        artifacts: ["Model Implementations", "Code Reviews"],
        skillsUsed: ["TensorFlow"],
        skillsGained: ["Deep Learning"],
        toolsUsed: ["Jupyter Notebook"]
      }
    ],
    totalProjectsCompleted: 12,
    totalCodeCommits: 324,
    learningHoursLogged: 156,
    assessmentsPassed: 18,
    certifications: ["Python Advanced", "Machine Learning Fundamentals", "Deep Learning Specialization"],
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Docker"],
    skillsGained: ["Model Deployment", "Data Processing", "Advanced Python", "Deep Learning"],
    toolsUsed: ["Jupyter Notebook", "Docker", "Apache Airflow"],
    lastActivity: "2 hours ago",
    timeInPlatform: "2 months"
  },
  {
    id: "GPR-002",
    name: "Marcus Rodriguez",
    email: "marcus.r@email.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    avatar: "",
    gprCreatedDate: "2024-10-20",
    targetRole: "Backend Engineer",
    status: "Job Ready",
    jobReadyScore: 94,
    skillsGapPercentage: 6,
    progress: 100,
    assessmentBreakdown: {
      technicalAssessment: 96,
      codingChallenges: 94,
      behavioralAssessment: 91,
      problemSolving: 95,
      systemDesign: 92,
      communicationSkills: 89
    },
    materials: [
      { type: "code", name: "Microservices Architecture", date: "2025-01-19", impact: 98, skillsUsed: ["Node.js", "Docker"], toolsUsed: ["Kubernetes"] },
      { type: "project", name: "RESTful API Design", date: "2025-01-17", impact: 95, skillsUsed: ["Node.js", "Express"], toolsUsed: ["Postman"] },
      { type: "code", name: "Database Optimization", date: "2025-01-15", impact: 93, skillsUsed: ["PostgreSQL", "MongoDB"], toolsUsed: ["pgAdmin"] },
      { type: "document", name: "System Architecture Doc", date: "2025-01-12", impact: 90, skillsUsed: ["Node.js", "Docker"], toolsUsed: ["Google Docs"] }
    ],
    accomplishments: [
      {
        id: "acc-4",
        title: "Architected Scalable Microservices System",
        description: "Designed and built distributed system handling 10k+ requests/second",
        date: "2025-01-19",
        category: "project",
        artifacts: ["Architecture Diagrams", "Performance Tests", "Code Repository"],
        skillsUsed: ["Node.js", "Docker"],
        skillsGained: ["Microservices", "Distributed Systems"],
        toolsUsed: ["Kubernetes", "Postman"]
      },
      {
        id: "acc-5",
        title: "Database Performance Optimization Expert",
        description: "Optimized database queries reducing response time by 75%",
        date: "2025-01-10",
        category: "skill",
        artifacts: ["Before/After Metrics", "Query Analysis"],
        skillsUsed: ["PostgreSQL", "MongoDB"],
        skillsGained: ["Database Optimization"],
        toolsUsed: ["pgAdmin"]
      },
      {
        id: "acc-6",
        title: "AWS Solutions Architect Certified",
        description: "Passed AWS Solutions Architect certification with distinction",
        date: "2024-12-15",
        category: "certification",
        artifacts: ["AWS Certificate", "Practical Projects"],
        skillsUsed: ["AWS"],
        skillsGained: ["AWS Solutions Architect"],
        toolsUsed: ["AWS Management Console"]
      }
    ],
    totalProjectsCompleted: 24,
    totalCodeCommits: 578,
    learningHoursLogged: 245,
    assessmentsPassed: 32,
    certifications: ["AWS Solutions Architect", "Kubernetes Administrator", "Node.js Advanced"],
    skills: ["Node.js", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "AWS", "Redis", "GraphQL"],
    skillsGained: ["Microservices", "Distributed Systems", "Database Optimization", "AWS Solutions Architect"],
    toolsUsed: ["Kubernetes", "Postman", "pgAdmin", "AWS Management Console"],
    lastActivity: "1 day ago",
    timeInPlatform: "3 months"
  },
  {
    id: "GPR-003",
    name: "Elena Rodriguez",
    email: "elena.r@email.com",
    phone: "+1 (555) 456-7890",
    location: "New York, NY",
    avatar: "",
    gprCreatedDate: "2025-01-05",
    targetRole: "Frontend Developer",
    status: "Training",
    jobReadyScore: 68,
    skillsGapPercentage: 32,
    progress: 48,
    assessmentBreakdown: {
      technicalAssessment: 72,
      codingChallenges: 65,
      behavioralAssessment: 85,
      problemSolving: 70,
      systemDesign: 58,
      communicationSkills: 88
    },
    materials: [
      { type: "project", name: "E-commerce Frontend", date: "2025-01-22", impact: 75, skillsUsed: ["React", "JavaScript"], toolsUsed: ["Webpack"] },
      { type: "code", name: "React Component Library", date: "2025-01-20", impact: 78, skillsUsed: ["React", "JavaScript"], toolsUsed: ["Storybook"] },
      { type: "document", name: "UI/UX Design System", date: "2025-01-18", impact: 70, skillsUsed: ["React", "JavaScript"], toolsUsed: ["Figma"] },
      { type: "code", name: "State Management Implementation", date: "2025-01-15", impact: 72, skillsUsed: ["React", "JavaScript"], toolsUsed: ["Redux"] }
    ],
    accomplishments: [
      {
        id: "acc-7",
        title: "Built Responsive E-commerce Site",
        description: "Created fully responsive e-commerce platform with shopping cart and checkout",
        date: "2025-01-22",
        category: "project",
        artifacts: ["Live Demo", "Code Repository", "Design Files"],
        skillsUsed: ["React", "JavaScript"],
        skillsGained: ["Responsive Design", "E-commerce"],
        toolsUsed: ["Webpack", "Storybook"]
      },
      {
        id: "acc-8",
        title: "React Fundamentals Certification",
        description: "Completed comprehensive React training with hands-on projects",
        date: "2025-01-12",
        category: "certification",
        artifacts: ["Certificate", "Project Portfolio"],
        skillsUsed: ["React"],
        skillsGained: ["React Fundamentals"],
        toolsUsed: ["Storybook"]
      }
    ],
    totalProjectsCompleted: 6,
    totalCodeCommits: 145,
    learningHoursLogged: 78,
    assessmentsPassed: 9,
    certifications: ["React Fundamentals", "JavaScript ES6+"],
    skills: ["React", "JavaScript", "HTML", "CSS", "Tailwind", "Git"],
    skillsGained: ["Responsive Design", "E-commerce", "React Fundamentals"],
    toolsUsed: ["Webpack", "Storybook", "Figma", "Redux"],
    lastActivity: "3 hours ago",
    timeInPlatform: "3 weeks"
  },
  {
    id: "GPR-004",
    name: "David Kim",
    email: "david.kim@email.com",
    phone: "+1 (555) 567-8901",
    location: "Seattle, WA",
    avatar: "",
    gprCreatedDate: "2024-09-10",
    targetRole: "Full Stack Developer",
    status: "Placed",
    jobReadyScore: 91,
    skillsGapPercentage: 9,
    progress: 100,
    assessmentBreakdown: {
      technicalAssessment: 92,
      codingChallenges: 90,
      behavioralAssessment: 94,
      problemSolving: 88,
      systemDesign: 89,
      communicationSkills: 95
    },
    materials: [
      { type: "project", name: "Full Stack SaaS Platform", date: "2025-01-15", impact: 96, skillsUsed: ["React", "Node.js", "MongoDB"], toolsUsed: ["Docker"] },
      { type: "code", name: "Authentication System", date: "2025-01-10", impact: 92, skillsUsed: ["Node.js", "Express"], toolsUsed: ["Postman"] },
      { type: "project", name: "Real-time Chat Application", date: "2025-01-05", impact: 90, skillsUsed: ["React", "Node.js", "MongoDB"], toolsUsed: ["Docker"] },
      { type: "document", name: "API Documentation", date: "2024-12-28", impact: 88, skillsUsed: ["Node.js", "Express"], toolsUsed: ["Postman"] }
    ],
    accomplishments: [
      {
        id: "acc-9",
        title: "Launched Production SaaS Platform",
        description: "Built and deployed complete SaaS application with 500+ active users",
        date: "2025-01-15",
        category: "project",
        artifacts: ["Production URL", "User Analytics", "Technical Documentation"],
        skillsUsed: ["React", "Node.js", "MongoDB"],
        skillsGained: ["SaaS Development", "Deployment"],
        toolsUsed: ["Docker", "Postman"]
      },
      {
        id: "acc-10",
        title: "Full Stack Developer Certification",
        description: "Completed comprehensive full stack development program",
        date: "2024-12-01",
        category: "certification",
        artifacts: ["Certificate", "Capstone Project"],
        skillsUsed: ["React", "Node.js", "MongoDB"],
        skillsGained: ["Full Stack Development"],
        toolsUsed: ["Docker", "Postman"]
      },
      {
        id: "acc-11",
        title: "Successfully Placed at TechCorp",
        description: "Hired as Senior Full Stack Developer at TechCorp Inc.",
        date: "2025-01-22",
        category: "milestone",
        artifacts: ["Offer Letter", "Performance Reviews"],
        skillsUsed: ["React", "Node.js", "MongoDB"],
        skillsGained: ["SaaS Development", "Deployment"],
        toolsUsed: ["Docker", "Postman"]
      }
    ],
    totalProjectsCompleted: 28,
    totalCodeCommits: 642,
    learningHoursLogged: 312,
    assessmentsPassed: 35,
    certifications: ["Full Stack Developer", "React Advanced", "Node.js Expert", "MongoDB Certified"],
    skills: ["React", "Node.js", "MongoDB", "Express", "TypeScript", "GraphQL", "AWS", "Docker"],
    skillsGained: ["SaaS Development", "Deployment", "Full Stack Development"],
    toolsUsed: ["Docker", "Postman", "AWS Management Console"],
    lastActivity: "5 days ago",
    timeInPlatform: "4 months"
  },
  {
    id: "GPR-005",
    name: "Priya Patel",
    email: "priya.patel@email.com",
    phone: "+1 (555) 678-9012",
    location: "Chicago, IL",
    avatar: "",
    gprCreatedDate: "2025-01-18",
    targetRole: "Data Scientist",
    status: "Pending Activation",
    jobReadyScore: 0,
    skillsGapPercentage: 100,
    progress: 0,
    assessmentBreakdown: {
      technicalAssessment: 0,
      codingChallenges: 0,
      behavioralAssessment: 0,
      problemSolving: 0,
      systemDesign: 0,
      communicationSkills: 0
    },
    materials: [],
    accomplishments: [],
    totalProjectsCompleted: 0,
    totalCodeCommits: 0,
    learningHoursLogged: 0,
    assessmentsPassed: 0,
    certifications: [],
    skills: [],
    skillsGained: [],
    toolsUsed: [],
    lastActivity: "Never",
    timeInPlatform: "6 days",
  }
];

export function TalentPage() {
  const [gprRecords] = useState<GPRRecord[]>(mockGPRRecords);
  const [filteredRecords, setFilteredRecords] = useState<GPRRecord[]>(mockGPRRecords);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedGPR, setSelectedGPR] = useState<GPRRecord | null>(null);
  const router = useRouter();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterRecords(term, statusFilter, roleFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterRecords(searchTerm, status, roleFilter);
  };

  const handleRoleFilter = (role: string) => {
    setRoleFilter(role);
    filterRecords(searchTerm, statusFilter, role);
  };

  const filterRecords = (search: string, status: string, role: string) => {
    let filtered = gprRecords;

    if (search) {
      filtered = filtered.filter(record =>
        record.name.toLowerCase().includes(search.toLowerCase()) ||
        record.email.toLowerCase().includes(search.toLowerCase()) ||
        record.id.toLowerCase().includes(search.toLowerCase()) ||
        record.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (status !== "all") {
      filtered = filtered.filter(record => record.status === status);
    }

    if (role !== "all") {
      filtered = filtered.filter(record => record.targetRole === role);
    }

    setFilteredRecords(filtered);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      "Pending Activation": "bg-gray-100 text-gray-800 border-gray-300",
      "Training": "bg-blue-100 text-blue-800 border-blue-300",
      "Onboarding": "bg-orange-100 text-orange-800 border-orange-300",
      "Job Ready": "bg-green-100 text-green-800 border-green-300",
      "Placed": "bg-purple-100 text-purple-800 border-purple-300"
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    if (score >= 50) return "text-orange-600";
    return "text-red-600";
  };

  const statusCounts = {
    "Pending Activation": gprRecords.filter(r => r.status === "Pending Activation").length,
    "Training": gprRecords.filter(r => r.status === "Training").length,
    "Onboarding": gprRecords.filter(r => r.status === "Onboarding").length,
    "Job Ready": gprRecords.filter(r => r.status === "Job Ready").length,
    "Placed": gprRecords.filter(r => r.status === "Placed").length,
  };

  const avgJobReadyScore = Math.round(
    gprRecords.filter(r => r.jobReadyScore > 0).reduce((sum, r) => sum + r.jobReadyScore, 0) / 
    gprRecords.filter(r => r.jobReadyScore > 0).length || 0
  );

  // GPR Detail View
  if (selectedGPR) {
    return (
      <>
        {router.userRole === "recruiter" && <RecruiterNav />}
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
          <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <div className="mb-6">
              <Button variant="outline" onClick={() => setSelectedGPR(null)}>
                ← Back to GPR Database
              </Button>
            </div>

            {/* GPR Header */}
            <Card className="mb-6 bg-white/80 backdrop-blur border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-6">
                    <Avatar className="w-20 h-20 border-4 border-purple-200">
                      <AvatarImage src={selectedGPR.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-2xl">
                        {selectedGPR.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold">{selectedGPR.name}</h1>
                        <Badge className={`${getStatusColor(selectedGPR.status)} border`}>
                          {selectedGPR.status}
                        </Badge>
                      </div>
                      <p className="text-lg text-purple-600 font-medium mb-3">{selectedGPR.targetRole}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {selectedGPR.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {selectedGPR.phone}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {selectedGPR.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          GPR Created: {selectedGPR.gprCreatedDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Time on Platform: {selectedGPR.timeInPlatform}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground mb-1">GPR ID</div>
                    <div className="text-2xl font-bold text-purple-600">{selectedGPR.id}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-700">Job Ready Score</span>
                    <Target className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">{selectedGPR.jobReadyScore}%</div>
                  <Progress value={selectedGPR.jobReadyScore} className="h-2" />
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-red-700">Skills Gap</span>
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="text-3xl font-bold text-red-600 mb-2">{selectedGPR.skillsGapPercentage}%</div>
                  <Progress value={selectedGPR.skillsGapPercentage} className="h-2" />
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-700">Training Progress</span>
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{selectedGPR.progress}%</div>
                  <Progress value={selectedGPR.progress} className="h-2" />
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-700">Projects Completed</span>
                    <Briefcase className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-purple-600">{selectedGPR.totalProjectsCompleted}</div>
                  <div className="text-xs text-muted-foreground mt-1">{selectedGPR.totalCodeCommits} commits</div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Information Tabs */}
            <Tabs defaultValue="breakdown" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-white/80 backdrop-blur border">
                <TabsTrigger value="breakdown">Assessment Breakdown</TabsTrigger>
                <TabsTrigger value="materials">Materials & Artifacts</TabsTrigger>
                <TabsTrigger value="accomplishments">Accomplishments</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="history">Complete History</TabsTrigger>
              </TabsList>

              {/* Assessment Breakdown Tab */}
              <TabsContent value="breakdown">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Job Ready Score Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Technical Assessment</span>
                          <span className={`text-lg font-bold ${getScoreColor(selectedGPR.assessmentBreakdown.technicalAssessment)}`}>
                            {selectedGPR.assessmentBreakdown.technicalAssessment}%
                          </span>
                        </div>
                        <Progress value={selectedGPR.assessmentBreakdown.technicalAssessment} className="h-3" />
                        <p className="text-sm text-muted-foreground mt-1">Core technical knowledge and implementation skills</p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Coding Challenges</span>
                          <span className={`text-lg font-bold ${getScoreColor(selectedGPR.assessmentBreakdown.codingChallenges)}`}>
                            {selectedGPR.assessmentBreakdown.codingChallenges}%
                          </span>
                        </div>
                        <Progress value={selectedGPR.assessmentBreakdown.codingChallenges} className="h-3" />
                        <p className="text-sm text-muted-foreground mt-1">Algorithm and data structure problem-solving</p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Behavioral Assessment</span>
                          <span className={`text-lg font-bold ${getScoreColor(selectedGPR.assessmentBreakdown.behavioralAssessment)}`}>
                            {selectedGPR.assessmentBreakdown.behavioralAssessment}%
                          </span>
                        </div>
                        <Progress value={selectedGPR.assessmentBreakdown.behavioralAssessment} className="h-3" />
                        <p className="text-sm text-muted-foreground mt-1">Work ethic, collaboration, and professional conduct</p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Problem Solving</span>
                          <span className={`text-lg font-bold ${getScoreColor(selectedGPR.assessmentBreakdown.problemSolving)}`}>
                            {selectedGPR.assessmentBreakdown.problemSolving}%
                          </span>
                        </div>
                        <Progress value={selectedGPR.assessmentBreakdown.problemSolving} className="h-3" />
                        <p className="text-sm text-muted-foreground mt-1">Analytical thinking and solution design</p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">System Design</span>
                          <span className={`text-lg font-bold ${getScoreColor(selectedGPR.assessmentBreakdown.systemDesign)}`}>
                            {selectedGPR.assessmentBreakdown.systemDesign}%
                          </span>
                        </div>
                        <Progress value={selectedGPR.assessmentBreakdown.systemDesign} className="h-3" />
                        <p className="text-sm text-muted-foreground mt-1">Architecture and scalability considerations</p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Communication Skills</span>
                          <span className={`text-lg font-bold ${getScoreColor(selectedGPR.assessmentBreakdown.communicationSkills)}`}>
                            {selectedGPR.assessmentBreakdown.communicationSkills}%
                          </span>
                        </div>
                        <Progress value={selectedGPR.assessmentBreakdown.communicationSkills} className="h-3" />
                        <p className="text-sm text-muted-foreground mt-1">Written and verbal communication effectiveness</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Materials & Artifacts Tab */}
              <TabsContent value="materials">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Materials Used for Job Ready Score Calculation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedGPR.materials.length > 0 ? (
                      <div className="space-y-4">
                        {selectedGPR.materials.map((material, index) => (
                          <div key={index} className="p-4 bg-muted/30 rounded-lg border">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-4">
                                {material.type === "code" && <Code className="w-8 h-8 text-blue-600" />}
                                {material.type === "document" && <FileText className="w-8 h-8 text-green-600" />}
                                {material.type === "project" && <Briefcase className="w-8 h-8 text-purple-600" />}
                                {material.type === "task" && <CheckCircle className="w-8 h-8 text-orange-600" />}
                                <div>
                                  <p className="font-medium">{material.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {material.type.charAt(0).toUpperCase() + material.type.slice(1)} • {material.date}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-muted-foreground mb-1">Impact Score</div>
                                <div className={`text-2xl font-bold ${getScoreColor(material.impact)}`}>
                                  {material.impact}%
                                </div>
                              </div>
                            </div>
                            
                            {/* Skills Used */}
                            <div className="mb-3">
                              <Label className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                                <Brain className="w-3 h-3" />
                                Skills Used to Execute Work
                              </Label>
                              <div className="flex flex-wrap gap-2">
                                {material.skillsUsed.map((skill, idx) => (
                                  <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Tools Used */}
                            <div>
                              <Label className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                                <Wrench className="w-3 h-3" />
                                Tools Used
                              </Label>
                              <div className="flex flex-wrap gap-2">
                                {material.toolsUsed.map((tool, idx) => (
                                  <Badge key={idx} variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                    {tool}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Package className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p>No materials have been submitted yet</p>
                        <p className="text-sm">Account is pending activation</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Accomplishments Tab */}
              <TabsContent value="accomplishments">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5" />
                      Complete Accomplishment History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedGPR.accomplishments.length > 0 ? (
                      <div className="space-y-6">
                        {selectedGPR.accomplishments.map((acc) => (
                          <div key={acc.id} className="border-l-4 border-purple-500 pl-6 py-4 bg-purple-50/30 rounded-r-lg">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{acc.title}</h3>
                                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                  <Calendar className="w-4 h-4" />
                                  {acc.date}
                                  <Badge variant="outline" className="ml-2">
                                    {acc.category}
                                  </Badge>
                                </p>
                              </div>
                            </div>
                            <p className="text-muted-foreground mb-4">{acc.description}</p>
                            
                            {/* Artifacts */}
                            <div className="mb-3">
                              <Label className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                                <FileText className="w-3 h-3" />
                                Artifacts
                              </Label>
                              <div className="flex flex-wrap gap-2">
                                {acc.artifacts.map((artifact, idx) => (
                                  <Badge key={idx} variant="secondary" className="bg-purple-100 text-purple-700">
                                    {artifact}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Skills Used */}
                            <div className="mb-3">
                              <Label className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                                <Brain className="w-3 h-3" />
                                Skills Used to Execute Work
                              </Label>
                              <div className="flex flex-wrap gap-2">
                                {acc.skillsUsed.map((skill, idx) => (
                                  <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Skills Gained */}
                            <div className="mb-3">
                              <Label className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                Skills Gained
                              </Label>
                              <div className="flex flex-wrap gap-2">
                                {acc.skillsGained.map((skill, idx) => (
                                  <Badge key={idx} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Tools Used */}
                            <div>
                              <Label className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                                <Wrench className="w-3 h-3" />
                                Tools Used
                              </Label>
                              <div className="flex flex-wrap gap-2">
                                {acc.toolsUsed.map((tool, idx) => (
                                  <Badge key={idx} variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                    {tool}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Trophy className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p>No accomplishments recorded yet</p>
                        <p className="text-sm">Complete training activities to build your record</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics">
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Activity className="w-5 h-5" />
                          Platform Activity Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <GitBranch className="w-6 h-6 text-blue-600" />
                              <span className="font-medium">Total Code Commits</span>
                            </div>
                            <span className="text-2xl font-bold text-blue-600">{selectedGPR.totalCodeCommits}</span>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Briefcase className="w-6 h-6 text-purple-600" />
                              <span className="font-medium">Projects Completed</span>
                            </div>
                            <span className="text-2xl font-bold text-purple-600">{selectedGPR.totalProjectsCompleted}</span>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <CheckCircle className="w-6 h-6 text-green-600" />
                              <span className="font-medium">Assessments Passed</span>
                            </div>
                            <span className="text-2xl font-bold text-green-600">{selectedGPR.assessmentsPassed}</span>
                          </div>
                          
                          <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Clock className="w-6 h-6 text-orange-600" />
                              <span className="font-medium">Learning Hours</span>
                            </div>
                            <span className="text-2xl font-bold text-orange-600">{selectedGPR.learningHoursLogged}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="w-5 h-5" />
                          Skills & Certifications
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <Label className="mb-3 block">Certifications Earned ({selectedGPR.certifications.length})</Label>
                            {selectedGPR.certifications.length > 0 ? (
                              <div className="space-y-2">
                                {selectedGPR.certifications.map((cert, idx) => (
                                  <div key={idx} className="flex items-center gap-2 p-2 bg-green-50 rounded border border-green-200">
                                    <Award className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-medium text-green-700">{cert}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">No certifications yet</p>
                            )}
                          </div>

                          <div>
                            <Label className="mb-3 block">Skills Mastered ({selectedGPR.skills.length})</Label>
                            {selectedGPR.skills.length > 0 ? (
                              <div className="flex flex-wrap gap-2">
                                {selectedGPR.skills.map((skill, idx) => (
                                  <Badge key={idx} variant="secondary" className="bg-purple-100 text-purple-700">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-muted-foreground">No skills recorded yet</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Skills Gained and Tools Used Section */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-green-600" />
                          Skills Gained Through Platform
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedGPR.skillsGained.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {selectedGPR.skillsGained.map((skill, idx) => (
                              <Badge key={idx} className="bg-green-100 text-green-700 border-green-300">
                                <Sparkles className="w-3 h-3 mr-1" />
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">No new skills gained yet</p>
                        )}
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Wrench className="w-5 h-5 text-gray-600" />
                          Tools & Technologies Used
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedGPR.toolsUsed.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {selectedGPR.toolsUsed.map((tool, idx) => (
                              <Badge key={idx} className="bg-gray-100 text-gray-700 border-gray-300">
                                <Wrench className="w-3 h-3 mr-1" />
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">No tools recorded yet</p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Complete History Tab */}
              <TabsContent value="history">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <History className="w-5 h-5" />
                      Complete Platform Activity Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Combine accomplishments and materials into timeline */}
                      {[...selectedGPR.accomplishments, ...selectedGPR.materials.map(m => ({
                        id: `mat-${m.name}`,
                        title: m.name,
                        description: `Submitted ${m.type} with ${m.impact}% impact score`,
                        date: m.date,
                        category: m.type as "project" | "skill" | "certification" | "milestone",
                        artifacts: []
                      }))].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((item, index) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-3 h-3 bg-purple-500 rounded-full" />
                            {index < selectedGPR.accomplishments.length + selectedGPR.materials.length - 1 && (
                              <div className="w-0.5 h-full bg-purple-200 flex-1 mt-2" />
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="font-medium">{item.title}</h4>
                              <span className="text-sm text-muted-foreground">{item.date}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                            <Badge variant="outline" className="text-xs">{item.category}</Badge>
                          </div>
                        </div>
                      ))}
                      
                      {selectedGPR.accomplishments.length === 0 && selectedGPR.materials.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                          <History className="w-16 h-16 mx-auto mb-4 opacity-20" />
                          <p>No activity history yet</p>
                          <p className="text-sm">History will appear as the professional completes activities</p>
                        </div>
                      )}
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

  // Main GPR Database View
  return (
    <>
      {router.userRole === "recruiter" && <RecruiterNav />}
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="flex items-center gap-3 text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  <Users className="w-8 h-8 text-purple-600" />
                  Global Professional Records
                </h1>
                <p className="text-muted-foreground text-lg">
                  Verified, portable digital records of professionals' real work, skills, and accomplishments
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export GPRs
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600">
                  <Mail className="w-4 h-4 mr-2" />
                  Invite Professionals
                </Button>
              </div>
            </div>

            {/* Analytics Cards */}
            <div className="grid md:grid-cols-5 gap-4 mb-6">
              <Card className="bg-white/80 backdrop-blur border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total GPRs</p>
                      <p className="text-2xl font-bold text-purple-600">{gprRecords.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Job Ready</p>
                      <p className="text-2xl font-bold text-green-600">{statusCounts["Job Ready"]}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">In Training</p>
                      <p className="text-2xl font-bold text-blue-600">{statusCounts["Training"]}</p>
                    </div>
                    <Brain className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur border-indigo-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Ready Score</p>
                      <p className="text-2xl font-bold text-indigo-600">{avgJobReadyScore}%</p>
                    </div>
                    <Target className="w-8 h-8 text-indigo-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Placed</p>
                      <p className="text-2xl font-bold text-orange-600">{statusCounts["Placed"]}</p>
                    </div>
                    <Award className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name, email, GPR ID, or skills..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 bg-white/80 backdrop-blur"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={handleStatusFilter}>
                <SelectTrigger className="w-56 bg-white/80 backdrop-blur">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Pending Activation">Pending Activation ({statusCounts["Pending Activation"]})</SelectItem>
                  <SelectItem value="Training">Training ({statusCounts["Training"]})</SelectItem>
                  <SelectItem value="Onboarding">Onboarding ({statusCounts["Onboarding"]})</SelectItem>
                  <SelectItem value="Job Ready">Job Ready ({statusCounts["Job Ready"]})</SelectItem>
                  <SelectItem value="Placed">Placed ({statusCounts["Placed"]})</SelectItem>
                </SelectContent>
              </Select>
              <Select value={roleFilter} onValueChange={handleRoleFilter}>
                <SelectTrigger className="w-56 bg-white/80 backdrop-blur">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="AI Engineer">AI Engineer</SelectItem>
                  <SelectItem value="Backend Engineer">Backend Engineer</SelectItem>
                  <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                  <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
                  <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* GPR Records Table */}
          <Card className="bg-white/80 backdrop-blur border-purple-200">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                GPR Database ({filteredRecords.length} Records)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Professional</TableHead>
                    <TableHead>GPR ID</TableHead>
                    <TableHead>Target Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Job Ready Score</TableHead>
                    <TableHead>Skills Gap</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow 
                      key={record.id} 
                      className="cursor-pointer hover:bg-purple-50/50"
                      onClick={() => setSelectedGPR(record)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 border-2 border-purple-200">
                            <AvatarImage src={record.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                              {record.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{record.name}</p>
                            <p className="text-sm text-muted-foreground">{record.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm font-medium text-purple-600">{record.id}</span>
                      </TableCell>
                      <TableCell>{record.targetRole}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(record.status)} border`}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full" 
                              style={{ width: `${record.jobReadyScore}%` }}
                            />
                          </div>
                          <span className={`text-sm font-semibold ${getScoreColor(record.jobReadyScore)}`}>
                            {record.jobReadyScore}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-red-500 to-orange-600 h-2 rounded-full" 
                              style={{ width: `${record.skillsGapPercentage}%` }}
                            />
                          </div>
                          <span className={`text-sm font-semibold ${record.skillsGapPercentage > 50 ? 'text-red-600' : record.skillsGapPercentage > 25 ? 'text-orange-600' : 'text-green-600'}`}>
                            {record.skillsGapPercentage}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full" 
                              style={{ width: `${record.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-blue-600">
                            {record.progress}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {record.gprCreatedDate}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedGPR(record);
                          }}
                          className="border-purple-300 hover:bg-purple-50"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View GPR
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
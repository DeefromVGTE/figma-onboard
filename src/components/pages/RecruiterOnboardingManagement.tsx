import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { 
  Users, CheckCircle2, Clock, FileText, Eye, 
  Calendar, Building2, Award, Download, AlertTriangle,
  MessageSquare, Mail, Phone, MapPin, Star
} from "lucide-react";
import { RecruiterNav } from "../RecruiterNav";

const placedCandidates = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    phone: "+1 (555) 123-4567",
    role: "AI Engineer",
    company: "TechFlow AI",
    educationScore: 94,
    startDate: "2024-12-01",
    onboardingProgress: 85,
    location: "San Francisco, CA",
    documents: {
      contract: "completed",
      nda: "completed",
      w4: "completed",
      i9: "in-progress",
      handbook: "completed"
    },
    currentPhase: "Role-Specific Setup"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    email: "marcus.r@email.com",
    phone: "+1 (555) 234-5678",
    role: "Backend Engineer",
    company: "DataVision Corp",
    educationScore: 89,
    startDate: "2024-11-28",
    onboardingProgress: 100,
    location: "Austin, TX",
    documents: {
      contract: "completed",
      nda: "completed",
      w4: "completed",
      i9: "completed",
      handbook: "completed"
    },
    currentPhase: "Completed"
  },
  {
    id: 3,
    name: "Elena Petrov",
    email: "elena.petrov@email.com",
    phone: "+1 (555) 345-6789",
    role: "Full Stack Developer",
    company: "AI Solutions Ltd",
    educationScore: 91,
    startDate: "2024-12-05",
    onboardingProgress: 45,
    location: "Remote",
    documents: {
      contract: "completed",
      nda: "completed",
      w4: "pending",
      i9: "pending",
      handbook: "in-progress"
    },
    currentPhase: "Documentation"
  },
  {
    id: 4,
    name: "James Park",
    email: "james.park@email.com",
    phone: "+1 (555) 456-7890",
    role: "DevOps Engineer",
    company: "CloudScale Inc",
    educationScore: 87,
    startDate: "2024-12-03",
    onboardingProgress: 60,
    location: "Seattle, WA",
    documents: {
      contract: "completed",
      nda: "completed",
      w4: "completed",
      i9: "completed",
      handbook: "in-progress"
    },
    currentPhase: "Culture Training"
  }
];

const onboardingPhases = [
  {
    phase: "Documentation",
    description: "Legal paperwork and employment documents",
    tasks: ["Employment Contract", "NDA", "W-4", "I-9", "Benefits Enrollment"],
    avgDuration: "2-3 days"
  },
  {
    phase: "Culture Training",
    description: "Company values, policies, and team dynamics",
    tasks: ["Company Handbook", "Code of Conduct", "Security Training", "Team Intro"],
    avgDuration: "1-2 days"
  },
  {
    phase: "Role-Specific Setup",
    description: "Technical setup and project assignment",
    tasks: ["Environment Setup", "Tool Access", "Project Assignment", "Mentor Assignment"],
    avgDuration: "2-3 days"
  }
];

const onboardingMetrics = [
  { label: "Active Onboarding", value: 8, icon: Users, color: "blue" },
  { label: "Avg. Completion Time", value: "4.2 days", icon: Clock, color: "green" },
  { label: "Completion Rate", value: "96%", icon: CheckCircle2, color: "purple" },
  { label: "This Month", value: 12, icon: Calendar, color: "orange" }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-0";
    case "in-progress":
      return "bg-blue-100 text-blue-800 border-0";
    case "pending":
      return "bg-orange-100 text-orange-800 border-0";
    default:
      return "bg-gray-100 text-gray-800 border-0";
  }
};

const getDocumentIcon = (status: string) => {
  switch (status) {
    case "completed":
      return CheckCircle2;
    case "in-progress":
      return Clock;
    case "pending":
      return AlertTriangle;
    default:
      return FileText;
  }
};

export function RecruiterOnboardingManagement() {
  const [selectedCandidate, setSelectedCandidate] = useState<typeof placedCandidates[0] | null>(null);
  const [filterPhase, setFilterPhase] = useState("all");

  const filteredCandidates = placedCandidates.filter(candidate =>
    filterPhase === "all" || candidate.currentPhase === filterPhase
  );

  return (
    <>
      <RecruiterNav />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Onboarding Management
              </h1>
              <p className="text-muted-foreground">
                Track and manage placed candidates through their onboarding journey
              </p>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {onboardingMetrics.map((metric, index) => (
              <Card key={index} className="bg-white shadow-lg border-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-${metric.color}-100 rounded-xl flex items-center justify-center`}>
                      <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <div className="text-sm text-muted-foreground">{metric.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="candidates" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white shadow-lg">
              <TabsTrigger value="candidates">Candidates</TabsTrigger>
              <TabsTrigger value="phases">Onboarding Phases</TabsTrigger>
              <TabsTrigger value="documents">Document Tracking</TabsTrigger>
            </TabsList>

            {/* Candidates Tab */}
            <TabsContent value="candidates" className="space-y-6">
              {/* Filter Bar */}
              <Card className="bg-white shadow-lg border-0">
                <CardContent className="p-4">
                  <div className="flex gap-4 items-center">
                    <Input placeholder="Search by name, role, or company..." className="flex-1" />
                    <Button variant="outline" onClick={() => setFilterPhase("all")}>
                      All Phases
                    </Button>
                    <Button variant="outline" onClick={() => setFilterPhase("Documentation")}>
                      Documentation
                    </Button>
                    <Button variant="outline" onClick={() => setFilterPhase("Culture Training")}>
                      Training
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Candidates List */}
              <div className="space-y-4">
                {filteredCandidates.map((candidate) => (
                  <Card key={candidate.id} className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-lg">{candidate.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {candidate.role} at {candidate.company}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{candidate.location}</span>
                                <span className="text-muted-foreground">•</span>
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  Started {new Date(candidate.startDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={
                                candidate.onboardingProgress === 100 ? "bg-green-100 text-green-800 border-0" :
                                candidate.onboardingProgress >= 60 ? "bg-blue-100 text-blue-800 border-0" :
                                "bg-orange-100 text-orange-800 border-0"
                              }>
                                {candidate.currentPhase}
                              </Badge>
                              <div className="mt-2">
                                <div className="text-2xl font-bold text-purple-600">{candidate.onboardingProgress}%</div>
                                <div className="text-xs text-muted-foreground">Complete</div>
                              </div>
                            </div>
                          </div>

                          <div className="mb-3">
                            <Progress value={candidate.onboardingProgress} className="h-2" />
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-medium mb-2 text-sm">Contact</h4>
                              <div className="text-sm text-muted-foreground space-y-1">
                                <div className="flex items-center gap-2">
                                  <Mail className="w-4 h-4" />
                                  <span>{candidate.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4" />
                                  <span>{candidate.phone}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2 text-sm">Documents</h4>
                              <div className="flex gap-2">
                                {Object.entries(candidate.documents).map(([doc, status]) => {
                                  const Icon = getDocumentIcon(status);
                                  return (
                                    <div key={doc} className="flex flex-col items-center" title={`${doc}: ${status}`}>
                                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                                        status === "completed" ? "border-green-500 bg-green-50" :
                                        status === "in-progress" ? "border-blue-500 bg-blue-50" :
                                        "border-orange-500 bg-orange-50"
                                      }`}>
                                        <Icon className={`w-4 h-4 ${
                                          status === "completed" ? "text-green-600" :
                                          status === "in-progress" ? "text-blue-600" :
                                          "text-orange-600"
                                        }`} />
                                      </div>
                                      <span className="text-xs mt-1 capitalize">{doc}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Phases Tab */}
            <TabsContent value="phases" className="space-y-6">
              <div className="grid gap-6">
                {onboardingPhases.map((phase, index) => (
                  <Card key={index} className="bg-white shadow-lg border-0">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{phase.phase}</CardTitle>
                          <CardDescription>{phase.description}</CardDescription>
                        </div>
                        <Badge variant="outline">{phase.avgDuration}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {phase.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-center gap-3 p-3 border rounded-lg">
                            <Checkbox />
                            <span className="text-sm">{task}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Document Completion Overview</CardTitle>
                  <CardDescription>Track document signing and completion across all candidates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {placedCandidates.map((candidate) => (
                      <div key={candidate.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-medium">{candidate.name}</div>
                              <div className="text-sm text-muted-foreground">{candidate.company}</div>
                            </div>
                          </div>
                          <Badge className={getStatusColor(candidate.currentPhase)}>
                            {Object.values(candidate.documents).filter(s => s === "completed").length}/
                            {Object.values(candidate.documents).length} Complete
                          </Badge>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                          {Object.entries(candidate.documents).map(([doc, status]) => (
                            <div key={doc} className="text-center">
                              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mx-auto mb-1 ${
                                status === "completed" ? "border-green-500 bg-green-50" :
                                status === "in-progress" ? "border-blue-500 bg-blue-50" :
                                "border-orange-500 bg-orange-50"
                              }`}>
                                {status === "completed" ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                                ) : status === "in-progress" ? (
                                  <Clock className="w-5 h-5 text-blue-600" />
                                ) : (
                                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                                )}
                              </div>
                              <div className="text-xs font-medium capitalize">{doc}</div>
                              <Badge className={`text-xs mt-1 ${getStatusColor(status)}`}>
                                {status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
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

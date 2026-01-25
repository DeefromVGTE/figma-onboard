import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Database, FileText, Code, CheckCircle, Clock, TrendingUp,
  Upload, Download, Eye, Award, BarChart, Brain, Target, Shield
} from 'lucide-react';
import { useRouter } from '../Router';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export function GPRDashboard() {
  const { navigateTo, setUserRole } = useRouter();
  const [gprData, setGprData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGPR();
  }, []);

  const loadGPR = async () => {
    try {
      // Get user from localStorage
      const userStr = localStorage.getItem("onboardai_user");
      if (!userStr) {
        navigateTo("login");
        return;
      }

      const user = JSON.parse(userStr);
      
      // Fetch GPR from backend
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-455660d1/gpr/${user.email}`,
        {
          headers: {
            "Authorization": `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setGprData(data.gpr);
      } else {
        // Initialize empty GPR
        setGprData({
          userId: user.email,
          workHistory: [],
          skills: [],
          projects: [],
          achievements: [],
          artifacts: [],
        });
      }
    } catch (error) {
      console.error("Error loading GPR:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("onboardai_user");
    setUserRole(null);
    navigateTo("product");
  };

  const mockJobReadiness = {
    overallScore: 78,
    roles: [
      { title: "Frontend Developer", score: 85, matched: 12, gap: 3 },
      { title: "Full Stack Developer", score: 72, matched: 10, gap: 6 },
      { title: "Backend Developer", score: 65, matched: 8, gap: 7 },
    ]
  };

  const mockSkills = [
    { name: "React", level: 85, verified: true, lastUsed: "2024-01-10" },
    { name: "TypeScript", level: 78, verified: true, lastUsed: "2024-01-12" },
    { name: "Node.js", level: 72, verified: true, lastUsed: "2024-01-05" },
    { name: "Python", level: 65, verified: false, lastUsed: "2023-11-20" },
    { name: "Docker", level: 60, verified: true, lastUsed: "2024-01-08" },
  ];

  const mockArtifacts = [
    { id: 1, type: "code", name: "E-commerce checkout flow", date: "2024-01-10", analyzed: true },
    { id: 2, type: "document", name: "API Architecture Design", date: "2024-01-08", analyzed: true },
    { id: 3, type: "project", name: "Task Management Dashboard", date: "2024-01-05", analyzed: false },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your Global Professional Record...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Your Global Professional Record</h1>
                <p className="text-sm text-muted-foreground">Verified skills and work history</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => navigateTo("talent-analytics")}>
                <BarChart className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button variant="outline" onClick={() => navigateTo("profile")}>
                <Eye className="w-4 h-4 mr-2" />
                View Public Profile
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Job Readiness Card */}
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Overall Job Readiness</CardTitle>
                <Award className="w-8 h-8 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold mb-2">{mockJobReadiness.overallScore}%</div>
              <p className="text-blue-100 text-sm mb-4">
                Based on analysis of {mockArtifacts.length} work artifacts
              </p>
              <Button variant="secondary" className="w-full">
                Calculate for Specific Role
              </Button>
            </CardContent>
          </Card>

          {/* Verified Skills */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Verified Skills</CardTitle>
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2 text-blue-600">
                {mockSkills.filter(s => s.verified).length}
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                AI-verified from work artifacts
              </p>
              <div className="space-y-2">
                {mockSkills.slice(0, 3).map(skill => (
                  <div key={skill.name} className="flex items-center justify-between text-sm">
                    <span>{skill.name}</span>
                    <Badge variant={skill.verified ? "default" : "secondary"}>
                      {skill.level}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Work Artifacts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Work Artifacts</CardTitle>
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2 text-purple-600">
                {mockArtifacts.length}
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                {mockArtifacts.filter(a => a.analyzed).length} analyzed by AI
              </p>
              <Button variant="outline" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload New Work
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs */}
        <Card>
          <Tabs defaultValue="readiness" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="readiness">Job Readiness</TabsTrigger>
                <TabsTrigger value="skills">Skills Profile</TabsTrigger>
                <TabsTrigger value="artifacts">Work Artifacts</TabsTrigger>
                <TabsTrigger value="history">Work History</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="readiness" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-4">Job Readiness by Role</h3>
                  {mockJobReadiness.roles.map((role, index) => (
                    <div key={index} className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-medium">{role.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {role.matched} skills matched • {role.gap} skills needed
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">{role.score}%</div>
                      </div>
                      <Progress value={role.score} className="h-2" />
                      <div className="mt-2 flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3 mr-1" />
                          View Details
                        </Button>
                        {role.gap > 0 && (
                          <Button variant="outline" size="sm">
                            <Target className="w-3 h-3 mr-1" />
                            Close Gap ({role.gap} skills)
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Verified Skills</h3>
                    <Badge variant="secondary">
                      {mockSkills.filter(s => s.verified).length} verified
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    {mockSkills.map((skill, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="font-medium">{skill.name}</div>
                            {skill.verified && (
                              <Badge variant="default" className="text-xs">
                                <Shield className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Last used: {skill.lastUsed}
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Proficiency</span>
                            <span className="font-medium">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="artifacts" className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Your Work Artifacts</h3>
                    <Button>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload New
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {mockArtifacts.map((artifact) => (
                      <div key={artifact.id} className="border rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                            {artifact.type === 'code' && <Code className="w-5 h-5 text-blue-600" />}
                            {artifact.type === 'document' && <FileText className="w-5 h-5 text-blue-600" />}
                            {artifact.type === 'project' && <Database className="w-5 h-5 text-blue-600" />}
                          </div>
                          <div>
                            <div className="font-medium">{artifact.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Uploaded {artifact.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {artifact.analyzed ? (
                            <Badge variant="default">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Analyzed
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <Clock className="w-3 h-3 mr-1" />
                              Pending
                            </Badge>
                          )}
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-4">Verified Work History</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded flex items-center justify-center text-white font-bold">
                          AC
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">Senior Frontend Developer</div>
                          <div className="text-sm text-muted-foreground mb-2">Acme Corp • 2022 - Present</div>
                          <div className="text-sm mb-3">
                            Led development of React-based dashboard serving 50K+ users. Implemented real-time data visualization and optimized performance by 40%.
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">React</Badge>
                            <Badge variant="secondary">TypeScript</Badge>
                            <Badge variant="secondary">GraphQL</Badge>
                            <Badge variant="secondary">Leadership</Badge>
                          </div>
                        </div>
                        <Badge variant="default">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    </div>

                    <div className="text-center py-8 text-muted-foreground">
                      <p>Connect your work accounts to automatically build your verified work history</p>
                      <Button variant="outline" className="mt-4">
                        Connect GitHub, GitLab, or Jira
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
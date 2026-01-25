import { useRouter } from "../Router";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Brain, Target, Zap, TrendingUp, Users, Briefcase, Rocket } from "lucide-react";
import { StartupGoalsInput } from "../StartupGoalsInput";
import { RecruiterNav } from "../RecruiterNav";

export function DefinePage() {
  const { startupInfo, navigateTo } = useRouter();

  return (
    <>
      <RecruiterNav />
      <div className="min-h-screen bg-background">
        <main>
          {/* Hero Section */}
          <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-5xl mx-auto mb-12">
                <Badge className="mb-4" variant="secondary">
                  Welcome to Your Business Co-Pilot
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Define Your Vision, We'll Build Your Team
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Tell us about your startup's goals and projects. Our AI will analyze your needs, 
                  reverse-engineer the exact talent required, and create personalized training paths 
                  to build your perfect team.
                </p>
              </div>
              
              {/* Current Startup Info (if available) */}
              {startupInfo && (
                <div className="max-w-4xl mx-auto mb-12">
                  <Card className="bg-white/80 backdrop-blur border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Briefcase className="w-5 h-5 text-blue-600" />
                            <h3 className="font-semibold">Onboard.AI</h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            The Applicant Teaching System Company
                          </p>
                          <p className="text-sm text-muted-foreground mb-4">
                            {startupInfo.description}
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigateTo("learning")}
                        >
                          View Talent Pipeline
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {startupInfo.roles.length}
                          </div>
                          <div className="text-sm text-muted-foreground">Roles Needed</div>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {startupInfo.skills.length}
                          </div>
                          <div className="text-sm text-muted-foreground">Key Skills</div>
                        </div>
                        <div className="bg-indigo-50 p-3 rounded-lg">
                          <div className="text-2xl font-bold text-indigo-600">
                            {startupInfo.roles.reduce((sum, role) => sum + role.count, 0)}
                          </div>
                          <div className="text-sm text-muted-foreground">Total Positions</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {startupInfo.roles.filter(r => r.priority === "Critical").length}
                          </div>
                          <div className="text-sm text-muted-foreground">Critical Roles</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {/* Key Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded">
                      <Brain className="w-full h-full text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">AI Goal Interpretation</h3>
                  <p className="text-sm text-muted-foreground">
                    Speak or type your project needs - AI understands and plans accordingly
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded">
                      <Target className="w-full h-full text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">Reverse-Engineered Talent</h3>
                  <p className="text-sm text-muted-foreground">
                    AI analyzes your goals and identifies exactly what skills you need
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded">
                      <Zap className="w-full h-full text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">Personalized Training</h3>
                  <p className="text-sm text-muted-foreground">
                    Custom curricula that adapt to each candidate's learning style
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded">
                      <TrendingUp className="w-full h-full text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">Smart Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Track progress and optimize your talent pipeline continuously
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Goals Input Section */}
          <div id="goals-input">
            <StartupGoalsInput />
          </div>
        </main>
      </div>
    </>
  );
}
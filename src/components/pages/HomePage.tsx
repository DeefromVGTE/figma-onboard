import { Badge } from "../ui/badge";
import { Brain, Target, Zap, TrendingUp, Database, FileCheck, Award, BarChart } from "lucide-react";
import { StartupGoalsInput } from "../StartupGoalsInput";

export function HomePage() {

  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-5xl mx-auto mb-16">
              <Badge className="mb-4" variant="secondary">
                Skills-First Hiring Intelligence Platform
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Replace Resumes with Global Professional Records
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Onboard.AI is the new system of record for hiring. AI analyzes real work—code, documents, tasks, and outcomes—to build verified professional records. See actual skills, not claims. Calculate job readiness instantly. Hire based on what people can do, not what they say they've done.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded">
                    <Database className="w-full h-full text-white" />
                  </div>
                </div>
                <h3 className="font-semibold mb-3">Global Professional Record</h3>
                <p className="text-sm text-muted-foreground">
                  Portable, verified digital record of real work, skills, and accomplishments
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded">
                    <Brain className="w-full h-full text-white" />
                  </div>
                </div>
                <h3 className="font-semibold mb-3">AI Work Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Reverse-engineer skills from code, documents, and tasks automatically
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded">
                    <BarChart className="w-full h-full text-white" />
                  </div>
                </div>
                <h3 className="font-semibold mb-3">Job Readiness Score</h3>
                <p className="text-sm text-muted-foreground">
                  Instantly see who's ready for any role and identify skill gaps
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded">
                    <Award className="w-full h-full text-white" />
                  </div>
                </div>
                <h3 className="font-semibold mb-3">Skills-First System</h3>
                <p className="text-sm text-muted-foreground">
                  Learning activates only when gaps exist—hire for proven ability
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
  );
}
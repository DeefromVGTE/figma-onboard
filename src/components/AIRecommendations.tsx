import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Brain, TrendingUp, Target, Calendar, AlertTriangle, Lightbulb } from "lucide-react";

const recommendations = [
  {
    type: "urgent",
    icon: AlertTriangle,
    title: "Complete Before Your Start Date",
    description: "You have 3 required training modules to finish before your first day",
    course: "Company AI Stack Onboarding",
    confidence: 100,
    reason: "Required for role readiness - starts in 5 days",
    deadline: "2 days remaining",
    priority: "critical"
  },
  {
    type: "role-gap",
    icon: Target,
    title: "Bridge Your Experience Gap",
    description: "Based on your background, strengthen your ML pipeline skills to excel in your new role",
    course: "Advanced ML Operations for Data Engineers",
    confidence: 94,
    reason: "Identified skill gap for your Data Engineer position",
    deadline: "Recommended before week 2",
    priority: "high"
  },
  {
    type: "team-prep",
    icon: Brain,
    title: "Prepare for Your Team",
    description: "Your team heavily uses these AI tools - get ahead with advanced training",
    course: "Advanced LangChain & Vector Databases",
    confidence: 89,
    reason: "90% of your future teammates completed this module",
    deadline: "Complete within first month",
    priority: "medium"
  },
  {
    type: "career-growth",
    icon: TrendingUp,
    title: "Set Yourself Up for Promotion",
    description: "This emerging skill is becoming essential for senior roles at your company",
    course: "AI Ethics & Responsible Development",
    confidence: 85,
    reason: "Recently promoted colleagues all have this certification",
    deadline: "Flexible timing",
    priority: "low"
  }
];

export function AIRecommendations() {
  const getTypeColor = (priority: string) => {
    switch (priority) {
      case "critical": return "from-red-500 to-red-600";
      case "high": return "from-orange-500 to-red-500";
      case "medium": return "from-blue-500 to-purple-500";
      case "low": return "from-green-500 to-emerald-500";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "urgent": return "Urgent Action Required";
      case "role-gap": return "Role Preparation";
      case "team-prep": return "Team Integration";
      case "career-growth": return "Career Growth";
      default: return "Recommendation";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical": return <Badge className="bg-red-100 text-red-800 border-0">Critical</Badge>;
      case "high": return <Badge className="bg-orange-100 text-orange-800 border-0">High Priority</Badge>;
      case "medium": return <Badge className="bg-blue-100 text-blue-800 border-0">Medium Priority</Badge>;
      case "low": return <Badge className="bg-green-100 text-green-800 border-0">Nice to Have</Badge>;
      default: return <Badge variant="secondary">Recommendation</Badge>;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-3xl font-bold">AI-Powered Role Preparation</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI analyzes your new role requirements, team dynamics, and career goals to recommend 
            the most critical training for your success.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {recommendations.map((rec, index) => {
            const IconComponent = rec.icon;
            return (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-br ${getTypeColor(rec.priority)} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs">
                            {getTypeLabel(rec.type)}
                          </Badge>
                          {getPriorityBadge(rec.priority)}
                        </div>
                        <CardTitle className="text-lg">{rec.title}</CardTitle>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">
                        {rec.confidence}% Match
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Confidence
                      </div>
                    </div>
                  </div>
                  <CardDescription>{rec.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <div className="text-sm font-medium mb-1">Recommended Training:</div>
                    <div className="text-sm text-muted-foreground mb-2">{rec.course}</div>
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar className="w-3 h-3" />
                      <span className={rec.priority === "critical" ? "text-red-600 font-medium" : "text-muted-foreground"}>
                        {rec.deadline}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mb-4 italic">
                    💡 {rec.reason}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      variant={rec.priority === "critical" ? "default" : "outline"}
                    >
                      {rec.priority === "critical" ? "Start Now" : "Add to Plan"}
                    </Button>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-8 space-y-4">
          <div className="bg-white/80 rounded-lg p-4 max-w-md mx-auto">
            <div className="flex items-center gap-2 justify-center mb-2">
              <Lightbulb className="w-4 h-4 text-yellow-600" />
              <span className="font-medium text-sm">Success Tip</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Complete critical training first, then focus on role-specific skills to maximize your impact from day one.
            </p>
          </div>
          <Button variant="outline" size="lg">
            View Full Training Roadmap
          </Button>
        </div>
      </div>
    </section>
  );
}
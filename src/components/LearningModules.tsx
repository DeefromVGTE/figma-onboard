import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Clock, Users, Star, Play, CheckCircle, Building2, Code, Database, Zap, Target, Briefcase } from "lucide-react";
import { useRouter } from "./Router";

const modules = [
  {
    id: 1,
    title: "Company AI Stack Onboarding",
    description: "Learn the specific AI tools, APIs, and frameworks your team uses daily",
    role: "Full Stack Developer",
    duration: "2 days",
    students: 847,
    rating: 4.9,
    progress: 0,
    tags: ["OpenAI API", "LangChain", "Vector DB"],
    company: "TechCorp",
    status: "required",
    icon: Code,
    priority: "high"
  },
  {
    id: 2,
    title: "Customer Data AI Pipeline",
    description: "Understand how your company uses AI for customer analytics and recommendations",
    role: "Data Engineer",
    duration: "3 days",
    students: 543,
    rating: 4.8,
    progress: 45,
    tags: ["Python", "ML Pipelines", "Analytics"],
    company: "TechCorp",
    status: "in-progress",
    icon: Database,
    priority: "high"
  },
  {
    id: 3,
    title: "AI-Powered Code Review Process",
    description: "Master the automated code review and deployment workflows using AI tools",
    role: "Frontend Developer",
    duration: "1 day",
    students: 1203,
    rating: 4.7,
    progress: 100,
    tags: ["GitHub Copilot", "AI Review", "DevOps"],
    company: "TechCorp",
    status: "completed",
    icon: CheckCircle,
    priority: "medium"
  },
  {
    id: 4,
    title: "Business Intelligence with AI",
    description: "Learn how to generate insights and reports using the company's AI analytics platform",
    role: "Product Manager",
    duration: "2 days",
    students: 324,
    rating: 4.9,
    progress: 0,
    tags: ["BI Tools", "AI Insights", "Reporting"],
    company: "TechCorp",
    status: "upcoming",
    icon: Building2,
    priority: "medium"
  },
  {
    id: 5,
    title: "AI Infrastructure & Monitoring",
    description: "Understand the company's AI model deployment, scaling, and monitoring systems",
    role: "DevOps Engineer",
    duration: "3 days",
    students: 178,
    rating: 4.8,
    progress: 25,
    tags: ["MLOps", "Kubernetes", "Monitoring"],
    company: "TechCorp",
    status: "in-progress",
    icon: Zap,
    priority: "high"
  },
  {
    id: 6,
    title: "Customer Support AI Integration",
    description: "Learn how AI chatbots and automation tools support customer interactions",
    role: "Customer Success",
    duration: "1 day",
    students: 892,
    rating: 4.6,
    progress: 0,
    tags: ["Chatbots", "NLP", "Customer Service"],
    company: "TechCorp",
    status: "optional",
    icon: Users,
    priority: "low"
  }
];

export function LearningModules() {
  const { talentPipelineCourses, startupInfo } = useRouter();
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "in-progress": return "bg-blue-100 text-blue-800";
      case "required": return "bg-red-100 text-red-800";
      case "upcoming": return "bg-purple-100 text-purple-800";
      case "optional": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-l-red-500";
      case "medium": return "border-l-yellow-500";
      case "low": return "border-l-green-500";
      default: return "border-l-gray-300";
    }
  };

  const getStatusIcon = (status: string, progress: number) => {
    if (status === "completed") return <CheckCircle className="w-4 h-4" />;
    if (status === "in-progress" && progress > 0) return <Play className="w-4 h-4" />;
    return <Play className="w-4 h-4" />;
  };

  // Convert talent pipeline courses to the module format
  const pipelineCourses = talentPipelineCourses.map(course => ({
    id: parseInt(course.id.replace(/\D/g, '')) + 100, // Generate unique numeric ID
    title: course.title,
    description: course.description,
    role: course.role,
    duration: course.duration,
    students: Math.floor(Math.random() * 500) + 100, // Random student count
    rating: 4.8 + Math.random() * 0.2, // Random rating between 4.8-5.0
    progress: course.status === "required" ? Math.floor(Math.random() * 30) : 0,
    tags: course.skills,
    company: startupInfo?.name || "Your Company",
    status: course.status,
    icon: course.priority === "high" ? Target : course.role.includes("Engineer") ? Code : course.role.includes("Designer") ? Building2 : Briefcase,
    priority: course.priority
  }));

  // Combine pipeline courses with existing modules
  const allModules = [...pipelineCourses, ...modules];
  
  const requiredModules = allModules.filter(m => m.status === "required" || m.status === "in-progress");
  const otherModules = allModules.filter(m => m.status !== "required" && m.status !== "in-progress");

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Role-Specific Training Modules</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master the AI tools and processes you'll use in your new role. Each module is tailored to your specific 
            position and {startupInfo?.name || "the company"}'s business needs.
          </p>
          {talentPipelineCourses.length > 0 && (
            <div className="mt-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Target className="w-3 h-3 mr-1" />
                {talentPipelineCourses.length} custom courses generated for {startupInfo?.projectType || "your project"}
              </Badge>
            </div>
          )}
        </div>

        {/* Required Training Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-2xl font-bold">Required Training</h3>
            <Badge variant="destructive">Must Complete Before Day 1</Badge>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {requiredModules.map((module) => {
              const IconComponent = module.icon;
              return (
                <Card key={module.id} className={`hover:shadow-lg transition-shadow border-l-4 ${getPriorityColor(module.priority)}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-5 h-5 text-muted-foreground" />
                        <Badge variant="outline" className="text-xs">
                          {module.role}
                        </Badge>
                      </div>
                      <Badge className={`text-xs ${getStatusColor(module.status)} border-0`}>
                        {module.status === "in-progress" ? "In Progress" : 
                         module.status === "completed" ? "Completed" :
                         module.status === "required" ? "Required" : 
                         module.status === "upcoming" ? "Starts Soon" : "Optional"}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-xl mb-2">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {module.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {module.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        {module.company}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {module.students} completed
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {module.rating}
                      </div>
                    </div>

                    {module.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} />
                      </div>
                    )}

                    <Button className="w-full" variant={module.status === "completed" ? "outline" : "default"}>
                      {getStatusIcon(module.status, module.progress)}
                      <span className="ml-2">
                        {module.status === "completed" ? "Review Module" :
                         module.status === "in-progress" ? "Continue Training" :
                         "Start Training"}
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Additional Training Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <h3 className="text-2xl font-bold">Additional Training</h3>
            <Badge variant="secondary">Enhance Your Role</Badge>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {otherModules.map((module) => {
              const IconComponent = module.icon;
              return (
                <Card key={module.id} className={`hover:shadow-lg transition-shadow border-l-4 ${getPriorityColor(module.priority)}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-5 h-5 text-muted-foreground" />
                        <Badge variant="outline" className="text-xs">
                          {module.role}
                        </Badge>
                      </div>
                      <Badge className={`text-xs ${getStatusColor(module.status)} border-0`}>
                        {module.status === "upcoming" ? "Starts Soon" : "Optional"}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-xl mb-2">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {module.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {module.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        {module.company}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {module.students} completed
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {module.rating}
                      </div>
                    </div>

                    <Button className="w-full" variant="outline">
                      <Play className="w-4 h-4 mr-2" />
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
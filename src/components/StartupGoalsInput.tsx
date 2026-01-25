import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Mic, MicOff, Send, Target, Users, Zap, Building2 } from "lucide-react";



export function StartupGoalsInput() {
  const [goals, setGoals] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input logic would be implemented here
    if (!isListening) {
      // Simulate voice input with random examples
      const voiceExamples = [
        "We're building an AI-powered customer service platform that can handle complex technical support queries and automatically escalate to human agents when needed. We need the system to understand context, maintain conversation history, and integrate with our existing CRM.",
        "Our fintech startup is developing a real-time fraud detection system for credit card transactions. We need machine learning algorithms that can analyze spending patterns, detect anomalies, and block suspicious transactions within milliseconds while minimizing false positives.",
        "We're creating a healthcare platform that uses computer vision to analyze medical imaging data for early disease detection. The system needs to process X-rays, MRIs, and CT scans while ensuring HIPAA compliance and integration with hospital management systems.",
        "Our e-commerce platform will use AI to provide personalized product recommendations and dynamic pricing. We need to handle millions of users, process real-time inventory updates, and integrate with multiple payment gateways and shipping providers.",
        "We're building an IoT platform for smart agriculture that monitors soil conditions, weather patterns, and crop health using sensor networks. The system needs edge computing capabilities, real-time analytics, and mobile applications for farmers."
      ];
      
      setTimeout(() => {
        const randomExample = voiceExamples[Math.floor(Math.random() * voiceExamples.length)];
        setGoals(randomExample);
        setIsListening(false);
      }, 3000);
    }
  };

  const analyzeGoals = () => {
    if (!goals.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis with dynamic content based on input
    setTimeout(() => {
      const result = generateDynamicAnalysis(goals);
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateDynamicAnalysis = (input: string) => {
    const lowerInput = input.toLowerCase();
    
    // Detect project type and domain
    let projectType = "Software Platform";
    let complexity = "Medium";
    let baseRoles: any[] = [];
    let skills: string[] = [];
    let trainingPath = "";
    let timeline = "4-6 months";
    let teamSize = "5-8 people";

    // AI/ML Projects
    if (lowerInput.includes("ai") || lowerInput.includes("machine learning") || lowerInput.includes("ml") || 
        lowerInput.includes("neural") || lowerInput.includes("deep learning") || lowerInput.includes("nlp") ||
        lowerInput.includes("computer vision") || lowerInput.includes("recommendation")) {
      
      projectType = "AI/ML Platform";
      complexity = "High";
      timeline = "8-12 months";
      teamSize = "10-15 people";
      
      baseRoles = [
        { title: "AI/ML Engineer", count: 3, priority: "Critical" },
        { title: "Data Scientist", count: 2, priority: "Critical" },
        { title: "Backend Developer", count: 2, priority: "High" },
        { title: "DevOps Engineer", count: 1, priority: "High" },
        { title: "Product Manager", count: 1, priority: "Medium" }
      ];
      
      skills = ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "AWS SageMaker", "Docker"];
      trainingPath = "Intensive 6-week AI/ML program covering deep learning, model deployment, and MLOps practices";

      // Specific AI subcategories
      if (lowerInput.includes("nlp") || lowerInput.includes("natural language") || lowerInput.includes("text") || 
          lowerInput.includes("chatbot") || lowerInput.includes("conversational")) {
        baseRoles.unshift({ title: "NLP Specialist", count: 2, priority: "Critical" });
        skills.push("NLP", "NLTK", "spaCy", "Transformers", "OpenAI API");
        trainingPath = "Specialized 5-week NLP and conversational AI program with hands-on chatbot development";
      }
      
      if (lowerInput.includes("computer vision") || lowerInput.includes("image") || lowerInput.includes("visual") || 
          lowerInput.includes("detection") || lowerInput.includes("recognition")) {
        baseRoles.unshift({ title: "Computer Vision Engineer", count: 2, priority: "Critical" });
        skills.push("OpenCV", "PIL", "YOLO", "CNN", "Image Processing");
        trainingPath = "Advanced 6-week computer vision program focusing on image processing and deep learning models";
      }
    }
    
    // FinTech Projects
    else if (lowerInput.includes("fintech") || lowerInput.includes("financial") || lowerInput.includes("payment") || 
             lowerInput.includes("banking") || lowerInput.includes("fraud") || lowerInput.includes("trading") ||
             lowerInput.includes("loan") || lowerInput.includes("credit") || lowerInput.includes("blockchain")) {
      
      projectType = "FinTech Platform";
      complexity = "High";
      timeline = "6-10 months";
      teamSize = "8-12 people";
      
      baseRoles = [
        { title: "Backend Developer", count: 3, priority: "Critical" },
        { title: "Security Engineer", count: 2, priority: "Critical" },
        { title: "Frontend Developer", count: 2, priority: "High" },
        { title: "DevOps Engineer", count: 1, priority: "High" },
        { title: "Compliance Specialist", count: 1, priority: "Medium" }
      ];
      
      skills = ["Node.js", "Java", "Spring Boot", "PostgreSQL", "Redis", "Kafka", "AWS", "Kubernetes", "Security"];
      trainingPath = "Comprehensive 5-week FinTech program covering secure payment systems, compliance, and financial APIs";

      if (lowerInput.includes("blockchain") || lowerInput.includes("crypto") || lowerInput.includes("web3")) {
        baseRoles.unshift({ title: "Blockchain Developer", count: 2, priority: "Critical" });
        skills.push("Solidity", "Web3", "Ethereum", "Smart Contracts");
        trainingPath = "Specialized 6-week blockchain development program with DeFi and smart contract training";
      }
    }
    
    // E-commerce Projects
    else if (lowerInput.includes("ecommerce") || lowerInput.includes("e-commerce") || lowerInput.includes("marketplace") || 
             lowerInput.includes("retail") || lowerInput.includes("shopping") || lowerInput.includes("store")) {
      
      projectType = "E-commerce Platform";
      complexity = "Medium";
      timeline = "4-7 months";
      teamSize = "6-10 people";
      
      baseRoles = [
        { title: "Frontend Developer", count: 3, priority: "Critical" },
        { title: "Backend Developer", count: 2, priority: "Critical" },
        { title: "UI/UX Designer", count: 1, priority: "High" },
        { title: "DevOps Engineer", count: 1, priority: "Medium" },
        { title: "Product Manager", count: 1, priority: "Medium" }
      ];
      
      skills = ["React", "Node.js", "MongoDB", "Stripe", "AWS", "Docker", "GraphQL", "Redis"];
      trainingPath = "4-week e-commerce development program focusing on scalable web applications and payment integration";
    }
    
    // Healthcare Projects
    else if (lowerInput.includes("health") || lowerInput.includes("medical") || lowerInput.includes("patient") || 
             lowerInput.includes("hospital") || lowerInput.includes("clinic") || lowerInput.includes("diagnostic")) {
      
      projectType = "HealthTech Platform";
      complexity = "High";
      timeline = "8-12 months";
      teamSize = "10-14 people";
      
      baseRoles = [
        { title: "Backend Developer", count: 3, priority: "Critical" },
        { title: "Security Engineer", count: 2, priority: "Critical" },
        { title: "Frontend Developer", count: 2, priority: "High" },
        { title: "Compliance Specialist", count: 1, priority: "Critical" },
        { title: "DevOps Engineer", count: 1, priority: "High" }
      ];
      
      skills = ["Java", "Spring Boot", "React", "PostgreSQL", "HIPAA Compliance", "HL7", "FHIR", "AWS"];
      trainingPath = "Specialized 7-week HealthTech program covering HIPAA compliance, medical data standards, and secure development";
    }
    
    // SaaS/Productivity Projects
    else if (lowerInput.includes("saas") || lowerInput.includes("productivity") || lowerInput.includes("collaboration") || 
             lowerInput.includes("workflow") || lowerInput.includes("dashboard") || lowerInput.includes("analytics")) {
      
      projectType = "SaaS Platform";
      complexity = "Medium";
      timeline = "5-8 months";
      teamSize = "6-10 people";
      
      baseRoles = [
        { title: "Frontend Developer", count: 2, priority: "Critical" },
        { title: "Backend Developer", count: 2, priority: "Critical" },
        { title: "UI/UX Designer", count: 1, priority: "High" },
        { title: "DevOps Engineer", count: 1, priority: "Medium" },
        { title: "Product Manager", count: 1, priority: "High" }
      ];
      
      skills = ["React", "TypeScript", "Node.js", "PostgreSQL", "GraphQL", "AWS", "Docker", "Stripe"];
      trainingPath = "5-week SaaS development program focusing on multi-tenant architecture and subscription management";
    }
    
    // IoT Projects
    else if (lowerInput.includes("iot") || lowerInput.includes("sensor") || lowerInput.includes("embedded") || 
             lowerInput.includes("hardware") || lowerInput.includes("device")) {
      
      projectType = "IoT Platform";
      complexity = "High";
      timeline = "6-10 months";
      teamSize = "8-12 people";
      
      baseRoles = [
        { title: "Embedded Developer", count: 2, priority: "Critical" },
        { title: "Backend Developer", count: 2, priority: "Critical" },
        { title: "IoT Engineer", count: 2, priority: "Critical" },
        { title: "Mobile Developer", count: 1, priority: "High" },
        { title: "DevOps Engineer", count: 1, priority: "Medium" }
      ];
      
      skills = ["C/C++", "Python", "MQTT", "Node.js", "AWS IoT", "React Native", "Raspberry Pi", "Arduino"];
      trainingPath = "6-week IoT development program covering embedded systems, sensor integration, and cloud connectivity";
    }
    
    // Mobile App Projects
    else if (lowerInput.includes("mobile") || lowerInput.includes("app") || lowerInput.includes("ios") || 
             lowerInput.includes("android") || lowerInput.includes("react native") || lowerInput.includes("flutter")) {
      
      projectType = "Mobile Application";
      complexity = "Medium";
      timeline = "3-6 months";
      teamSize = "4-8 people";
      
      baseRoles = [
        { title: "Mobile Developer", count: 2, priority: "Critical" },
        { title: "Backend Developer", count: 1, priority: "High" },
        { title: "UI/UX Designer", count: 1, priority: "High" },
        { title: "QA Engineer", count: 1, priority: "Medium" }
      ];
      
      skills = ["React Native", "Swift", "Kotlin", "Node.js", "Firebase", "MongoDB", "REST APIs"];
      trainingPath = "4-week mobile development program covering cross-platform development and app store deployment";
    }
    
    // Scale and complexity adjustments
    if (lowerInput.includes("million") || lowerInput.includes("scale") || lowerInput.includes("enterprise") || 
        lowerInput.includes("global") || lowerInput.includes("complex")) {
      complexity = "High";
      timeline = "8-12 months";
      teamSize = "12-18 people";
      baseRoles.push({ title: "Senior Architect", count: 1, priority: "Critical" });
      baseRoles.push({ title: "QA Engineer", count: 2, priority: "High" });
      skills.push("Microservices", "Kubernetes", "Load Balancing");
    } else if (lowerInput.includes("simple") || lowerInput.includes("mvp") || lowerInput.includes("prototype") || 
               lowerInput.includes("small") || lowerInput.includes("basic")) {
      complexity = "Low";
      timeline = "2-4 months";
      teamSize = "3-5 people";
    }

    // Real-time requirements
    if (lowerInput.includes("real-time") || lowerInput.includes("live") || lowerInput.includes("instant") || 
        lowerInput.includes("streaming")) {
      skills.push("WebSocket", "Redis", "Event Streaming");
      if (!baseRoles.some(role => role.title.includes("Backend"))) {
        baseRoles.push({ title: "Backend Developer", count: 2, priority: "Critical" });
      }
    }

    // Data processing requirements
    if (lowerInput.includes("big data") || lowerInput.includes("analytics") || lowerInput.includes("data processing") || 
        lowerInput.includes("etl") || lowerInput.includes("warehouse")) {
      baseRoles.push({ title: "Data Engineer", count: 1, priority: "High" });
      skills.push("Apache Spark", "Kafka", "Data Pipelines", "SQL");
    }

    // Security requirements
    if (lowerInput.includes("secure") || lowerInput.includes("encryption") || lowerInput.includes("privacy") || 
        lowerInput.includes("compliance") || lowerInput.includes("audit")) {
      if (!baseRoles.some(role => role.title.includes("Security"))) {
        baseRoles.push({ title: "Security Engineer", count: 1, priority: "High" });
      }
      skills.push("Security", "Encryption", "Authentication");
    }

    // Frontend requirements
    if ((lowerInput.includes("web") || lowerInput.includes("frontend") || lowerInput.includes("ui") || 
         lowerInput.includes("dashboard") || lowerInput.includes("interface") || lowerInput.includes("user experience")) && 
        !baseRoles.some(role => role.title.includes("Frontend"))) {
      baseRoles.push({ title: "Frontend Developer", count: 2, priority: "High" });
      skills.push("React", "TypeScript", "Tailwind CSS");
      
      if (lowerInput.includes("design") || lowerInput.includes("ux") || lowerInput.includes("ui")) {
        baseRoles.push({ title: "UI/UX Designer", count: 1, priority: "High" });
      }
    }

    // Backend requirements
    if (!baseRoles.some(role => role.title.includes("Backend")) && 
        (lowerInput.includes("api") || lowerInput.includes("database") || lowerInput.includes("server") || 
         lowerInput.includes("backend") || lowerInput.includes("service"))) {
      baseRoles.push({ title: "Backend Developer", count: 2, priority: "Critical" });
      skills.push("Node.js", "PostgreSQL", "Express");
    }

    // Cloud/DevOps requirements
    if ((lowerInput.includes("cloud") || lowerInput.includes("aws") || lowerInput.includes("deploy") || 
         lowerInput.includes("infrastructure") || lowerInput.includes("scalable")) && 
        !baseRoles.some(role => role.title.includes("DevOps"))) {
      baseRoles.push({ title: "DevOps Engineer", count: 1, priority: "Medium" });
      skills.push("AWS", "Docker", "CI/CD");
    }

    // Quality assurance
    if (lowerInput.includes("testing") || lowerInput.includes("quality") || lowerInput.includes("qa") || 
        complexity === "High") {
      if (!baseRoles.some(role => role.title.includes("QA"))) {
        baseRoles.push({ title: "QA Engineer", count: 1, priority: "Medium" });
      }
    }

    return {
      projectType,
      complexity,
      timeline,
      teamSize,
      roles: baseRoles,
      skills: [...new Set(skills)], // Remove duplicates
      trainingPath
    };
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Tell Us Your Startup's Goals</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Describe your project using text or voice, and our AI will reverse-engineer the exact talent and skills you need
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Goal Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Describe Your Project Goals
              </CardTitle>
              <CardDescription>
                Be specific about what you're building, the problems you're solving, and your technical requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Textarea
                  placeholder="e.g., We're building an AI-powered fintech platform that automates risk assessment for small business loans. We need real-time fraud detection, credit scoring algorithms, and a user-friendly dashboard for loan officers..."
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  className="min-h-32 resize-none"
                />
                {isListening && (
                  <div className="absolute inset-0 bg-blue-50/80 flex items-center justify-center rounded-lg">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                        <Mic className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-sm text-blue-700">Listening...</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleVoiceInput}
                  className={isListening ? "bg-blue-100" : ""}
                >
                  {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                  {isListening ? "Stop Recording" : "Voice Input"}
                </Button>
                
                <Button 
                  onClick={analyzeGoals}
                  disabled={!goals.trim() || isAnalyzing}
                  className="flex-1"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Analyze & Generate Talent Plan
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>



          {/* Analysis Results */}
          {analysisResult && (
            <Card className="border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Target className="w-5 h-5" />
                  AI Analysis Complete
                </CardTitle>
                <CardDescription>
                  Based on your goals, here's the talent pipeline we recommend
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Project Overview */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground">Project Type</div>
                    <div className="font-semibold">{analysisResult.projectType}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground">Complexity</div>
                    <div className="font-semibold">{analysisResult.complexity}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground">Timeline</div>
                    <div className="font-semibold">{analysisResult.timeline}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <div className="text-sm text-muted-foreground">Team Size</div>
                    <div className="font-semibold">{analysisResult.teamSize}</div>
                  </div>
                </div>

                {/* Required Roles */}
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">Required Team Roles</h4>
                  <div className="space-y-3">
                    {analysisResult.roles.map((role: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{role.title}</div>
                            <div className="text-sm text-muted-foreground">{role.count} position{role.count > 1 ? 's' : ''}</div>
                          </div>
                        </div>
                        <Badge className={
                          role.priority === "Critical" ? "bg-red-100 text-red-800 border-0" :
                          role.priority === "High" ? "bg-orange-100 text-orange-800 border-0" :
                          "bg-blue-100 text-blue-800 border-0"
                        }>
                          {role.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills & Training Path */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Key Skills Required</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.skills.map((skill: string) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Training Path</h4>
                    <p className="text-sm text-muted-foreground">{analysisResult.trainingPath}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button size="lg" className="flex-1">
                    <Zap className="w-4 h-4 mr-2" />
                    Start Recruiting Talent
                  </Button>
                  <Button size="lg" variant="outline">
                    <Target className="w-4 h-4 mr-2" />
                    Refine Requirements
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
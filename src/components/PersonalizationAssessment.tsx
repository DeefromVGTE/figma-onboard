import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Progress } from "./ui/progress";
import { ChevronRight, ChevronLeft, Briefcase } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "What role will you be starting at your new company?",
    options: [
      { value: "frontend", label: "Frontend Developer" },
      { value: "backend", label: "Backend Developer" },
      { value: "fullstack", label: "Full Stack Developer" },
      { value: "data", label: "Data Scientist/Engineer" },
      { value: "product", label: "Product Manager" },
      { value: "devops", label: "DevOps/Infrastructure Engineer" }
    ]
  },
  {
    id: 2,
    question: "What's your experience with AI tools in your previous roles?",
    options: [
      { value: "none", label: "No experience - this will be my first AI-focused role" },
      { value: "basic", label: "Basic - used AI tools like ChatGPT or Copilot occasionally" },
      { value: "intermediate", label: "Intermediate - integrated AI APIs or built simple AI features" },
      { value: "advanced", label: "Advanced - developed AI systems or managed AI projects" }
    ]
  },
  {
    id: 3,
    question: "How do you learn technical concepts most effectively?",
    options: [
      { value: "hands-on", label: "Hands-on practice - coding exercises, labs, building projects" },
      { value: "visual", label: "Visual learning - diagrams, videos, interactive demos" },
      { value: "reading", label: "Documentation and guides - detailed written explanations" },
      { value: "mentorship", label: "Mentorship and discussion - collaborative learning" }
    ]
  },
  {
    id: 4,
    question: "Which company business area will you be supporting?",
    options: [
      { value: "ecommerce", label: "E-commerce & Retail" },
      { value: "fintech", label: "Financial Technology" },
      { value: "healthtech", label: "Healthcare Technology" },
      { value: "saas", label: "SaaS/Enterprise Software" },
      { value: "ai-ml", label: "AI/ML Platform Company" },
      { value: "other", label: "Other Tech Industry" }
    ]
  },
  {
    id: 5,
    question: "What's your biggest concern about starting this new role?",
    options: [
      { value: "tools", label: "Learning new tools and technologies quickly" },
      { value: "processes", label: "Understanding company-specific processes and workflows" },
      { value: "ai-integration", label: "Working effectively with AI systems and automation" },
      { value: "team-collaboration", label: "Collaborating with cross-functional teams" }
    ]
  }
];

export function PersonalizationAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isComplete) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Role Assessment Complete!</CardTitle>
              <CardDescription>
                We're creating your personalized onboarding path
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  Based on your responses, we've identified your role requirements and learning preferences.
                </p>
                <p className="text-muted-foreground">
                  Your personalized training curriculum is being generated with company-specific AI applications and workflows.
                </p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold">Your Personalized Training Plan Includes:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Role-specific AI tools and workflows</li>
                  <li>• Company business process training</li>
                  <li>• Hands-on projects relevant to your team</li>
                  <li>• Mentorship connections with experienced colleagues</li>
                </ul>
              </div>
              <Button size="lg" className="w-full">
                Start My Onboarding Journey
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Role Readiness Assessment</h2>
            <p className="text-muted-foreground">
              Help us understand your background and role requirements to create the perfect onboarding experience
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <Progress value={progress} className="mb-4" />
              <CardTitle className="text-xl">
                {questions[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <RadioGroup 
                value={answers[questions[currentQuestion].id] || ""} 
                onValueChange={handleAnswerChange}
                className="space-y-4"
              >
                {questions[currentQuestion].options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                <Button 
                  onClick={nextQuestion}
                  disabled={!answers[questions[currentQuestion].id]}
                >
                  {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next"}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
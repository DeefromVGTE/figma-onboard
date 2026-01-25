import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Logo } from "../Logo";
import { useRouter } from "../Router";
import {
  User, Upload, Brain, Target, BookOpen, Award, CheckCircle2,
  FileText, Code, Briefcase, Phone, MapPin, Linkedin, Github,
  Globe, ArrowRight, ArrowLeft, Sparkles, TrendingUp
} from "lucide-react";
import { projectId, publicAnonKey } from "../../utils/supabase/info";
import { CodeEditor } from "../CodeEditor";
import { LearningExercise } from "../LearningExercise";
import { CognitiveExercise } from "../CognitiveExercise";
import { technicalChallenges, learningExercises } from "../../data/technical-challenges";
import { cognitiveExercises } from "../../data/cognitive-exercises";

type Step = "personal-info" | "portfolio-upload" | "skills-questionnaire" | "skills-technical" | "cognitive-assessment" | "cognitive-exercises" | "learning-questionnaire" | "learning-exercises" | "processing" | "results";

interface PersonalInfo {
  fullName: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolio: string;
  bio: string;
  yearsExperience: string;
}

interface PortfolioItem {
  type: "code" | "document" | "project" | "other";
  name: string;
  file?: File;
  url?: string;
}

export function ProfessionalProfileCreation() {
  const { navigateTo, setUserRole } = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>("personal-info");
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    bio: "",
    yearsExperience: ""
  });
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [skillsAnswers, setSkillsAnswers] = useState<Record<number, string>>({});
  const [cognitiveAnswers, setCognitiveAnswers] = useState<Record<number, string>>({});
  const [learningAnswers, setLearningAnswers] = useState<Record<number, string>>({});
  const [jobReadyScore, setJobReadyScore] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Technical challenges state
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [challengeResults, setChallengeResults] = useState<Array<{
    challengeId: string;
    code: string;
    timeSpent: number;
    attempts: number;
    testsPassed: number;
    totalTests: number;
    executionHistory: Array<{
      timestamp: number;
      code: string;
      testsPassed: number;
    }>;
  }>>([]);
  
  // Learning exercises state
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [exerciseResults, setExerciseResults] = useState<Array<{
    exerciseId: string;
    timeSpent: number;
    correct: boolean;
    approach: string;
    behavioralData: {
      hesitationTime: number;
      changesCount: number;
      interactionPattern: string[];
      confidenceLevel: "low" | "medium" | "high";
    };
  }>>([]);

  const stepProgress = {
    "personal-info": 16,
    "portfolio-upload": 33,
    "skills-questionnaire": 40,
    "skills-technical": 50,
    "cognitive-assessment": 66,
    "cognitive-exercises": 73,
    "learning-questionnaire": 80,
    "learning-exercises": 87,
    "processing": 95,
    "results": 100
  };

  // Comprehensive Technical Skills Assessment (15 questions)
  const skillsQuestions = [
    {
      id: 1,
      question: "How would you rate your proficiency in your primary programming language?",
      options: ["Beginner (< 6 months)", "Intermediate (6 months - 2 years)", "Advanced (2-5 years)", "Expert (5+ years)"]
    },
    {
      id: 2,
      question: "How comfortable are you with version control systems (Git, SVN)?",
      options: ["Not familiar", "Basic commits and pulls", "Branching and merging", "Advanced workflows (rebasing, cherry-picking, conflict resolution)"]
    },
    {
      id: 3,
      question: "Your experience with cloud platforms (AWS, Azure, GCP)?",
      options: ["No experience", "Basic knowledge of concepts", "Deployed applications to production", "Design and architect cloud solutions"]
    },
    {
      id: 4,
      question: "How often do you work with RESTful APIs and web services?",
      options: ["Never", "Occasionally consume APIs", "Regularly build and consume APIs", "Design API architectures and microservices"]
    },
    {
      id: 5,
      question: "Your experience with testing and quality assurance?",
      options: ["Minimal testing", "Basic unit tests", "Unit & integration tests", "TDD/BDD with comprehensive test coverage"]
    },
    {
      id: 6,
      question: "How proficient are you with database systems (SQL/NoSQL)?",
      options: ["Limited knowledge", "Basic queries and CRUD operations", "Complex queries and optimization", "Database design and performance tuning"]
    },
    {
      id: 7,
      question: "Experience with frontend frameworks (React, Vue, Angular)?",
      options: ["None", "Basic component creation", "Full application development", "Advanced patterns and optimization"]
    },
    {
      id: 8,
      question: "Your familiarity with DevOps practices and CI/CD?",
      options: ["Not familiar", "Understand concepts", "Use CI/CD pipelines", "Configure and maintain DevOps infrastructure"]
    },
    {
      id: 9,
      question: "How comfortable are you with data structures and algorithms?",
      options: ["Basic understanding", "Can implement common structures", "Solve medium complexity problems", "Expert level competitive programming"]
    },
    {
      id: 10,
      question: "Experience with containerization (Docker, Kubernetes)?",
      options: ["No experience", "Basic Docker usage", "Multi-container applications", "Kubernetes orchestration and scaling"]
    },
    {
      id: 11,
      question: "How often do you write technical documentation?",
      options: ["Rarely", "Occasionally for major features", "Regularly for all code", "Comprehensive docs including architecture decisions"]
    },
    {
      id: 12,
      question: "Your experience with security best practices?",
      options: ["Limited awareness", "Follow basic guidelines", "Implement security measures", "Security-first development and auditing"]
    },
    {
      id: 13,
      question: "How do you approach code reviews?",
      options: ["Don't participate", "Review when asked", "Actively review and provide feedback", "Lead code review processes and set standards"]
    },
    {
      id: 14,
      question: "Your experience with agile methodologies (Scrum, Kanban)?",
      options: ["No experience", "Participated in ceremonies", "Active contributor to sprints", "Scrum master or agile coach experience"]
    },
    {
      id: 15,
      question: "How do you stay updated with new technologies?",
      options: ["Rarely update skills", "Occasionally read articles", "Regular learning through courses", "Active contributor to open source and tech communities"]
    }
  ];

  // Comprehensive Cognitive & Behavioral Assessment (12 questions)
  const cognitiveQuestions = [
    {
      id: 1,
      question: "When faced with a complex technical problem, what is your first approach?",
      options: [
        "Break it down into smaller, manageable sub-problems",
        "Search for similar solutions online or in documentation",
        "Sketch out multiple possible approaches before coding",
        "Consult with teammates or mentors for guidance"
      ]
    },
    {
      id: 2,
      question: "In a collaborative team setting, which role do you naturally gravitate toward?",
      options: [
        "Team lead - organizing tasks and coordinating efforts",
        "Collaborator - working closely with others and pair programming",
        "Independent contributor - focusing on assigned deliverables",
        "Quality advocate - reviewing code and ensuring standards"
      ]
    },
    {
      id: 3,
      question: "When you encounter a bug in production, how do you react?",
      options: [
        "Immediately dive in to diagnose and fix it",
        "Systematically reproduce and document the issue first",
        "Coordinate with the team to assess impact and prioritize",
        "Analyze logs and metrics to understand root cause"
      ]
    },
    {
      id: 4,
      question: "How do you handle receiving critical feedback on your code?",
      options: [
        "Enthusiastically welcome it and ask follow-up questions",
        "Accept it professionally and make improvements",
        "Carefully evaluate each point before implementing",
        "Prefer to discuss and understand the rationale first"
      ]
    },
    {
      id: 5,
      question: "Under pressure with tight deadlines, you typically:",
      options: [
        "Thrive and become more focused and productive",
        "Remain calm and prioritize work effectively",
        "Feel stressed but push through to deliver",
        "Prefer to negotiate timeline or scope adjustments"
      ]
    },
    {
      id: 6,
      question: "When starting a new project, you prefer to:",
      options: [
        "Jump right in and start building quickly",
        "Plan the architecture and design thoroughly first",
        "Research similar projects and best practices",
        "Discuss requirements with stakeholders extensively"
      ]
    },
    {
      id: 7,
      question: "How do you approach technical debt in your codebase?",
      options: [
        "Address it immediately when discovered",
        "Document it and schedule time for refactoring",
        "Balance it with feature development pragmatically",
        "Avoid creating it through careful initial design"
      ]
    },
    {
      id: 8,
      question: "When learning a new technology or framework, you:",
      options: [
        "Build a project to learn hands-on",
        "Read documentation and tutorials thoroughly",
        "Watch video courses and follow along",
        "Find a mentor or join study groups"
      ]
    },
    {
      id: 9,
      question: "How do you make technical decisions when there are multiple valid approaches?",
      options: [
        "Choose the most familiar approach for speed",
        "Analyze trade-offs and select the optimal solution",
        "Consult with the team and build consensus",
        "Prototype multiple options to compare"
      ]
    },
    {
      id: 10,
      question: "Your communication style when explaining technical concepts is:",
      options: [
        "Detailed and comprehensive with examples",
        "Concise and focused on key points",
        "Visual using diagrams and flowcharts",
        "Interactive with questions and dialogue"
      ]
    },
    {
      id: 11,
      question: "When you disagree with a technical decision made by your team, you:",
      options: [
        "Voice concerns immediately and advocate for alternatives",
        "Document risks and present alternative approaches",
        "Trust the team's judgment and support the decision",
        "Request data or proof of concept before committing"
      ]
    },
    {
      id: 12,
      question: "How do you balance perfectionism with pragmatism in your work?",
      options: [
        "Strive for excellence even if it takes longer",
        "Ship working code first, then iterate and improve",
        "Find middle ground based on project constraints",
        "Follow team standards and best practices consistently"
      ]
    }
  ];

  // Learning Style Assessment through behavioral questions (10 questions)
  const learningQuestions = [
    {
      id: 1,
      question: "When you need to understand a new API or library, you prefer to:",
      options: [
        "Read the official documentation thoroughly",
        "Watch tutorial videos demonstrating its use",
        "Examine code examples and experiment with them",
        "Join discussions or forums to learn from others"
      ]
    },
    {
      id: 2,
      question: "In a training session, you retain information best when:",
      options: [
        "Looking at diagrams, charts, and visual aids",
        "Listening to the instructor explain concepts",
        "Taking detailed notes and writing summaries",
        "Working through hands-on exercises and labs"
      ]
    },
    {
      id: 3,
      question: "When debugging code, you typically:",
      options: [
        "Use debugger tools to step through execution visually",
        "Add console logs and read through output",
        "Write test cases to isolate the problem",
        "Explain the code aloud or discuss with someone"
      ]
    },
    {
      id: 4,
      question: "You find it easiest to remember:",
      options: [
        "Information presented in visual formats (graphs, diagrams)",
        "Information you've heard in lectures or podcasts",
        "Information you've written down or typed out",
        "Information you've used in practical applications"
      ]
    },
    {
      id: 5,
      question: "When preparing for a technical interview, you would:",
      options: [
        "Create mind maps or flowcharts of concepts",
        "Listen to interview preparation podcasts",
        "Write out solutions to practice problems",
        "Do mock interviews with peers"
      ]
    },
    {
      id: 6,
      question: "Your ideal learning environment is:",
      options: [
        "Quiet space where you can focus independently",
        "Group setting where you can discuss and collaborate",
        "Flexible - switching between solo and group work",
        "Structured classroom or workshop environment"
      ]
    },
    {
      id: 7,
      question: "When you successfully solve a difficult problem, you remember it by:",
      options: [
        "The visual pattern or structure of the solution",
        "The conversation or discussion that led to it",
        "The notes or documentation you created",
        "The actual process of implementing it"
      ]
    },
    {
      id: 8,
      question: "You prefer to learn new programming concepts through:",
      options: [
        "Video tutorials with screen recordings",
        "Podcasts or audio explanations",
        "Written articles, books, or blog posts",
        "Interactive coding challenges and projects"
      ]
    },
    {
      id: 9,
      question: "When attending a technical conference or workshop, you get the most value from:",
      options: [
        "Slide presentations with clear visuals",
        "Speaker presentations and Q&A sessions",
        "Reading conference materials and handouts",
        "Hands-on workshops and networking"
      ]
    },
    {
      id: 10,
      question: "If you could choose how to learn a new framework, you would:",
      options: [
        "Follow a tutorial with screenshots and diagrams",
        "Take an instructor-led online course",
        "Read the official documentation cover to cover",
        "Build a project from scratch using the framework"
      ]
    }
  ];

  const determineLearningStyles = (answers: Record<number, string>): string[] => {
    const styles = {
      visual: 0,
      auditory: 0,
      reading: 0,
      kinesthetic: 0,
      social: 0,
      solitary: 0
    };

    // Analyze answers to determine learning styles
    Object.values(answers).forEach((answer) => {
      const lower = answer.toLowerCase();
      
      // Visual indicators
      if (lower.includes('visual') || lower.includes('diagram') || lower.includes('chart') || 
          lower.includes('screenshot') || lower.includes('mind map') || lower.includes('graph')) {
        styles.visual += 2;
      }
      
      // Auditory indicators
      if (lower.includes('listen') || lower.includes('podcast') || lower.includes('audio') || 
          lower.includes('speaker') || lower.includes('discussion') || lower.includes('aloud')) {
        styles.auditory += 2;
      }
      
      // Reading/Writing indicators
      if (lower.includes('read') || lower.includes('documentation') || lower.includes('written') || 
          lower.includes('article') || lower.includes('notes') || lower.includes('book')) {
        styles.reading += 2;
      }
      
      // Kinesthetic/Hands-on indicators
      if (lower.includes('hands-on') || lower.includes('practical') || lower.includes('experiment') || 
          lower.includes('build') || lower.includes('implementing') || lower.includes('interactive')) {
        styles.kinesthetic += 2;
      }
      
      // Social indicators
      if (lower.includes('group') || lower.includes('discuss') || lower.includes('peer') || 
          lower.includes('collaborate') || lower.includes('networking') || lower.includes('others')) {
        styles.social += 1;
      }
      
      // Solitary indicators
      if (lower.includes('independent') || lower.includes('solo') || lower.includes('quiet') || 
          lower.includes('focus') || lower.includes('alone')) {
        styles.solitary += 1;
      }
    });

    // Return top learning styles (those with scores above threshold)
    const maxScore = Math.max(...Object.values(styles));
    const threshold = maxScore * 0.6; // 60% of max score
    
    return Object.entries(styles)
      .filter(([_, score]) => score >= threshold && score > 0)
      .map(([style, _]) => style);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newItems: PortfolioItem[] = Array.from(files).map(file => ({
      type: file.name.includes('.pdf') ? 'document' : 
            file.name.match(/\.(js|ts|py|java|cpp|html|css)$/) ? 'code' : 'other',
      name: file.name,
      file
    }));

    setPortfolioItems([...portfolioItems, ...newItems]);
  };

  const processProfile = async () => {
    setCurrentStep("processing");
    setIsProcessing(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Determine learning styles from questionnaire
    const detectedStyles = determineLearningStyles(learningAnswers);

    // Calculate job ready score based on comprehensive assessments
    const skillsTotal = skillsQuestions.length;
    const cognitiveTotal = cognitiveQuestions.length;
    const learningTotal = learningQuestions.length;
    
    const skillsCompleted = Object.keys(skillsAnswers).length;
    const cognitiveCompleted = Object.keys(cognitiveAnswers).length;
    const learningCompleted = Object.keys(learningAnswers).length;
    
    // More sophisticated scoring
    const skillScore = (skillsCompleted / skillsTotal) * 40; // 40% weight
    const cognitiveScore = (cognitiveCompleted / cognitiveTotal) * 30; // 30% weight
    const portfolioScore = Math.min(portfolioItems.length * 3, 20); // 20% weight, max at ~7 items
    const learningScore = (learningCompleted / learningTotal) * 10; // 10% weight
    
    const totalScore = Math.min(skillScore + cognitiveScore + portfolioScore + learningScore, 100);
    
    setJobReadyScore(Math.round(totalScore));
    
    // Create GPR in backend
    try {
      const userStr = localStorage.getItem("onboardai_user");
      const user = userStr ? JSON.parse(userStr) : { email: "demo@example.com" };

      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-455660d1/gpr/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email: user.email,
            personalInfo,
            portfolioItems: portfolioItems.map(p => ({ type: p.type, name: p.name })),
            assessments: {
              skills: skillsAnswers,
              cognitive: cognitiveAnswers,
              learning: learningAnswers,
              detectedLearningStyles: detectedStyles
            },
            jobReadyScore: Math.round(totalScore)
          }),
        }
      );
    } catch (error) {
      console.error("Error creating GPR:", error);
    }

    setIsProcessing(false);
    setCurrentStep("results");
  };

  const handleComplete = () => {
    setUserRole("talent");
    
    if (jobReadyScore < 98) {
      navigateTo("training");
    } else {
      navigateTo("gpr-dashboard");
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
              placeholder="+1 (555) 123-4567"
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            id="location"
            value={personalInfo.location}
            onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
            placeholder="San Francisco, CA"
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn Profile</Label>
          <div className="relative">
            <Linkedin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              id="linkedin"
              value={personalInfo.linkedin}
              onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
              placeholder="linkedin.com/in/johndoe"
              className="pl-10"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub Profile</Label>
          <div className="relative">
            <Github className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              id="github"
              value={personalInfo.github}
              onChange={(e) => setPersonalInfo({...personalInfo, github: e.target.value})}
              placeholder="github.com/johndoe"
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="portfolio">Portfolio Website</Label>
        <div className="relative">
          <Globe className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            id="portfolio"
            value={personalInfo.portfolio}
            onChange={(e) => setPersonalInfo({...personalInfo, portfolio: e.target.value})}
            placeholder="johndoe.com"
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="yearsExperience">Years of Professional Experience *</Label>
        <Input
          id="yearsExperience"
          type="number"
          value={personalInfo.yearsExperience}
          onChange={(e) => setPersonalInfo({...personalInfo, yearsExperience: e.target.value})}
          placeholder="3"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Professional Bio *</Label>
        <Textarea
          id="bio"
          value={personalInfo.bio}
          onChange={(e) => setPersonalInfo({...personalInfo, bio: e.target.value})}
          placeholder="Tell us about your professional background, key skills, notable projects, and what you're looking for in your next opportunity..."
          rows={5}
        />
      </div>

      <Button 
        onClick={() => setCurrentStep("portfolio-upload")}
        disabled={!personalInfo.fullName || !personalInfo.phone || !personalInfo.location || !personalInfo.bio || !personalInfo.yearsExperience}
        className="w-full"
      >
        Continue to Portfolio Upload
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );

  const renderPortfolioUpload = () => (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="font-semibold mb-2">Upload Your Work Samples</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Upload code samples, projects, documents, or any work that demonstrates your professional skills and expertise
        </p>
        <Input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="max-w-xs mx-auto"
          accept=".pdf,.doc,.docx,.js,.ts,.py,.java,.cpp,.html,.css,.json,.md,.txt"
        />
      </div>

      {portfolioItems.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Uploaded Items ({portfolioItems.length})</h4>
          {portfolioItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {item.type === 'code' ? <Code className="w-5 h-5 text-blue-600" /> :
                 item.type === 'document' ? <FileText className="w-5 h-5 text-green-600" /> :
                 <Briefcase className="w-5 h-5 text-purple-600" />}
                <div>
                  <div className="font-medium text-sm">{item.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">{item.type}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPortfolioItems(portfolioItems.filter((_, i) => i !== index))}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>AI Analysis:</strong> Our system will analyze your uploaded work to verify technical skills, assess code quality, and validate your professional experience. High-quality, diverse samples improve your Job Readiness Score.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setCurrentStep("personal-info")} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setCurrentStep("skills-questionnaire")}
          disabled={portfolioItems.length === 0}
          className="flex-1"
        >
          Continue to Skills Assessment
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderSkillsQuestionnaire = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Brain className="w-12 h-12 mx-auto mb-3 text-blue-600" />
        <h3 className="font-semibold text-lg">Technical Skills Assessment</h3>
        <p className="text-sm text-muted-foreground">
          15 questions covering your technical capabilities across development, tools, and practices
        </p>
        <Badge variant="secondary" className="mt-2">
          {Object.keys(skillsAnswers).length} / {skillsQuestions.length} completed
        </Badge>
      </div>

      <div className="space-y-4">
        {skillsQuestions.map((q) => (
          <Card key={q.id} className={skillsAnswers[q.id] ? "border-green-200 bg-green-50/30" : ""}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-start gap-2">
                <Badge variant="outline" className="shrink-0">{q.id}</Badge>
                <span>{q.question}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={skillsAnswers[q.id]}
                onValueChange={(value) => setSkillsAnswers({...skillsAnswers, [q.id]: value})}
              >
                {q.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50">
                    <RadioGroupItem value={option} id={`skill-${q.id}-${index}`} />
                    <Label htmlFor={`skill-${q.id}-${index}`} className="flex-1 cursor-pointer text-sm">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3 sticky bottom-4 bg-background p-4 -mx-4 border-t">
        <Button variant="outline" onClick={() => setCurrentStep("portfolio-upload")} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setCurrentStep("skills-technical")}
          disabled={Object.keys(skillsAnswers).length < skillsQuestions.length}
          className="flex-1"
        >
          Continue to Technical Challenges
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderSkillsTechnical = () => {
    const challenge = technicalChallenges[currentChallengeIndex];
    const isLastChallenge = currentChallengeIndex === technicalChallenges.length - 1;
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <Code className="w-12 h-12 mx-auto mb-3 text-accent" />
          <h3 className="font-semibold text-lg">Technical Coding Challenges</h3>
          <p className="text-sm text-muted-foreground">
            Solve real-world problems to demonstrate your technical expertise
          </p>
          <Badge variant="secondary" className="mt-2">
            Challenge {currentChallengeIndex + 1} of {technicalChallenges.length}
          </Badge>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-purple-900">
            <strong>AI Analysis:</strong> We're tracking your approach, problem-solving patterns, and code quality in real-time to assess your technical skills.
          </p>
        </div>

        <CodeEditor
          key={challenge.id}
          challenge={challenge}
          onComplete={(result) => {
            // Save challenge result
            setChallengeResults([...challengeResults, {
              challengeId: challenge.id,
              ...result
            }]);
            
            // Move to next challenge or continue
            if (isLastChallenge) {
              setCurrentStep("cognitive-assessment");
              setCurrentChallengeIndex(0);
            } else {
              setCurrentChallengeIndex(currentChallengeIndex + 1);
            }
          }}
          onCodeChange={(code, timeSpent) => {
            // Optional: Track code changes for behavioral analysis
            console.log('Code changed:', { challengeId: challenge.id, timeSpent });
          }}
        />

        <div className="flex gap-3 sticky bottom-4 bg-background p-4 -mx-4 border-t">
          <Button 
            variant="outline" 
            onClick={() => {
              if (currentChallengeIndex > 0) {
                setCurrentChallengeIndex(currentChallengeIndex - 1);
              } else {
                setCurrentStep("skills-questionnaire");
              }
            }}
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentChallengeIndex > 0 ? "Previous Challenge" : "Back to Questionnaire"}
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              // Skip current challenge
              if (isLastChallenge) {
                setCurrentStep("cognitive-assessment");
                setCurrentChallengeIndex(0);
              } else {
                setCurrentChallengeIndex(currentChallengeIndex + 1);
              }
            }}
            className="flex-1"
          >
            Skip Challenge
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  };

  const renderCognitiveAssessment = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Target className="w-12 h-12 mx-auto mb-3 text-purple-600" />
        <h3 className="font-semibold text-lg">Cognitive & Behavioral Assessment</h3>
        <p className="text-sm text-muted-foreground">
          12 questions to understand your work style, problem-solving approach, and professional behaviors
        </p>
        <Badge variant="secondary" className="mt-2">
          {Object.keys(cognitiveAnswers).length} / {cognitiveQuestions.length} completed
        </Badge>
      </div>

      <div className="space-y-4">
        {cognitiveQuestions.map((q) => (
          <Card key={q.id} className={cognitiveAnswers[q.id] ? "border-purple-200 bg-purple-50/30" : ""}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-start gap-2">
                <Badge variant="outline" className="shrink-0">{q.id}</Badge>
                <span>{q.question}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={cognitiveAnswers[q.id]}
                onValueChange={(value) => setCognitiveAnswers({...cognitiveAnswers, [q.id]: value})}
              >
                {q.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50">
                    <RadioGroupItem value={option} id={`cognitive-${q.id}-${index}`} />
                    <Label htmlFor={`cognitive-${q.id}-${index}`} className="flex-1 cursor-pointer text-sm">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3 sticky bottom-4 bg-background p-4 -mx-4 border-t">
        <Button variant="outline" onClick={() => setCurrentStep("skills-technical")} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setCurrentStep("cognitive-exercises")}
          disabled={Object.keys(cognitiveAnswers).length < cognitiveQuestions.length}
          className="flex-1"
        >
          Continue to Cognitive Exercises
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderCognitiveExercises = () => {
    const exercise = cognitiveExercises[currentExerciseIndex];
    const isLastExercise = currentExerciseIndex === cognitiveExercises.length - 1;
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <Brain className="w-12 h-12 mx-auto mb-3 text-purple-600" />
          <h3 className="font-semibold text-lg">Cognitive Exercises</h3>
          <p className="text-sm text-muted-foreground">
            Complete exercises while AI observes your cognitive patterns and approach
          </p>
          <Badge variant="secondary" className="mt-2">
            Exercise {currentExerciseIndex + 1} of {cognitiveExercises.length}
          </Badge>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-purple-900">
            <strong>AI Observation:</strong> We're analyzing how you approach problem-solving, your decision-making process, and cognitive preferences in real-time.
          </p>
        </div>

        <CognitiveExercise
          key={exercise.id}
          exercise={exercise}
          onComplete={(result) => {
            // Save exercise result
            setExerciseResults([...exerciseResults, {
              exerciseId: exercise.id,
              ...result
            }]);
            
            // Move to next exercise or continue
            if (isLastExercise) {
              setCurrentStep("learning-questionnaire");
              setCurrentExerciseIndex(0);
            } else {
              setCurrentExerciseIndex(currentExerciseIndex + 1);
            }
          }}
        />

        <div className="flex gap-3 sticky bottom-4 bg-background p-4 -mx-4 border-t">
          <Button 
            variant="outline" 
            onClick={() => {
              if (currentExerciseIndex > 0) {
                setCurrentExerciseIndex(currentExerciseIndex - 1);
              } else {
                setCurrentStep("cognitive-assessment");
              }
            }}
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentExerciseIndex > 0 ? "Previous Exercise" : "Back to Assessment"}
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              // Skip current exercise
              if (isLastExercise) {
                setCurrentStep("learning-questionnaire");
                setCurrentExerciseIndex(0);
              } else {
                setCurrentExerciseIndex(currentExerciseIndex + 1);
              }
            }}
          >
            {isLastExercise ? "Skip & Continue" : "Skip Exercise"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  };

  const renderLearningQuestionnaire = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <BookOpen className="w-12 h-12 mx-auto mb-3 text-green-600" />
        <h3 className="font-semibold text-lg">Learning Style Assessment</h3>
        <p className="text-sm text-muted-foreground">
          10 questions to identify your optimal learning preferences and training approach
        </p>
        <Badge variant="secondary" className="mt-2">
          {Object.keys(learningAnswers).length} / {learningQuestions.length} completed
        </Badge>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-green-900">
          <strong>Personalized Training:</strong> Based on your responses, we'll identify whether you learn best through visual, auditory, reading/writing, hands-on practice, collaboration, or independent study. This determines your customized training program.
        </p>
      </div>

      <div className="space-y-4">
        {learningQuestions.map((q) => (
          <Card key={q.id} className={learningAnswers[q.id] ? "border-green-200 bg-green-50/30" : ""}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-start gap-2">
                <Badge variant="outline" className="shrink-0">{q.id}</Badge>
                <span>{q.question}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={learningAnswers[q.id]}
                onValueChange={(value) => setLearningAnswers({...learningAnswers, [q.id]: value})}
              >
                {q.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 rounded hover:bg-muted/50">
                    <RadioGroupItem value={option} id={`learning-${q.id}-${index}`} />
                    <Label htmlFor={`learning-${q.id}-${index}`} className="flex-1 cursor-pointer text-sm">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3 sticky bottom-4 bg-background p-4 -mx-4 border-t">
        <Button variant="outline" onClick={() => setCurrentStep("cognitive-exercises")} className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setCurrentStep("learning-exercises")}
          disabled={Object.keys(learningAnswers).length < learningQuestions.length}
          className="flex-1"
        >
          Continue to Learning Exercises
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );

  const renderLearningExercises = () => {
    const exercise = learningExercises[currentExerciseIndex];
    const isLastExercise = currentExerciseIndex === learningExercises.length - 1;
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <Brain className="w-12 h-12 mx-auto mb-3 text-green-600" />
          <h3 className="font-semibold text-lg">Interactive Learning Exercises</h3>
          <p className="text-sm text-muted-foreground">
            Complete exercises while AI observes your learning patterns and approach
          </p>
          <Badge variant="secondary" className="mt-2">
            Exercise {currentExerciseIndex + 1} of {learningExercises.length}
          </Badge>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-green-900">
            <strong>AI Observation:</strong> We're analyzing how you interact with new material, your problem-solving approach, and learning preferences in real-time.
          </p>
        </div>

        <LearningExercise
          exercise={exercise}
          onComplete={(result) => {
            // Save exercise result
            setExerciseResults([...exerciseResults, {
              exerciseId: exercise.id,
              ...result
            }]);
            
            // Move to next exercise or continue
            if (isLastExercise) {
              processProfile();
            } else {
              setCurrentExerciseIndex(currentExerciseIndex + 1);
            }
          }}
        />

        <div className="flex gap-3 sticky bottom-4 bg-background p-4 -mx-4 border-t">
          <Button 
            variant="outline" 
            onClick={() => {
              if (currentExerciseIndex > 0) {
                setCurrentExerciseIndex(currentExerciseIndex - 1);
              } else {
                setCurrentStep("learning-questionnaire");
              }
            }}
            className="flex-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentExerciseIndex > 0 ? "Previous Exercise" : "Back to Questionnaire"}
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              // Skip current exercise
              if (isLastExercise) {
                processProfile();
              } else {
                setCurrentExerciseIndex(currentExerciseIndex + 1);
              }
            }}
          >
            {isLastExercise ? "Skip & Finish" : "Skip Exercise"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  };

  const renderProcessing = () => (
    <div className="text-center py-12">
      <div className="w-20 h-20 mx-auto mb-6 relative">
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        <Brain className="absolute inset-0 m-auto w-8 h-8 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold mb-3">Creating Your Global Professional Record</h3>
      <p className="text-muted-foreground mb-8">
        Our AI is analyzing 37+ data points from your profile, portfolio, and assessments...
      </p>
      <div className="max-w-md mx-auto space-y-3">
        <div className="flex items-center text-sm">
          <CheckCircle2 className="w-4 h-4 text-green-600 mr-3" />
          <span>Analyzing {portfolioItems.length} work samples and artifacts</span>
        </div>
        <div className="flex items-center text-sm">
          <CheckCircle2 className="w-4 h-4 text-green-600 mr-3" />
          <span>Processing technical skills assessment (15 questions)</span>
        </div>
        <div className="flex items-center text-sm">
          <CheckCircle2 className="w-4 h-4 text-green-600 mr-3" />
          <span>Evaluating cognitive and behavioral profile (12 questions)</span>
        </div>
        <div className="flex items-center text-sm">
          <CheckCircle2 className="w-4 h-4 text-green-600 mr-3" />
          <span>Identifying optimal learning styles (10 questions)</span>
        </div>
        <div className="flex items-center text-sm">
          <div className="w-4 h-4 mr-3 animate-pulse">⏳</div>
          <span>Calculating Job Readiness Score...</span>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="text-center py-8">
      <div className="mb-8">
        <div className={`w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center ${
          jobReadyScore >= 98 ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
          jobReadyScore >= 80 ? 'bg-gradient-to-br from-blue-500 to-indigo-500' :
          'bg-gradient-to-br from-orange-500 to-red-500'
        }`}>
          <div className="text-white">
            <div className="text-4xl font-bold">{jobReadyScore}%</div>
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">Your Job Readiness Score</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          {jobReadyScore >= 98 
            ? "Excellent! You've demonstrated strong skills and are ready for opportunities!" 
            : "Good progress! We've created a personalized training plan to help you reach 98% readiness"}
        </p>
      </div>

      <Card className="text-left mb-6">
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {jobReadyScore >= 98 ? (
            <>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium">Access Talent Marketplace</div>
                  <div className="text-sm text-muted-foreground">
                    Connect with verified startups looking for professionals with your skills
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium">Your Global Professional Record is Live</div>
                  <div className="text-sm text-muted-foreground">
                    Verified skills, portfolio, and assessments now available to employers
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium">Optional Skill Enhancement</div>
                  <div className="text-sm text-muted-foreground">
                    Continue learning to stay competitive and expand opportunities
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium">Personalized Training Program</div>
                  <div className="text-sm text-muted-foreground">
                    Tailored modules based on your learning style and skill gaps to reach 98%
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium">Comprehensive Skills Gap Analysis</div>
                  <div className="text-sm text-muted-foreground">
                    Detailed breakdown of areas for improvement from your 37-question assessment
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium">Adaptive Learning Path</div>
                  <div className="text-sm text-muted-foreground">
                    Training optimized for your identified learning preferences
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Button onClick={handleComplete} size="lg" className="w-full">
        {jobReadyScore >= 98 ? "Go to Dashboard" : "Start Personalized Training"}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );

  const stepTitles: Record<Step, string> = {
    "personal-info": "Personal Information",
    "portfolio-upload": "Portfolio Upload",
    "skills-questionnaire": "Technical Skills (15 Questions)",
    "skills-technical": "Technical Challenges",
    "cognitive-assessment": "Behavioral Profile (12 Questions)",
    "cognitive-exercises": "Cognitive Exercises",
    "learning-questionnaire": "Learning Assessment (10 Questions)",
    "learning-exercises": "Learning Exercises",
    "processing": "AI Analysis",
    "results": "Job Readiness Score"
  };

  const stepIcons: Record<Step, any> = {
    "personal-info": User,
    "portfolio-upload": Upload,
    "skills-questionnaire": Brain,
    "skills-technical": Brain,
    "cognitive-assessment": Target,
    "cognitive-exercises": Target,
    "learning-questionnaire": BookOpen,
    "learning-exercises": BookOpen,
    "processing": Sparkles,
    "results": Award
  };

  const StepIcon = stepIcons[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-secondary p-4 relative overflow-hidden">
      {/* Tech glow effects */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-purple/10 rounded-full blur-[100px]"></div>
      
      <div className="container mx-auto max-w-4xl py-8 relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" showText={true} />
          </div>
          <h5 className="label-uppercase text-accent mb-4">
            Professional Profile Creation
          </h5>
          <h2 className="heading-display text-primary text-3xl md:text-4xl mb-4">
            Create Your Global <span className="text-gradient-cyan">Professional Record</span>
          </h2>
          <div className="divider-tech-gradient max-w-xs mx-auto mb-6"></div>
          <p className="body-text text-muted-foreground max-w-2xl mx-auto">
            Build your verified professional profile with our AI-powered assessment system
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Profile Completion</span>
            <span className="text-sm text-muted-foreground">{stepProgress[currentStep]}%</span>
          </div>
          <Progress value={stepProgress[currentStep]} className="h-2" />
        </div>

        {/* Main Card */}
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <StepIcon className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle>{stepTitles[currentStep]}</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[600px] overflow-y-auto">
            {currentStep === "personal-info" && renderPersonalInfo()}
            {currentStep === "portfolio-upload" && renderPortfolioUpload()}
            {currentStep === "skills-questionnaire" && renderSkillsQuestionnaire()}
            {currentStep === "skills-technical" && renderSkillsTechnical()}
            {currentStep === "cognitive-assessment" && renderCognitiveAssessment()}
            {currentStep === "cognitive-exercises" && renderCognitiveExercises()}
            {currentStep === "learning-questionnaire" && renderLearningQuestionnaire()}
            {currentStep === "learning-exercises" && renderLearningExercises()}
            {currentStep === "processing" && renderProcessing()}
            {currentStep === "results" && renderResults()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
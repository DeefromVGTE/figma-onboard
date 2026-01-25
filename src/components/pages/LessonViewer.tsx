import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { 
  Play, ChevronLeft, ChevronRight, CheckCircle, BookOpen, 
  Code, MessageSquare, Bookmark, Volume2, VolumeX, Settings,
  Maximize, Clock, Target, Zap, HelpCircle, ThumbsUp, Eye,
  Users, Flag, Share2, Download, FileText, Video, Brain,
  Lightbulb, AlertCircle, Trophy, Send, LogOut, Menu
} from "lucide-react";
import { Logo } from "../Logo";
import { useRouter } from "../Router";

export function LessonViewer() {
  const { navigateTo, setUserRole } = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [currentTab, setCurrentTab] = useState("video");
  const [completedSections, setCompletedSections] = useState([0, 1]);
  const [chatMessage, setChatMessage] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const lessonData = {
    module: "Neural Networks Deep Dive",
    lesson: "Lesson 6: Backpropagation",
    instructor: "Dr. Sarah Mitchell",
    duration: "24:35",
    currentTime: "12:18",
    progress: 50,
    difficulty: "Intermediate",
    xpReward: 100,
    nextLesson: "Lesson 7: Optimization Techniques"
  };

  const lessonSections = [
    { id: 0, title: "Introduction to Backpropagation", duration: "3:24", type: "video", completed: true },
    { id: 1, title: "Chain Rule Refresher", duration: "4:12", type: "theory", completed: true },
    { id: 2, title: "Forward Pass Walkthrough", duration: "5:30", type: "video", completed: false, current: true },
    { id: 3, title: "Computing Gradients", duration: "6:15", type: "code", completed: false },
    { id: 4, title: "Practice Exercise", duration: "8:45", type: "exercise", completed: false },
    { id: 5, title: "Knowledge Check", duration: "2:00", type: "quiz", completed: false }
  ];

  const codeExercise = {
    title: "Implement Backpropagation",
    description: "Complete the backward pass function for a simple neural network",
    starterCode: `def backward_pass(output, target, weights):
    # TODO: Calculate loss gradient
    loss_grad = 
    
    # TODO: Calculate weight gradients
    weight_grads = 
    
    # TODO: Update weights
    
    return updated_weights`,
    hints: [
      "Start by computing the derivative of the loss function",
      "Use the chain rule to propagate gradients backward",
      "Remember to multiply by the learning rate when updating"
    ]
  };

  const quizQuestion = {
    question: "What is the primary purpose of backpropagation in neural networks?",
    options: [
      "To make forward predictions faster",
      "To calculate gradients for updating weights",
      "To initialize network weights",
      "To evaluate model accuracy"
    ],
    correctAnswer: 1,
    explanation: "Backpropagation calculates gradients of the loss function with respect to each weight, enabling gradient descent optimization."
  };

  const liveChat = [
    {
      user: "Marcus Rodriguez",
      message: "This explanation is so clear! Finally understanding the chain rule connection.",
      timestamp: "2 min ago",
      likes: 5
    },
    {
      user: "Elena Petrov",
      message: "Can someone explain why we compute gradients backward instead of forward?",
      timestamp: "5 min ago",
      likes: 2,
      hasReply: true
    },
    {
      user: "You",
      message: "Because the loss depends on all previous layers, so we propagate error backwards through the chain rule.",
      timestamp: "4 min ago",
      likes: 3,
      isReply: true
    }
  ];

  const handleSectionClick = (sectionId: number) => {
    console.log("Navigating to section:", sectionId);
  };

  const handleMarkComplete = () => {
    setShowQuiz(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigateTo("training")}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div>
                <div className="text-sm text-gray-500">{lessonData.module}</div>
                <div className="font-semibold">{lessonData.lesson}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-100 text-blue-800 border-0">
                <Zap className="w-3 h-3 mr-1" />
                +{lessonData.xpReward} XP
              </Badge>
              <Button variant="outline" onClick={() => setShowNotes(!showNotes)}>
                <BookOpen className="w-4 h-4 mr-2" />
                Notes
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setUserRole(null);
                  navigateTo("product");
                }}
                className="hidden md:flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
              <Button>
                <Flag className="w-4 h-4 mr-2" />
                Mark Complete
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Video Player / Content Area */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="relative bg-black aspect-video">
                {/* Video Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/30 transition-all">
                      <Play className="w-10 h-10 ml-1" />
                    </div>
                    <div className="text-xl font-semibold mb-2">Forward Pass Walkthrough</div>
                    <div className="text-blue-200">5:30 minutes</div>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="mb-3">
                    <Progress value={50} className="h-1 bg-white/20" />
                  </div>
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        <Play className="w-5 h-5" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsMuted(!isMuted)}
                      >
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </Button>
                      <span className="text-sm">{lessonData.currentTime} / {lessonData.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                        <Settings className="w-5 h-5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
                        <Maximize className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Content Tabs */}
            <Card className="border-0 shadow-lg">
              <Tabs value={currentTab} onValueChange={setCurrentTab}>
                <CardHeader className="pb-3">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">
                      <FileText className="w-4 h-4 mr-2" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="transcript">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Transcript
                    </TabsTrigger>
                    <TabsTrigger value="exercise">
                      <Code className="w-4 h-4 mr-2" />
                      Exercise
                    </TabsTrigger>
                    <TabsTrigger value="resources">
                      <Download className="w-4 h-4 mr-2" />
                      Resources
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent>
                  <TabsContent value="overview" className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">What You'll Learn</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Understand how gradients flow backward through the network</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Apply the chain rule to compute partial derivatives</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Implement backpropagation from scratch in Python</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-blue-900 mb-1">Pro Tip</h4>
                          <p className="text-sm text-blue-700">
                            Draw out the computational graph as you watch. Visual representation makes the chain rule connections much clearer!
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Learning Objectives</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm">Understand forward pass mechanics</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm">Master chain rule application</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                          <span className="text-sm text-gray-600">Compute gradients efficiently</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                          <span className="text-sm text-gray-600">Implement weight updates</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="transcript">
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      <div className="flex gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer">
                        <span className="text-sm text-blue-600 font-mono">00:00</span>
                        <p className="text-sm flex-1">Welcome back! In this lesson, we're going to dive deep into backpropagation, one of the most important algorithms in deep learning.</p>
                      </div>
                      <div className="flex gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer">
                        <span className="text-sm text-blue-600 font-mono">00:24</span>
                        <p className="text-sm flex-1">Backpropagation, or "backprop," is the method we use to efficiently compute gradients in neural networks.</p>
                      </div>
                      <div className="flex gap-3 p-3 hover:bg-gray-50 rounded cursor-pointer">
                        <span className="text-sm text-blue-600 font-mono">00:45</span>
                        <p className="text-sm flex-1">At its core, backprop is just an application of the chain rule from calculus. But the clever part is how it reuses computations to make the process efficient.</p>
                      </div>
                      <div className="flex gap-3 p-3 bg-blue-50 rounded border border-blue-200">
                        <span className="text-sm text-blue-600 font-mono">01:12</span>
                        <p className="text-sm flex-1 font-medium">Let's start by reviewing what happens during the forward pass...</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="exercise" className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <Code className="w-6 h-6 text-purple-600 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-purple-900 mb-1">{codeExercise.title}</h3>
                          <p className="text-sm text-purple-700">{codeExercise.description}</p>
                        </div>
                        <Badge className="bg-purple-600 text-white">Required</Badge>
                      </div>
                    </div>

                    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap">{codeExercise.starterCode}</pre>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" className="flex-1">
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Show Hint
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View Solution
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600">
                        <Play className="w-4 h-4 mr-2" />
                        Run Code
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-yellow-600" />
                        Hints Available
                      </h4>
                      <div className="space-y-2">
                        {codeExercise.hints.map((hint, index) => (
                          <details key={index} className="bg-gray-50 rounded p-3">
                            <summary className="cursor-pointer font-medium text-sm">Hint {index + 1}</summary>
                            <p className="text-sm text-gray-600 mt-2">{hint}</p>
                          </details>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="resources">
                    <div className="space-y-3">
                      <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-blue-600" />
                          <div className="flex-1">
                            <h4 className="font-medium">Backpropagation Cheat Sheet</h4>
                            <p className="text-sm text-gray-500">Quick reference guide (PDF, 2.4 MB)</p>
                          </div>
                          <Download className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Code className="w-8 h-8 text-purple-600" />
                          <div className="flex-1">
                            <h4 className="font-medium">Complete Implementation</h4>
                            <p className="text-sm text-gray-500">Full Python code example (notebook)</p>
                          </div>
                          <Download className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-green-600" />
                          <div className="flex-1">
                            <h4 className="font-medium">Additional Reading</h4>
                            <p className="text-sm text-gray-500">Research papers and articles</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button variant="outline">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous Lesson
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                Next: {lessonData.nextLesson}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Lesson Navigation */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Lesson Sections</CardTitle>
                <Progress value={33} className="mt-2" />
                <p className="text-sm text-gray-500 mt-1">2 of 6 completed</p>
              </CardHeader>
              <CardContent className="space-y-2">
                {lessonSections.map((section) => (
                  <div
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                      section.current ? 'bg-blue-50 border-2 border-blue-500' :
                      section.completed ? 'bg-green-50 border border-green-200' :
                      'border hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      section.completed ? 'bg-green-600' :
                      section.current ? 'bg-blue-600' :
                      'bg-gray-200'
                    }`}>
                      {section.completed ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : section.current ? (
                        <Play className="w-4 h-4 text-white" />
                      ) : (
                        <span className="text-sm font-medium text-gray-600">{section.id + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{section.title}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {section.duration}
                        {section.type === 'quiz' && <Badge variant="outline" className="text-xs">Quiz</Badge>}
                        {section.type === 'code' && <Badge variant="outline" className="text-xs">Code</Badge>}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Live Chat */}
            {showChat && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Live Discussion
                    </CardTitle>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      <div className="w-2 h-2 bg-green-600 rounded-full mr-1"></div>
                      12 active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {liveChat.map((msg, index) => (
                      <div key={index} className={`flex gap-2 ${msg.isReply ? 'ml-8' : ''}`}>
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                            {msg.user === 'You' ? 'YO' : msg.user.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{msg.user}</span>
                            <span className="text-xs text-gray-500">{msg.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">{msg.message}</p>
                          <div className="flex items-center gap-3">
                            <button className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {msg.likes}
                            </button>
                            <button className="text-xs text-gray-500 hover:text-blue-600">Reply</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Ask a question or share insight..." 
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button size="icon">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Help */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-medium text-orange-900 mb-1">Stuck? Get Help</h4>
                    <p className="text-sm text-orange-700 mb-3">Ask your cohort or request mentor support</p>
                    <Button size="sm" variant="outline" className="w-full border-orange-300 hover:bg-orange-100">
                      Request Help
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-purple-600" />
                Knowledge Check
              </CardTitle>
              <CardDescription>Answer correctly to earn XP and proceed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="font-medium mb-4">{quizQuestion.question}</p>
                <div className="space-y-2">
                  {quizQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAnswer(index)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                        selectedAnswer === index 
                          ? 'border-purple-500 bg-purple-100' 
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === index ? 'border-purple-600 bg-purple-600' : 'border-gray-300'
                        }`}>
                          {selectedAnswer === index && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowQuiz(false)}>
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
                  disabled={selectedAnswer === null}
                >
                  Submit Answer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
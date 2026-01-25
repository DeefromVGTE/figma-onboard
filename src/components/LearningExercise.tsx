import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Brain, Eye, Timer, CheckCircle2, XCircle } from "lucide-react";

interface LearningExerciseProps {
  exercise: {
    id: string;
    type: "visual-pattern" | "problem-solving" | "interactive-tutorial" | "debugging";
    title: string;
    instruction: string;
    task: any;
    correctAnswer: any;
    timeLimit?: number;
  };
  onComplete: (result: {
    timeSpent: number;
    correct: boolean;
    approach: string;
    behavioralData: {
      hesitationTime: number;
      changesCount: number;
      interactionPattern: string[];
      confidenceLevel: "low" | "medium" | "high";
    };
  }) => void;
}

export function LearningExercise({ exercise, onComplete }: LearningExerciseProps) {
  const [startTime] = useState(Date.now());
  const [timeSpent, setTimeSpent] = useState(0);
  const [answer, setAnswer] = useState<any>(null);
  const [interactions, setInteractions] = useState<string[]>([]);
  const [firstInteractionTime, setFirstInteractionTime] = useState<number | null>(null);
  const [changeCount, setChangeCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTimeSpent(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const handleInteraction = (action: string) => {
    if (!firstInteractionTime) {
      setFirstInteractionTime(Date.now());
    }
    setInteractions(prev => [...prev, `${action}:${Date.now() - startTime}`]);
  };

  const handleAnswerChange = (newAnswer: any) => {
    handleInteraction("answer-change");
    setChangeCount(prev => prev + 1);
    setAnswer(newAnswer);
  };

  const handleSubmit = () => {
    const hesitationTime = firstInteractionTime 
      ? Math.floor((firstInteractionTime - startTime) / 1000)
      : timeSpent;

    const confidenceLevel: "low" | "medium" | "high" = 
      hesitationTime > 30 || changeCount > 5 ? "low" :
      hesitationTime > 10 || changeCount > 2 ? "medium" : "high";

    const correct = JSON.stringify(answer) === JSON.stringify(exercise.correctAnswer);

    onComplete({
      timeSpent,
      correct,
      approach: determineApproach(hesitationTime, changeCount, timeSpent),
      behavioralData: {
        hesitationTime,
        changesCount: changeCount,
        interactionPattern: interactions,
        confidenceLevel
      }
    });

    // Don't set isSubmitted - let the parent component handle navigation
    // setIsSubmitted(true);
  };

  const determineApproach = (hesitationTime: number, changesCount: number, totalTime: number): string => {
    // Analyze interaction patterns to determine learning approach
    if (changesCount === 0 && totalTime < 10) return "quick-decisive";
    if (changesCount > 5) return "experimental-iterative";
    if (hesitationTime > 30) return "analytical-careful";
    return "methodical-confident";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Check if answer is ready to submit
  const isAnswerComplete = () => {
    if (!answer) return false;
    
    // For interactive tutorial, check if all questions are answered
    if (exercise.type === "interactive-tutorial") {
      const totalPages = exercise.task.pages.filter((p: any) => p.question).length;
      return answer && Object.keys(answer).length >= totalPages;
    }
    
    // For problem solving, need at least one step
    if (exercise.type === "problem-solving") {
      return Array.isArray(answer) && answer.length > 0;
    }
    
    return true;
  };

  // Render different exercise types
  const renderExercise = () => {
    switch (exercise.type) {
      case "visual-pattern":
        return <VisualPatternExercise 
          task={exercise.task} 
          onAnswer={handleAnswerChange}
          onInteraction={handleInteraction}
        />;
      
      case "problem-solving":
        return <ProblemSolvingExercise 
          task={exercise.task} 
          onAnswer={handleAnswerChange}
          onInteraction={handleInteraction}
        />;
      
      case "interactive-tutorial":
        return <InteractiveTutorialExercise 
          task={exercise.task} 
          onAnswer={handleAnswerChange}
          onInteraction={handleInteraction}
        />;
      
      case "debugging":
        return <DebuggingExercise 
          task={exercise.task} 
          onAnswer={handleAnswerChange}
          onInteraction={handleInteraction}
        />;
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Exercise Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-3">
            <Brain className="w-5 h-5 text-accent" />
            <h3 className="text-xl font-semibold">{exercise.title}</h3>
            <Badge variant="outline" className="gap-1">
              <Eye className="w-3 h-3" />
              AI Observing
            </Badge>
          </div>
          <p className="text-muted-foreground">{exercise.instruction}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-muted-foreground" />
          <Badge variant="outline" className="font-mono">
            {formatTime(timeSpent)}
          </Badge>
        </div>
      </div>

      {/* Exercise Content */}
      <Card className="p-6">
        {renderExercise()}
      </Card>

      {/* Submit Button */}
      {!isSubmitted && (
        <div className="flex justify-end">
          <Button 
            size="lg" 
            variant="accent"
            onClick={handleSubmit}
            disabled={!isAnswerComplete()}
          >
            Submit Answer
          </Button>
        </div>
      )}

      {/* Result */}
      {isSubmitted && (
        <Card className={`p-6 ${
          JSON.stringify(answer) === JSON.stringify(exercise.correctAnswer)
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200"
        }`}>
          <div className="flex items-center gap-3">
            {JSON.stringify(answer) === JSON.stringify(exercise.correctAnswer) ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <div>
                  <h4 className="font-semibold text-green-900">Correct!</h4>
                  <p className="text-sm text-green-700">
                    Completed in {formatTime(timeSpent)} with {changeCount} revisions
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 text-red-600" />
                <div>
                  <h4 className="font-semibold text-red-900">Not quite right</h4>
                  <p className="text-sm text-red-700">
                    The AI has recorded your approach for learning style analysis
                  </p>
                </div>
              </>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}

// Visual Pattern Recognition Exercise
function VisualPatternExercise({ task, onAnswer, onInteraction }: any) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    onInteraction(`select-option-${index}`);
    setSelected(index);
    onAnswer(index);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">Complete the pattern by selecting the correct shape:</p>
      
      {/* Pattern sequence */}
      <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
        {task.sequence.map((shape: string, idx: number) => (
          <div key={idx} className="w-16 h-16 flex items-center justify-center border-2 border-border rounded">
            <div className={`w-10 h-10 ${shape}`}></div>
          </div>
        ))}
        <div className="w-16 h-16 flex items-center justify-center border-2 border-dashed border-accent rounded">
          <span className="text-2xl text-accent">?</span>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-4 gap-3">
        {task.options.map((option: string, idx: number) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            className={`w-full aspect-square flex items-center justify-center border-2 rounded-lg transition-all hover:border-accent ${
              selected === idx ? "border-accent bg-accent/10" : "border-border"
            }`}
          >
            <div className={`w-12 h-12 ${option}`}></div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Problem Solving Exercise
function ProblemSolvingExercise({ task, onAnswer, onInteraction }: any) {
  const [steps, setSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState("");

  const addStep = () => {
    if (currentStep.trim()) {
      onInteraction("add-step");
      const newSteps = [...steps, currentStep];
      setSteps(newSteps);
      onAnswer(newSteps);
      setCurrentStep("");
    }
  };

  const removeStep = (index: number) => {
    onInteraction("remove-step");
    const newSteps = steps.filter((_, idx) => idx !== index);
    setSteps(newSteps);
    onAnswer(newSteps);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-muted rounded-lg">
        <h4 className="font-medium mb-2">Problem:</h4>
        <p className="text-sm">{task.problem}</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Break down your approach into steps:
        </label>
        
        <div className="space-y-2">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-2 p-3 bg-muted rounded-lg">
              <Badge variant="outline" className="mt-0.5">{idx + 1}</Badge>
              <p className="flex-1 text-sm">{step}</p>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => removeStep(idx)}
              >
                ✕
              </Button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={currentStep}
            onChange={(e) => {
              onInteraction("type-step");
              setCurrentStep(e.target.value);
            }}
            onKeyPress={(e) => e.key === 'Enter' && addStep()}
            placeholder="Describe your next step..."
            className="flex-1 px-3 py-2 border rounded-lg text-sm"
          />
          <Button onClick={addStep} variant="outline">
            Add Step
          </Button>
        </div>
      </div>
    </div>
  );
}

// Interactive Tutorial Exercise
function InteractiveTutorialExercise({ task, onAnswer, onInteraction }: any) {
  const [currentPage, setCurrentPage] = useState(0);
  const [responses, setResponses] = useState<Record<number, string>>({});

  const handleResponse = (response: string) => {
    onInteraction(`page-${currentPage}-response`);
    const newResponses = { ...responses, [currentPage]: response };
    setResponses(newResponses);
    onAnswer(newResponses);
  };

  const nextPage = () => {
    onInteraction("next-page");
    setCurrentPage(prev => Math.min(prev + 1, task.pages.length - 1));
  };

  const prevPage = () => {
    onInteraction("prev-page");
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const page = task.pages[currentPage];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge>Page {currentPage + 1} of {task.pages.length}</Badge>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={prevPage} disabled={currentPage === 0}>
            Previous
          </Button>
          <Button size="sm" variant="outline" onClick={nextPage} disabled={currentPage === task.pages.length - 1}>
            Next
          </Button>
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <h4 className="font-medium mb-3">{page.title}</h4>
        <div className="text-sm space-y-2" dangerouslySetInnerHTML={{ __html: page.content }}></div>
      </div>

      {page.question && (
        <div className="space-y-3">
          <label className="text-sm font-medium">{page.question}</label>
          <div className="space-y-2">
            {page.options.map((option: string, idx: number) => (
              <button
                key={idx}
                onClick={() => handleResponse(option)}
                className={`w-full text-left p-3 border rounded-lg transition-all hover:border-accent ${
                  responses[currentPage] === option ? "border-accent bg-accent/10" : "border-border"
                }`}
              >
                <span className="text-sm">{option}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Debugging Exercise
function DebuggingExercise({ task, onAnswer, onInteraction }: any) {
  const [foundBugs, setFoundBugs] = useState<number[]>([]);

  const toggleBug = (lineNumber: number) => {
    onInteraction(`toggle-line-${lineNumber}`);
    const newBugs = foundBugs.includes(lineNumber)
      ? foundBugs.filter(b => b !== lineNumber)
      : [...foundBugs, lineNumber];
    setFoundBugs(newBugs);
    onAnswer(newBugs.sort());
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium">
        Find and select all the bugs in this code (click on line numbers):
      </p>

      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted px-4 py-2 border-b">
          <span className="text-sm font-medium">buggy_code.js</span>
        </div>
        <div className="font-mono text-sm">
          {task.code.split('\n').map((line: string, idx: number) => (
            <div key={idx} className="flex hover:bg-muted/50">
              <button
                onClick={() => toggleBug(idx + 1)}
                className={`px-3 py-1 text-right min-w-[3rem] border-r select-none transition-colors ${
                  foundBugs.includes(idx + 1)
                    ? "bg-red-100 text-red-800 border-red-300"
                    : "bg-muted text-muted-foreground hover:bg-accent/10"
                }`}
              >
                {idx + 1}
              </button>
              <pre className="px-4 py-1 flex-1">{line}</pre>
            </div>
          ))}
        </div>
      </div>

      {foundBugs.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {foundBugs.length} bug{foundBugs.length !== 1 ? 's' : ''} identified on line{foundBugs.length !== 1 ? 's' : ''}: {foundBugs.join(', ')}
        </p>
      )}
    </div>
  );
}
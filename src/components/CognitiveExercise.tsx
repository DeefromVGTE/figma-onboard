import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Clock, CheckCircle, XCircle, Brain } from "lucide-react";
import { CognitiveExercise as CognitiveExerciseType } from "../data/cognitive-exercises";

interface CognitiveExerciseProps {
  exercise: CognitiveExerciseType;
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

export function CognitiveExercise({ exercise, onComplete }: CognitiveExerciseProps) {
  const [answer, setAnswer] = useState<any>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());
  const [firstInteractionTime, setFirstInteractionTime] = useState<number | null>(null);
  const [changeCount, setChangeCount] = useState(0);
  const [interactions, setInteractions] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // State for prioritization exercise
  const [taskAssignments, setTaskAssignments] = useState<Record<number, string>>({});
  
  // State for time management exercise
  const [allocations, setAllocations] = useState<Record<string, number>>({});

  // Initialize allocations when exercise changes
  useEffect(() => {
    if (exercise.type === "time-management" && exercise.task.tasks) {
      const initialAllocations = Object.fromEntries(
        exercise.task.tasks.map((t: any) => [t.id.toString(), 0])
      );
      setAllocations(initialAllocations);
    }
    // Reset other state
    setAnswer(null);
    setTimeSpent(0);
    setFirstInteractionTime(null);
    setChangeCount(0);
    setInteractions([]);
    setIsSubmitted(false);
    setTaskAssignments({});
  }, [exercise.id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const recordInteraction = (type: string) => {
    if (!firstInteractionTime) {
      setFirstInteractionTime(Date.now());
    }
    setInteractions([...interactions, `${type}:${timeSpent}s`]);
    setChangeCount(changeCount + 1);
  };

  const handleSubmit = () => {
    const hesitationTime = firstInteractionTime 
      ? Math.floor((firstInteractionTime - startTime) / 1000)
      : timeSpent;

    const confidenceLevel: "low" | "medium" | "high" = 
      hesitationTime > 30 || changeCount > 5 ? "low" :
      hesitationTime > 10 || changeCount > 2 ? "medium" : "high";

    let correct = false;
    if (exercise.type === "pattern-recognition" || exercise.type === "logic-puzzle" || exercise.type === "scenario-judgment") {
      correct = answer === exercise.correctAnswer;
    } else if (exercise.type === "prioritization") {
      correct = JSON.stringify(answer) === JSON.stringify(exercise.correctAnswer);
    } else if (exercise.type === "time-management") {
      // Check if allocation is reasonable (within 20% of optimal)
      const optimal = exercise.correctAnswer as Record<string, number>;
      const isReasonable = Object.keys(optimal).every(key => {
        const diff = Math.abs((answer?.[key] || 0) - optimal[key]);
        return diff <= optimal[key] * 0.2;
      });
      correct = isReasonable;
    }

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
  };

  const determineApproach = (hesitationTime: number, changesCount: number, totalTime: number): string => {
    if (changesCount === 0 && totalTime < 30) return "quick-decisive";
    if (changesCount > 5) return "analytical-iterative";
    if (hesitationTime > 30) return "thoughtful-careful";
    return "methodical-confident";
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isAnswerComplete = () => {
    if (!answer) return false;
    
    if (exercise.type === "prioritization") {
      // Check if all tasks are assigned
      return answer && Object.keys(answer).length === 4;
    }
    
    if (exercise.type === "time-management") {
      // Check if hours add up to total
      const total = Object.values(answer || {}).reduce((sum: number, val: any) => sum + (val || 0), 0);
      return Math.abs(total - exercise.task.totalHours) < 0.1;
    }
    
    return true;
  };

  const renderPatternRecognition = () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">{exercise.task.question}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exercise.task.patterns.map((pattern: any) => (
          <Card
            key={pattern.id}
            className={`cursor-pointer transition-all ${
              answer === pattern.id ? "border-purple-500 bg-purple-50" : "hover:border-purple-200"
            }`}
            onClick={() => {
              recordInteraction("select-pattern");
              setAnswer(pattern.id);
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">Option {pattern.id.toUpperCase()}</Badge>
                {answer === pattern.id && <CheckCircle className="w-4 h-4 text-purple-600" />}
              </div>
              <pre className="text-xs bg-slate-900 text-slate-100 p-3 rounded overflow-x-auto">
                <code>{pattern.code}</code>
              </pre>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderLogicPuzzle = () => (
    <div className="space-y-4">
      <Card className="bg-indigo-50 border-indigo-200">
        <CardContent className="p-4">
          <pre className="text-sm whitespace-pre-wrap text-indigo-900">{exercise.task.scenario}</pre>
        </CardContent>
      </Card>
      
      <p className="font-medium">{exercise.task.question}</p>
      
      <RadioGroup value={answer} onValueChange={(value) => {
        recordInteraction("select-option");
        setAnswer(value);
      }}>
        {exercise.task.options.map((option: any) => (
          <div key={option.id} className="flex items-start space-x-3 p-3 rounded hover:bg-muted/50">
            <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
            <Label htmlFor={option.id} className="flex-1 cursor-pointer">
              {option.text}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  const renderPrioritization = () => {
    const handleDrop = (taskId: number, quadrant: string) => {
      recordInteraction("assign-task");
      setTaskAssignments({ ...taskAssignments, [taskId]: quadrant });
      
      // Update answer by grouping tasks by quadrant
      const newAnswer: Record<string, number[]> = {
        "urgent-important": [],
        "not-urgent-important": [],
        "urgent-not-important": [],
        "not-urgent-not-important": []
      };
      
      Object.entries({ ...taskAssignments, [taskId]: quadrant }).forEach(([tid, quad]) => {
        newAnswer[quad].push(parseInt(tid));
      });
      
      setAnswer(newAnswer);
    };

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Assign each task to the appropriate priority quadrant based on urgency and importance:
        </p>
        
        {/* Unassigned Tasks */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Tasks to Assign:</h4>
          <div className="flex flex-wrap gap-2">
            {exercise.task.tasks.filter((t: any) => !taskAssignments[t.id]).map((task: any) => (
              <Badge
                key={task.id}
                variant="secondary"
                className="cursor-move p-2 text-xs"
                draggable
                onDragStart={(e) => e.dataTransfer.setData("taskId", task.id.toString())}
              >
                {task.text}
              </Badge>
            ))}
          </div>
        </div>

        {/* Priority Matrix */}
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(exercise.task.quadrants).map(([key, label]) => (
            <Card
              key={key}
              className="min-h-[120px] border-2 border-dashed"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const taskId = parseInt(e.dataTransfer.getData("taskId"));
                handleDrop(taskId, key);
              }}
            >
              <CardHeader className="p-3">
                <CardTitle className="text-sm">{label}</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="space-y-1">
                  {exercise.task.tasks
                    .filter((t: any) => taskAssignments[t.id] === key)
                    .map((task: any) => (
                      <Badge key={task.id} variant="outline" className="text-xs block">
                        {task.text}
                      </Badge>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderScenarioJudgment = () => (
    <div className="space-y-4">
      <Card className="bg-slate-50 border-slate-200">
        <CardContent className="p-4">
          <p className="text-sm whitespace-pre-wrap">{exercise.task.scenario}</p>
        </CardContent>
      </Card>
      
      <p className="font-medium">{exercise.task.question}</p>
      
      <RadioGroup value={answer} onValueChange={(value) => {
        recordInteraction("select-response");
        setAnswer(value);
      }}>
        {exercise.task.options.map((option: any) => (
          <Card
            key={option.id}
            className={`cursor-pointer transition-all ${
              answer === option.id ? "border-purple-500 bg-purple-50" : ""
            }`}
            onClick={() => {
              recordInteraction("select-response");
              setAnswer(option.id);
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={option.id} className="cursor-pointer font-normal">
                    {option.text}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">{option.analysis}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
    </div>
  );

  const renderTimeManagement = () => {
    const totalAllocated = Object.values(allocations).reduce((sum, val) => sum + val, 0);
    const remaining = exercise.task.totalHours - totalAllocated;

    const handleSliderChange = (taskId: string, value: number[]) => {
      recordInteraction("adjust-time");
      const newAllocations = { ...allocations, [taskId]: value[0] };
      setAllocations(newAllocations);
      setAnswer(newAllocations);
    };

    return (
      <div className="space-y-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-sm">{exercise.task.scenario}</p>
            <p className="text-xs text-muted-foreground mt-2">{exercise.task.question}</p>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between p-3 bg-slate-100 rounded">
          <span className="text-sm font-medium">Total Allocated:</span>
          <span className={`text-lg font-bold ${remaining < 0 ? "text-red-600" : remaining > 0 ? "text-orange-600" : "text-green-600"}`}>
            {totalAllocated.toFixed(1)} / {exercise.task.totalHours} hours
          </span>
        </div>

        <div className="space-y-4">
          {exercise.task.tasks.map((task: any) => (
            <Card key={task.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{task.name}</span>
                      <Badge variant={task.priority === "high" ? "default" : "secondary"} className="text-xs">
                        {task.priority}
                      </Badge>
                      {task.required && <Badge className="text-xs bg-red-100 text-red-800">Required</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">Est. {task.estimatedTime}h</p>
                  </div>
                  <span className="text-lg font-bold text-purple-600 w-16 text-right">
                    {(allocations[task.id.toString()] || 0).toFixed(1)}h
                  </span>
                </div>
                <Slider
                  value={[allocations[task.id.toString()] || 0]}
                  onValueChange={(value) => handleSliderChange(task.id.toString(), value)}
                  max={task.estimatedTime}
                  step={0.5}
                  className="mt-2"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="border-2">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{exercise.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{exercise.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-mono">{formatTime(timeSpent)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {exercise.type === "pattern-recognition" && renderPatternRecognition()}
        {exercise.type === "logic-puzzle" && renderLogicPuzzle()}
        {exercise.type === "prioritization" && renderPrioritization()}
        {exercise.type === "scenario-judgment" && renderScenarioJudgment()}
        {exercise.type === "time-management" && renderTimeManagement()}

        <div className="mt-6 flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {interactions.length} interactions recorded
          </Badge>
          <Button
            onClick={handleSubmit}
            disabled={!isAnswerComplete() || isSubmitted}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Submit Answer
            <CheckCircle className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {isSubmitted && (
          <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <p className="text-sm text-purple-900">
              <strong>AI Analysis Complete:</strong> The AI has recorded your problem-solving approach, decision-making patterns, and response time for cognitive profile analysis.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
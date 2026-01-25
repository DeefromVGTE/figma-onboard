import { useState, useEffect } from "react";
import { Play, RotateCcw, Check, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface CodeEditorProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    starterCode: string;
    testCases: Array<{
      input: any;
      expectedOutput: any;
      description: string;
    }>;
    language: string;
  };
  onComplete: (result: {
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
  }) => void;
  onCodeChange?: (code: string, timeSpent: number) => void;
}

export function CodeEditor({ challenge, onComplete, onCodeChange }: CodeEditorProps) {
  const [code, setCode] = useState(challenge.starterCode);
  const [output, setOutput] = useState<string>("");
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; message: string }>>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [startTime] = useState(Date.now());
  const [timeSpent, setTimeSpent] = useState(0);
  const [executionHistory, setExecutionHistory] = useState<Array<{
    timestamp: number;
    code: string;
    testsPassed: number;
  }>>([]);

  // Reset state when challenge changes
  useEffect(() => {
    setCode(challenge.starterCode);
    setOutput("");
    setTestResults([]);
    setAttempts(0);
    setTimeSpent(0);
    setExecutionHistory([]);
  }, [challenge.id, challenge.starterCode]);

  // Track time spent
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTimeSpent(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  // Track code changes for AI analysis
  useEffect(() => {
    if (onCodeChange) {
      const debounce = setTimeout(() => {
        onCodeChange(code, timeSpent);
      }, 1000);

      return () => clearTimeout(debounce);
    }
  }, [code, timeSpent, onCodeChange]);

  const runCode = async () => {
    setIsRunning(true);
    setAttempts(prev => prev + 1);
    setOutput("");
    setTestResults([]);

    try {
      // Simulate code execution (in production, this would use a secure sandbox)
      const results = challenge.testCases.map(testCase => {
        try {
          // Create a function from the user's code
          const userFunction = new Function(`
            ${code}
            return solve;
          `)();

          const result = userFunction(testCase.input);
          const passed = JSON.stringify(result) === JSON.stringify(testCase.expectedOutput);

          return {
            passed,
            message: passed
              ? `✓ ${testCase.description}`
              : `✗ ${testCase.description}\nExpected: ${JSON.stringify(testCase.expectedOutput)}\nGot: ${JSON.stringify(result)}`
          };
        } catch (error) {
          return {
            passed: false,
            message: `✗ ${testCase.description}\nError: ${error instanceof Error ? error.message : 'Unknown error'}`
          };
        }
      });

      setTestResults(results);
      const passedCount = results.filter(r => r.passed).length;
      
      // Track execution history for AI analysis
      const execution = {
        timestamp: Date.now(),
        code,
        testsPassed: passedCount
      };
      setExecutionHistory(prev => [...prev, execution]);

      setOutput(
        results.map(r => r.message).join("\n\n") +
        `\n\n${passedCount}/${results.length} tests passed`
      );
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = () => {
    const passedCount = testResults.filter(r => r.passed).length;
    onComplete({
      code,
      timeSpent,
      attempts,
      testsPassed: passedCount,
      totalTests: challenge.testCases.length,
      executionHistory
    });
  };

  const resetCode = () => {
    setCode(challenge.starterCode);
    setOutput("");
    setTestResults([]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const difficultyColors = {
    easy: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-amber-100 text-amber-800 border-amber-200",
    hard: "bg-red-100 text-red-800 border-red-200"
  };

  return (
    <div className="space-y-4">
      {/* Challenge Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold">{challenge.title}</h3>
            <Badge className={difficultyColors[challenge.difficulty]}>
              {challenge.difficulty}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm">{challenge.description}</p>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Time:</span>
            <Badge variant="outline" className="font-mono">
              {formatTime(timeSpent)}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Attempts:</span>
            <Badge variant="outline">{attempts}</Badge>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted px-4 py-2 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-3 text-sm font-medium">{challenge.language}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={resetCode}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button 
              size="sm" 
              variant="accent"
              onClick={runCode}
              disabled={isRunning}
            >
              {isRunning ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                  Running...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Tests
                </>
              )}
            </Button>
          </div>
        </div>
        
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full min-h-[400px] p-4 font-mono text-sm bg-background resize-y focus:outline-none"
          spellCheck={false}
          placeholder="Write your code here..."
        />
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted px-4 py-2 border-b">
            <h4 className="font-medium text-sm">Test Results</h4>
          </div>
          <div className="p-4 space-y-2">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  result.passed
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                {result.passed ? (
                  <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                )}
                <pre className="text-sm whitespace-pre-wrap flex-1">{result.message}</pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Output Console */}
      {output && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-muted px-4 py-2 border-b">
            <h4 className="font-medium text-sm">Console Output</h4>
          </div>
          <pre className="p-4 text-sm font-mono whitespace-pre-wrap bg-background min-h-[100px]">
            {output}
          </pre>
        </div>
      )}

      {/* Submit Button */}
      {testResults.length > 0 && (
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            <Check className="w-4 h-4 mr-2" />
            Submit & Continue to Next Challenge
          </Button>
        </div>
      )}
    </div>
  );
}
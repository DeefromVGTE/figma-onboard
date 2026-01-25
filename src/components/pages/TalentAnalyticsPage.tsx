import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { User, Trophy, Target, Clock, Star, BookOpen, Zap, TrendingUp, Award, CheckCircle2, Calendar, Brain } from "lucide-react";

const candidateProfile = {
  name: "Sarah Chen",
  role: "ML Engineer Track",
  joinDate: "2024-06-15",
  overallProgress: 78,
  currentLevel: "Advanced",
  nextMilestone: "Technical Interview Ready",
  skillsCompleted: 12,
  totalSkills: 16,
  learningStreak: 23,
  rank: "Top 15%"
};

const progressData = [
  { week: "Week 1", progress: 15, timeSpent: 8 },
  { week: "Week 2", progress: 28, timeSpent: 12 },
  { week: "Week 3", progress: 42, timeSpent: 10 },
  { week: "Week 4", progress: 55, timeSpent: 14 },
  { week: "Week 5", progress: 68, timeSpent: 11 },
  { week: "Week 6", progress: 78, timeSpent: 9 },
];

const skillsRadarData = [
  { skill: "Machine Learning", current: 85, target: 90 },
  { skill: "Python", current: 92, target: 95 },
  { skill: "Statistics", current: 78, target: 85 },
  { skill: "Deep Learning", current: 70, target: 85 },
  { skill: "Data Structures", current: 88, target: 90 },
  { skill: "System Design", current: 65, target: 80 },
];

const completedModules = [
  { title: "Introduction to ML", score: 94, timeSpent: "4.2h", difficulty: "Beginner", completedDate: "2024-07-01" },
  { title: "Neural Networks Fundamentals", score: 89, timeSpent: "6.8h", difficulty: "Intermediate", completedDate: "2024-07-08" },
  { title: "Advanced Algorithms", score: 87, timeSpent: "8.1h", difficulty: "Advanced", completedDate: "2024-07-15" },
  { title: "TensorFlow Deep Dive", score: 91, timeSpent: "5.5h", difficulty: "Intermediate", completedDate: "2024-07-22" },
];

const upcomingModules = [
  { title: "Computer Vision", estimatedTime: "7.2h", difficulty: "Advanced", deadline: "2024-08-05", priority: "High" },
  { title: "MLOps & Deployment", estimatedTime: "5.8h", difficulty: "Intermediate", deadline: "2024-08-12", priority: "Medium" },
  { title: "System Design for ML", estimatedTime: "6.5h", difficulty: "Advanced", deadline: "2024-08-19", priority: "High" },
];

const companyMatches = [
  {
    company: "TechFlow AI",
    matchScore: 94,
    role: "Senior ML Engineer",
    skillsMatch: ["ML", "Python", "TensorFlow"],
    missingSkills: ["Computer Vision"],
    interviewReady: true,
    estimatedSalary: "$145K - $165K"
  },
  {
    company: "DataVision Corp",
    matchScore: 87,
    role: "ML Research Engineer", 
    skillsMatch: ["Deep Learning", "Python", "Statistics"],
    missingSkills: ["MLOps", "System Design"],
    interviewReady: false,
    estimatedSalary: "$135K - $155K"
  },
  {
    company: "AI Solutions Ltd",
    matchScore: 82,
    role: "AI Engineer",
    skillsMatch: ["ML", "Neural Networks", "Python"],
    missingSkills: ["Computer Vision", "MLOps"],
    interviewReady: false,
    estimatedSalary: "$125K - $145K"
  }
];

const achievements = [
  { title: "Speed Learner", description: "Completed 3 modules ahead of schedule", icon: Zap, date: "2024-07-20" },
  { title: "Top Performer", description: "Scored 90%+ on 4 consecutive assessments", icon: Trophy, date: "2024-07-18" },
  { title: "Consistent Learner", description: "Maintained 20+ day learning streak", icon: Target, date: "2024-07-15" },
  { title: "Peer Helper", description: "Helped 5+ fellow candidates", icon: Star, date: "2024-07-10" }
];

export function TalentAnalyticsPage() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {candidateProfile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{candidateProfile.name}</h1>
                  <p className="text-muted-foreground">{candidateProfile.role}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge className="bg-green-100 text-green-800 border-0">
                      {candidateProfile.currentLevel}
                    </Badge>
                    <Badge variant="outline">
                      {candidateProfile.rank} of cohort
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Joined {new Date(candidateProfile.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">{candidateProfile.overallProgress}%</div>
                <div className="text-sm text-muted-foreground">Overall Progress</div>
                <div className="text-sm font-medium mt-1">Next: {candidateProfile.nextMilestone}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-6">
            {/* Key Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold">{candidateProfile.skillsCompleted}/{candidateProfile.totalSkills}</div>
                  <div className="text-sm text-muted-foreground">Skills Completed</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold">{candidateProfile.learningStreak}</div>
                  <div className="text-sm text-muted-foreground">Day Learning Streak</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold">54.8h</div>
                  <div className="text-sm text-muted-foreground">Total Learning Time</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold">90.3</div>
                  <div className="text-sm text-muted-foreground">Average Score</div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Chart */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress Over Time</CardTitle>
                  <CardDescription>Your weekly progress and time investment</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line yAxisId="left" type="monotone" dataKey="progress" stroke="#8884d8" strokeWidth={3} />
                      <Line yAxisId="right" type="monotone" dataKey="timeSpent" stroke="#82ca9d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Milestones</CardTitle>
                  <CardDescription>Your path to interview readiness</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Complete Computer Vision Module", progress: 0, deadline: "Aug 5", priority: "high" },
                      { title: "Pass System Design Assessment", progress: 25, deadline: "Aug 12", priority: "high" },
                      { title: "Technical Interview Preparation", progress: 60, deadline: "Aug 15", priority: "medium" },
                      { title: "Portfolio Project Completion", progress: 80, deadline: "Aug 20", priority: "medium" }
                    ].map((milestone, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium text-sm">{milestone.title}</span>
                          <div className="flex items-center gap-2">
                            <Badge className={milestone.priority === "high" ? "bg-red-100 text-red-800 border-0" : "bg-orange-100 text-orange-800 border-0"}>
                              {milestone.deadline}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{milestone.progress}%</span>
                          </div>
                        </div>
                        <Progress value={milestone.progress} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Skills Assessment</CardTitle>
                  <CardDescription>Current skill level vs target requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={skillsRadarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar name="Current" dataKey="current" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                      <Radar name="Target" dataKey="target" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.1} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skill Development Plan</CardTitle>
                  <CardDescription>Recommended focus areas to reach your goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillsRadarData
                      .sort((a, b) => (b.target - b.current) - (a.target - a.current))
                      .map((skill, index) => {
                        const gap = skill.target - skill.current;
                        return (
                          <div key={index} className="p-3 border rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium">{skill.skill}</span>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{skill.current}%</Badge>
                                <span className="text-xs text-muted-foreground">→ {skill.target}%</span>
                              </div>
                            </div>
                            <Progress value={(skill.current / skill.target) * 100} />
                            <div className="text-xs text-muted-foreground mt-1">
                              {gap > 10 ? "High Priority" : gap > 5 ? "Medium Priority" : "Low Priority"}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Completed Modules</CardTitle>
                  <CardDescription>Your learning achievements so far</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {completedModules.map((module, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <div className="font-medium">{module.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {module.timeSpent} • {module.difficulty}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">{module.score}%</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(module.completedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Modules</CardTitle>
                  <CardDescription>Your personalized learning path ahead</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingModules.map((module, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-medium">{module.title}</div>
                            <div className="text-sm text-muted-foreground">
                              {module.estimatedTime} • {module.difficulty}
                            </div>
                          </div>
                          <Badge className={
                            module.priority === "High" ? "bg-red-100 text-red-800 border-0" : 
                            "bg-orange-100 text-orange-800 border-0"
                          }>
                            {module.priority}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">
                            Due: {new Date(module.deadline).toLocaleDateString()}
                          </span>
                          <Button size="sm" variant="outline">Start Learning</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <div className="space-y-6">
              {companyMatches.map((match, index) => (
                <Card key={index} className={`${match.interviewReady ? 'border-green-200 bg-green-50/30' : ''}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{match.company}</CardTitle>
                        <CardDescription>{match.role}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{match.matchScore}%</div>
                        <div className="text-sm text-muted-foreground">Match Score</div>
                        {match.interviewReady && (
                          <Badge className="bg-green-100 text-green-800 border-0 mt-1">
                            Interview Ready
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Matching Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {match.skillsMatch.map((skill) => (
                            <Badge key={skill} className="bg-green-100 text-green-800 border-0">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Skills to Develop</h4>
                        <div className="flex flex-wrap gap-1">
                          {match.missingSkills.map((skill) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Estimated Salary</h4>
                        <div className="text-lg font-bold">{match.estimatedSalary}</div>
                        <Button 
                          size="sm" 
                          className="mt-2 w-full"
                          variant={match.interviewReady ? "default" : "outline"}
                        >
                          {match.interviewReady ? "Apply Now" : "Complete Training"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Achievements</CardTitle>
                  <CardDescription>Your accomplishments and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <achievement.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{achievement.title}</div>
                          <div className="text-sm text-muted-foreground">{achievement.description}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(achievement.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Insights</CardTitle>
                  <CardDescription>AI-powered recommendations for your growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Brain className="w-5 h-5 text-blue-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-blue-900">Peak Learning Time</h4>
                          <p className="text-sm text-blue-700">
                            You perform 23% better during morning hours (9-11 AM). Consider scheduling complex topics then.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-green-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-green-900">Strength Pattern</h4>
                          <p className="text-sm text-green-700">
                            Your strongest area is practical coding challenges. Consider taking on more advanced algorithm problems.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-orange-600 mt-1" />
                        <div>
                          <h4 className="font-medium text-orange-900">Focus Recommendation</h4>
                          <p className="text-sm text-orange-700">
                            Spend 2 more hours on System Design to unlock 3 high-match opportunities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
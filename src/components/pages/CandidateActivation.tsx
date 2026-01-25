import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';
import {
  Users, CheckCircle, Target, Calendar, Send, X, Play,
  Award, Clock, Mail, Phone, MapPin, TrendingUp, Eye,
  MessageSquare, FileText, Brain, Code, Star, Zap, ChevronRight
} from 'lucide-react';
import { useRouter } from '../Router';
import { RecruiterNav } from '../RecruiterNav';

export function CandidateActivation() {
  const { navigateTo, setUserRole } = useRouter();
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [showActivationModal, setShowActivationModal] = useState(false);

  const candidates = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      location: "San Francisco, CA",
      jobReadyScore: 67,
      targetRole: "AI Engineer",
      waitingDays: 2,
      skills: ["Python", "TensorFlow", "ML", "React"],
      skillsScore: 87,
      cognitiveScore: 92,
      behavioralScore: 88,
      matchScore: 94,
      trainingWeeks: 14
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      email: "marcus.r@email.com",
      location: "Austin, TX",
      jobReadyScore: 72,
      targetRole: "Backend Engineer",
      waitingDays: 3,
      skills: ["Node.js", "Python", "PostgreSQL", "Docker"],
      skillsScore: 85,
      cognitiveScore: 88,
      behavioralScore: 95,
      matchScore: 89,
      trainingWeeks: 12
    }
  ];

  const toggleSelection = (id: number) => {
    setSelectedCandidates(prev =>
      prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
    );
  };

  return (
    <>
      <RecruiterNav />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {selectedCandidates.length > 0 && (
          <div className="bg-white border-b shadow-sm py-3">
            <div className="container mx-auto px-4 flex justify-end">
              <Button onClick={() => setShowActivationModal(true)}>
                <Play className="w-4 h-4 mr-2" />
                Activate {selectedCandidates.length}
              </Button>
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Standby Candidates</h1>
            <p className="text-gray-600">Select candidates to activate for training</p>
          </div>

          <div className="space-y-6">
            {candidates.map((candidate) => (
              <Card key={candidate.id} className={`border-2 shadow-lg ${selectedCandidates.includes(candidate.id) ? 'border-blue-500 bg-blue-50' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <input
                      type="checkbox"
                      checked={selectedCandidates.includes(candidate.id)}
                      onChange={() => toggleSelection(candidate.id)}
                      className="w-5 h-5 mt-1"
                    />
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="text-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{candidate.name}</h3>
                          <p className="text-gray-600 mb-2">{candidate.targetRole}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {candidate.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {candidate.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Waiting {candidate.waitingDays} days
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-blue-600 mb-1">
                            {candidate.jobReadyScore}%
                          </div>
                          <div className="text-sm text-gray-600">Job Ready</div>
                          <Badge className="mt-2 bg-blue-100 text-blue-800 border-0">
                            {candidate.matchScore}% Match
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <div className="text-xs text-blue-900 font-medium mb-1">Skills</div>
                          <div className="text-lg font-bold text-blue-600">{candidate.skillsScore}%</div>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                          <div className="text-xs text-purple-900 font-medium mb-1">Cognitive</div>
                          <div className="text-lg font-bold text-purple-600">{candidate.cognitiveScore}%</div>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <div className="text-xs text-green-900 font-medium mb-1">Behavioral</div>
                          <div className="text-lg font-bold text-green-600">{candidate.behavioralScore}%</div>
                        </div>
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                          <div className="text-xs text-orange-900 font-medium mb-1">Training</div>
                          <div className="text-lg font-bold text-orange-600">{candidate.trainingWeeks}w</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {candidate.skills.map(skill => (
                            <Badge key={skill} variant="secondary">{skill}</Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Profile
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {showActivationModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowActivationModal(false)}>
            <Card className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
              <CardHeader>
                <CardTitle>Activate Candidates for Training</CardTitle>
                <CardDescription>Assign to project and send welcome message</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Selected Candidates</label>
                  <div className="space-y-2">
                    {candidates
                      .filter(c => selectedCandidates.includes(c.id))
                      .map(candidate => (
                        <div key={candidate.id} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">{candidate.name}</div>
                            <div className="text-sm text-gray-600">{candidate.targetRole}</div>
                          </div>
                          <Badge className="bg-blue-600 text-white">
                            {candidate.jobReadyScore}%
                          </Badge>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Assign to Project</label>
                  <select className="w-full p-3 border rounded-lg">
                    <option value="">Select a project...</option>
                    <option>AI Customer Service Platform</option>
                    <option>Fraud Detection System</option>
                    <option>ML Model Optimization</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Welcome Message</label>
                  <textarea
                    className="w-full p-3 border rounded-lg min-h-24"
                    placeholder="Write a personal welcome message..."
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">What Happens Next?</h4>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5" />
                      <span>Candidates receive email notification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5" />
                      <span>Access to personalized curriculum</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5" />
                      <span>Training begins immediately</span>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setShowActivationModal(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                    <Send className="w-4 h-4 mr-2" />
                    Activate & Notify
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
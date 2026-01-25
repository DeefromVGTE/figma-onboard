import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  Shield, CheckCircle, X, AlertTriangle, Eye, Clock, Search,
  Filter, User, Mail, Phone, CreditCard, Video, Linkedin,
  Flag, MessageSquare, Download, FileText, Play, ThumbsUp,
  ThumbsDown, AlertCircle, ChevronRight, Users, TrendingUp,
  Calendar, Settings, Bell, BarChart3, Target
} from 'lucide-react';
import { useRouter } from '../Router';
import { RecruiterNav } from '../RecruiterNav';

export function VerificationManagement() {
  const { navigateTo, setUserRole } = useRouter();
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState('pending');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const pendingVerifications = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      phone: "+1 (555) 123-4567",
      submittedDate: "2024-11-06 10:30 AM",
      waitingTime: "2 hours",
      trustScore: 85,
      flags: [],
      verificationStatus: {
        email: { status: "verified", timestamp: "2024-11-06 10:31 AM" },
        phone: { status: "verified", timestamp: "2024-11-06 10:35 AM" },
        identity: { status: "pending_review", documentType: "Driver's License", uploadedAt: "2024-11-06 10:40 AM" },
        video: { status: "pending_review", duration: "2:34", uploadedAt: "2024-11-06 10:45 AM" },
        social: { status: "verified", linkedin: true, github: true },
        behavioral: { status: "verified", score: 92 }
      },
      notes: []
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      email: "marcus.r@email.com",
      phone: "+1 (555) 234-5678",
      submittedDate: "2024-11-06 09:15 AM",
      waitingTime: "3.5 hours",
      trustScore: 68,
      flags: ["ID_QUALITY_LOW", "VIDEO_AUDIO_UNCLEAR"],
      verificationStatus: {
        email: { status: "verified", timestamp: "2024-11-06 09:16 AM" },
        phone: { status: "verified", timestamp: "2024-11-06 09:20 AM" },
        identity: { status: "flagged", documentType: "Passport", uploadedAt: "2024-11-06 09:25 AM", issue: "Low image quality" },
        video: { status: "flagged", duration: "1:45", uploadedAt: "2024-11-06 09:30 AM", issue: "Audio unclear" },
        social: { status: "not_provided" },
        behavioral: { status: "verified", score: 78 }
      },
      notes: []
    },
    {
      id: 3,
      name: "Elena Petrov",
      email: "elena.p@email.com",
      phone: "+1 (555) 345-6789",
      submittedDate: "2024-11-06 08:00 AM",
      waitingTime: "5 hours",
      trustScore: 92,
      flags: [],
      verificationStatus: {
        email: { status: "verified", timestamp: "2024-11-06 08:01 AM" },
        phone: { status: "verified", timestamp: "2024-11-06 08:05 AM" },
        identity: { status: "pending_review", documentType: "National ID", uploadedAt: "2024-11-06 08:10 AM" },
        video: { status: "pending_review", duration: "3:12", uploadedAt: "2024-11-06 08:15 AM" },
        social: { status: "verified", linkedin: true, github: true, portfolio: true },
        behavioral: { status: "verified", score: 95 }
      },
      notes: []
    }
  ];

  const stats = {
    pendingReview: 23,
    approvedToday: 45,
    rejectedToday: 3,
    avgReviewTime: "18 min",
    flaggedCases: 8
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'verified': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending_review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'flagged': return 'bg-red-100 text-red-800 border-red-200';
      case 'not_provided': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleApprove = (candidateId: number) => {
    console.log('Approving candidate:', candidateId);
    setSelectedCandidate(null);
  };

  const handleReject = (candidateId: number, reason: string) => {
    console.log('Rejecting candidate:', candidateId, 'Reason:', reason);
    setShowRejectModal(false);
    setSelectedCandidate(null);
  };

  const handleRequestMoreInfo = (candidateId: number) => {
    console.log('Requesting more info from:', candidateId);
  };

  if (selectedCandidate) {
    return (
      <>
        <RecruiterNav />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="bg-white border-b shadow-sm py-4">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedCandidate(null)}>
                    <ChevronRight className="w-5 h-5 rotate-180" />
                  </Button>
                  <div>
                    <div className="font-semibold">{selectedCandidate.name}</div>
                    <div className="text-sm text-gray-500">Verification Review</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${getTrustScoreColor(selectedCandidate.trustScore)} border-0`}>
                    Trust Score: {selectedCandidate.trustScore}%
                  </Badge>
                  {selectedCandidate.flags.length > 0 && (
                    <Badge className="bg-red-100 text-red-800 border-0">
                      <Flag className="w-3 h-3 mr-1" />
                      {selectedCandidate.flags.length} Flags
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-6">
            <div className="grid lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-6">
                {/* Identity Document Review */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Identity Document
                    </CardTitle>
                    <CardDescription>
                      {selectedCandidate.verificationStatus.identity.documentType} • Uploaded {selectedCandidate.verificationStatus.identity.uploadedAt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center text-gray-500">
                        <FileText className="w-16 h-16 mx-auto mb-2" />
                        <p>Document Preview</p>
                        <p className="text-sm">Driver's License - Sarah Chen</p>
                      </div>
                    </div>

                    {selectedCandidate.verificationStatus.identity.issue && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-red-900">Issue Detected</p>
                            <p className="text-sm text-red-700">{selectedCandidate.verificationStatus.identity.issue}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="border rounded-lg p-3">
                        <div className="text-sm text-gray-500 mb-1">Document Type</div>
                        <div className="font-medium">{selectedCandidate.verificationStatus.identity.documentType}</div>
                      </div>
                      <div className="border rounded-lg p-3">
                        <div className="text-sm text-gray-500 mb-1">Upload Quality</div>
                        <div className="font-medium">High Resolution</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Download Original
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View Full Size
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Video Introduction Review */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      Video Introduction
                    </CardTitle>
                    <CardDescription>
                      Duration: {selectedCandidate.verificationStatus.video.duration} • Uploaded {selectedCandidate.verificationStatus.video.uploadedAt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center text-white">
                        <Play className="w-16 h-16 mx-auto mb-2 opacity-75" />
                        <p>Video Preview</p>
                      </div>
                    </div>

                    {selectedCandidate.verificationStatus.video.issue && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-red-900">Issue Detected</p>
                            <p className="text-sm text-red-700">{selectedCandidate.verificationStatus.video.issue}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-blue-900 mb-2">Questions Answered:</h4>
                      <ul className="space-y-1 text-sm text-blue-700">
                        <li>✓ Introduction and name</li>
                        <li>✓ Motivation for joining</li>
                        <li>✓ Current experience level</li>
                        <li>✓ Career goals</li>
                      </ul>
                    </div>

                    <Button variant="outline" className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Play Full Video
                    </Button>
                  </CardContent>
                </Card>

                {/* Behavioral Assessment Results */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Behavioral Assessment
                    </CardTitle>
                    <CardDescription>
                      Community fit evaluation • Score: {selectedCandidate.verificationStatus.behavioral.score}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          <div>
                            <div className="font-medium text-green-900">Strong Community Fit</div>
                            <div className="text-sm text-green-700">Demonstrated collaborative mindset</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div className="text-center p-2 bg-white rounded">
                            <div className="font-bold text-green-600">95%</div>
                            <div className="text-gray-600">Helpfulness</div>
                          </div>
                          <div className="text-center p-2 bg-white rounded">
                            <div className="font-bold text-green-600">88%</div>
                            <div className="text-gray-600">Respect</div>
                          </div>
                          <div className="text-center p-2 bg-white rounded">
                            <div className="font-bold text-green-600">92%</div>
                            <div className="text-gray-600">Initiative</div>
                          </div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <div className="text-sm text-gray-600 mb-2">AI Analysis Summary:</div>
                        <p className="text-sm">
                          Candidate shows strong collaborative tendencies and community-oriented responses. 
                          Demonstrates empathy and willingness to help others. Low risk for disruptive behavior.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                {/* Candidate Summary */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Candidate Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {selectedCandidate.name.split(' ').map((n: string) => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{selectedCandidate.name}</div>
                        <div className="text-sm text-gray-500">AI Engineer Track</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{selectedCandidate.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>{selectedCandidate.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>Waiting: {selectedCandidate.waitingTime}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Verification Checklist */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Verification Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(selectedCandidate.verificationStatus).map(([key, value]: [string, any]) => (
                      <div key={key} className="flex items-center justify-between p-2 rounded border">
                        <span className="text-sm font-medium capitalize">{key.replace('_', ' ')}</span>
                        <Badge className={`${getStatusColor(value.status)} border text-xs`}>
                          {value.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Review Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600"
                      onClick={() => handleApprove(selectedCandidate.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Candidate
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                      onClick={() => handleRequestMoreInfo(selectedCandidate.id)}
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Request More Info
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-red-300 text-red-700 hover:bg-red-50"
                      onClick={() => setShowRejectModal(true)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject Application
                    </Button>
                  </CardContent>
                </Card>

                {/* Notes */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Internal Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <textarea 
                      placeholder="Add notes about this verification..."
                      className="w-full p-3 border rounded-lg min-h-24 text-sm"
                    />
                    <Button size="sm" className="w-full mt-2">
                      Save Note
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Reject Modal */}
          {showRejectModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowRejectModal(false)}>
              <Card className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <CardHeader>
                  <CardTitle>Reject Application</CardTitle>
                  <CardDescription>Please provide a reason for rejection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <select 
                    className="w-full p-2 border rounded-lg"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  >
                    <option value="">Select reason...</option>
                    <option value="invalid_id">Invalid or Fake ID</option>
                    <option value="poor_video">Video Quality/Content Issues</option>
                    <option value="behavioral_concerns">Behavioral Concerns</option>
                    <option value="duplicate_account">Duplicate Account</option>
                    <option value="suspicious_activity">Suspicious Activity</option>
                    <option value="other">Other</option>
                  </select>
                  <textarea 
                    placeholder="Additional details (optional)..."
                    className="w-full p-3 border rounded-lg min-h-24"
                  />
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1" onClick={() => setShowRejectModal(false)}>
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1 bg-red-600 hover:bg-red-700"
                      onClick={() => handleReject(selectedCandidate.id, rejectReason)}
                      disabled={!rejectReason}
                    >
                      Confirm Rejection
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

  return (
    <>
      <RecruiterNav />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-6">
          {/* Stats Overview */}
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">{stats.pendingReview}</div>
                    <div className="text-sm text-gray-600">Pending Review</div>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{stats.approvedToday}</div>
                    <div className="text-sm text-gray-600">Approved Today</div>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-red-600">{stats.rejectedToday}</div>
                    <div className="text-sm text-gray-600">Rejected Today</div>
                  </div>
                  <X className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{stats.flaggedCases}</div>
                    <div className="text-sm text-gray-600">Flagged Cases</div>
                  </div>
                  <Flag className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{stats.avgReviewTime}</div>
                    <div className="text-sm text-gray-600">Avg Review Time</div>
                  </div>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-0 shadow-lg mb-6">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search by name, email..." className="pl-10" />
                </div>
                <select 
                  className="p-2 border rounded-lg"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="pending">Pending Review</option>
                  <option value="flagged">Flagged</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Candidates List */}
          <div className="space-y-4">
            {pendingVerifications.map((candidate) => (
              <Card 
                key={candidate.id} 
                className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => setSelectedCandidate(candidate)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{candidate.name}</h3>
                          <Badge className={`${getTrustScoreColor(candidate.trustScore)} border-0`}>
                            {candidate.trustScore}% Trust Score
                          </Badge>
                          {candidate.flags.length > 0 && (
                            <Badge className="bg-red-100 text-red-800 border-0">
                              <Flag className="w-3 h-3 mr-1" />
                              {candidate.flags.length}
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {candidate.email}
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {candidate.phone}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {candidate.submittedDate}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Waiting {candidate.waitingTime}
                          </div>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
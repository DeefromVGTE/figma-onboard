import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Users, Mail, User, Code, Brain, GraduationCap, Briefcase, Star, ChevronRight } from "lucide-react";

const skillAreas = [
  "Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Data Science",
  "Python", "JavaScript", "React", "Node.js", "AWS", "Docker", "Kubernetes",
  "Product Management", "DevOps", "UI/UX Design", "Mobile Development"
];

const companies = [
  {
    name: "TechFlow AI",
    type: "AI Customer Service",
    roles: ["NLP Engineer", "Backend Developer"],
    urgency: "Hiring Now",
    badge: "Hot"
  },
  {
    name: "FinanceAI",
    type: "Fraud Detection",
    roles: ["ML Engineer", "Security Specialist"],
    urgency: "Starting Soon",
    badge: "New"
  },
  {
    name: "HealthTech Pro",
    type: "Medical Diagnostics",
    roles: ["Computer Vision", "Frontend Developer"],
    urgency: "2 weeks",
    badge: "Featured"
  }
];

export function TalentSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    experience: "",
    skills: [] as string[],
    interests: "",
    availability: ""
  });
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleCompanyInterest = (company: string) => {
    setSelectedCompanies(prev =>
      prev.includes(company)
        ? prev.filter(c => c !== company)
        : [...prev, company]
    );
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const getStepColor = (stepNum: number) => {
    if (stepNum < step) return "bg-green-100 text-green-800 border-green-300";
    if (stepNum === step) return "bg-blue-100 text-blue-800 border-blue-300";
    return "bg-gray-100 text-gray-500 border-gray-300";
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Join Our Talent Network</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with exciting AI startups and get personalized training to land your dream role
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${getStepColor(stepNum)}`}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`w-12 h-0.5 mx-2 ${stepNum < step ? 'bg-green-300' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Tell us about yourself and your background
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                      <SelectItem value="lead">Lead/Principal (8+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="availability">Availability</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, availability: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="When are you available?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediately</SelectItem>
                      <SelectItem value="2weeks">2 weeks notice</SelectItem>
                      <SelectItem value="1month">1 month notice</SelectItem>
                      <SelectItem value="exploring">Just exploring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button onClick={nextStep} disabled={!formData.name || !formData.email}>
                    Next Step
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Skills & Interests */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Skills & Interests
                </CardTitle>
                <CardDescription>
                  Select your skills and tell us what excites you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-4 block">Select Your Skills</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {skillAreas.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={formData.skills.includes(skill)}
                          onCheckedChange={() => handleSkillToggle(skill)}
                        />
                        <Label htmlFor={skill} className="text-sm cursor-pointer">
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      Selected: {formData.skills.length} skill{formData.skills.length !== 1 ? 's' : ''}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="interests">What type of AI projects excite you most?</Label>
                  <Textarea
                    id="interests"
                    value={formData.interests}
                    onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
                    placeholder="e.g., I'm passionate about using AI to solve healthcare problems, particularly in medical imaging and diagnostic tools..."
                    className="min-h-24"
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button onClick={nextStep} disabled={formData.skills.length === 0}>
                    Next Step
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Company Matching */}
          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Company Matching
                </CardTitle>
                <CardDescription>
                  Based on your profile, here are startups looking for talent like you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {companies.map((company, index) => (
                    <Card key={index} className={`cursor-pointer transition-all ${
                      selectedCompanies.includes(company.name) 
                        ? 'border-blue-300 bg-blue-50' 
                        : 'hover:border-gray-300'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={selectedCompanies.includes(company.name)}
                              onCheckedChange={() => handleCompanyInterest(company.name)}
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold">{company.name}</h4>
                                <Badge className={
                                  company.badge === "Hot" ? "bg-red-100 text-red-800 border-0" :
                                  company.badge === "New" ? "bg-green-100 text-green-800 border-0" :
                                  "bg-purple-100 text-purple-800 border-0"
                                }>
                                  {company.badge}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{company.type}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{company.urgency}</div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              4.8 Company Rating
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {company.roles.map((role) => (
                            <Badge key={role} variant="outline">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Brain className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">What Happens Next?</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• AI creates personalized training curricula for your selected companies</li>
                        <li>• You receive immediate access to relevant learning modules</li>
                        <li>• Companies get notified about your interest and progress</li>
                        <li>• Fast-track to interviews as you complete training milestones</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                  <Button size="lg" disabled={selectedCompanies.length === 0}>
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Join & Start Learning ({selectedCompanies.length} companies)
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
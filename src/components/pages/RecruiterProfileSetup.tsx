import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Progress } from "../ui/progress";
import { Logo } from "../Logo";
import { useRouter } from "../Router";
import { Building2, User, Phone, MapPin, Linkedin, Globe, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Step = "personal" | "business" | "review";

interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  phone: string;
  linkedin: string;
}

interface BusinessInfo {
  companyName: string;
  companyWebsite: string;
  companySize: string;
  industry: string;
  location: string;
  description: string;
}

export function RecruiterProfileSetup() {
  const [currentStep, setCurrentStep] = useState<Step>("personal");
  const [isLoading, setIsLoading] = useState(false);
  const { navigateTo, setUserRole } = useRouter();

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    jobTitle: "",
    phone: "",
    linkedin: ""
  });

  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    companyName: "",
    companyWebsite: "",
    companySize: "",
    industry: "",
    location: "",
    description: ""
  });

  const stepProgress = {
    "personal": 33,
    "business": 66,
    "review": 100
  };

  const handleNext = () => {
    if (currentStep === "personal") {
      // Validate personal info
      if (!personalInfo.fullName || !personalInfo.jobTitle) {
        alert("Please fill in all required personal information");
        return;
      }
      setCurrentStep("business");
    } else if (currentStep === "business") {
      // Validate business info
      if (!businessInfo.companyName || !businessInfo.industry || !businessInfo.location) {
        alert("Please fill in all required business information");
        return;
      }
      setCurrentStep("review");
    }
  };

  const handleBack = () => {
    if (currentStep === "business") {
      setCurrentStep("personal");
    } else if (currentStep === "review") {
      setCurrentStep("business");
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);

    // Simulate profile creation
    setTimeout(() => {
      // Store recruiter profile
      const recruiterProfile = {
        ...personalInfo,
        ...businessInfo,
        accountType: "recruiter",
        createdAt: new Date().toISOString()
      };

      localStorage.setItem("onboardai_recruiter_profile", JSON.stringify(recruiterProfile));
      
      // Update user data
      const userData = JSON.parse(localStorage.getItem("onboardai_user") || "{}");
      userData.profileComplete = true;
      localStorage.setItem("onboardai_user", JSON.stringify(userData));

      setIsLoading(false);
      setUserRole("recruiter");
      navigateTo("dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-indigo-50 to-violet-100 p-4">
      <div className="container mx-auto max-w-3xl py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" showText={true} />
          </div>
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            Complete Your Recruiter Profile
          </h1>
          <p className="text-muted-foreground">
            Help us personalize your experience and connect you with the right talent
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between mb-2 text-sm">
            <span className={currentStep === "personal" ? "text-violet-600 font-medium" : "text-muted-foreground"}>
              Personal Info
            </span>
            <span className={currentStep === "business" ? "text-violet-600 font-medium" : "text-muted-foreground"}>
              Business Info
            </span>
            <span className={currentStep === "review" ? "text-violet-600 font-medium" : "text-muted-foreground"}>
              Review
            </span>
          </div>
          <Progress value={stepProgress[currentStep]} className="h-2" />
        </div>

        {/* Personal Information Step */}
        {currentStep === "personal" && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Tell us about yourself</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  value={personalInfo.fullName}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">
                  Job Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="jobTitle"
                  placeholder="Talent Acquisition Manager"
                  value={personalInfo.jobTitle}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, jobTitle: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="pl-10"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <div className="relative">
                  <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="pl-10"
                    value={personalInfo.linkedin}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, linkedin: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleNext} className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                  Next: Business Info
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Business Information Step */}
        {currentStep === "business" && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>Tell us about your organization</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="companyName"
                  placeholder="Acme Corporation"
                  value={businessInfo.companyName}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, companyName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyWebsite">Company Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="companyWebsite"
                    placeholder="https://www.company.com"
                    className="pl-10"
                    value={businessInfo.companyWebsite}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, companyWebsite: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companySize">
                    Company Size <span className="text-red-500">*</span>
                  </Label>
                  <Select value={businessInfo.companySize} onValueChange={(value) => setBusinessInfo({ ...businessInfo, companySize: value })}>
                    <SelectTrigger id="companySize">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501-1000">501-1000 employees</SelectItem>
                      <SelectItem value="1000+">1000+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">
                    Industry <span className="text-red-500">*</span>
                  </Label>
                  <Select value={businessInfo.industry} onValueChange={(value) => setBusinessInfo({ ...businessInfo, industry: value })}>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">
                  Location <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="San Francisco, CA"
                    className="pl-10"
                    value={businessInfo.location}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your company and hiring needs..."
                  rows={4}
                  value={businessInfo.description}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleNext} className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                  Review Profile
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Review Step */}
        {currentStep === "review" && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>Review Your Profile</CardTitle>
                  <CardDescription>Make sure everything looks good before continuing</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personal Info Summary */}
              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-violet-600" />
                  Personal Information
                </h3>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{personalInfo.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Job Title:</span>
                    <span className="font-medium">{personalInfo.jobTitle}</span>
                  </div>
                  {personalInfo.phone && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-medium">{personalInfo.phone}</span>
                    </div>
                  )}
                  {personalInfo.linkedin && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">LinkedIn:</span>
                      <span className="font-medium text-violet-600 truncate max-w-xs">{personalInfo.linkedin}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Business Info Summary */}
              <div>
                <h3 className="font-semibold flex items-center gap-2 mb-3">
                  <Building2 className="w-4 h-4 text-violet-600" />
                  Business Information
                </h3>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Company:</span>
                    <span className="font-medium">{businessInfo.companyName}</span>
                  </div>
                  {businessInfo.companyWebsite && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Website:</span>
                      <span className="font-medium text-violet-600 truncate max-w-xs">{businessInfo.companyWebsite}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Company Size:</span>
                    <span className="font-medium">{businessInfo.companySize} employees</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Industry:</span>
                    <span className="font-medium capitalize">{businessInfo.industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{businessInfo.location}</span>
                  </div>
                  {businessInfo.description && (
                    <div className="pt-2 border-t">
                      <span className="text-muted-foreground block mb-1">Description:</span>
                      <p className="font-medium">{businessInfo.description}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Edit Information
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isLoading}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                      Creating Profile...
                    </>
                  ) : (
                    <>
                      Complete Setup
                      <CheckCircle2 className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

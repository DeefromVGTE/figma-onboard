import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Building2, Users, UserCheck, ArrowRight } from "lucide-react";
import { Logo } from "../Logo";
import { useRouter } from "../Router";

type UserType = "talent" | "recruiter";

export function AccountSetupPage() {
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserRole, navigateTo } = useRouter();

  const userTypes = [
    {
      type: "talent" as UserType,
      title: "Professional",
      description: "I want to build my Global Professional Record and find opportunities",
      icon: Users,
      features: [
        "Global Professional Record (GPR)",
        "AI-powered job readiness scoring",
        "Personalized learning paths",
        "Skills verification & assessment"
      ]
    },
    {
      type: "recruiter" as UserType,
      title: "Recruiter",
      description: "I help companies find and train talent for their teams",
      icon: Building2,
      features: [
        "AI-powered talent matching",
        "Custom training program creation",
        "Team building analytics",
        "Advanced candidate search",
        "Talent pool analytics",
        "Verification management",
        "Candidate activation tools",
        "Business co-pilot & AI tools"
      ]
    }
  ];

  const handleContinue = () => {
    if (!selectedUserType) return;
    
    setIsLoading(true);
    
    // Mock account setup completion
    setTimeout(() => {
      setIsLoading(false);
      
      // Navigate to appropriate flow
      switch (selectedUserType) {
        case "talent":
          // Don't set role yet - will be set after profile creation
          navigateTo("professional-profile");
          break;
        case "recruiter":
          setUserRole(selectedUserType);
          navigateTo("define");
          break;
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" showText={true} />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to Onboard.AI!</h1>
          <p className="text-muted-foreground">
            Let's personalize your experience. Choose the option that best describes you:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {userTypes.map((userType) => {
            const Icon = userType.icon;
            const isSelected = selectedUserType === userType.type;
            
            return (
              <Card 
                key={userType.type}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => setSelectedUserType(userType.type)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    isSelected ? "bg-blue-600" : "bg-muted"
                  }`}>
                    <Icon className={`w-8 h-8 ${isSelected ? "text-white" : "text-muted-foreground"}`} />
                  </div>
                  <CardTitle className="text-lg">{userType.title}</CardTitle>
                  <CardDescription>{userType.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {userType.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleContinue}
            disabled={!selectedUserType || isLoading}
            className="px-8"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                Setting up your account...
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {selectedUserType && (
          <div className="mt-8 text-center">
            <Badge variant="outline" className="text-sm">
              Selected: {userTypes.find(u => u.type === selectedUserType)?.title}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}
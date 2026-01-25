import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Logo } from "../Logo";
import { useRouter } from "../Router";
import { Shield, CheckCircle2 } from "lucide-react";
import { projectId, publicAnonKey } from "../../utils/supabase/info";

type AccountType = "talent" | "recruiter";

export function LoginPage() {
  const [step, setStep] = useState<"select-type" | "verify">("select-type");
  const [selectedAccountType, setSelectedAccountType] = useState<AccountType | null>(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationId, setVerificationId] = useState("");
  const { navigateTo } = useRouter();

  const accountTypes = [
    {
      type: "talent" as AccountType,
      title: "Professional",
      description: "Build your Global Professional Record"
    },
    {
      type: "recruiter" as AccountType,
      title: "Recruiter",
      description: "Find verified talent, manage hiring pipeline, and build your team"
    }
  ];

  const handleAccountTypeSelect = (type: AccountType) => {
    setSelectedAccountType(type);
    setStep("verify");
  };

  const handleInitiateVerification = async () => {
    if (!email || !selectedAccountType) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-455660d1/idme/initiate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email,
            accountType: selectedAccountType,
          }),
        }
      );

      const data = await response.json();

      if (data.error) {
        console.error("Verification error:", data.error);
        alert("Failed to initiate verification. Please try again.");
        setIsLoading(false);
        return;
      }

      setVerificationId(data.verificationId);
      
      // In production, redirect to ID.ME authorization URL
      // window.location.href = data.authUrl;
      
      // For development, use mock verification
      setTimeout(async () => {
        await mockCompleteVerification(data.verificationId);
      }, 2000);
      
    } catch (error) {
      console.error("Error initiating verification:", error);
      alert("Network error. Please try again.");
      setIsLoading(false);
    }
  };

  const mockCompleteVerification = async (verId: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-455660d1/idme/mock-verify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            verificationId: verId,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Store user data in localStorage
        localStorage.setItem("onboardai_user", JSON.stringify(data.userData));
        
        setIsLoading(false);
        navigateTo("account-setup");
      } else {
        console.error("Verification failed:", data.error);
        alert("Verification failed. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error completing verification:", error);
      alert("Network error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-[#312E81] to-primary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Tech glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-coral/20 rounded-full blur-[100px]"></div>
      
      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="lg" showText={true} variant="white" />
          </div>
          <h5 className="label-uppercase text-accent mb-4">
            Welcome to Onboard.AI
          </h5>
          <h2 className="heading-display text-white text-4xl md:text-5xl mb-4">
            Your Professional Journey <span className="text-gradient-multi">Begins Here</span>
          </h2>
          <div className="divider-tech-gradient max-w-xs mx-auto mb-6"></div>
        </div>

        {step === "select-type" ? (
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Create Your Account</CardTitle>
              <CardDescription>
                Select your account type to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {accountTypes.map((type) => (
                <Button
                  key={type.type}
                  variant="outline"
                  className="w-full h-auto p-4 flex flex-col items-start hover:bg-blue-50 hover:border-blue-500"
                  onClick={() => handleAccountTypeSelect(type.type)}
                >
                  <div className="font-semibold text-base">{type.title}</div>
                  <div className="text-sm text-muted-foreground">{type.description}</div>
                </Button>
              ))}
              
              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>All accounts require ID.ME verification for security</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <CardTitle>Verify Your Identity with ID.ME</CardTitle>
              <CardDescription>
                Onboard.AI uses ID.ME to ensure all professionals and organizations are verified. This protects the integrity of Global Professional Records.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Badge variant="secondary" className="mt-1">
                    {accountTypes.find(t => t.type === selectedAccountType)?.title}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-3">
                  <div className="text-sm font-medium">What you'll need:</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Government-issued photo ID</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Valid email address</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>2-3 minutes for verification</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full h-12" 
                  onClick={handleInitiateVerification}
                  disabled={isLoading || !email}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 mr-3 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                      Verifying with ID.ME...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Verify with ID.ME
                    </>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setStep("select-type")}
                  disabled={isLoading}
                >
                   Back to account selection
                </Button>
              </div>

              <div className="text-xs text-center text-muted-foreground border-t pt-4">
                By continuing, you agree to ID.ME's terms and Onboard.AI's privacy policy. Your data is encrypted and never shared without permission.
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 text-center">
          <button 
            onClick={() => navigateTo("product")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
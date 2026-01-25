import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Logo } from "../Logo";
import { useRouter } from "../Router";
import { ArrowRight, Mail } from "lucide-react";

export function NewLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<"talent" | "recruiter" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { navigateTo, setUserRole } = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountType) {
      alert("Please select your account type");
      return;
    }
    
    console.log("Login attempt:", { accountType, email });
    
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      // In production, this would validate credentials against the backend
      // Store user data in localStorage for the dashboard to access
      const userData = {
        email: email,
        accountType: accountType,
        name: email.split('@')[0], // Use email prefix as name for demo
      };
      localStorage.setItem("onboardai_user", JSON.stringify(userData));
      
      console.log("Setting user role to:", accountType);
      setUserRole(accountType);
      
      // Navigate to appropriate dashboard based on account type
      const targetPage = accountType === "talent" ? "gpr-dashboard" : "dashboard";
      console.log("Navigating to:", targetPage);
      navigateTo(targetPage);
      
      setIsLoading(false);
    }, 1500);
  };

  const handleOAuthLogin = (provider: "google" | "linkedin") => {
    if (!accountType) {
      alert("Please select your account type first");
      return;
    }
    
    setIsLoading(true);
    
    // In production, this would initiate OAuth flow
    setTimeout(() => {
      // Store demo user data in localStorage
      const userData = {
        email: `demo-${provider}@onboard.ai`,
        accountType: accountType,
        name: `Demo ${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      };
      localStorage.setItem("onboardai_user", JSON.stringify(userData));
      
      // Simulate successful OAuth login
      setUserRole(accountType);
      
      // Navigate to appropriate dashboard
      if (accountType === "talent") {
        navigateTo("gpr-dashboard");
      } else {
        navigateTo("dashboard");
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-indigo-700 to-violet-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Tech glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-400/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-[100px]"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="lg" showText={true} variant="white" />
          </div>
          <h2 className="heading-display text-white text-3xl md:text-4xl mb-2">
            Welcome <span className="text-gradient-multi">Back</span>
          </h2>
          <p className="text-violet-100">
            Log in to continue your journey with Onboard.AI
          </p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Log In</CardTitle>
            <CardDescription>
              Select your account type and log in
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Account Type Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">I am a:</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={accountType === "talent" ? "default" : "outline"}
                  className={`h-auto py-3 ${accountType === "talent" ? "bg-violet-600 hover:bg-violet-700" : ""}`}
                  onClick={() => setAccountType("talent")}
                >
                  <div className="flex flex-col items-center">
                    <span className="font-semibold">Professional</span>
                    <span className="text-xs opacity-80">My GPR</span>
                  </div>
                </Button>
                <Button
                  type="button"
                  variant={accountType === "recruiter" ? "default" : "outline"}
                  className={`h-auto py-3 ${accountType === "recruiter" ? "bg-violet-600 hover:bg-violet-700" : ""}`}
                  onClick={() => setAccountType("recruiter")}
                >
                  <div className="flex flex-col items-center">
                    <span className="font-semibold">Recruiter</span>
                    <span className="text-xs opacity-80">Find talent</span>
                  </div>
                </Button>
              </div>
            </div>

            <Separator />

            {/* OAuth Options */}
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                className="w-full h-11"
                onClick={() => handleOAuthLogin("google")}
                disabled={isLoading || !accountType}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full h-11"
                onClick={() => handleOAuthLogin("linkedin")}
                disabled={isLoading || !accountType}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Continue with LinkedIn
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {/* Email Login Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button 
                    type="button"
                    className="text-xs text-violet-600 hover:text-violet-700"
                    onClick={() => alert("Password reset functionality coming soon")}
                  >
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              <Button 
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700" 
                disabled={isLoading || !accountType}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 mr-3 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                    Logging in...
                  </>
                ) : (
                  <>
                    Log In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <button 
                onClick={() => navigateTo("idme-verification")}
                className="text-violet-600 hover:text-violet-700 font-medium"
              >
                Sign up
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <button 
            onClick={() => navigateTo("product")}
            className="text-sm text-white/80 hover:text-white transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
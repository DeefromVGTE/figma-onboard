import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Logo } from "../Logo";
import { useRouter } from "../Router";
import { Shield, CheckCircle2, ArrowRight } from "lucide-react";

export function IDMEVerificationPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const { navigateTo } = useRouter();

  const handleStartVerification = () => {
    setIsVerifying(true);
    
    // In production, this would redirect to ID.ME
    // For now, simulate verification and redirect to signup
    setTimeout(() => {
      // Store verification completion in localStorage
      localStorage.setItem("onboardai_idme_verified", "true");
      localStorage.setItem("onboardai_idme_timestamp", new Date().toISOString());
      
      setIsVerifying(false);
      navigateTo("signup");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-indigo-700 to-violet-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Tech glow effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-400/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-[100px]"></div>
      
      <div className="w-full max-w-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="lg" showText={true} variant="white" />
          </div>
          <h5 className="label-uppercase text-violet-200 mb-4">
            Secure Identity Verification
          </h5>
          <h2 className="heading-display text-white text-4xl md:text-5xl mb-4">
            Verify Your <span className="text-gradient-multi">Identity</span>
          </h2>
          <div className="divider-tech-gradient max-w-xs mx-auto mb-6"></div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-full flex items-center justify-center">
                <Shield className="w-10 h-10 text-violet-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">ID.ME Verification Required</CardTitle>
            <CardDescription className="text-base">
              Onboard.AI uses ID.ME to ensure all professionals and organizations are verified. 
              This protects the integrity of Global Professional Records and maintains trust in our platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-violet-600" />
                Why ID.ME Verification?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Trusted Identity</div>
                    <div className="text-sm text-muted-foreground">Verify you are who you say you are with government-issued ID</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Platform Security</div>
                    <div className="text-sm text-muted-foreground">Protect against fraud and maintain professional record integrity</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">One-Time Process</div>
                    <div className="text-sm text-muted-foreground">Complete verification once - it's valid across the platform</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium">What you'll need:</div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Government-issued photo ID</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Smartphone or webcam</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>2-3 minutes of your time</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>Valid email address</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <Button 
                className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700" 
                onClick={handleStartVerification}
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <>
                    <div className="w-4 h-4 mr-3 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                    Connecting to ID.ME...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Continue to ID.ME Verification
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>

              <Button
                variant="ghost"
                className="w-full"
                onClick={() => navigateTo("product")}
                disabled={isVerifying}
              >
                Cancel
              </Button>
            </div>

            <div className="text-xs text-center text-muted-foreground border-t pt-4">
              <p className="mb-2">
                <strong>Your privacy is protected:</strong> ID.ME uses bank-level encryption 
                and is trusted by government agencies and Fortune 500 companies.
              </p>
              <p>
                By continuing, you agree to ID.ME's terms and Onboard.AI's privacy policy. 
                Your data is encrypted and never shared without permission.
              </p>
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

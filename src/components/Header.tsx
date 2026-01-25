import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Logo } from "./Logo";
import { useRouter } from "./Router";

export function Header() {
  const { currentPage, navigateTo, userRole, setUserRole } = useRouter();

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="cursor-pointer" onClick={() => navigateTo(userRole ? "home" : "product")}>
          <Logo size="md" showText={true} />
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {!userRole ? (
            // Public navigation for non-logged in users
            <>
              <button 
                onClick={() => navigateTo("product")}
                className={`text-muted-foreground hover:text-foreground transition-colors ${currentPage === "product" ? "text-foreground font-medium" : ""}`}
              >
                Product
              </button>
              <button 
                onClick={() => navigateTo("why-onboard-ai")}
                className={`text-muted-foreground hover:text-foreground transition-colors ${currentPage === "why-onboard-ai" ? "text-foreground font-medium" : ""}`}
              >
                Why Onboard.AI
              </button>
              <button 
                onClick={() => navigateTo("pricing")}
                className={`text-muted-foreground hover:text-foreground transition-colors ${currentPage === "pricing" ? "text-foreground font-medium" : ""}`}
              >
                Pricing
              </button>
            </>
          ) : (
            // Authenticated user navigation based on role
            <>
              {userRole === "recruiter" && (
                <>
                  <button 
                    onClick={() => navigateTo("define")}
                    className={`text-muted-foreground hover:text-foreground transition-colors ${currentPage === "define" ? "text-foreground font-medium" : ""}`}
                  >
                    Define
                  </button>
                  <button 
                    onClick={() => navigateTo("dashboard")}
                    className={`text-muted-foreground hover:text-foreground transition-colors ${currentPage === "dashboard" ? "text-foreground font-medium" : ""}`}
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={() => navigateTo("talent")}
                    className={`text-muted-foreground hover:text-foreground transition-colors ${currentPage === "talent" ? "text-foreground font-medium" : ""}`}
                  >
                    Talent
                  </button>
                  <button 
                    onClick={() => navigateTo("business-analytics")}
                    className={`text-muted-foreground hover:text-foreground transition-colors ${currentPage === "business-analytics" ? "text-foreground font-medium" : ""}`}
                  >
                    Analytics
                  </button>
                  <button 
                    onClick={() => navigateTo("business-copilot")}
                    className={`text-muted-foreground hover:text-foreground transition-colors ${currentPage === "business-copilot" ? "text-foreground font-medium" : ""}`}
                  >
                    AI Co-Pilot
                  </button>
                  <button 
                    onClick={() => navigateTo("verification-management")}
                    className={`text-muted-foreground hover:text-foreground transition-colors ${currentPage === "verification-management" ? "text-foreground font-medium" : ""}`}
                  >
                    Verification
                  </button>
                  <button 
                    onClick={() => navigateTo("candidate-activation")}
                    className={`text-muted-foreground hover:text-foreground transition-colors ${currentPage === "candidate-activation" ? "text-foreground font-medium" : ""}`}
                  >
                    Activation
                  </button>
                </>
              )}
              {userRole === "talent" && (
                <>
                  <button 
                    onClick={() => navigateTo("application")}
                    className={`text-muted-foreground hover:text-foreground transition-colors ${currentPage === "application" ? "text-foreground font-medium" : ""}`}
                  >
                    Application
                  </button>
                </>
              )}
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-2">
          {!userRole ? (
            <>
              <Button variant="ghost" onClick={() => navigateTo("login")}>
                Login
              </Button>
              <Button onClick={() => navigateTo("idme-verification")}>Sign Up</Button>
            </>
          ) : (
            <>
              <Badge variant="outline" className="capitalize">
                {userRole === "recruiter" ? "Recruiter" : userRole}
              </Badge>
              <Button variant="ghost" onClick={() => {
                setUserRole(null);
                navigateTo("product");
              }}>
                Sign Out
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
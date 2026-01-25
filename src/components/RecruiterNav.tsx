import { Button } from './ui/button';
import { LogOut, Bell, Settings } from 'lucide-react';
import { useRouter } from './Router';
import { Logo } from './Logo';

export function RecruiterNav() {
  const { navigateTo, setUserRole, currentPage } = useRouter();

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="cursor-pointer" onClick={() => navigateTo("dashboard")}>
              <Logo size="md" showText={true} />
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => navigateTo("dashboard")}
                className={`text-sm transition-colors ${
                  currentPage === "dashboard" 
                    ? "text-purple-600 font-medium" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => navigateTo("define")}
                className={`text-sm transition-colors ${
                  currentPage === "define" 
                    ? "text-purple-600 font-medium" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Define
              </button>
              <button 
                onClick={() => navigateTo("talent")}
                className={`text-sm transition-colors ${
                  currentPage === "talent" 
                    ? "text-purple-600 font-medium" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Talent
              </button>
              <button 
                onClick={() => navigateTo("candidate-activation")}
                className={`text-sm transition-colors ${
                  currentPage === "candidate-activation" 
                    ? "text-purple-600 font-medium" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Activation
              </button>
              <button 
                onClick={() => navigateTo("recruiter-onboarding")}
                className={`text-sm transition-colors ${
                  currentPage === "recruiter-onboarding" 
                    ? "text-purple-600 font-medium" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Onboarding
              </button>
              <button 
                onClick={() => navigateTo("recruiter-analytics")}
                className={`text-sm transition-colors ${
                  currentPage === "recruiter-analytics" 
                    ? "text-purple-600 font-medium" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Analytics
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setUserRole(null);
                navigateTo("product");
              }}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
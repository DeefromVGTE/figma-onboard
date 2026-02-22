import { RouterProvider, useRouter } from "./components/Router";
import { Header } from "./components/Header";
import { Logo } from "./components/Logo";
import { ProductPage } from "./components/pages/ProductPage";
import { WhyOnboardAIPage } from "./components/pages/WhyOnboardAIPage";
import { PricingPage } from "./components/pages/PricingPage";
import { HomePage } from "./components/pages/HomePage";
import { TalentPage } from "./components/pages/TalentPage";
import { BusinessAnalyticsPage } from "./components/pages/BusinessAnalyticsPage";
import { TalentAnalyticsPage } from "./components/pages/TalentAnalyticsPage";
import { LearningPage } from "./components/pages/LearningPage";
import { BusinessCopilotPage } from "./components/pages/BusinessCopilotPage";
import { RecruiterDashboard } from "./components/pages/RecruiterDashboard";
import { RecruiterAnalyticsPage } from "./components/pages/RecruiterAnalyticsPage";
import { RecruiterOnboardingManagement } from "./components/pages/RecruiterOnboardingManagement";
import { ApplicationPage } from "./components/pages/ApplicationPage";
import { NewLoginPage } from "./components/pages/NewLoginPage";
import { AccountSetupPage } from "./components/pages/AccountSetupPage";
import { DefinePage } from "./components/pages/DefinePage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { VerificationPage } from "./components/pages/VerificationPage";
import { PublicProfilePage } from "./components/pages/PublicProfilePage";
import { TrainingDashboard } from "./components/pages/TrainingDashboard";
import { LessonViewer } from "./components/pages/LessonViewer";
import { CommunityHub } from "./components/pages/CommunityHub";
import { OnboardingDashboard } from "./components/pages/OnboardingDashboard";
import { VerificationManagement } from "./components/pages/VerificationManagement";
import { CandidateActivation } from "./components/pages/CandidateActivation";
import { GPRDashboard } from "./components/pages/GPRDashboard";
import { ProfessionalProfileCreation } from "./components/pages/ProfessionalProfileCreation";
import { IDMEVerificationPage } from "./components/pages/IDMEVerificationPage";
import { SignUpPage } from "./components/pages/SignUpPage";
import { RecruiterProfileSetup } from "./components/pages/RecruiterProfileSetup";
import { TestAIPage } from "./components/pages/TestAIPage";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

function AppContent() {
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { currentPage, navigateTo, userRole } = useRouter();
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

    const publicPages = [
      "product",
      "why-onboard-ai",
      "pricing",
      "home",
      "login",
      "signup"
    ];

    const renderPage = () => {
      if (authLoading) {
        return <div className="p-10">Loading...</div>;
      }

      if (!session && !publicPages.includes(currentPage)) {
        navigateTo("login");
        return null;
      }

      switch (currentPage) {
        case "product":
          return <ProductPage />;
        case "why-onboard-ai":
          return <WhyOnboardAIPage />;
        case "pricing":
          return <PricingPage />;
        case "home":
          return <HomePage />;
        case "talent":
          return <TalentPage />;
        case "business-analytics":
          return <BusinessAnalyticsPage />;
        case "talent-analytics":
          return <TalentAnalyticsPage />;
        case "learning":
          return <LearningPage />;
        case "business-copilot":
          return <BusinessCopilotPage />;
        case "dashboard":
          return <RecruiterDashboard />;
        case "recruiter-analytics":
          return <RecruiterAnalyticsPage />;
        case "recruiter-onboarding":
          return <RecruiterOnboardingManagement />;
        case "application":
          return <ApplicationPage />;
        case "login":
          return <NewLoginPage />;
        case "idme-verification":
          return <IDMEVerificationPage />;
        case "signup":
          return <SignUpPage />;
        case "recruiter-profile-setup":
          return <RecruiterProfileSetup />;
        case "account-setup":
          return <AccountSetupPage />;
        case "define":
          return <DefinePage />;
        case "profile":
          return <ProfilePage />;
        case "verification":
          return <VerificationPage />;
        case "public-profile":
          return <PublicProfilePage />;
        case "training":
          return <TrainingDashboard />;
        case "lesson-viewer":
          return <LessonViewer />;
        case "community":
          return <CommunityHub />;
        case "onboarding":
          return <OnboardingDashboard />;
        case "verification-management":
          return <VerificationManagement />;
        case "candidate-activation":
          return <CandidateActivation />;
        case "gpr-dashboard":
          return <GPRDashboard />;
        case "professional-profile":
          return <ProfessionalProfileCreation />;
        case "test-ai":
          return <TestAIPage />;
        default:
          return <ProductPage />;
      }
    };

    // Don't show header on login and account setup pages
    // For the talent page, only show header if user is a startup founder
    const showHeader =
      currentPage !== "login" &&
      currentPage !== "idme-verification" &&
      currentPage !== "signup" &&
      currentPage !== "recruiter-profile-setup" &&
      currentPage !== "account-setup" &&
      currentPage !== "profile" &&
      currentPage !== "verification" &&
      currentPage !== "public-profile" &&
      currentPage !== "training" &&
      currentPage !== "lesson-viewer" &&
      currentPage !== "community" &&
      currentPage !== "onboarding" &&
      currentPage !== "verification-management" &&
      currentPage !== "candidate-activation" &&
      currentPage !== "dashboard" &&
      currentPage !== "gpr-dashboard" &&
      currentPage !== "professional-profile" &&
      currentPage !== "define" &&
      currentPage !== "recruiter-analytics" &&
      currentPage !== "recruiter-onboarding" &&
      !(currentPage === "talent" && userRole === "recruiter");

    return (
      <div className="min-h-screen bg-background">
        {showHeader && <Header />}
        {renderPage()}

        {/* Footer - only show on public pages */}
        {(currentPage === "product" || currentPage === "why-onboard-ai") && (
          <footer className="border-t py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-8">
                <div>
                  <div className="mb-4">
                    <Logo size="md" showText={true} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The skills-first hiring intelligence platform. Replace resumes with Global Professional Records and hire based on verified ability, not claims.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Product</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><button onClick={() => navigateTo("product")} className="hover:text-foreground transition-colors">Global Professional Records</button></li>
                    <li><button onClick={() => navigateTo("product")} className="hover:text-foreground transition-colors">AI Work Analysis</button></li>
                    <li><button onClick={() => navigateTo("product")} className="hover:text-foreground transition-colors">Job Readiness Score</button></li>
                    <li><button onClick={() => navigateTo("product")} className="hover:text-foreground transition-colors">Skills-First System</button></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Company</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><button onClick={() => navigateTo("why-onboard-ai")} className="hover:text-foreground transition-colors">Why Onboard.AI</button></li>
                    <li><a href="#" className="hover:text-foreground transition-colors">Success Stories</a></li>
                    <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Support</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                    <li><a href="#" className="hover:text-foreground transition-colors">API Documentation</a></li>
                    <li><a href="#" className="hover:text-foreground transition-colors">Contact Support</a></li>
                    <li><a href="#" className="hover:text-foreground transition-colors">Status Page</a></li>
                  </ul>
                </div>
              </div>

              <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                <p>&copy; 2025 Onboard.AI. All rights reserved.</p>
                <p className="mt-1">Skills-first hiring. Verified work. Real readiness.</p>
              </div>
            </div>
          </footer>
        )}
      </div>
    );
  }

  export default function App() {
    return (
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    );
  }
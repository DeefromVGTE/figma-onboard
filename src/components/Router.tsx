import { useState, createContext, useContext, ReactNode } from "react";

type Page = "product" | "why-onboard-ai" | "pricing" | "home" | "talent" | "business-analytics" | "talent-analytics" | "learning" | "business-copilot" | "dashboard" | "application" | "login" | "account-setup" | "define" | "profile" | "verification" | "public-profile" | "training" | "lesson-viewer" | "community" | "onboarding" | "verification-management" | "candidate-activation" | "gpr-dashboard" | "professional-profile" | "recruiter-analytics" | "recruiter-onboarding" | "idme-verification" | "signup" | "recruiter-profile-setup" | "test-ai";

interface StartupInfo {
  name: string;
  industry: string;
  description: string;
  roles: Array<{ title: string; priority: "Critical" | "High" | "Medium"; count: number }>;
  skills: string[];
  projectType: string;
}

interface TalentPipelineCourse {
  id: string;
  title: string;
  description: string;
  duration: string;
  role: string;
  priority: "high" | "medium" | "low";
  skills: string[];
  status: "required" | "recommended" | "optional";
}

interface RouterContextType {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  userRole: "talent" | "recruiter" | null;
  setUserRole: (role: "talent" | "recruiter" | null) => void;
  startupInfo: StartupInfo | null;
  setStartupInfo: (info: StartupInfo | null) => void;
  talentPipelineCourses: TalentPipelineCourse[];
  setTalentPipelineCourses: (courses: TalentPipelineCourse[]) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>("product");
  const [userRole, setUserRole] = useState<"talent" | "recruiter" | null>(null);
  const [talentPipelineCourses, setTalentPipelineCourses] = useState<TalentPipelineCourse[]>([]);
  const [startupInfo, setStartupInfo] = useState<StartupInfo | null>({
    name: "VIGILANTE",
    industry: "Luxury Fashion Technology",
    description: "We're creating luxury technology solutions that bridge the gap between high-end fashion and cutting-edge tech. Our flagship project is a sophisticated multi-agent AI system that coordinates complex logistics operations for fashion startups, ensuring seamless supply chain management from design to delivery.",
    roles: [
      { title: "Multi-Agent AI Engineer", count: 2, priority: "Critical" },
      { title: "Logistics Systems Specialist", count: 1, priority: "Critical" },
      { title: "Fashion Tech Integration Developer", count: 2, priority: "High" },
      { title: "Supply Chain AI Specialist", count: 1, priority: "Critical" },
      { title: "Backend Systems Engineer", count: 2, priority: "High" },
      { title: "UI/UX Designer (Fashion Focus)", count: 1, priority: "Medium" }
    ],
    skills: ["Multi-Agent Systems", "Supply Chain AI", "Fashion Industry APIs", "Logistics Optimization", "Python", "React", "Node.js", "AWS", "Docker", "Fashion Tech Integration", "Inventory Management", "Predictive Analytics"],
    projectType: "Multi-Agent AI Logistics Coordination Platform"
  });

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <RouterContext.Provider value={{ currentPage, navigateTo, userRole, setUserRole, startupInfo, setStartupInfo, talentPipelineCourses, setTalentPipelineCourses }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (context === undefined) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Check, ArrowRight, Users, Brain, Target, BarChart3, Zap, Shield, Globe, Sparkles, Database, FileText, Award } from "lucide-react";
import { useRouter } from "../Router";

export function ProductPage() {
  const { navigateTo } = useRouter();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Global Professional Record",
      description: "Replace resumes with continuously updated, portable digital records of real work, verified skills, and actual accomplishments. This is the new system of record for talent.",
      icon: Database,
      benefits: ["Portable across jobs", "AI-verified skills", "Real work history", "Continuously updated"],
      image: "/api/placeholder/600/400"
    },
    {
      title: "AI Work Analysis",
      description: "Our AI analyzes daily work artifacts—code commits, documents, task completion, designs, and outcomes—then reverse-engineers them into skills, competencies, and measurable impact.",
      icon: Brain,
      benefits: ["Analyzes code & documents", "Derives real skills", "Tracks impact", "Eliminates resume fraud"],
      image: "/api/placeholder/600/400"
    },
    {
      title: "Job Readiness Score",
      description: "Instantly calculate job readiness for any role. See matched skills, identify transferable capabilities, and compute exact skill gaps. Hire with confidence based on verified ability.",
      icon: Award,
      benefits: ["Instant readiness calc", "Transferable skills", "Gap identification", "Data-driven hiring"],
      image: "/api/placeholder/600/400"
    },
    {
      title: "Skills-First Intelligence",
      description: "Learning is a support function—not the product. When skill gaps exist, the system activates targeted learning. When skills match, hire immediately. No more training for training's sake.",
      icon: BarChart3,
      benefits: ["Skills-based matching", "Gap-driven learning", "Smart recommendations", "Performance tracking"],
      image: "/api/placeholder/600/400"
    }
  ];

  const useCases = [
    {
      title: "Replace ATS Systems",
      description: "Stop relying on resumes and keyword matching. Onboard.AI is the new hiring infrastructure built on verified skills.",
      icon: Database,
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Eliminate Resume Fraud",
      description: "See what candidates have actually built, not what they claim. Work artifacts don't lie.",
      icon: Shield,
      color: "bg-green-100 text-green-700"
    },
    {
      title: "Hire Faster",
      description: "Job readiness scores tell you instantly who can do the job. No more guessing from interviews alone.",
      icon: Zap,
      color: "bg-purple-100 text-purple-700"
    },
    {
      title: "Build Talent Pipelines",
      description: "Track skill development in real-time. Know exactly when someone becomes ready for your role.",
      icon: Target,
      color: "bg-orange-100 text-orange-700"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-[#312E81] to-primary overflow-hidden">
        {/* Tech glow effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-coral/20 rounded-full blur-[100px]"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-4">
            <h5 className="label-uppercase text-accent mb-6">
              AI-Powered Skills Intelligence
            </h5>
          </div>
          
          <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl mb-6 max-w-5xl mx-auto text-white">
            The Skills-First <span className="text-gradient-multi inline-block">System of Record</span> for Hiring
          </h1>
          
          <div className="divider-tech-gradient max-w-md mx-auto mb-6"></div>
          
          <p className="body-text-lg text-white/90 mb-10 max-w-3xl mx-auto">
            Onboard.AI replaces resumes and Applicant Tracking Systems with Global Professional Records. AI analyzes real work to show verified skills, calculate job readiness, and identify talent based on what people can actually do.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="accent" onClick={() => navigateTo("login")} className="px-10 py-6 text-base shadow-tech-xl">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigateTo("test-ai")}
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-10 py-6 text-base"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Test AI Features
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
              <span className="text-xs font-medium">ID.ME Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(20,184,166,0.8)]"></div>
              <span className="text-xs font-medium">Portable Records</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple shadow-[0_0_8px_rgba(139,92,246,0.8)]"></div>
              <span className="text-xs font-medium">Skills-First Matching</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-spacing bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Onboard.AI Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A fundamentally new approach to hiring that replaces resumes with verified professional records and skills-based intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Collect Work Artifacts",
                description: "Instead of asking for resumes, retrieve the candidate's Global Professional Record from Onboard.AI. AI analyzes their actual work—code, documents, tasks, outcomes.",
                icon: FileText
              },
              {
                step: "02", 
                title: "Calculate Readiness",
                description: "The AI computes a Job Readiness Score for any role. See verified work history, demonstrated skills, transferable capabilities, and exact skill gaps.",
                icon: Award
              },
              {
                step: "03",
                title: "Hire or Train",
                description: "If they're ready, hire immediately. If a gap exists, the learning system activates to close it. Learning is a support function, not the product.",
                icon: Target
              }
            ].map((step, index) => {
              const Icon = step.icon;
              
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{step.step}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The New Hiring Infrastructure</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Onboard.AI is not a learning platform. It's a skills-first hiring system that replaces ATS with verifiable talent intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50 hover:from-blue-50 hover:to-blue-100">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {feature.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Replace Your ATS?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join the skills-first hiring revolution. Build your Global Professional Record or start hiring based on verified ability, not claims.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => navigateTo("login")} className="px-8">
              Get Started with ID.ME
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent">
              Schedule Demo
            </Button>
          </div>
          <div className="text-blue-100 text-sm mt-4">
            Verified identity required • Portable professional records • Skills-first system
          </div>
        </div>
      </section>
    </div>
  );
}
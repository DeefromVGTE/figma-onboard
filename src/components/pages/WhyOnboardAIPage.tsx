import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Check, ArrowRight, Clock, DollarSign, Users, TrendingUp, AlertTriangle, Zap, Brain, Target, Award, FileX, Database } from "lucide-react";
import { useRouter } from "../Router";

export function WhyOnboardAIPage() {
  const { navigateTo } = useRouter();

  const problems = [
    {
      title: "Resumes Are Broken",
      description: "70% of resumes contain misleading information. You're hiring based on claims, not proof.",
      icon: FileX,
      stats: "70%"
    },
    {
      title: "ATS Can't Verify Skills",
      description: "Traditional ATS systems rely on keyword matching and can't verify if someone can actually do the job.",
      icon: AlertTriangle,
      stats: "0% verification"
    },
    {
      title: "Skills Gap is Unknown",
      description: "Without analyzing actual work, you can't see transferable skills or calculate precise readiness gaps.",
      icon: TrendingUp,
      stats: "Unknown"
    },
    {
      title: "Cost of Bad Hires",
      description: "Hiring based on resumes costs $30,000–$150,000+ per bad hire due to inability to verify actual skills.",
      icon: DollarSign,
      stats: "$30K-$150K+"
    }
  ];

  const solutions = [
    {
      title: "Global Professional Records",
      description: "Replace resumes with continuously updated records of verified work. AI analyzes code, documents, tasks, and outcomes to build a portable professional record that shows what people have actually done.",
      benefits: ["Verified work history", "AI-analyzed artifacts", "Portable across jobs", "Continuously updated"],
      icon: Database,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Job Readiness Intelligence",
      description: "Our AI computes precise Job Readiness Scores for any role by analyzing a candidate's Global Professional Record against job requirements. See matched skills, transferable capabilities, and exact gaps.",
      benefits: ["Instant readiness score", "Transferable skill detection", "Precise gap calculation", "Data-driven decisions"],
      icon: Brain,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Skills-First System",
      description: "Learning is a support function, not the product. When skills match, hire immediately. When gaps exist, the learning system activates. No more training for training's sake—hire based on verified ability.",
      benefits: ["Skills-based matching", "Gap-driven learning only", "Verifiable competencies", "Proven performance"],
      icon: Award,
      color: "from-green-500 to-green-600"
    }
  ];

  const successMetrics = [
    { label: "Faster Hiring", value: "10x", description: "Reduce time to hire from months to weeks" },
    { label: "Higher Retention", value: "94%", description: "Candidates stay longer because they're trained for success" },
    { label: "Lower Costs", value: "60%", description: "Reduce total cost of hiring by eliminating waste" },
    { label: "Better Fits", value: "98%", description: "Cultural and technical fit based on AI matching" }
  ];

  const testimonials = [
    {
      quote: "Onboard.AI helped us go from 2 to 12 people in 6 weeks. Every hire was perfect for our needs.",
      author: "Sarah Chen",
      role: "CTO, TechFlow AI",
      company: "Y Combinator W23"
    },
    {
      quote: "The AI training was incredible. Our new developers were productive from day one.",
      author: "Marcus Rodriguez", 
      role: "Founder, DataVision",
      company: "Series A Funded"
    },
    {
      quote: "Finally, a recruitment platform that understands what startups actually need.",
      author: "Elena Petrov",
      role: "Head of Engineering, ScaleUp",
      company: "Techstars Graduate"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6">
            🎯 The Future of Startup Recruitment
          </Badge>
          <h1 className="text-5xl font-bold mb-6 max-w-4xl mx-auto">
            Why Choose <span className="text-blue-600">Onboard.AI</span>?
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Traditional recruitment doesn't work for startups. We built something better - an AI-powered platform that actually builds teams instead of just finding resumes.
          </p>
          <Button size="lg" onClick={() => navigateTo("login")} className="px-8">
            Experience the Difference
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Problem With Traditional Hiring</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Startups can't afford the luxury of lengthy hiring processes and expensive mistakes. Yet traditional recruitment tools weren't built for startup needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded">
                        <Icon className="w-full h-full text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{problem.stats}</div>
                    <CardTitle className="text-lg">{problem.title}</CardTitle>
                    <CardDescription>{problem.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Onboard.AI vs Traditional Recruiting</h2>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-4 text-red-600">Traditional ATS</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>✗ Resume keyword matching</li>
                    <li>✗ 6+ week hiring process</li>
                    <li>✗ 30% bad hire rate</li>
                    <li>✗ No training provided</li>
                    <li>✗ Generic job descriptions</li>
                    <li>✗ High cost per hire</li>
                  </ul>
                </div>
                
                <div className="flex items-center justify-center border-l border-r px-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">VS</span>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-4 text-blue-600">Onboard.AI</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>AI-powered talent matching</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>2-4 week hiring process</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>98% success rate</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>Vibe coding training</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>AI-generated role specs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>60% lower total cost</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Solution */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our AI-First Approach</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We don't just match resumes to job descriptions. We understand your startup's DNA and build teams that will thrive in your specific environment.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600" />
                  <CardHeader className="text-center pb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-3">{solution.title}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {solution.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {solution.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600" />
                          <span className="text-sm text-muted-foreground">{benefit}</span>
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





      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Be among the first to experience the future of AI-powered recruitment and custom training. Transform your hiring process today.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => navigateTo("login")} className="px-8">
              Start Your Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent" onClick={() => navigateTo("pricing")}>
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
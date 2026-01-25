import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Check, ArrowRight, Zap, Crown, Building2, HelpCircle } from "lucide-react";
import { useRouter } from "../Router";

export function PricingPage() {
  const { navigateTo } = useRouter();
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for early-stage startups building their first team",
      icon: Zap,
      monthlyPrice: 24.99,
      annualPrice: 239.90, // 20% discount (24.99 * 12 * 0.8)
      color: "border-blue-200",
      buttonColor: "default",
      popular: false,
      features: [
        "Up to 5 team members",
        "AI goal interpretation",
        "Basic talent matching",
        "Standard training programs",
        "Email support",
        "1 custom role per month",
        "Basic analytics dashboard",
        "30-day placement guarantee"
      ],
      limitations: [
        "No advanced AI features",
        "Limited integrations",
        "Standard support only"
      ]
    },
    {
      name: "Growth",
      description: "Ideal for scaling startups with growing team needs",
      icon: Building2,
      monthlyPrice: 39.99,
      annualPrice: 383.90, // 20% discount (39.99 * 12 * 0.8)
      color: "border-blue-500 ring-2 ring-blue-200",
      buttonColor: "default",
      popular: true,
      features: [
        "Up to 25 team members",
        "Advanced AI matching",
        "Custom training curricula",
        "Priority candidate pool",
        "Slack/Teams integration",
        "5 custom roles per month",
        "Advanced analytics & insights",
        "90-day performance guarantee",
        "Dedicated success manager",
        "API access"
      ],
      limitations: []
    },
    {
      name: "Enterprise",
      description: "Comprehensive solution for established companies",
      icon: Crown,
      monthlyPrice: null,
      annualPrice: null,
      color: "border-purple-200",
      buttonColor: "outline",
      popular: false,
      features: [
        "Unlimited team members",
        "White-label solution",
        "Custom AI model training",
        "Multiple department support",
        "SSO & advanced security",
        "Unlimited custom roles",
        "Custom analytics & reporting",
        "SLA guarantees",
        "24/7 phone support",
        "On-site training & setup",
        "Custom integrations"
      ],
      limitations: []
    }
  ];

  const faqs = [
    {
      question: "How does the AI matching actually work?",
      answer: "Our AI analyzes your startup's goals, culture, and technical requirements to create detailed profiles of ideal candidates. We then match these profiles with our talent pool, considering not just skills but also personality fit, work style, and career goals."
    },
    {
      question: "What if a placed candidate doesn't work out?",
      answer: "We offer placement guarantees: 30 days for Starter, 90 days for Growth, and custom SLAs for Enterprise. If a candidate doesn't meet expectations within this period, we'll find a replacement at no additional cost."
    },
    {
      question: "How does the complete candidate journey work?",
      answer: "After candidates achieve job-readiness through skills training, they enter our comprehensive onboarding phase. This includes professional development modules (personal branding, working with others, self-management, managing others), completion of all legal documents (NDAs, W-2s, I-9s, employment agreements), and company culture training. Only after completing all onboarding requirements do candidates begin working with your startup."
    },
    {
      question: "How long does the training process take?",
      answer: "Training duration varies by role complexity, typically 2-8 weeks. Our AI optimizes the curriculum to focus on skills most relevant to your specific needs, making training as efficient as possible."
    },
    {
      question: "Can I customize the training programs?",
      answer: "Absolutely! Growth and Enterprise plans include custom curriculum development. You can specify frameworks, tools, methodologies, and even company-specific processes to include in the training."
    },
    {
      question: "Do you work with remote teams?",
      answer: "Yes! We support fully remote, hybrid, and on-site teams. Our platform includes tools for remote collaboration assessment and timezone-optimized candidate matching."
    },
    {
      question: "What happens after the free trial?",
      answer: "Your 14-day trial includes full access to our platform. If you don't upgrade, your account moves to a free tier with limited features. No credit card required for the trial."
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (!plan.monthlyPrice) return "Custom";
    const price = isAnnual ? plan.annualPrice! / 12 : plan.monthlyPrice;
    return `$${Math.round(price)}`;
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (!plan.monthlyPrice || !plan.annualPrice) return null;
    const monthlyCost = plan.monthlyPrice * 12;
    const savings = monthlyCost - plan.annualPrice;
    return Math.round((savings / monthlyCost) * 100);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6">
            💰 Pricing that Scales with Your Success
          </Badge>
          <h1 className="text-5xl font-bold mb-6 max-w-4xl mx-auto">
            Simple, Transparent <span className="text-blue-600">Pricing</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose the plan that fits your startup's stage. All plans include our core AI-powered recruitment platform with guaranteed results.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm ${!isAnnual ? "font-semibold" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
            <span className={`text-sm ${isAnnual ? "font-semibold" : "text-muted-foreground"}`}>
              Annual
            </span>
            <Badge variant="secondary" className="ml-2">Save 20%</Badge>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const savings = getSavings(plan);
              
              return (
                <Card key={index} className={`relative ${plan.color} ${plan.popular ? "scale-105" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-600 text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                    
                    <div className="mt-6">
                      <div className="text-4xl font-bold">
                        {getPrice(plan)}
                        {plan.monthlyPrice && <span className="text-lg text-muted-foreground">/month</span>}
                      </div>
                      {isAnnual && savings && (
                        <div className="text-sm text-green-600 mt-1">
                          Save {savings}% annually
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <Button 
                      className="w-full" 
                      variant={plan.buttonColor as any}
                      onClick={() => navigateTo("login")}
                    >
                      {plan.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    <div>
                      <h4 className="font-semibold mb-3">Everything included:</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3 text-sm">
                            <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-muted-foreground">Limitations:</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation) => (
                            <li key={limitation} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <span className="w-4 h-4 text-center mt-0.5 flex-shrink-0">-</span>
                              <span>{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Enterprise Contact */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Need a custom solution? Building multiple teams?
            </p>
            <Button variant="outline" onClick={() => navigateTo("login")}>
              Contact Enterprise Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Compare All Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See exactly what's included in each plan to choose the best fit for your startup.
            </p>
          </div>

          <Card className="max-w-5xl mx-auto">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium">Features</th>
                      <th className="text-center p-4 font-medium">Starter</th>
                      <th className="text-center p-4 font-medium">Growth</th>
                      <th className="text-center p-4 font-medium">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "Team Members", starter: "5", growth: "25", enterprise: "Unlimited" },
                      { feature: "AI Goal Interpretation", starter: "✓", growth: "✓", enterprise: "✓" },
                      { feature: "Custom Training", starter: "Standard", growth: "Advanced", enterprise: "Fully Custom" },
                      { feature: "Candidate Pool Access", starter: "Basic", growth: "Priority", enterprise: "Exclusive" },
                      { feature: "Analytics & Reporting", starter: "Basic", growth: "Advanced", enterprise: "Custom" },
                      { feature: "API Access", starter: "-", growth: "✓", enterprise: "✓" },
                      { feature: "SSO Integration", starter: "-", growth: "-", enterprise: "✓" },
                      { feature: "Dedicated Support", starter: "-", growth: "✓", enterprise: "24/7" },
                      { feature: "SLA Guarantee", starter: "-", growth: "-", enterprise: "✓" }
                    ].map((row, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-4 font-medium">{row.feature}</td>
                        <td className="text-center p-4 text-sm">{row.starter}</td>
                        <td className="text-center p-4 text-sm">{row.growth}</td>
                        <td className="text-center p-4 text-sm">{row.enterprise}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions? We have answers. If you can't find what you're looking for, reach out to our team.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                      <CardDescription className="mt-2 text-base">
                        {faq.answer}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Building Your Team?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Be among the first to experience the future of AI-powered recruitment and custom training. Transform your hiring process today.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => navigateTo("login")} className="px-8">
              Start 14-Day Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent">
              Schedule Demo
            </Button>
          </div>
          <div className="text-blue-100 text-sm mt-4">
            No credit card required • Full access • Cancel anytime
          </div>
        </div>
      </section>
    </div>
  );
}
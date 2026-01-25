import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Brain, Target, Users, Zap, Building2, GraduationCap, TrendingUp, Mic } from "lucide-react";

export function HeroSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-5xl mx-auto mb-16">
          <Badge className="mb-4" variant="secondary">
            AI-Powered Recruitment & Education Platform
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Build Your Dream Team with Intelligent Talent Pipelines
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            The AI co-pilot that listens to your startup's goals, reverse-engineers the talent you need, 
            and creates personalized training paths to build your perfect team. No more traditional ATS - 
            just intelligent recruitment and education combined.
          </p>
          
          {/* Dual CTA Section */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <Card className="p-8 text-center border-2 border-blue-200 hover:border-blue-300 transition-colors">
              <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">For AI Startups</h3>
              <p className="text-muted-foreground mb-6">
                Tell our AI your project goals and let us build the perfect talent pipeline for your needs
              </p>
              <Button size="lg" className="w-full">
                <Mic className="w-4 h-4 mr-2" />
                Define Your Team Needs
              </Button>
            </Card>
            
            <Card className="p-8 text-center border-2 border-purple-200 hover:border-purple-300 transition-colors">
              <GraduationCap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">For Talent</h3>
              <p className="text-muted-foreground mb-6">
                Join our talent network and get personalized AI training for exciting startup opportunities
              </p>
              <Button size="lg" variant="outline" className="w-full">
                <Users className="w-4 h-4 mr-2" />
                Apply & Start Learning
              </Button>
            </Card>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">AI Goal Interpretation</h3>
            <p className="text-sm text-muted-foreground">
              Speak or type your project needs - AI understands and plans accordingly
            </p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Reverse-Engineered Talent</h3>
            <p className="text-sm text-muted-foreground">
              AI analyzes your goals and identifies exactly what skills you need
            </p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Personalized Training</h3>
            <p className="text-sm text-muted-foreground">
              Custom curricula that adapt to each candidate's learning style
            </p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">Smart Analytics</h3>
            <p className="text-sm text-muted-foreground">
              Track progress and optimize your talent pipeline continuously
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
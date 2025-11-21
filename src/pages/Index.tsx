import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Calculator, FileText, Shield, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Calculator,
      title: "Automated Sharia Calculations",
      description: "Precise inheritance share calculations following Islamic law, verified by legal experts.",
    },
    {
      icon: FileText,
      title: "Court-Ready Documents",
      description: "Generate official legal documents ready for submission to Egyptian courts.",
    },
    {
      icon: TrendingUp,
      title: "Estate Liquidity Solutions",
      description: "Connect with bank partners to convert inheritance shares into immediate liquidity.",
    },
    {
      icon: Shield,
      title: "Legal Compliance",
      description: "Fully compliant with Egyptian law and Sharia inheritance principles.",
    },
    {
      icon: Users,
      title: "Family Mediation",
      description: "Clear, transparent calculations that help families reach fair agreements.",
    },
    {
      icon: Building2,
      title: "Real Estate Focus",
      description: "Specialized solutions for property inheritance and buyout financing.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Mawareth</span>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => navigate('/about')}>About</Button>
              <Button variant="ghost" onClick={() => navigate('/pricing')}>Pricing</Button>
              <Button variant="ghost" onClick={() => navigate('/blog')}>Blog</Button>
              <Button variant="ghost" onClick={() => navigate('/faq')}>FAQ</Button>
              <Button variant="ghost" onClick={() => navigate('/contact')}>Contact</Button>
              <Button onClick={() => navigate('/calculator')}>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Transform Inheritance Into
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Immediate Liquidity
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The first platform in Egypt to digitize Sharia inheritance calculations and provide instant estate liquidity solutions for families.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/calculator')} className="shadow-medium">
                Calculate Your Share
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/calculator')}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-foreground">
              The Inheritance Crisis in Egypt
            </h2>
            <Card className="p-8 shadow-medium">
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                When a family inherits property in Egypt, the estate often remains frozen for months or even years. Three siblings inherit one apartment, but none have the cash to buy out the others. Legal disputes drag on, families fracture, and valuable assets remain unused.
              </p>
              <p className="text-lg text-foreground font-semibold">
                Mawareth solves this by digitizing the Sharia division process and connecting families to liquidity partners.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            How Mawareth Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-medium transition-all duration-300 border-border">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Three Simple Steps
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Input Estate Details</h3>
              <p className="text-muted-foreground">
                Enter information about the deceased, heirs, and estate assets.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Calculate Shares</h3>
              <p className="text-muted-foreground">
                Our system calculates exact shares according to Sharia law.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Access Liquidity</h3>
              <p className="text-muted-foreground">
                Connect with bank partners for immediate estate liquidity solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Ready to Resolve Your Inheritance?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join families across Egypt who are unlocking their inheritance with Mawareth.
            </p>
            <Button size="lg" onClick={() => navigate('/calculator')} className="shadow-medium">
              Start Your Calculation Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Mawareth</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Mawareth. Simplifying inheritance in Egypt.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

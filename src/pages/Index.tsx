import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { HeroNightmare } from "@/components/landing/HeroNightmare";
import { TheGuide } from "@/components/landing/TheGuide";
import { ThreeDoorsSection } from "@/components/landing/ThreeDoorsSection";
import { VictorySection } from "@/components/landing/VictorySection";

const Index = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-emerald-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Mawareth</span>
            </div>
            <div className="flex gap-3">
              <LanguageToggle />
              <Button variant="ghost" onClick={() => navigate('/about')}>
                {language === 'ar' ? 'من نحن' : 'About'}
              </Button>
              <Button variant="ghost" onClick={() => navigate('/marketplace')}>
                {language === 'ar' ? 'السوق' : 'Marketplace'}
              </Button>
              <Button onClick={() => navigate('/calculator')} className="bg-gold hover:bg-gold/90 text-emerald-dark">
                {language === 'ar' ? 'الحاسبة' : 'Calculator'}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - The Nightmare */}
      <HeroNightmare />

      {/* The Guide - Introducing Mawareth */}
      <TheGuide />

      {/* The Three Doors */}
      <ThreeDoorsSection />

      {/* The Victory */}
      <VictorySection />

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-emerald-foreground" />
              </div>
              <span className="font-semibold text-foreground">Mawareth</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Mawareth. {language === 'ar' ? 'تبسيط الميراث في مصر' : 'Simplifying inheritance in Egypt.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

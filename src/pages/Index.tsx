import { Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ServiceGrid } from "@/components/landing/ServiceGrid";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

const Index = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
              </div>
              <span className="text-xl font-bold text-foreground">Mawareth</span>
            </div>
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <button 
                onClick={() => navigate('/dashboard')}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero - Clean Centered Statement */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {language === 'ar' ? 'حلول الميراث.' : 'Inheritance Solutions.'}
              <br />
              <span className="text-primary">
                {language === 'ar' ? 'ببساطة.' : 'Simplified.'}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
              {language === 'ar' 
                ? 'احسب أنصبتك الشرعية، مول شراء حصص الورثة، أو سيّل أصولك المتنازع عليها.'
                : 'Calculate your Sharia rights, finance family buyouts, or liquidate disputed assets.'}
            </p>
          </div>

          {/* Service Cards Grid */}
          <ServiceGrid />
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 border-t border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-muted-foreground">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">500+</p>
              <p className="text-sm">{language === 'ar' ? 'عائلة تمت مساعدتها' : 'Families Helped'}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">2.5B+</p>
              <p className="text-sm">{language === 'ar' ? 'جنيه تم تحريره' : 'EGP Unlocked'}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">98%</p>
              <p className="text-sm">{language === 'ar' ? 'معدل الرضا' : 'Satisfaction Rate'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" strokeWidth={1.5} />
              </div>
              <span className="font-semibold text-foreground">Mawareth</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Mawareth. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Support Button */}
      <WhatsAppButton 
        message={language === 'ar' ? 'مرحباً، أحتاج مساعدة مع موارث' : 'Hello, I need help with Mawareth'}
      />
    </div>
  );
};

export default Index;

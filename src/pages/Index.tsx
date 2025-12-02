import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Calculator, FileText, Users, CheckCircle, ArrowRight, Shield, TrendingUp, Banknote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/i18n";
import { LanguageToggle } from "@/components/LanguageToggle";

const Index = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];

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
              <LanguageToggle />
              <Button variant="ghost" onClick={() => navigate('/about')}>
                {t.about}
              </Button>
              <Button variant="ghost" onClick={() => navigate('/contact')}>
                {t.contact}
              </Button>
              <Button onClick={() => navigate('/calculator')}>{t.calculator}</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold text-foreground mb-6 leading-tight">
              {language === 'ar' ? (
                <>حوّل الميراث إلى <span className="bg-gradient-primary bg-clip-text text-transparent">سيولة فورية</span></>
              ) : (
                <>Transform Inheritance Into <span className="bg-gradient-primary bg-clip-text text-transparent">Immediate Liquidity</span></>
              )}
            </h1>
            <p className="text-2xl text-muted-foreground mb-4">
              {t.heroSubtitle}
            </p>
            <p className="text-xl text-muted-foreground mb-10">
              {t.heroDescription}
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/calculator')} className="shadow-medium">
                <Calculator className="w-5 h-5 mr-2" />
                {t.calculateYourShare}
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/about')}>
                {t.learnMore}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Loan CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <Card className="max-w-5xl mx-auto p-12 shadow-strong border-2 border-primary/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  {language === 'ar' ? 'جديد' : 'New'}
                </div>
                <h2 className="text-4xl font-bold text-foreground mb-4">
                  {language === 'ar' ? 'حلول السيولة العقارية' : 'Estate Liquidity Solutions'}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {language === 'ar' 
                    ? 'احصل على تمويل فوري لشراء حصص الورثة من خلال شراكتنا مع البنوك المصرية الرائدة'
                    : 'Get immediate financing to buy out co-heirs through our partnerships with leading Egyptian banks'}
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{language === 'ar' ? 'موافقة سريعة خلال 7 أيام' : 'Fast approval within 7 days'}</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{language === 'ar' ? 'فترات سداد مرنة تصل إلى 15 سنة' : 'Flexible terms up to 15 years'}</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{language === 'ar' ? 'أسعار فائدة تنافسية' : 'Competitive interest rates'}</span>
                  </li>
                </ul>
                <Button size="lg" onClick={() => navigate('/loan-application')} className="shadow-medium">
                  <Banknote className="w-5 h-5 mr-2" />
                  {language === 'ar' ? 'تقدم بطلب الآن' : 'Apply for Financing'}
                </Button>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: language === 'ar' ? 'بنك مصر' : 'Bank Misr', color: 'primary' },
                    { name: language === 'ar' ? 'البنك الأهلي' : 'NBE', color: 'accent' },
                    { name: 'CIB', color: 'primary' },
                    { name: language === 'ar' ? 'بنك قطر الوطني' : 'QNB Alahli', color: 'primary' },
                  ].map((bank, idx) => (
                    <Card key={idx} className="p-6 bg-primary/5 border-primary/20 text-center">
                      <Building2 className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="font-semibold text-foreground text-sm">{bank.name}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Three Steps */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
            {t.threeSteps}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <Card className="p-8 relative overflow-hidden group hover:shadow-medium transition-all">
              <div className="absolute top-0 right-0 text-8xl font-bold text-primary/5 -mr-4 -mt-4">1</div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all">
                  <FileText className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t.step1Title}</h3>
                <p className="text-muted-foreground">
                  {t.step1Desc}
                </p>
              </div>
            </Card>

            {/* Step 2 */}
            <Card className="p-8 relative overflow-hidden group hover:shadow-medium transition-all">
              <div className="absolute top-0 right-0 text-8xl font-bold text-primary/5 -mr-4 -mt-4">2</div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all">
                  <Calculator className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t.step2Title}</h3>
                <p className="text-muted-foreground">
                  {t.step2Desc}
                </p>
              </div>
            </Card>

            {/* Step 3 */}
            <Card className="p-8 relative overflow-hidden group hover:shadow-medium transition-all">
              <div className="absolute top-0 right-0 text-8xl font-bold text-primary/5 -mr-4 -mt-4">3</div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all">
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{t.step3Title}</h3>
                <p className="text-muted-foreground">
                  {t.step3Desc}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-foreground">
              Why Families Trust Mawareth
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 hover:shadow-medium transition-all">
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-semibold mb-3 text-foreground">Sharia-Compliant</h3>
                <p className="text-muted-foreground">
                  Every calculation follows authentic Islamic inheritance law, verified by Al-Azhar scholars 
                  and compliant with Egyptian legal requirements.
                </p>
              </Card>

              <Card className="p-8 hover:shadow-medium transition-all">
                <Users className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-semibold mb-3 text-foreground">Family-Focused</h3>
                <p className="text-muted-foreground">
                  We help families navigate inheritance with transparency and fairness, preventing 
                  disputes and preserving relationships during difficult times.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              {t.ctaTitle}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t.ctaSubtitle}
            </p>
            <Button size="lg" onClick={() => navigate('/calculator')} className="shadow-medium">
              <Calculator className="w-5 h-5 mr-2" />
              {t.startCalculation}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Mawareth</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t.footerCopyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

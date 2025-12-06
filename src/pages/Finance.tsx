import React, { useState, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FinancingType } from '@/types/models';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppFooter } from '@/components/layout/AppFooter';
import FinancingPathSelector from '@/components/finance/FinancingPathSelector';
import AffordabilityCalculator, { AffordabilityResult } from '@/components/finance/AffordabilityCalculator';
import LeasingRescue from '@/components/finance/LeasingRescue';
import OwnershipTimeline from '@/components/finance/OwnershipTimeline';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Finance: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isArabic = language === 'ar';

  const [financingType, setFinancingType] = useState<FinancingType>('murabaha');
  const [affordabilityResult, setAffordabilityResult] = useState<AffordabilityResult | null>(null);

  const handleResultChange = useCallback((result: AffordabilityResult) => {
    setAffordabilityResult(result);
  }, []);

  const content = {
    en: {
      title: 'Family Buyout Simulator',
      subtitle: 'Calculate your path to keeping the family legacy',
      cta: 'Start Application',
      contact: 'Talk to an Expert'
    },
    ar: {
      title: 'محاكي شراء حصص العائلة',
      subtitle: 'احسب طريقك للحفاظ على إرث العائلة',
      cta: 'ابدأ الطلب',
      contact: 'تحدث مع خبير'
    }
  };

  const t = content[language];
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t.title}</h1>
            <p className="text-lg text-muted-foreground">{t.subtitle}</p>
          </div>

          {/* Step 1: Choose Financing Path */}
          <FinancingPathSelector 
            selected={financingType} 
            onSelect={setFinancingType} 
          />

          {/* Step 2: Affordability Calculator */}
          <AffordabilityCalculator 
            financingType={financingType}
            onResultChange={handleResultChange}
          />

          {/* Step 3: Leasing Rescue (Conditional) */}
          {affordabilityResult && (
            <LeasingRescue result={affordabilityResult} />
          )}

          {/* Ownership Timeline (Murabaha only) */}
          {affordabilityResult && (
            <OwnershipTimeline 
              financingType={financingType}
              repaymentYears={Math.round(affordabilityResult.repaymentMonths / 12)}
            />
          )}

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg" 
              onClick={() => navigate('/loan-application')}
              className="gap-2"
            >
              {t.cta}
              <Arrow className="h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/contact')}
              className="gap-2"
            >
              <Phone className="h-5 w-5" />
              {t.contact}
            </Button>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default Finance;

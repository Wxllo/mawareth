import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Building2, Shield, Check } from 'lucide-react';
import { FinancingType } from '@/types/models';
import { cn } from '@/lib/utils';

interface FinancingPathSelectorProps {
  selected: FinancingType;
  onSelect: (type: FinancingType) => void;
}

const FinancingPathSelector: React.FC<FinancingPathSelectorProps> = ({ selected, onSelect }) => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const content = {
    en: {
      headline: 'Keep the Legacy. Choose Your Path.',
      standard: {
        title: 'Standard Bank Loan',
        badge: 'Low Rates',
        concept: '"Borrow Cash"',
        description: 'Interest-based loan. Repay up to 20 years.',
        howItWorks: 'The partner bank lends you the money to pay your siblings. You own the asset immediately but mortgage it to the bank. You repay the loan plus Interest (Fayda) over up to 20 years.',
        bestFor: 'People comfortable with conventional banking who want the longest possible repayment period.'
      },
      murabaha: {
        title: 'Merath Murabaha',
        badge: 'Sharia Compliant',
        concept: '"Trade, Not Debt"',
        description: 'Cost-Plus Sale. Fixed Debt. No Riba.',
        howItWorks: 'Merath (via partners) buys the share from your siblings for Cash. We then resell it to you at a fixed, higher price (Cost + Profit). You pay us in installments over 5-7 years.',
        bestFor: 'Those seeking 100% Sharia-compliant solutions (No Riba).',
        ownership: 'You get the Keys (Possession) immediately. You get the Title Deed (Ownership) after the final payment.'
      }
    },
    ar: {
      headline: 'حافظ على الإرث. اختر طريقك.',
      standard: {
        title: 'قرض بنكي تقليدي',
        badge: 'معدلات منخفضة',
        concept: '"اقترض نقداً"',
        description: 'قرض بفائدة. سداد حتى 20 سنة.',
        howItWorks: 'يقرضك البنك الشريك المال لدفع حصص إخوتك. تمتلك الأصل فوراً لكنه مرهون للبنك. تسدد القرض بالإضافة للفائدة على مدى 20 سنة.',
        bestFor: 'للمرتاحين مع الخدمات البنكية التقليدية ويريدون أطول فترة سداد ممكنة.'
      },
      murabaha: {
        title: 'مرابحة ميراث',
        badge: 'متوافق مع الشريعة',
        concept: '"تجارة، لا دين"',
        description: 'بيع بالتكلفة زائد الربح. دين ثابت. بدون ربا.',
        howItWorks: 'ميراث (عبر الشركاء) تشتري الحصة من إخوتك نقداً. ثم نعيد بيعها لك بسعر أعلى ثابت (التكلفة + الربح). تدفع لنا بالتقسيط على 5-7 سنوات.',
        bestFor: 'للباحثين عن حلول متوافقة 100% مع الشريعة (بدون ربا).',
        ownership: 'تحصل على المفاتيح (الحيازة) فوراً. تحصل على صك الملكية بعد السداد الأخير.'
      }
    }
  };

  const t = content[language];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground">
        {t.headline}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Standard Bank Loan */}
        <button
          onClick={() => onSelect('standard')}
          className={cn(
            'relative p-6 rounded-xl border-2 text-start transition-all duration-300',
            'hover:shadow-medium',
            selected === 'standard'
              ? 'border-primary bg-primary/5 shadow-medium'
              : 'border-border hover:border-primary/50'
          )}
        >
          {selected === 'standard' && (
            <div className="absolute top-4 end-4">
              <Check className="h-6 w-6 text-primary" />
            </div>
          )}

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-muted">
              <Building2 className="h-8 w-8 text-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">{t.standard.title}</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-accent-foreground">
                {t.standard.badge}
              </span>
            </div>
          </div>

          <p className="text-primary font-semibold mb-2">{t.standard.concept}</p>
          <p className="text-sm text-muted-foreground mb-4">{t.standard.description}</p>

          <div className="space-y-3 text-sm">
            <div className="p-3 rounded-lg bg-muted/50">
              <p className="text-foreground">{t.standard.howItWorks}</p>
            </div>
            <p className="text-muted-foreground italic">
              <strong>{isArabic ? 'الأفضل لـ:' : 'Best for:'}</strong> {t.standard.bestFor}
            </p>
          </div>
        </button>

        {/* Merath Murabaha */}
        <button
          onClick={() => onSelect('murabaha')}
          className={cn(
            'relative p-6 rounded-xl border-2 text-start transition-all duration-300',
            'hover:shadow-medium',
            selected === 'murabaha'
              ? 'border-success-green bg-success-green/5 shadow-medium'
              : 'border-border hover:border-success-green/50'
          )}
        >
          {selected === 'murabaha' && (
            <div className="absolute top-4 end-4">
              <Check className="h-6 w-6 text-success-green" />
            </div>
          )}

          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-success-green/10">
              <Shield className="h-8 w-8 text-success-green" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">{t.murabaha.title}</h3>
              <span className="text-xs px-2 py-1 rounded-full bg-success-green/20 text-success-green">
                {t.murabaha.badge}
              </span>
            </div>
          </div>

          <p className="text-success-green font-semibold mb-2">{t.murabaha.concept}</p>
          <p className="text-sm text-muted-foreground mb-4">{t.murabaha.description}</p>

          <div className="space-y-3 text-sm">
            <div className="p-3 rounded-lg bg-success-green/5">
              <p className="text-foreground">{t.murabaha.howItWorks}</p>
            </div>
            <div className="p-3 rounded-lg bg-success-green/10 border border-success-green/20">
              <p className="text-success-green font-medium">{t.murabaha.ownership}</p>
            </div>
            <p className="text-muted-foreground italic">
              <strong>{isArabic ? 'الأفضل لـ:' : 'Best for:'}</strong> {t.murabaha.bestFor}
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FinancingPathSelector;

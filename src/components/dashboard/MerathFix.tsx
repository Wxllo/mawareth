import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Paintbrush, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { RenovationOffer } from "@/types/models";
import { formatEGP } from "@/services/api";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface MerathFixProps {
  offer: RenovationOffer;
}

export const MerathFix = ({ offer }: MerathFixProps) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [sliderValue, setSliderValue] = useState([50]);
  const [isHovered, setIsHovered] = useState(false);

  const content = {
    en: {
      badge: "Mawareth Fix",
      title: "Unlock",
      highlight: `+${formatEGP(offer.valueIncrease)}`,
      titleEnd: "in Value",
      currentValue: "Current Value",
      potentialValue: "Potential Value",
      renovationCost: "Renovation Cost",
      youPay: "You Pay Today",
      deductNote: "We deduct from sale proceeds",
      benefits: [
        "Professional renovation team",
        "No upfront payment required",
        "Increase buyer interest",
      ],
      cta: "Renovate Now, Pay Later",
      before: "Before",
      after: "After",
    },
    ar: {
      badge: "تجديد موارث",
      title: "افتح",
      highlight: `+${formatEGP(offer.valueIncrease)}`,
      titleEnd: "من القيمة",
      currentValue: "القيمة الحالية",
      potentialValue: "القيمة المحتملة",
      renovationCost: "تكلفة التجديد",
      youPay: "تدفع اليوم",
      deductNote: "نخصم من عائدات البيع",
      benefits: [
        "فريق تجديد محترف",
        "لا دفعة مقدمة مطلوبة",
        "زيادة اهتمام المشترين",
      ],
      cta: "جدد الآن، ادفع لاحقاً",
      before: "قبل",
      after: "بعد",
    },
  };

  const t = content[language];

  const handleApply = () => {
    toast({
      title: language === 'ar' ? 'تم التقديم!' : 'Application Submitted!',
      description: language === 'ar' ? 'سنتواصل معك خلال 24 ساعة' : 'We will contact you within 24 hours',
    });
  };

  // Animated value based on hover
  const displayValue = isHovered ? offer.potentialValue : offer.currentValue;

  return (
    <Card 
      className="overflow-hidden border-2 border-gold/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-gold/20 to-gold/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Paintbrush className="w-5 h-5 text-gold" />
          <span className="font-semibold text-gold">{t.badge}</span>
        </div>
        <TrendingUp className="w-5 h-5 text-success-green" />
      </div>

      <div className="p-6">
        {/* Title */}
        <h3 className="text-2xl font-bold text-foreground mb-6">
          {t.title} <span className="text-success-green">{t.highlight}</span> {t.titleEnd}
        </h3>

        {/* Before/After Slider */}
        <div className="relative mb-6">
          <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
            {/* Before Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale"
              style={{ 
                backgroundImage: `url(${offer.beforeImage})`,
                clipPath: `inset(0 ${100 - sliderValue[0]}% 0 0)`,
              }}
            />
            {/* After Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${offer.afterImage})`,
                clipPath: `inset(0 0 0 ${sliderValue[0]}%)`,
              }}
            />
            {/* Labels */}
            <div className="absolute top-2 left-2 bg-muted-foreground/80 text-white text-xs px-2 py-1 rounded">
              {t.before}
            </div>
            <div className="absolute top-2 right-2 bg-success-green text-white text-xs px-2 py-1 rounded">
              {t.after}
            </div>
            {/* Slider Line */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
              style={{ left: `${sliderValue[0]}%` }}
            />
          </div>
          <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
            max={100}
            step={1}
            className="mt-4"
          />
        </div>

        {/* Value Comparison */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">{t.currentValue}</p>
            <p className={`text-xl font-bold transition-all duration-500 ${isHovered ? 'text-muted-foreground' : 'text-foreground'}`}>
              {formatEGP(offer.currentValue)}
            </p>
          </div>
          <div className="text-center p-4 bg-success-green/10 rounded-lg border-2 border-success-green/30">
            <p className="text-sm text-success-green">{t.potentialValue}</p>
            <p className={`text-xl font-bold transition-all duration-500 ${isHovered ? 'text-success-green' : 'text-foreground'}`}>
              {formatEGP(offer.potentialValue)}
            </p>
          </div>
        </div>

        {/* Cost Breakdown */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg mb-6">
          <div>
            <p className="text-sm text-muted-foreground">{t.renovationCost}</p>
            <p className="font-semibold text-foreground">{formatEGP(offer.renovationCost)}</p>
          </div>
          <ArrowRight className="w-5 h-5 text-muted-foreground" />
          <div className="text-right">
            <p className="text-sm text-muted-foreground">{t.youPay}</p>
            <p className="text-2xl font-bold text-success-green">0 EGP</p>
            <p className="text-xs text-muted-foreground">{t.deductNote}</p>
          </div>
        </div>

        {/* Benefits */}
        <ul className="space-y-2 mb-6">
          {t.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-success-green flex-shrink-0" />
              {benefit}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button onClick={handleApply} className="w-full bg-gold hover:bg-gold/90 text-emerald-dark" size="lg">
          <Paintbrush className="w-5 h-5 mr-2" />
          {t.cta}
        </Button>
      </div>
    </Card>
  );
};

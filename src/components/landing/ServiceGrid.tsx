import { Card } from "@/components/ui/card";
import { Calculator, Handshake, Gavel } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const ServiceGrid = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const services = [
    {
      icon: Calculator,
      titleEn: "Calculate Shares",
      titleAr: "حساب الأنصبة",
      subtextEn: "Know your Sharia rights",
      subtextAr: "اعرف حقوقك الشرعية",
      path: "/calculator",
    },
    {
      icon: Handshake,
      titleEn: "Family Buyout",
      titleAr: "شراء حصص الورثة",
      subtextEn: "Keep the property",
      subtextAr: "احتفظ بالعقار",
      path: "/loan-application",
    },
    {
      icon: Gavel,
      titleEn: "Asset Liquidation",
      titleAr: "تسييل الأصول",
      subtextEn: "Sell disputed assets",
      subtextAr: "بيع الأصول المتنازع عليها",
      path: "/marketplace",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {services.map((service, idx) => (
        <Card
          key={idx}
          onClick={() => navigate(service.path)}
          className="group cursor-pointer p-8 bg-card border-2 border-border hover:border-accent transition-all duration-200 shadow-medium hover:shadow-strong"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
              <service.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {language === 'ar' ? service.titleAr : service.titleEn}
            </h3>
            <p className="text-muted-foreground text-sm">
              {language === 'ar' ? service.subtextAr : service.subtextEn}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

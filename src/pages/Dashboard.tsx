import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Home, MapPin, Users, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { VotingBar } from "@/components/dashboard/VotingBar";
import { MerathFix } from "@/components/dashboard/MerathFix";
import { SilentConsensus } from "@/components/dashboard/SilentConsensus";
import { LeasingSimulator } from "@/components/dashboard/LeasingSimulator";
import { FinancingToggle } from "@/components/dashboard/FinancingToggle";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { api, formatEGP } from "@/services/api";
import { Estate, RenovationOffer } from "@/types/models";

const Dashboard = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [estates, setEstates] = useState<Estate[]>([]);
  const [selectedEstate, setSelectedEstate] = useState<Estate | null>(null);
  const [renovationOffer, setRenovationOffer] = useState<RenovationOffer | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const estateData = await api.estates.getAll();
      setEstates(estateData);
      if (estateData.length > 0) {
        setSelectedEstate(estateData[0]);
        const reno = await api.renovations.getByEstateId(estateData[0]._id);
        if (reno) setRenovationOffer(reno);
      }
    };
    fetchData();
  }, []);

  const handleConsensusVote = async (vote: 'accept' | 'reject') => {
    if (!selectedEstate) return;
    await api.estates.updateConsensus(selectedEstate._id, vote);
    setHasVoted(true);
  };

  const content = {
    en: {
      title: "Heir Dashboard",
      subtitle: "Manage your inherited estates",
      yourEstates: "Your Estates",
      activeEstate: "Active Estate",
      yourShare: "Your Share",
      estateValue: "Estate Value",
      statusLabels: {
        disputed: "Disputed",
        voting: "Voting",
        listed: "Listed",
        sold: "Sold",
      },
      buyoutOptions: "Buyout Options",
      viewMarketplace: "View Marketplace",
    },
    ar: {
      title: "لوحة تحكم الوارث",
      subtitle: "أدر عقاراتك الموروثة",
      yourEstates: "عقاراتك",
      activeEstate: "العقار النشط",
      yourShare: "حصتك",
      estateValue: "قيمة العقار",
      statusLabels: {
        disputed: "متنازع عليه",
        voting: "تصويت",
        listed: "معروض",
        sold: "تم البيع",
      },
      buyoutOptions: "خيارات الشراء",
      viewMarketplace: "عرض السوق",
    },
  };

  const t = content[language];

  const statusColors = {
    disputed: "bg-destructive/10 text-destructive border-destructive/20",
    voting: "bg-accent/10 text-accent-foreground border-accent/20",
    listed: "bg-success-green/10 text-success-green border-success-green/20",
    sold: "bg-muted text-muted-foreground border-border",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
              </div>
              <span className="text-xl font-bold text-foreground">Mawareth</span>
            </div>
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <Button variant="ghost" onClick={() => navigate('/calculator')}>
                {language === 'ar' ? 'الحاسبة' : 'Calculator'}
              </Button>
              <Button variant="ghost" onClick={() => navigate('/marketplace')}>
                {language === 'ar' ? 'السوق' : 'Marketplace'}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Estate Selector */}
            <div className="lg:col-span-1">
              <Card className="shadow-medium">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Home className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    {t.yourEstates}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {estates.map((estate) => (
                    <div
                      key={estate._id}
                      onClick={() => setSelectedEstate(estate)}
                      className={`p-4 rounded-lg cursor-pointer transition-all border-2 ${
                        selectedEstate?._id === estate._id 
                          ? 'bg-primary/5 border-primary' 
                          : 'bg-card hover:bg-muted border-transparent'
                      }`}
                    >
                      <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">
                        {estate.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {estate.city}
                      </div>
                      <Badge className={`mt-2 text-xs border ${statusColors[estate.status]}`}>
                        {t.statusLabels[estate.status]}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Estate Details */}
            <div className="lg:col-span-2 space-y-6">
              {selectedEstate ? (
                <>
                  {/* Estate Overview */}
                  <Card className="shadow-medium">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{t.activeEstate}</p>
                          <h2 className="text-xl font-bold text-foreground">
                            {selectedEstate.title}
                          </h2>
                          <p className="text-muted-foreground flex items-center gap-1 mt-1 text-sm">
                            <MapPin className="w-4 h-4" />
                            {selectedEstate.address}
                          </p>
                        </div>
                        <Badge className={`border ${statusColors[selectedEstate.status]}`}>
                          {t.statusLabels[selectedEstate.status]}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-3 gap-4 mb-6">
                        <div className="p-4 bg-muted rounded-lg text-center">
                          <p className="text-sm text-muted-foreground">{t.estateValue}</p>
                          <p className="text-xl font-bold text-foreground">
                            {formatEGP(selectedEstate.marketValuation)}
                          </p>
                        </div>
                        <div className="p-4 bg-primary/5 rounded-lg text-center border border-primary/20">
                          <p className="text-sm text-primary">{t.yourShare}</p>
                          <p className="text-xl font-bold text-primary">
                            {selectedEstate.heirs[0]?.sharePercentage}%
                          </p>
                        </div>
                        <div className="p-4 bg-accent/5 rounded-lg text-center border border-accent/20">
                          <p className="text-sm text-accent-foreground">{t.yourShare}</p>
                          <p className="text-xl font-bold text-accent-foreground">
                            {formatEGP(selectedEstate.heirs[0]?.shareValue || 0)}
                          </p>
                        </div>
                      </div>

                      {/* Voting Bar */}
                      <VotingBar estate={selectedEstate} />
                    </CardContent>
                  </Card>

                  {/* Silent Consensus Widget */}
                  {selectedEstate.consensus && (
                    <SilentConsensus
                      acceptedCount={selectedEstate.consensus.accepted}
                      totalHeirs={selectedEstate.consensus.total}
                      hasVoted={hasVoted}
                      onVote={handleConsensusVote}
                    />
                  )}

                  {/* Leasing Simulator */}
                  <LeasingSimulator
                    loanAmount={selectedEstate.heirs[0]?.shareValue || 0}
                    monthlyInstallment={Math.round((selectedEstate.heirs[0]?.shareValue || 0) * 1.15 / 60)}
                    estimatedRent={Math.round(selectedEstate.marketValuation * 0.005)}
                  />

                  {/* Financing Toggle */}
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      {t.buyoutOptions}
                    </h3>
                    <FinancingToggle assetPrice={selectedEstate.heirs[0]?.shareValue || 1000000} />
                  </div>

                  {/* Mawareth Fix */}
                  {renovationOffer && <MerathFix offer={renovationOffer} />}

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button 
                      onClick={() => navigate('/marketplace')}
                      variant="outline"
                      className="flex-1 h-12"
                    >
                      {t.viewMarketplace}
                    </Button>
                  </div>
                </>
              ) : (
                <Card className="p-12 text-center shadow-medium">
                  <Home className="w-16 h-16 text-muted-foreground mx-auto mb-4" strokeWidth={1} />
                  <p className="text-xl text-muted-foreground">
                    {language === 'ar' ? 'اختر عقاراً لعرض التفاصيل' : 'Select an estate to view details'}
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card mt-8">
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

      <WhatsAppButton />
    </div>
  );
};

export default Dashboard;

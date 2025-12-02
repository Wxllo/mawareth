import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Home, MapPin, Users, TrendingUp, Vote, CheckCircle, XCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { VotingBar } from "@/components/dashboard/VotingBar";
import { MerathFix } from "@/components/dashboard/MerathFix";
import { api, formatEGP } from "@/services/api";
import { Estate, RenovationOffer } from "@/types/models";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { toast } = useToast();
  const [estates, setEstates] = useState<Estate[]>([]);
  const [selectedEstate, setSelectedEstate] = useState<Estate | null>(null);
  const [renovationOffer, setRenovationOffer] = useState<RenovationOffer | null>(null);

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

  const handleVote = async (vote: 'sell' | 'keep') => {
    if (!selectedEstate) return;
    
    // Simulate voting for the first heir (in real app, this would be the logged-in user)
    const result = await api.estates.updateVote(selectedEstate._id, selectedEstate.heirs[0]._id, vote);
    
    if (result) {
      toast({
        title: language === 'ar' ? 'تم التصويت!' : 'Vote Recorded!',
        description: language === 'ar' ? `صوتك: ${vote === 'sell' ? 'بيع' : 'احتفاظ'}` : `Your vote: ${vote}`,
      });
      // Refresh estate data
      const updatedEstate = await api.estates.getById(selectedEstate._id);
      if (updatedEstate) setSelectedEstate(updatedEstate);
    }
  };

  const content = {
    en: {
      title: "Heir Dashboard",
      subtitle: "Manage your inherited estates",
      yourEstates: "Your Estates",
      activeEstate: "Active Estate",
      yourShare: "Your Share",
      estateValue: "Estate Value",
      status: "Status",
      statusLabels: {
        disputed: "Disputed",
        voting: "Voting",
        listed: "Listed",
        sold: "Sold",
      },
      heirBreakdown: "Heir Breakdown",
      castYourVote: "Cast Your Vote",
      voteToSell: "Vote to Sell",
      voteToKeep: "Vote to Keep",
      viewMarketplace: "View on Marketplace",
      applyForLoan: "Apply for Buyout Loan",
    },
    ar: {
      title: "لوحة تحكم الوارث",
      subtitle: "أدر عقاراتك الموروثة",
      yourEstates: "عقاراتك",
      activeEstate: "العقار النشط",
      yourShare: "حصتك",
      estateValue: "قيمة العقار",
      status: "الحالة",
      statusLabels: {
        disputed: "متنازع عليه",
        voting: "تصويت",
        listed: "معروض",
        sold: "تم البيع",
      },
      heirBreakdown: "توزيع الورثة",
      castYourVote: "أدلِ بصوتك",
      voteToSell: "صوت للبيع",
      voteToKeep: "صوت للاحتفاظ",
      viewMarketplace: "عرض في السوق",
      applyForLoan: "تقدم لقرض الشراء",
    },
  };

  const t = content[language];

  const statusColors = {
    disputed: "bg-destructive/20 text-destructive",
    voting: "bg-gold/20 text-gold",
    listed: "bg-success-green/20 text-success-green",
    sold: "bg-muted text-muted-foreground",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-emerald rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-emerald-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Mawareth</span>
            </div>
            <div className="flex gap-3">
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
      <section className="py-8 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Estate Selector */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-emerald" />
                    {t.yourEstates}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {estates.map((estate) => (
                    <div
                      key={estate._id}
                      onClick={() => setSelectedEstate(estate)}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedEstate?._id === estate._id 
                          ? 'bg-emerald/10 border-2 border-emerald' 
                          : 'bg-muted hover:bg-muted/80 border-2 border-transparent'
                      }`}
                    >
                      <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">
                        {estate.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {estate.city}
                      </div>
                      <Badge className={`mt-2 text-xs ${statusColors[estate.status]}`}>
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
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{t.activeEstate}</CardTitle>
                          <h2 className="text-xl font-bold text-foreground mt-2">
                            {selectedEstate.title}
                          </h2>
                          <p className="text-muted-foreground flex items-center gap-1 mt-1">
                            <MapPin className="w-4 h-4" />
                            {selectedEstate.address}
                          </p>
                        </div>
                        <Badge className={statusColors[selectedEstate.status]}>
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
                        <div className="p-4 bg-emerald/10 rounded-lg text-center">
                          <p className="text-sm text-emerald">{t.yourShare}</p>
                          <p className="text-xl font-bold text-emerald">
                            {selectedEstate.heirs[0]?.sharePercentage}%
                          </p>
                        </div>
                        <div className="p-4 bg-gold/10 rounded-lg text-center">
                          <p className="text-sm text-gold">{t.yourShare}</p>
                          <p className="text-xl font-bold text-gold">
                            {formatEGP(selectedEstate.heirs[0]?.shareValue || 0)}
                          </p>
                        </div>
                      </div>

                      {/* Voting Bar */}
                      <VotingBar estate={selectedEstate} />
                    </CardContent>
                  </Card>

                  {/* Heir Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-emerald" />
                        {t.heirBreakdown}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedEstate.heirs.map((heir) => (
                          <div key={heir._id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-emerald/20 rounded-full flex items-center justify-center">
                                <Users className="w-5 h-5 text-emerald" />
                              </div>
                              <div>
                                <p className="font-semibold text-foreground">{heir.userName}</p>
                                <p className="text-sm text-muted-foreground">{heir.relation}</p>
                              </div>
                            </div>
                            <div className="text-right flex items-center gap-4">
                              <div>
                                <p className="font-bold text-foreground">{heir.sharePercentage}%</p>
                                <p className="text-sm text-muted-foreground">{formatEGP(heir.shareValue)}</p>
                              </div>
                              {heir.vote === 'sell' && <CheckCircle className="w-5 h-5 text-success-green" />}
                              {heir.vote === 'keep' && <XCircle className="w-5 h-5 text-destructive" />}
                              {heir.vote === 'pending' && <Clock className="w-5 h-5 text-muted-foreground" />}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Vote Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Vote className="w-5 h-5 text-emerald" />
                        {t.castYourVote}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <Button 
                          onClick={() => handleVote('sell')}
                          className="bg-success-green hover:bg-success-green/90 text-white"
                          size="lg"
                        >
                          <CheckCircle className="w-5 h-5 mr-2" />
                          {t.voteToSell}
                        </Button>
                        <Button 
                          onClick={() => handleVote('keep')}
                          variant="outline"
                          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                          size="lg"
                        >
                          <XCircle className="w-5 h-5 mr-2" />
                          {t.voteToKeep}
                        </Button>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Button 
                          onClick={() => navigate('/marketplace')}
                          variant="outline"
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          {t.viewMarketplace}
                        </Button>
                        <Button 
                          onClick={() => navigate('/loan-application')}
                          className="bg-gold hover:bg-gold/90 text-emerald-dark"
                        >
                          {t.applyForLoan}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Mawareth Fix */}
                  {renovationOffer && <MerathFix offer={renovationOffer} />}
                </>
              ) : (
                <Card className="p-12 text-center">
                  <Home className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
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

export default Dashboard;

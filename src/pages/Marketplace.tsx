import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Search, Filter, TrendingUp, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { DealCard } from "@/components/marketplace/DealCard";
import { LockModal } from "@/components/marketplace/LockModal";
import { api, formatEGP } from "@/services/api";
import { MarketplaceListing } from "@/types/models";

const Marketplace = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [filteredListings, setFilteredListings] = useState<MarketplaceListing[]>([]);
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");

  useEffect(() => {
    const fetchListings = async () => {
      const data = await api.marketplace.getAll();
      setListings(data);
      setFilteredListings(data);
    };
    fetchListings();
  }, []);

  useEffect(() => {
    let filtered = listings;

    if (searchTerm) {
      filtered = filtered.filter(l => 
        l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (propertyType !== "all") {
      filtered = filtered.filter(l => l.propertyType === propertyType);
    }

    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter(l => l.askPrice >= min && l.askPrice <= max);
    }

    setFilteredListings(filtered);
  }, [searchTerm, propertyType, priceRange, listings]);

  const handleViewDetails = (listing: MarketplaceListing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const content = {
    en: {
      title: "Solh Marketplace",
      subtitle: "Verified distressed assets at below-market prices",
      searchPlaceholder: "Search by location or property...",
      propertyType: "Property Type",
      all: "All",
      apartment: "Apartment",
      villa: "Villa",
      land: "Land",
      commercial: "Commercial",
      priceRange: "Price Range",
      under2m: "Under 2M",
      range2to5: "2M - 5M",
      range5to10: "5M - 10M",
      over10m: "Over 10M",
      totalListings: "properties available",
      totalValue: "Total Value",
      avgDiscount: "Avg. Discount",
    },
    ar: {
      title: "سوق الصلح",
      subtitle: "أصول موثقة بأسعار أقل من السوق",
      searchPlaceholder: "ابحث بالموقع أو العقار...",
      propertyType: "نوع العقار",
      all: "الكل",
      apartment: "شقة",
      villa: "فيلا",
      land: "أرض",
      commercial: "تجاري",
      priceRange: "نطاق السعر",
      under2m: "أقل من 2 مليون",
      range2to5: "2 - 5 مليون",
      range5to10: "5 - 10 مليون",
      over10m: "أكثر من 10 مليون",
      totalListings: "عقار متاح",
      totalValue: "القيمة الإجمالية",
      avgDiscount: "متوسط الخصم",
    },
  };

  const t = content[language];

  const totalValue = filteredListings.reduce((sum, l) => sum + l.askPrice, 0);
  const avgDiscount = filteredListings.length > 0 
    ? Math.round(filteredListings.reduce((sum, l) => sum + l.profitPercentage, 0) / filteredListings.length)
    : 0;

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
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-12 bg-emerald">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-foreground mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-emerald-foreground/80 mb-8">
              {t.subtitle}
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-gold">{filteredListings.length}</p>
                <p className="text-sm text-emerald-foreground/70">{t.totalListings}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-foreground">{formatEGP(totalValue)}</p>
                <p className="text-sm text-emerald-foreground/70">{t.totalValue}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-success-green">{avgDiscount}%</p>
                <p className="text-sm text-emerald-foreground/70">{t.avgDiscount}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="w-[180px]">
                <Home className="w-4 h-4 mr-2" />
                <SelectValue placeholder={t.propertyType} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all}</SelectItem>
                <SelectItem value="apartment">{t.apartment}</SelectItem>
                <SelectItem value="villa">{t.villa}</SelectItem>
                <SelectItem value="land">{t.land}</SelectItem>
                <SelectItem value="commercial">{t.commercial}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-[180px]">
                <TrendingUp className="w-4 h-4 mr-2" />
                <SelectValue placeholder={t.priceRange} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all}</SelectItem>
                <SelectItem value="0-2000000">{t.under2m}</SelectItem>
                <SelectItem value="2000000-5000000">{t.range2to5}</SelectItem>
                <SelectItem value="5000000-10000000">{t.range5to10}</SelectItem>
                <SelectItem value="10000000-100000000">{t.over10m}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <DealCard 
                key={listing._id} 
                listing={listing} 
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="text-center py-16">
              <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">
                {language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lock Modal */}
      <LockModal 
        listing={selectedListing}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

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

export default Marketplace;

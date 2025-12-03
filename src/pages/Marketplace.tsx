import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Search, Filter, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { ListingRow } from "@/components/marketplace/ListingRow";
import { LockModal } from "@/components/marketplace/LockModal";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
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

    setFilteredListings(filtered);
  }, [searchTerm, propertyType, listings]);

  const handleViewDetails = (listing: MarketplaceListing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const content = {
    en: {
      title: "Solh Marketplace",
      subtitle: "Verified distressed assets at below-market prices",
      searchPlaceholder: "Search by location...",
      propertyType: "Property Type",
      all: "All Types",
      apartment: "Apartment",
      villa: "Villa",
      land: "Land",
      commercial: "Commercial",
      totalListings: "properties",
      totalValue: "Total Value",
    },
    ar: {
      title: "سوق الصلح",
      subtitle: "أصول موثقة بأسعار أقل من السوق",
      searchPlaceholder: "ابحث بالموقع...",
      propertyType: "نوع العقار",
      all: "جميع الأنواع",
      apartment: "شقة",
      villa: "فيلا",
      land: "أرض",
      commercial: "تجاري",
      totalListings: "عقار",
      totalValue: "القيمة الإجمالية",
    },
  };

  const t = content[language];
  const totalValue = filteredListings.reduce((sum, l) => sum + l.askPrice, 0);

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
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                {language === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-foreground mb-2">{t.title}</h1>
            <p className="text-muted-foreground mb-6">{t.subtitle}</p>
            
            {/* Stats Row */}
            <div className="flex gap-6 text-sm">
              <div>
                <span className="font-bold text-foreground">{filteredListings.length}</span>
                <span className="text-muted-foreground ml-1">{t.totalListings}</span>
              </div>
              <div>
                <span className="font-bold text-success-green">{formatEGP(totalValue)}</span>
                <span className="text-muted-foreground ml-1">{t.totalValue}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px] max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="w-[180px] h-12">
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
          </div>
        </div>
      </section>

      {/* Listings - List View */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="space-y-4 max-w-5xl">
            {filteredListings.map((listing) => (
              <ListingRow 
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

export default Marketplace;

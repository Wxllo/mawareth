import { Building2, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export const AppHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/calculator", labelEn: "Calculator", labelAr: "الحاسبة" },
    { path: "/marketplace", labelEn: "Marketplace", labelAr: "السوق" },
    { path: "/dashboard", labelEn: "Dashboard", labelAr: "لوحة التحكم" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-soft">
              <Building2 className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
            </div>
            <span className="text-xl font-bold text-foreground">Mawareth</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {language === 'ar' ? item.labelAr : item.labelEn}
              </button>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <Button 
              onClick={() => navigate('/dashboard')}
              className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground h-10"
            >
              {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {language === 'ar' ? item.labelAr : item.labelEn}
                </button>
              ))}
              <Button 
                onClick={() => {
                  navigate('/dashboard');
                  setMobileMenuOpen(false);
                }}
                className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground h-12"
              >
                {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

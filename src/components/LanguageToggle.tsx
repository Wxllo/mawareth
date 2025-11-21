import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useState } from "react";
import { Language } from "@/lib/i18n";

export const LanguageToggle = () => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    
    // Update document direction
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    
    // Store in localStorage (integrate with your MERN backend for persistence)
    localStorage.setItem('language', newLang);
    
    // Trigger page reload to apply translations
    window.location.reload();
  };

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage}>
      <Globe className="w-4 h-4 mr-2" />
      {language === 'en' ? 'العربية' : 'English'}
    </Button>
  );
};

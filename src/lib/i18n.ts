// Simple i18n implementation for Arabic/English toggle
// You'll integrate this with your MERN backend for persistent language preferences

export type Language = 'en' | 'ar';

export const translations = {
  en: {
    // Navigation
    home: 'Home',
    calculator: 'Calculator',
    about: 'About',
    contact: 'Contact',
    faq: 'FAQ',
    pricing: 'Pricing',
    blog: 'Blog',
    getStarted: 'Get Started',
    
    // Hero
    heroTitle: 'Transform Inheritance Into',
    heroSubtitle: 'Immediate Liquidity',
    heroDescription: 'The first platform in Egypt to digitize Sharia inheritance calculations and provide instant estate liquidity solutions for families.',
    calculateYourShare: 'Calculate Your Share',
    learnMore: 'Learn More',
    
    // Calculator
    estateValue: 'Total Estate Value (EGP)',
    heirsAndBeneficiaries: 'Heirs & Beneficiaries',
    addHeir: 'Add Heir',
    name: 'Name',
    relationship: 'Relationship',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    calculateInheritance: 'Calculate Inheritance Shares',
    
    // Relationships
    spouse: 'Spouse',
    son: 'Son',
    daughter: 'Daughter',
    father: 'Father',
    mother: 'Mother',
    brother: 'Brother',
    sister: 'Sister',
    grandfather: 'Grandfather',
    grandmother: 'Grandmother',
    
    // Results
    calculationComplete: 'Calculation Complete',
    totalEstateValue: 'Total Estate Value',
    inheritanceDistribution: 'Inheritance Distribution',
    legalBasis: 'Legal Basis',
    downloadPDF: 'Download PDF',
    share: 'Share',
    startNewCalculation: 'Start New Calculation',
    
    // Footer
    footerCopyright: '© 2025 Mawareth. Simplifying inheritance in Egypt.',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    calculator: 'الحاسبة',
    about: 'من نحن',
    contact: 'اتصل بنا',
    faq: 'الأسئلة الشائعة',
    pricing: 'الأسعار',
    blog: 'المدونة',
    getStarted: 'ابدأ الآن',
    
    // Hero
    heroTitle: 'حول الميراث إلى',
    heroSubtitle: 'سيولة فورية',
    heroDescription: 'أول منصة في مصر لرقمنة حسابات الميراث الشرعي وتوفير حلول السيولة الفورية للعائلات.',
    calculateYourShare: 'احسب حصتك',
    learnMore: 'اعرف المزيد',
    
    // Calculator
    estateValue: 'إجمالي قيمة التركة (جنيه مصري)',
    heirsAndBeneficiaries: 'الورثة والمستفيدون',
    addHeir: 'إضافة وريث',
    name: 'الاسم',
    relationship: 'صلة القرابة',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    calculateInheritance: 'احسب أنصبة الميراث',
    
    // Relationships
    spouse: 'الزوج/الزوجة',
    son: 'الابن',
    daughter: 'البنت',
    father: 'الأب',
    mother: 'الأم',
    brother: 'الأخ',
    sister: 'الأخت',
    grandfather: 'الجد',
    grandmother: 'الجدة',
    
    // Results
    calculationComplete: 'اكتمل الحساب',
    totalEstateValue: 'إجمالي قيمة التركة',
    inheritanceDistribution: 'توزيع الميراث',
    legalBasis: 'الأساس الشرعي',
    downloadPDF: 'تحميل PDF',
    share: 'الحصة',
    startNewCalculation: 'بدء حساب جديد',
    
    // Footer
    footerCopyright: '© 2025 مواريث. تبسيط الميراث في مصر.',
  },
};

// Get translation
export function t(key: string, lang: Language = 'en'): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}

// Language context helpers (use with React Context in your MERN integration)
export function getLanguageDirection(lang: Language): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

export function getLanguageFont(lang: Language): string {
  return lang === 'ar' ? 'Cairo, sans-serif' : 'system-ui, sans-serif';
}

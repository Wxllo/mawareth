import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Building2, Plus, Trash2, FileText, Gavel } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LanguageToggle } from "@/components/LanguageToggle";
import { CurrencyInput } from "@/components/ui/CurrencyInput";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatEGP } from "@/services/api";

interface Heir {
  id: string;
  name: string;
  relationship: string;
  gender: string;
}

interface CalculationResult {
  totalEstate: number;
  heirs: Array<{
    name: string;
    relationship: string;
    percentage: number;
    share: number;
  }>;
}

const Calculator = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [estateValue, setEstateValue] = useState("");
  const [heirs, setHeirs] = useState<Heir[]>([
    { id: "1", name: "", relationship: "", gender: "" }
  ]);
  const [showResults, setShowResults] = useState(false);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);

  const addHeir = () => {
    setHeirs([...heirs, { id: Date.now().toString(), name: "", relationship: "", gender: "" }]);
  };

  const removeHeir = (id: string) => {
    if (heirs.length > 1) {
      setHeirs(heirs.filter(heir => heir.id !== id));
    }
  };

  const updateHeir = (id: string, field: keyof Heir, value: string) => {
    setHeirs(heirs.map(heir => 
      heir.id === id ? { ...heir, [field]: value } : heir
    ));
  };

  const handleCalculate = () => {
    const value = parseInt(estateValue, 10);
    if (!value || value <= 0) {
      toast.error(language === 'ar' ? 'الرجاء إدخال قيمة صحيحة' : 'Please enter a valid estate value');
      return;
    }

    const incompleteHeir = heirs.find(h => !h.name || !h.relationship || !h.gender);
    if (incompleteHeir) {
      toast.error(language === 'ar' ? 'الرجاء إكمال بيانات جميع الورثة' : 'Please complete all heir information');
      return;
    }

    // Simple mock calculation (in real app, use Sharia calculator)
    const result: CalculationResult = {
      totalEstate: value,
      heirs: heirs.map((h, idx) => ({
        name: h.name,
        relationship: h.relationship,
        percentage: Math.round(100 / heirs.length),
        share: Math.round(value / heirs.length),
      })),
    };

    setCalculationResult(result);
    setShowResults(true);
    toast.success(language === 'ar' ? 'تم الحساب بنجاح!' : 'Calculation completed!');
  };

  const handleNewCalculation = () => {
    setShowResults(false);
    setCalculationResult(null);
    setEstateValue("");
    setHeirs([{ id: "1", name: "", relationship: "", gender: "" }]);
  };

  const content = {
    en: {
      title: "Inheritance Calculator",
      subtitle: "Calculate shares according to Sharia law",
      estateValue: "Total Estate Value",
      heirs: "Heirs & Beneficiaries",
      addHeir: "Add Heir",
      name: "Name",
      relationship: "Relationship",
      gender: "Gender",
      male: "Male",
      female: "Female",
      calculate: "Calculate Shares",
      certificateTitle: "Certificate of Inheritance",
      estateTotal: "Estate Total",
      heirName: "Heir Name",
      relation: "Relation",
      percentage: "Percentage",
      cashValue: "Cash Value",
      savePdf: "Save as PDF",
      liquidate: "Liquidate Now",
      newCalc: "New Calculation",
    },
    ar: {
      title: "حاسبة الميراث",
      subtitle: "احسب الأنصبة وفقاً للشريعة الإسلامية",
      estateValue: "إجمالي قيمة التركة",
      heirs: "الورثة والمستفيدين",
      addHeir: "إضافة وارث",
      name: "الاسم",
      relationship: "صلة القرابة",
      gender: "الجنس",
      male: "ذكر",
      female: "أنثى",
      calculate: "احسب الأنصبة",
      certificateTitle: "شهادة توزيع الميراث",
      estateTotal: "إجمالي التركة",
      heirName: "اسم الوارث",
      relation: "صلة القرابة",
      percentage: "النسبة",
      cashValue: "القيمة النقدية",
      savePdf: "حفظ كـ PDF",
      liquidate: "تسييل الآن",
      newCalc: "حساب جديد",
    },
  };

  const t = content[language];

  const relationships = [
    { value: "spouse", label: language === 'ar' ? 'زوج/زوجة' : 'Spouse' },
    { value: "son", label: language === 'ar' ? 'ابن' : 'Son' },
    { value: "daughter", label: language === 'ar' ? 'ابنة' : 'Daughter' },
    { value: "father", label: language === 'ar' ? 'أب' : 'Father' },
    { value: "mother", label: language === 'ar' ? 'أم' : 'Mother' },
    { value: "brother", label: language === 'ar' ? 'أخ' : 'Brother' },
    { value: "sister", label: language === 'ar' ? 'أخت' : 'Sister' },
  ];

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
            <div className="flex gap-3">
              <LanguageToggle />
              <Button variant="ghost" onClick={() => navigate('/')}>
                {language === 'ar' ? 'الرئيسية' : 'Home'}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {showResults && calculationResult ? (
            /* Certificate of Inheritance - Bank Statement Style */
            <Card className="shadow-strong border-2 border-border">
              {/* Certificate Header */}
              <div className="bg-primary text-primary-foreground p-6 text-center">
                <h2 className="text-2xl font-bold">{t.certificateTitle}</h2>
                <p className="text-primary-foreground/80 text-sm mt-1">شهادة توزيع الميراث</p>
              </div>

              {/* Estate Total */}
              <div className="p-6 border-b border-border bg-muted/50">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t.estateTotal}</span>
                  <span className="text-2xl font-bold text-foreground">
                    {formatEGP(calculationResult.totalEstate)}
                  </span>
                </div>
              </div>

              {/* Heirs Table */}
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left py-3 text-sm font-semibold text-muted-foreground">{t.heirName}</th>
                      <th className="text-left py-3 text-sm font-semibold text-muted-foreground">{t.relation}</th>
                      <th className="text-right py-3 text-sm font-semibold text-muted-foreground">{t.percentage}</th>
                      <th className="text-right py-3 text-sm font-semibold text-muted-foreground">{t.cashValue}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculationResult.heirs.map((heir, idx) => (
                      <tr key={idx} className="border-b border-border">
                        <td className="py-4 font-medium text-foreground">{heir.name}</td>
                        <td className="py-4 text-muted-foreground capitalize">{heir.relationship}</td>
                        <td className="py-4 text-right font-semibold text-foreground">{heir.percentage}%</td>
                        <td className="py-4 text-right font-bold text-success-green">{formatEGP(heir.share)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Actions */}
              <div className="p-6 bg-muted/30 border-t border-border">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="flex-1 h-12" onClick={handleNewCalculation}>
                    {t.newCalc}
                  </Button>
                  <Button variant="outline" className="flex-1 h-12">
                    <FileText className="w-4 h-4 mr-2" />
                    {t.savePdf}
                  </Button>
                  <Button 
                    className="flex-1 h-12 bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => navigate('/marketplace')}
                  >
                    <Gavel className="w-4 h-4 mr-2" />
                    {t.liquidate}
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">{t.title}</h1>
                <p className="text-muted-foreground">{t.subtitle}</p>
              </div>

              {/* Input Form */}
              <Card className="p-8 shadow-medium">
                <div className="space-y-6">
                  {/* Estate Value */}
                  <div>
                    <Label className="text-base font-semibold mb-2 block">{t.estateValue}</Label>
                    <CurrencyInput
                      value={estateValue}
                      onChange={setEstateValue}
                      placeholder="0"
                    />
                  </div>

                  {/* Heirs */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-base font-semibold">{t.heirs}</Label>
                      <Button onClick={addHeir} size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />{t.addHeir}
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {heirs.map((heir) => (
                        <Card key={heir.id} className="p-4 border-border">
                          <div className="flex items-start gap-4">
                            <div className="flex-1 grid md:grid-cols-3 gap-4">
                              <div>
                                <Label className="text-sm mb-1 block">{t.name}</Label>
                                <Input
                                  placeholder={t.name}
                                  value={heir.name}
                                  onChange={(e) => updateHeir(heir.id, 'name', e.target.value)}
                                  className="h-12"
                                />
                              </div>
                              <div>
                                <Label className="text-sm mb-1 block">{t.relationship}</Label>
                                <Select value={heir.relationship} onValueChange={(value) => updateHeir(heir.id, 'relationship', value)}>
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder={t.relationship} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {relationships.map(r => (
                                      <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label className="text-sm mb-1 block">{t.gender}</Label>
                                <Select value={heir.gender} onValueChange={(value) => updateHeir(heir.id, 'gender', value)}>
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder={t.gender} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="male">{t.male}</SelectItem>
                                    <SelectItem value="female">{t.female}</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            {heirs.length > 1 && (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => removeHeir(heir.id)} 
                                className="mt-6 text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <Button 
                    size="lg" 
                    className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground shadow-medium text-lg" 
                    onClick={handleCalculate}
                  >
                    {t.calculate}
                  </Button>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
};

export default Calculator;

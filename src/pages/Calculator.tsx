import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { ShariaExplainer } from "@/components/ShariaExplainer";
import { LanguageToggle } from "@/components/LanguageToggle";

interface Heir {
  id: string;
  name: string;
  relationship: string;
  gender: string;
}

const Calculator = () => {
  const navigate = useNavigate();
  const [estateValue, setEstateValue] = useState("");
  const [heirs, setHeirs] = useState<Heir[]>([
    { id: "1", name: "", relationship: "", gender: "" }
  ]);

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

  const [showResults, setShowResults] = useState(false);
  const [calculationResult, setCalculationResult] = useState<any>(null);

  const handleCalculate = () => {
    if (!estateValue || parseFloat(estateValue) <= 0) {
      toast.error("Please enter a valid estate value");
      return;
    }

    const incompleteHeir = heirs.find(h => !h.name || !h.relationship || !h.gender);
    if (incompleteHeir) {
      toast.error("Please complete all heir information");
      return;
    }

    import("@/lib/shariaCalculator").then(({ calculateInheritance }) => {
      const result = calculateInheritance(parseFloat(estateValue), heirs);
      setCalculationResult(result);
      setShowResults(true);
      toast.success("Calculation completed successfully!");
    });
  };

  const handleNewCalculation = () => {
    setShowResults(false);
    setCalculationResult(null);
    setEstateValue("");
    setHeirs([{ id: "1", name: "", relationship: "", gender: "" }]);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Mawareth</span>
            </div>
            <div className="flex gap-3">
              <LanguageToggle />
              <Button variant="ghost" onClick={() => navigate('/')}>Back to Home</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {showResults && calculationResult ? (
            <ResultsDisplay 
              calculation={calculationResult} 
              onNewCalculation={handleNewCalculation}
            />
          ) : (
            <>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-3">Estate Calculator</h1>
                <p className="text-lg text-muted-foreground">Calculate inheritance shares according to Sharia law</p>
              </div>

              <Card className="p-8 shadow-medium mb-6">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="estate-value" className="text-base font-semibold">Total Estate Value (EGP)</Label>
                    <Input
                      id="estate-value"
                      type="number"
                      placeholder="e.g., 2,000,000"
                      value={estateValue}
                      onChange={(e) => setEstateValue(e.target.value)}
                      className="mt-2 text-lg"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-base font-semibold">Heirs & Beneficiaries</Label>
                      <Button onClick={addHeir} size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />Add Heir
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {heirs.map((heir) => (
                        <Card key={heir.id} className="p-4 border-border">
                          <div className="flex items-start gap-4">
                            <div className="flex-1 grid md:grid-cols-3 gap-4">
                              <div>
                                <Label htmlFor={`name-${heir.id}`} className="text-sm">Name</Label>
                                <Input
                                  id={`name-${heir.id}`}
                                  placeholder="Heir name"
                                  value={heir.name}
                                  onChange={(e) => updateHeir(heir.id, 'name', e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`relationship-${heir.id}`} className="text-sm">Relationship</Label>
                                <Select value={heir.relationship} onValueChange={(value) => updateHeir(heir.id, 'relationship', value)}>
                                  <SelectTrigger id={`relationship-${heir.id}`} className="mt-1">
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="spouse">Spouse</SelectItem>
                                    <SelectItem value="son">Son</SelectItem>
                                    <SelectItem value="daughter">Daughter</SelectItem>
                                    <SelectItem value="father">Father</SelectItem>
                                    <SelectItem value="mother">Mother</SelectItem>
                                    <SelectItem value="brother">Brother</SelectItem>
                                    <SelectItem value="sister">Sister</SelectItem>
                                    <SelectItem value="grandfather">Grandfather</SelectItem>
                                    <SelectItem value="grandmother">Grandmother</SelectItem>
                                    <SelectItem value="stepmother">Stepmother (No Inheritance)</SelectItem>
                                    <SelectItem value="stepbrother_paternal">Stepbrother (Paternal)</SelectItem>
                                    <SelectItem value="stepsister_paternal">Stepsister (Paternal)</SelectItem>
                                    <SelectItem value="stepbrother_maternal">Stepbrother (Maternal)</SelectItem>
                                    <SelectItem value="stepsister_maternal">Stepsister (Maternal)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label htmlFor={`gender-${heir.id}`} className="text-sm">Gender</Label>
                                <Select value={heir.gender} onValueChange={(value) => updateHeir(heir.id, 'gender', value)}>
                                  <SelectTrigger id={`gender-${heir.id}`} className="mt-1">
                                    <SelectValue placeholder="Select" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            {heirs.length > 1 && (
                              <Button variant="ghost" size="icon" onClick={() => removeHeir(heir.id)} className="mt-6 text-destructive hover:text-destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Button size="lg" className="w-full shadow-medium" onClick={handleCalculate}>
                    Calculate Inheritance Shares
                  </Button>
                </div>
              </Card>

              <ShariaExplainer />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;

// Sharia Inheritance Calculator Engine
// Based on Islamic inheritance law (Faraid)

export interface Heir {
  id: string;
  name: string;
  relationship: string;
  gender: string;
}

export interface CalculationResult {
  heirId: string;
  name: string;
  relationship: string;
  share: number; // Fractional share (e.g., 0.5 for 1/2)
  percentage: number;
  amount: number;
  basis: string; // Legal basis for the share
}

export interface EstateCalculation {
  totalEstate: number;
  heirs: Heir[];
  results: CalculationResult[];
  remainingEstate: number;
  calculationDate: string;
}

// Fixed shares (Fard) according to Sharia law
const FIXED_SHARES = {
  // Spouse shares
  spouse_husband_with_children: 1 / 4,
  spouse_husband_no_children: 1 / 2,
  spouse_wife_with_children: 1 / 8,
  spouse_wife_no_children: 1 / 4,
  
  // Parent shares
  mother_with_children: 1 / 6,
  mother_no_children_with_siblings: 1 / 6,
  mother_no_children_no_siblings: 1 / 3,
  father_with_children: 1 / 6,
  
  // Daughter shares
  daughter_single: 1 / 2,
  daughter_multiple: 2 / 3,
  
  // Son's daughter shares (if no direct daughters)
  sons_daughter_single: 1 / 2,
  sons_daughter_multiple: 2 / 3,
  
  // Sister shares
  sister_full_single: 1 / 2,
  sister_full_multiple: 2 / 3,
  sister_paternal_single: 1 / 2,
  sister_paternal_multiple: 2 / 3,
  
  // Maternal (uterine) siblings shares
  uterine_sibling_single: 1 / 6,
  uterine_siblings_multiple: 1 / 3,
};

export function calculateInheritance(estateValue: number, heirs: Heir[]): EstateCalculation {
  const results: CalculationResult[] = [];
  let allocatedShares = 0;
  
  // Count heir types
  const hasSpouse = heirs.some(h => h.relationship === 'spouse');
  const hasSons = heirs.filter(h => h.relationship === 'son').length;
  const hasDaughters = heirs.filter(h => h.relationship === 'daughter').length;
  const hasFather = heirs.some(h => h.relationship === 'father');
  const hasMother = heirs.some(h => h.relationship === 'mother');
  const hasBrothers = heirs.filter(h => h.relationship === 'brother').length;
  const hasSisters = heirs.filter(h => h.relationship === 'sister').length;
  const hasChildren = hasSons > 0 || hasDaughters > 0;
  
  // Calculate spouse share first (if exists)
  const spouse = heirs.find(h => h.relationship === 'spouse');
  if (spouse) {
    let share = 0;
    let basis = '';
    
    if (spouse.gender === 'male') {
      if (hasChildren) {
        share = FIXED_SHARES.spouse_husband_with_children;
        basis = 'Husband receives 1/4 when deceased has children (Quran 4:12)';
      } else {
        share = FIXED_SHARES.spouse_husband_no_children;
        basis = 'Husband receives 1/2 when deceased has no children (Quran 4:12)';
      }
    } else {
      if (hasChildren) {
        share = FIXED_SHARES.spouse_wife_with_children;
        basis = 'Wife receives 1/8 when deceased has children (Quran 4:12)';
      } else {
        share = FIXED_SHARES.spouse_wife_no_children;
        basis = 'Wife receives 1/4 when deceased has no children (Quran 4:12)';
      }
    }
    
    results.push({
      heirId: spouse.id,
      name: spouse.name,
      relationship: spouse.relationship,
      share,
      percentage: share * 100,
      amount: estateValue * share,
      basis,
    });
    allocatedShares += share;
  }
  
  // Calculate parent shares
  const mother = heirs.find(h => h.relationship === 'mother');
  if (mother) {
    let share = 0;
    let basis = '';
    
    if (hasChildren) {
      share = FIXED_SHARES.mother_with_children;
      basis = 'Mother receives 1/6 when deceased has children (Quran 4:11)';
    } else if (hasBrothers > 0 || hasSisters > 0) {
      share = FIXED_SHARES.mother_no_children_with_siblings;
      basis = 'Mother receives 1/6 when deceased has siblings but no children (Quran 4:11)';
    } else {
      share = FIXED_SHARES.mother_no_children_no_siblings;
      basis = 'Mother receives 1/3 when deceased has no children or siblings (Quran 4:11)';
    }
    
    results.push({
      heirId: mother.id,
      name: mother.name,
      relationship: mother.relationship,
      share,
      percentage: share * 100,
      amount: estateValue * share,
      basis,
    });
    allocatedShares += share;
  }
  
  const father = heirs.find(h => h.relationship === 'father');
  if (father) {
    let share = 0;
    let basis = '';
    
    if (hasChildren) {
      share = FIXED_SHARES.father_with_children;
      basis = 'Father receives 1/6 when deceased has children (Quran 4:11)';
    } else {
      // Father gets residual (Asabah) when no children
      share = 1 - allocatedShares;
      basis = 'Father receives remaining estate (Asabah) when no children exist';
    }
    
    results.push({
      heirId: father.id,
      name: father.name,
      relationship: father.relationship,
      share,
      percentage: share * 100,
      amount: estateValue * share,
      basis,
    });
    allocatedShares += share;
  }
  
  // Calculate children shares
  const sons = heirs.filter(h => h.relationship === 'son');
  const daughters = heirs.filter(h => h.relationship === 'daughter');
  
  if (sons.length > 0 || daughters.length > 0) {
    const remainingShare = 1 - allocatedShares;
    
    if (sons.length > 0 && daughters.length === 0) {
      // Only sons - divide equally
      const sharePerSon = remainingShare / sons.length;
      sons.forEach(son => {
        results.push({
          heirId: son.id,
          name: son.name,
          relationship: son.relationship,
          share: sharePerSon,
          percentage: sharePerSon * 100,
          amount: estateValue * sharePerSon,
          basis: 'Sons receive equal shares of remaining estate (Asabah)',
        });
      });
      allocatedShares = 1;
    } else if (daughters.length > 0 && sons.length === 0) {
      // Only daughters
      let sharePerDaughter = 0;
      let basis = '';
      
      if (daughters.length === 1) {
        sharePerDaughter = Math.min(FIXED_SHARES.daughter_single, remainingShare);
        basis = 'Single daughter receives 1/2 of estate (Quran 4:11)';
      } else {
        sharePerDaughter = Math.min(FIXED_SHARES.daughter_multiple / daughters.length, remainingShare / daughters.length);
        basis = 'Multiple daughters share 2/3 of estate equally (Quran 4:11)';
      }
      
      daughters.forEach(daughter => {
        results.push({
          heirId: daughter.id,
          name: daughter.name,
          relationship: daughter.relationship,
          share: sharePerDaughter,
          percentage: sharePerDaughter * 100,
          amount: estateValue * sharePerDaughter,
          basis,
        });
      });
      allocatedShares += sharePerDaughter * daughters.length;
    } else {
      // Both sons and daughters - male gets twice the share of female
      const totalParts = sons.length * 2 + daughters.length;
      const sharePerPart = remainingShare / totalParts;
      
      sons.forEach(son => {
        const share = sharePerPart * 2;
        results.push({
          heirId: son.id,
          name: son.name,
          relationship: son.relationship,
          share,
          percentage: share * 100,
          amount: estateValue * share,
          basis: 'Son receives twice the share of daughter (Quran 4:11)',
        });
      });
      
      daughters.forEach(daughter => {
        results.push({
          heirId: daughter.id,
          name: daughter.name,
          relationship: daughter.relationship,
          share: sharePerPart,
          percentage: sharePerPart * 100,
          amount: estateValue * sharePerPart,
          basis: 'Daughter receives half the share of son (Quran 4:11)',
        });
      });
      
      allocatedShares = 1;
    }
  }
  
  // Handle maternal (uterine) siblings first - they get fixed shares
  const maternalSiblings = heirs.filter(h => 
    h.relationship === 'stepbrother_maternal' || h.relationship === 'stepsister_maternal'
  );
  
  if (maternalSiblings.length > 0) {
    const share = maternalSiblings.length === 1 
      ? FIXED_SHARES.uterine_sibling_single 
      : FIXED_SHARES.uterine_siblings_multiple / maternalSiblings.length;
    const basis = maternalSiblings.length === 1
      ? 'Maternal sibling receives 1/6 (Quran 4:12)'
      : 'Maternal siblings share 1/3 equally (Quran 4:12)';
    
    maternalSiblings.forEach(sibling => {
      results.push({
        heirId: sibling.id,
        name: sibling.name,
        relationship: sibling.relationship,
        share,
        percentage: share * 100,
        amount: estateValue * share,
        basis,
      });
      allocatedShares += share;
    });
  }
  
  // Stepmother does NOT inherit
  const stepmother = heirs.find(h => h.relationship === 'stepmother');
  if (stepmother) {
    results.push({
      heirId: stepmother.id,
      name: stepmother.name,
      relationship: stepmother.relationship,
      share: 0,
      percentage: 0,
      amount: 0,
      basis: 'Stepmother does not inherit under Islamic law',
    });
  }
  
  // Calculate siblings shares (if no children exist)
  if (!hasChildren && !hasFather) {
    const brothers = heirs.filter(h => h.relationship === 'brother' || h.relationship === 'stepbrother_paternal');
    const sisters = heirs.filter(h => h.relationship === 'sister' || h.relationship === 'stepsister_paternal');
    const remainingShare = 1 - allocatedShares;
    
    if (brothers.length > 0 || sisters.length > 0) {
      if (brothers.length > 0 && sisters.length === 0) {
        const sharePerBrother = remainingShare / brothers.length;
        brothers.forEach(brother => {
          results.push({
            heirId: brother.id,
            name: brother.name,
            relationship: brother.relationship,
            share: sharePerBrother,
            percentage: sharePerBrother * 100,
            amount: estateValue * sharePerBrother,
            basis: 'Brothers receive equal shares of remaining estate (Asabah)',
          });
        });
        allocatedShares = 1;
      } else if (sisters.length > 0 && brothers.length === 0) {
        let sharePerSister = 0;
        let basis = '';
        
        if (sisters.length === 1) {
          sharePerSister = Math.min(FIXED_SHARES.sister_full_single, remainingShare);
          basis = 'Single sister receives 1/2 of remaining estate (Quran 4:176)';
        } else {
          sharePerSister = Math.min(FIXED_SHARES.sister_full_multiple / sisters.length, remainingShare / sisters.length);
          basis = 'Multiple sisters share 2/3 of remaining estate (Quran 4:176)';
        }
        
        sisters.forEach(sister => {
          results.push({
            heirId: sister.id,
            name: sister.name,
            relationship: sister.relationship,
            share: sharePerSister,
            percentage: sharePerSister * 100,
            amount: estateValue * sharePerSister,
            basis,
          });
        });
        allocatedShares += sharePerSister * sisters.length;
      } else {
        // Both brothers and sisters
        const totalParts = brothers.length * 2 + sisters.length;
        const sharePerPart = remainingShare / totalParts;
        
        brothers.forEach(brother => {
          const share = sharePerPart * 2;
          results.push({
            heirId: brother.id,
            name: brother.name,
            relationship: brother.relationship,
            share,
            percentage: share * 100,
            amount: estateValue * share,
            basis: 'Brother receives twice the share of sister (Quran 4:176)',
          });
        });
        
        sisters.forEach(sister => {
          results.push({
            heirId: sister.id,
            name: sister.name,
            relationship: sister.relationship,
            share: sharePerPart,
            percentage: sharePerPart * 100,
            amount: estateValue * sharePerPart,
            basis: 'Sister receives half the share of brother (Quran 4:176)',
          });
        });
        
        allocatedShares = 1;
      }
    }
  }
  
  const remainingEstate = estateValue * (1 - allocatedShares);
  
  return {
    totalEstate: estateValue,
    heirs,
    results,
    remainingEstate,
    calculationDate: new Date().toISOString(),
  };
}

// Format currency for Egyptian Pounds
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format percentage
export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

// Format fraction
export function formatFraction(decimal: number): string {
  const fractions: { [key: string]: string } = {
    '0.5': '1/2',
    '0.333': '1/3',
    '0.667': '2/3',
    '0.25': '1/4',
    '0.75': '3/4',
    '0.167': '1/6',
    '0.833': '5/6',
    '0.125': '1/8',
    '0.875': '7/8',
  };
  
  const rounded = decimal.toFixed(3);
  return fractions[rounded] || `${(decimal * 100).toFixed(1)}%`;
}

export class Drug {
  name: string;
  expiresIn: number;
  benefit: number;
  constructor(name: string, expiresIn: number, benefit: number) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
  hasExpired(): boolean {
    return this.expiresIn < 0
  }
}

export class Pharmacy {
  drugs: Drug[];
  constructor(drugs: Drug[] = []) {
    this.drugs = drugs;
  }
  updateBenefitValue(): Drug[] {
    for (const drug of this.drugs) {
      switch(drug.name) {
        case "Herbal Tea":
          this.updateHerbalTea(drug)
          break;
        case "Magic Pill":
          // "Magic Pill" never expires nor decreases in Benefit.
          break;
        case "Fervex": 
          this.updateFervex(drug)
          break;
         case "Dafalgan": 
          this.updateDafalgan(drug)
          break;
        default:
          this.updateDefaultDrug(drug)
      }

      if(drug.benefit < 0) {
        drug.benefit = 0
      } else if(drug.benefit > 50) {
        drug.benefit = 50
      }
    }

    return this.drugs
  }

  updateDefaultDrug(drug: Drug): void {
    drug.expiresIn--
    drug.benefit--
    if(drug.hasExpired()) {
      drug.benefit--
    }
  }

  /** "Herbal Tea" actually increases in Benefit the older it gets. Benefit increases twice as fast after the expiration date. */
  updateHerbalTea(drug: Drug): void {
    drug.expiresIn--
    drug.benefit++
    if(drug.hasExpired()) {
      drug.benefit++
    }
  }

  /** "Fervex", like Herbal Tea, increases in Benefit as its expiration date approaches.
   * Benefit increases by 2 when there are 10 days or less and by 3 when there are 5 days or less.
   * Benefit drops to 0 after the expiration date */
  updateFervex(drug: Drug): void {
    drug.expiresIn--
    drug.benefit++
    if(drug.expiresIn < 10)
      drug.benefit++
    if(drug.expiresIn < 5)
      drug.benefit++

    if(drug.hasExpired()) {
      drug.benefit = 0
    }
  }

  /** "Dafalgan" degrades in Benefit twice as fast as normal drugs. */
  updateDafalgan(drug: Drug) : void {
    drug.expiresIn--
    drug.benefit = drug.benefit-2
    if(drug.hasExpired()) {
      drug.benefit = drug.benefit-2
    }
  }

}

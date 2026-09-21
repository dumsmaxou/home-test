import { Drug, Pharmacy } from "./pharmacy";

describe("Pharmacy", () => {
  it("should decrease the benefit and expiresIn", () => {
    expect(new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("test", 1, 2)],
    );
  });

  //Once the expiration date has passed, Benefit degrades twice as fast.
  it("should degrades benefit twice as fast when expiresIn under zero", () => {
    expect(new Pharmacy([new Drug("test", 0, 2)]).updateBenefitValue()).toEqual(
      [new Drug("test", -1, 0)],
    );
  })
  
  // The Benefit of an item is never negative.
  it("should not pass benefit under zero ", () => {
    expect(new Pharmacy([new Drug("test", 0, 1)]).updateBenefitValue()).toEqual(
      [new Drug("test", -1, 0)],
    );
  })

  // "Herbal Tea" actually increases in Benefit the older it gets. Benefit increases twice as fast after the expiration date.
  it("should increase benefit for Herbal Tea", () => {
    expect(new Pharmacy([new Drug("Herbal Tea", 1, 2)]).updateBenefitValue()).toEqual(
      [new Drug("Herbal Tea", 0, 3)],
    );
  })
  it("should increase benefit twice as fast when expiresIn under zero", () => {
    expect(new Pharmacy([new Drug("Herbal Tea", 0, 2)]).updateBenefitValue()).toEqual(
      [new Drug("Herbal Tea", -1, 4)],
    );
  })

  // The Benefit of an item is never more than 50.
  it("should not allow benefit more than 50", () => {
    expect(new Pharmacy([new Drug("Herbal Tea", 0, 50)]).updateBenefitValue()).toEqual(
      [new Drug("Herbal Tea", -1, 50)],
    );
  })

  // "Magic Pill" never expires nor decreases in Benefit.
  it("should not change benefit nor expiresIn for Magic Pill", () => {
    expect(new Pharmacy([new Drug("Magic Pill", 2, 2)]).updateBenefitValue()).toEqual(
      [new Drug("Magic Pill", 2, 2)],
    );
  })

  // "Fervex", like Herbal Tea, increases in Benefit as its expiration date approaches.
  it("should increase benefit for Fervex", () => {
    expect(new Pharmacy([new Drug("Fervex", 13, 2)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", 12, 3)],
    );
  })
  // Benefit increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but Benefit drops to 0 after the expiration date.
  it("should increase benefit twice as fast when expiresIn between 10 and 5 for Fervex", () => {
    expect(new Pharmacy([new Drug("Fervex", 8, 2)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", 7, 4)],
    );
  })
  it("should increase benefit three times as fast when expiresIn between 5 and 0 for Fervex", () => {
    expect(new Pharmacy([new Drug("Fervex", 3, 2)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", 2, 5)],
    );
  })
  it("should set Fervex benefit to zero when expiresIn under zero", () => {
    expect(new Pharmacy([new Drug("Fervex", 0, 45)]).updateBenefitValue()).toEqual(
      [new Drug("Fervex", -1, 0)],
    );
  })

  //"Dafalgan" degrades in Benefit twice as fast as normal drugs.
  it("should degrades the benefit twice", () => {
    expect(new Pharmacy([new Drug("Dafalgan", 2, 3)]).updateBenefitValue()).toEqual(
      [new Drug("Dafalgan", 1, 1)],
    );
  });
  it("should degrades benefit for times as fast when expiresIn under zero", () => {
    expect(new Pharmacy([new Drug("Dafalgan", 0, 7)]).updateBenefitValue()).toEqual(
      [new Drug("Dafalgan", -1, 3)],
    );
  })
});

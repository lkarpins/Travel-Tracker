import chai from "chai";
const expect = chai.expect;

import { Traveler } from "../src/traveler";
import { travelers } from "../src/data/sample-traveler-data";

describe("Traveler", () => {
  let traveler1;
  let traveler2;
  beforeEach(() => {
    traveler1 = new Traveler(travelers[0]);
    traveler2 = new Traveler(travelers[1]);
  });

  it("should be a function", () => {
    expect(Traveler).to.be.a("function");
  });

  it("should be able to instantiate traveler", () => {
    expect(traveler1).to.be.an.instanceof(Traveler);
    expect(traveler2).to.be.an.instanceOf(Traveler);
  });

  it("should be able to store a traveler's id", () => {
    expect(traveler1.id).to.equal(1);
    expect(traveler2.id).to.equal(2);
  });

  it("should be able to store a traveler's name", () => {
    expect(traveler1.name).to.equal("Ham Leadbeater");
    expect(traveler2.name).to.equal("Rachael Vaughten");
  });

  it("should be able to store a traveler's type", () => {
    expect(traveler1.travelerType).to.equal("relaxer");
    expect(traveler2.travelerType).to.equal("thrill-seeker");
  });

  it("should be able to return only the first name of traveler", () => {
    const firstName1 = traveler1.returnFirstName();
    const firstName2 = traveler2.returnFirstName();
    expect(firstName1).to.equal("Ham");
    expect(firstName2).to.equal("Rachael");
  });
});

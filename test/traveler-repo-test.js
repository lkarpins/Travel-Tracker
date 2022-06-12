import chai from "chai";
const expect = chai.expect;

import { Traveler } from "../src/traveler";
import { TravelerRepo } from "../src/traveler-repo";

describe("TravelerRepo", () => {
  let traveler1;
  let traveler2;
  let travelerRepo;
  beforeEach(() => {
    traveler1 = new Traveler({
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer"
    });

    traveler2 = new Traveler({
      id: 2,
      name: "Rachael Vaughten",
      travelerType: "thrill-seeker"
    });
    travelerRepo = new TravelerRepo([traveler1, traveler2]);
  });

  it("should be a function", () => {
    expect(TravelerRepo).to.be.a("function");
  });

  it("should be an instance of TravelerRepo", () => {
    expect(travelerRepo).to.be.an.instanceof(TravelerRepo);
  });

  it("should be able to find traveler by id", () => {
    const chosenTraveler1 = travelerRepo.findTraveler(traveler1.id);
    expect(chosenTraveler1).to.be.an.instanceof(Traveler);
    expect(chosenTraveler1.id).to.equal(traveler1.id);
  });
});

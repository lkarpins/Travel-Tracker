import chai from "chai";
const expect = chai.expect;

import Trip from "../src/trips";
import TripRepo from "../src/trip-repo";

describe("TripRepo", () => {
  let trip1;
  let trip2;
  let tripRepo;
  beforeEach(() => {
    trip1 = {
      id: 117,
      userID: 1,
      destinationID: 28,
      travelers: 3,
      date: "2021 / 01 / 09",
      duration: 15,
      status: "approved",
      suggestedActivities: []
    };

    trip2 = {
      id: 171,
      userID: 2,
      destinationID: 43,
      travelers: 1,
      date: "2020 / 12 / 27",
      duration: 18,
      status: "pending",
      suggestedActivities: []
    };
    tripRepo = new TripRepo([trip1, trip2]);
  });

  it("should be a function", () => {
    expect(TripRepo).to.be.a("function");
  });

  it("should be an instance of TripRepo", () => {
    expect(tripRepo).to.be.an.instanceof(TripRepo);
  });

  // it("should be able to instantiate new Trip", () => {
  //   const chosenTraveler1 = tripRepo.instantiateTrips(trip);
  //   expect(chosenTraveler1).to.be.an.instanceof(Trip);
  // });
});

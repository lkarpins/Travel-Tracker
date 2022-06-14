import chai from "chai";
const expect = chai.expect;

import Destination from "../src/destination";
import DestinationRepo from "../src/destination-repo";

describe("DestinationRepo", () => {
  let destination1;
  let destination2;
  let destinationRepo;
  beforeEach(() => {
    destination1 = {
      id: 28,
      destination: "San Juan, Puerto Rico",
      estimatedLodgingCostPerDay: 70,
      estimatedFlightCostPerPerson: 900,
      image:
        "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
      alt:
        "white and brown concrete buildings near sea under white clouds during daytime"
    };

    destination2 = {
      id: 2,
      destination: "Stockholm, Sweden",
      estimatedLodgingCostPerDay: 100,
      estimatedFlightCostPerPerson: 780,
      image:
        "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      alt: "city with boats on the water during the day time"
    };
    destinationRepo = new DestinationRepo([destination1, destination2]);
  });

  it("should be a function", () => {
    expect(DestinationRepo).to.be.a("function");
  });

  it("should be an instance of DestinationRepo", () => {
    expect(destinationRepo).to.be.an.instanceof(DestinationRepo);
  });

  it("should be able to store data for multiple instances", () => {
    expect(destinationRepo.data).to.deep.equal([destination1, destination2]);
  });

  it("should be able to mutate data to store multiple instances of Destination", () => {
    destinationRepo.instantiateDestination();
    expect(destinationRepo.data[0]).to.be.an.instanceOf(Destination);
    expect(destinationRepo.data[1]).to.be.an.instanceOf(Destination);
  });

  it("should be able to find destination by id", () => {
    let findDestination1 = destinationRepo.findDestination(destination1.id);
    expect(findDestination1).to.deep.equal(destination1);
    let findDestination2 = destinationRepo.findDestination(destination2.id);
    expect(findDestination2).to.deep.equal(destination2);
  });
});

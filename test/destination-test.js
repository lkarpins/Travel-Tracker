import chai from "chai";
const expect = chai.expect;
import Destination from "../src/destination";
import destinations from "../src/data/sample-destination-data";

describe("Destination", () => {
  let destination1;
  let destination2;
  beforeEach(() => {
    destination1 = new Destination(destinations[0]);
    destination2 = new Destination(destinations[2]);
  });

  it("should be a function", () => {
    expect(Destination).to.be.a("function");
  });

  it("should be able to instantiate a destination", () => {
    expect(destination1).to.be.an.instanceof(Destination);
    expect(destination2).to.be.an.instanceOf(Destination);
  });

  it("should provide destination id", () => {
    expect(destination1.id).to.equal(28);
    expect(destination2.id).to.equal(2);
  });

  it("should provide destination name", () => {
    expect(destination1.destination).to.equal("San Juan, Puerto Rico");
    expect(destination2.destination).to.equal("Stockholm, Sweden");
  });

  it("should provide estimated lodging cost per day", () => {
    expect(destination1.estimatedLodgingCostPerDay).to.equal(70);
    expect(destination2.estimatedLodgingCostPerDay).to.equal(100);
  });

  it("should provide estimated flight cost per person", () => {
    expect(destination1.estimatedFlightCostPerPerson).to.equal(900);
    expect(destination2.estimatedFlightCostPerPerson).to.equal(780);
  });

  it("should store an image of destination", () => {
    expect(destination1.image).to.equal(
      "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80"
    );
    expect(destination2.image).to.equal(
      "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
    );
  });

  it("should provide alt description for destination image", () => {
    expect(destination1.alt).to.equal(
      "white and brown concrete buildings near sea under white clouds during daytime"
    );
    expect(destination2.alt).to.equal(
      "city with boats on the water during the day time"
    );
  });
});

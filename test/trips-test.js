import chai from "chai";
const expect = chai.expect;

import { Trip } from "../src/trips";
import { trips } from "../src/data/sample-trip-data";
import { destinations } from "../src/data/sample-destination-data";

describe("Trip", () => {
  let trip1;
  let trip2;

  beforeEach(() => {
    trip1 = new Trip(trips[0], destinations[0]);
    trip2 = new Trip(trips[5], destinations[2]);
  });

  it("should be a function", () => {
    expect(Trip).to.be.a("function");
  });

  it("should be able to instantiate multiple trips", () => {
    expect(trip1).to.be.an.instanceof(Trip);
    expect(trip2).to.be.an.instanceOf(Trip);
  });

  it("should be able to store a trip id", () => {
    expect(trip1.id).to.equal(117);
    expect(trip2.id).to.equal(171);
  });

  it("should be able to store a userID", () => {
    expect(trip1.userID).to.equal(1);
    expect(trip2.userID).to.equal(2);
  });

  it("should be able to store a destinationID", () => {
    expect(trip1.destinationID).to.equal(28);
    expect(trip2.destinationID).to.equal(43);
  });

  it("should be able to store number of travelers", () => {
    expect(trip1.travelers).to.equal(3);
    expect(trip2.travelers).to.equal(1);
  });

  it("should be able to store the start date of a trip", () => {
    expect(trip1.date).to.equal("2021 / 01 / 09");
    expect(trip2.date).to.equal("2020 / 12 / 27");
  });

  it("should be able to store duration of trip", () => {
    expect(trip1.duration).to.equal(15);
    expect(trip2.duration).to.equal(18);
  });

  it("should be able to status of trip", () => {
    expect(trip1.status).to.equal("approved");
    expect(trip2.status).to.equal("pending");
  });

  it("should be able to store suggested activities", () => {
    expect(trip1.suggestedActivities).to.deep.equal([]);
    expect(trip2.suggestedActivities).to.deep.equal([]);
  });

  it("should provide destination id", () => {
    expect(trip1.destination.id).to.equal(28);
    expect(trip2.destination.id).to.equal(2);
  });

  it("should provide destination name", () => {
    expect(trip1.destination.destination).to.equal("San Juan, Puerto Rico");
    expect(trip2.destination.destination).to.equal("Stockholm, Sweden");
  });

  it("should provide estimated lodging cost per day", () => {
    expect(trip1.destination.estimatedLodgingCostPerDay).to.equal(70);
    expect(trip2.destination.estimatedLodgingCostPerDay).to.equal(100);
  });

  it("should provide estimated flight cost per person", () => {
    expect(trip1.destination.estimatedFlightCostPerPerson).to.equal(900);
    expect(trip2.destination.estimatedFlightCostPerPerson).to.equal(780);
  });

  it("should store an image of destination", () => {
    expect(trip1.destination.image).to.equal(
      "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80"
    );
    expect(trip2.destination.image).to.equal(
      "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
    );
  });

  it("should provide alt description for destination image", () => {
    expect(trip1.destination.alt).to.equal(
      "white and brown concrete buildings near sea under white clouds during daytime"
    );
    expect(trip2.destination.alt).to.equal(
      "city with boats on the water during the day time"
    );
  });
});

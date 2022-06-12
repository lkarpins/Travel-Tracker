import chai from "chai";
const expect = chai.expect;

import { Trip } from "../src/trips";
import { trips } from "../src/data/sample-trip-data";

describe("Trip", () => {
  let trip1;
  let trip2;

  beforeEach(() => {
    trip1 = new Trip(trips[0]);
    trip2 = new Trip(trips[5]);
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

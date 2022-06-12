const dayjs = require("dayjs");
import { Trip } from "../src/trip";

class TripRepo {
  constructor(tripData) {
    this.trips = tripData;
  }

  calculateSingleTrip = destinationData => {
    const tripTotal =
      destinationData.estimatedFlightCostPerPerson * this.travelers +
      destinationData.estimatedLodgingCostPerDay *
        this.duration *
        this.travelers;
    return tripTotal;
  };
}

export { TripRepo };

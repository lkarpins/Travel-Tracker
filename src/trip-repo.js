const dayjs = require("dayjs");
import { Trip } from "../src/trip";

class TripRepo {
  constructor(tripData) {
    this.trips = tripData;
  }
}

export { TripRepo };

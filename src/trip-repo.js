const dayjs = require("dayjs");
import { Trip } from "../src/trips";

class TripRepo {
  constructor(data) {
    this.data = this.instantiateTrips(data);
  }

  instantiateTrips = data => {
    const instantiatedTrips = data.map(trip => {
      return new Trip(trip);
    });
    return instantiatedTrips;
  };

  findTrip = id => {
    const chosenTrip = this.data.find(trip => {
      return trip.id === id;
    });
    return chosenTrip;
  };

  filterTripsByTraveler = id => {
    const filteredTrips = this.data.filter(trip => {
      return trip.userID === id;
    });
    return trip.allUserTrips.push(filteredTrips);
  };

  calculateSingleTrip = destinationData => {
    const tripTotal =
      destinationData.estimatedFlightCostPerPerson * this.travelers +
      destinationData.estimatedLodgingCostPerDay *
        this.duration *
        this.travelers;
    return tripTotal * 1.1;
  };
}

export { TripRepo };

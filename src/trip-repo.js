const dayjs = require("dayjs");
import { Trip } from "../src/trip";

class TripRepo {
  constructor(data) {
    this.data = data;
  }

  creatTrips = () => {
    const createdTrips = this.data.map(trip => {
      return (newTrip = new Trip(data));
    });
    return createTrips;
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
    return filteredTrips;
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

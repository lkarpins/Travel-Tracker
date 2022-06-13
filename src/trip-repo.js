const dayjs = require("dayjs");
import { Trip } from "../src/trips";

class TripRepo {
  constructor(data) {
    this.data = this.instantiateTrips(data);
    this.tripList = [];
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
    return (this.tripList = this.data
      .filter(trip => {
        return trip.userID === id;
      })
      .sort((a, b) => {
        return dayjs(b.date) - dayjs(a.date);
      }));
  };
}
export default TripRepo;

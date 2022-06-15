import Trip from "../src/trips";
const dayjs = require("dayjs");

class TripRepo {
  constructor(data) {
    this.data = data;
    this.tripList = [];
  }

  instantiateTrips = () => {
    return (this.data = this.data.map(trip => {
      return new Trip(trip);
    }));
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

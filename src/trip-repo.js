import Trip from "../src/trips";
const dayjs = require("dayjs");

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

  // calculateAmountSpentAnually = () => {
  //   const userTrips = this.filterTripsByTraveler(this.data.id);
  //   console.log(userTrips);
  //   const result = userTrips.reduce((acc, trip) => {
  //     console.log("******", trip);
  //     if (trip.date.includes("2022")) {
  //       acc += trip.cost;
  //     }
  //     return acc;
  //   }, 0);
  //   console.log(result);
  //   return result;
}

export default TripRepo;

const dayjs = require("dayjs");

class Trip {
  constructor(tripData) {
    this.id = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinationID;
    this.travelers = tripData.travelers;
    this.date = tripData.date;
    this.duration = tripData.duration;
    this.status = tripData.status;
    this.suggestedActivities = tripData.suggestedActivities;
    this.cost = 0;
    this.category = "";
  }

  calculateSingleTrip = destination => {
    const tripTotal =
      (destination.estimatedFlightCostPerPerson * this.travelers +
        destination.estimatedLodgingCostPerDay * this.duration) *
      1.1;
    this.cost = tripTotal;
  };

  getTripCategory = trip => {
    if (dayjs().isAfter(dayjs(this.date))) {
      return (this.category = "past");
    } else if (dayjs().isSame(dayjs(trip.date))) {
      return (this.category = "present");
    } else if (dayjs().isBefore(dayjs(trip.date))) {
      return (this.category = "upcoming");
    } else if (this.status === "pending") {
      return (this.category = "pending");
    }
  };
}
export { Trip };

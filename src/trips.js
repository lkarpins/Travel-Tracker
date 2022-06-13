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
    this.timeline = "";
  }

  calculateSingleTrip = destination => {
    const tripTotal =
      (destination.estimatedFlightCostPerPerson * this.travelers +
        destination.estimatedLodgingCostPerDay * this.duration) *
      1.1;
    this.cost = tripTotal;
  };

  getTripTimeline = trip => {
    if (dayjs().isAfter(dayjs(this.date))) {
      return (this.timeline = "past");
    } else if (dayjs().isSame(dayjs(this.date))) {
      return (this.timeline = "present");
    } else if (dayjs().isBefore(dayjs(this.date))) {
      return (this.timeline = "upcoming");
    } else if (this.status === "pending") {
      return (this.timeline = "pending");
    }
  };
}
export { Trip };

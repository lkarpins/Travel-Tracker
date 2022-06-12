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
  }

  calculateSingleTrip = destinationId => {
    const tripTotal =
      destination.estimatedFlightCostPerPerson * this.travelers +
      destination.estimatedLodgingCostPerDay * this.duration;
    return tripTotal * 1.1;
  };
}
export { Trip };

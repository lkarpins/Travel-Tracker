class Trip {
  constructor(tripData, destinationData) {
    this.id = tripData.id;
    this.userID = tripData.userID;
    this.destinationID = tripData.destinationID;
    this.travelers = tripData.travelers;
    this.date = tripData.date;
    this.duration = tripData.duration;
    this.status = tripData.status;
    this.suggestedActivities = tripData.suggestedActivities;
    this.destination = destinationData;
  }

  calculateSingleTrip = () => {
    const tripTotal =
      this.destination.estimatedFlightCostPerPerson * this.travelers +
      this.destination.estimatedLodgingCostPerDay *
        this.duration *
        this.travelers;
    return tripTotal;
  };
}
export { Trip };

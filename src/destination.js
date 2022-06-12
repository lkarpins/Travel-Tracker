class Destination {
  constructor(data) {}

  calculateSingleTrip = destinationData => {
    const tripTotal =
      destinationData.estimatedFlightCostPerPerson * this.travelers +
      destinationData.estimatedLodgingCostPerDay *
        this.duration *
        this.travelers;
    return tripTotal;
  };
}
export { Trip };

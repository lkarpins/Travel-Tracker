class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.allTrips = [];
    this.pastTrips = [];
    this.presentTrips = [];
    this.upcomingTrips = [];
    this.pendingtrips = [];
  }

  returnFirstName = () => {
    const firstName = this.name.split(" ");
    return firstName[0];
  };

  returnAllTrips;
}

export { Traveler };

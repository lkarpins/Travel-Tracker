class Traveler {
  constructor(travelerData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.trips = [];
    this.tripsTotalCost = null;
  }

  returnFirstName = () => {
    const firstName = this.name.split(" ");
    return firstName[0];
  };
}

export { Traveler };

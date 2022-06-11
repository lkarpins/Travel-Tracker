import { Traveler } from "../src/traveler";

class TravelerRepo {
  constructor(travelerData) {
    this.data = travelerData;
  }

  findTraveler = id => {
    const chosenTraveler = this.data.find(traveler => {
      return traveler.id === id;
    });
    return chosenTraveler;
  };
}

export { TravelerRepo };

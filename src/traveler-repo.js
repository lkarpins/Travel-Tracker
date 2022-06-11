import { Traveler } from "../src/Traveler";

class TravelerRepo {
  constructor(travelerData) {
    this.data = travelerData;
  }

  findTraveler = id => {
    const chosenTraveler = this.data.find(traveler => traveler.id === id);
    const currentTraveler = new Traveler(chosenTraveler);
    return currentTraveler;
  };
}

export { TravelerRepo };

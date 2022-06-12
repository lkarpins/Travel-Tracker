import { Traveler } from "../src/traveler";

class TravelerRepo {
  constructor(data) {
    this.data = data;
    this.travelerList = [];
  }

  findTraveler = id => {
    const chosenTraveler = this.data.find(traveler => {
      return traveler.id === id;
    });
    return chosenTraveler;
  };
}

export { TravelerRepo };

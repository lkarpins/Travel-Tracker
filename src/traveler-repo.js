import { Traveler } from "../src/traveler";

class TravelerRepo {
  constructor(data) {
    this.data = this.instantiateTraveler(data);
    this.travelerList = [];
  }

  instantiateTraveler = data => {
    const instantiatedTraveler = data.map(traveler => {
      return new Traveler(traveler);
    });
    return instantiatedTraveler;
  };

  findTraveler = id => {
    const chosenTraveler = this.data.find(traveler => {
      return traveler.id === id;
    });
    return chosenTraveler;
  };
}

export { TravelerRepo };

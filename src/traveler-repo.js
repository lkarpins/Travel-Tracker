import { Traveler } from "../src/traveler";

class TravelerRepo {
  constructor(data) {
    this.data = this.instantiateTraveler(data);
  }

  instantiateTraveler = data => {
    const instantiatedTraveler = data.map(traveler => {
      return new Traveler(traveler);
    });
    return instantiatedTraveler;
  };

  findCurrentTraveler = id => {
    return this.data.find(traveler => {
      return traveler.id === id;
    });
  };
}

export { TravelerRepo };

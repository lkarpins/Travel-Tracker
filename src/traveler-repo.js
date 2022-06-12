import { Traveler } from "../src/traveler";

class TravelerRepo {
  constructor(data) {
    this.data = data;
  }

  instantiateTraveler = () => {
    const instantiatedTraveler = (this.data = data.map(traveler => {
      return new Traveler(traveler);
    }));
    return instantiatedTraveler;
  };

  findTraveler = id => {
    return this.data.find(traveler => {
      return traveler.id === id;
    });
  };
}

export { TravelerRepo };

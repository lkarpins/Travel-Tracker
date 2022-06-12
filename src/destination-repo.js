import { Destination } from "../src/destination";

class DesinationRepo {
  constructor(data) {
    this.data = data;
  }

  instantiateDestination = data => {
    const instantiatedDestination = (this.data = data.map(destination => {
      return new Destination(destination);
    });
    return instantiatedDestination;
  };
  findDestination = id => {
    const chosenDestination = this.data.find(destination => {
      return destination.id === id;
    });
    return chosenDestination;
  };
}
export { DesinationRepo };

// traveler0
// trips 1
// destinations2

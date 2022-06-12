import { Destination } from "../src/destination";

class DestinationRepo {
  constructor(data) {
    this.data = this.instantiateDestination(data);
  }

  instantiateDestination = data => {
    const instantiatedDestination = data.map(destination => {
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
export { DestinationRepo };

// traveler0
// trips 1
// destinations2

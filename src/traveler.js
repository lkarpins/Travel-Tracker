class Traveler {
  constructor() {
    this.id = userData.id;
    this.name = userData.name;
    this.travelerType = userData.travelerType;
  }

  returnFirstName = () => {
    const firstName = this.name.split(" ");
    return firstName[0];
  };
}

export default User;
\;

import "normalize.css";
import "./css/styles.css";

import { TravelerRepo } from "./traveler-repo";
import { TripRepo } from "./trip-repo";
import { DestinationRepo } from "./destination-repo";

import { fetchData } from "./apiCalls";
const dayjs = require("dayjs");

//Global Variables
let today = dayjs().format("YYYY/MM/DD");
let travelerRepo, tripRepo, destinationRepo;

// An example of how you tell webpack to use an image (also need to link to it in the index.html)

const fetchApiCalls = userID => {
  fetchData().then(data => {
    // console.log(data);
    let travelerData = data[0].travelers;
    let tripData = data[1].trips;
    let destinationData = data[2].destinations;
    // console.log(travelerData);
    // console.log(tripData);
    // console.log(destinationData);
    travelerRepo = new TravelerRepo(travelerData);
    tripRepo = new TripRepo(tripData);
    destinationRepo = new DestinationRepo(destinationData);
    console.log(travelerRepo);
    console.log(tripRepo);
    console.log(destinationRepo);

    // loadPage();
  });
};

window.addEventListener("load", fetchApiCalls());
// An example of how you tell webpack to use an image (also need to link to it in the index.html)

console.log("This is the JavaScript entry file - your code begins here.");

//Imports
import "normalize.css";
import "./css/styles.css";
import { TravelerRepo } from "./traveler-repo";
import { TripRepo } from "./trip-repo";
import { DestinationRepo } from "./destination-repo";
import { Traveler } from "../src/traveler";
import { fetchData } from "./apiCalls";
const dayjs = require("dayjs");

//Query Selectors
const welcomeMessage = document.querySelector("#welcomeMessage");

//Global Variables
let today = dayjs().format("YYYY/MM/DD");
let travelerRepo, tripRepo, destinationRepo;
let currentTraveler;

// An example of how you tell webpack to use an image (also need to link to it in the index.html)

const fetchApiCalls = userID => {
  fetchData().then(data => {
    console.log(data);
    let travelerData = data[0].travelers;
    let tripData = data[1].trips;
    let destinationData = data[2].destinations;
    travelerRepo = new TravelerRepo(travelerData);
    tripRepo = new TripRepo(tripData);
    destinationRepo = new DestinationRepo(destinationData);

    travelerRepo.instantiateTraveler(travelerData);
    currentTraveler = travelerRepo.findCurrentTraveler(1);
    welcomeTraveler();
  });
};
//
// const loadPage = () => {
//   welcomeTraveler();
// };

//function that will sort allUsers trips, first need to go to tripRepo and call that method we have allCurrentUserTrips = filterTripsByTraveler(traveler.id);; will give us new array with trip objects whose userID === passed in traveler.id
//iterate over that array and sort into respective arrays with if statements;
// if trip.date < today, traveler.pastTrips.push(trip)
// if trip.date === push.currentTrips(trip)
// if trip.date > today, traveler.currentTrips.push(trip)
//if trip.status === 'pending' push that in pendingTrips array past,

const welcomeTraveler = () => {
  welcomeMessage.innerHTML = `welcome back, ${currentTraveler.returnFirstName()}!`;
};

//iterate through all of the current users trips; while iterating, go to destination repo.findDestination(trip.desinationID) = to variable.   const totalCost = destination.estimatedFlightCostPerPerson
//declare a variable, currentDestination; call destination.findDestination--pass in trip.destinationID

window.addEventListener("load", fetchApiCalls());
// An example of how you tell webpack to use an image (also need to link to it in the index.html)

// console.log("This is the JavaScript entry file - your code begins here.");

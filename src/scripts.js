//Imports
import "normalize.css";
import "./css/styles.css";
import TravelerRepo from "./traveler-repo";
import TripRepo from "./trip-repo";
import DestinationRepo from "./destination-repo";
import Traveler from "../src/traveler";
import fetchData from "./apiCalls";
const dayjs = require("dayjs");

//Query Selectors
const welcomeMessage = document.querySelector("#welcomeMessage");
const budgetUpdate = document.querySelector("#budgetUpdate");
const destinationsDropDown = document.querySelector("#destinationsDropDown");
const tripCards = document.querySelector(".trip-cards");

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
    currentTraveler = travelerRepo.findCurrentTraveler(37);
    tripRepo.filterTripsByTraveler(currentTraveler.id);
    loadPage();
  });
};

const loadPage = () => {
  welcomeTraveler();
  insertDestinationOptions();
  displayTripCards();
};

const welcomeTraveler = () => {
  welcomeMessage.innerHTML = `welcome back, ${currentTraveler.returnFirstName()}!`;
};

const insertDestinationOptions = () => {
  destinationRepo.data.forEach(destination => {
    destinationsDropDown.innerHTML += `<option value="${destination.destinationID}">${destination.destination}</option>`;
  });
  return;
};

const displayTripCards = () => {
  tripRepo.tripList.forEach(trip => {
    const destination = destinationRepo.findDestination(trip.destinationID);
    trip.calculateSingleTrip(destination);
    trip.getTripTimeline(trip);

    tripCards.appendChild(createTripCard(trip, destination));
  });
};

const createTripCard = (trip, destination) => {
  let currentTripCard = document.createElement("article");
  currentTripCard.setAttribute("id", trip.id);
  currentTripCard.setAttribute("class", "trip-card");
  currentTripCard.setAttribute("tabIndex", 0);

  currentTripCard.innerHTML = `
  <img
    src=${destination.image}
    alt=${destination.alt}
  />
  <header class="trip-header">
    <p class='category ${trip.timeline}-category'>${trip.timeline}</p>
    <h3>${destination.destination}</h3>
    <h4>${dayjs(trip.date).format("MM/DD/YYYY")}</h4>
  </header>
  <div class="content">
    <span class="stat">
      <p class="detail">${trip.travelers}</p>
      <p>Travelers</p>
    </span>
    <span class="stat">
      <p class="detail">${trip.duration}</p>
      <p>Nights</p>
    </span>
  </div>
  <footer>
    <p>Trip Cost</p>
    <p class="detail">$${trip.cost.toFixed(2)}</p>
  </footer>
  `;

  return currentTripCard;
};

// const notifyBudget = () {
//   budgetUpdate.innerHTML = `you've spent, ${}`
// }
//iterate through all of the current users trips; while iterating, go to destination repo.findDestination(trip.desinationID) = to variable.   const totalCost = destination.estimatedFlightCostPerPerson
//declare a variable, currentDestination; call destination.findDestination--pass in trip.destinationID

window.addEventListener("load", fetchApiCalls());
// An example of how you tell webpack to use an image (also need to link to it in the index.html)

// console.log("This is the JavaScript entry file - your code begins here.");

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
const bookingDateInput = document.querySelector("#bookingDateInput");
const durationInput = document.querySelector("#durationInput");
const guestsInput = document.querySelector("#guestsInput");
const tripCards = document.querySelector(".trip-cards");
const estimateButton = document.querySelector("#estimateButton");
const submitButton = document.querySelector("#submitButton");

//Global Variables
let today = dayjs().format("YYYY/MM/DD");
let travelerRepo, tripRepo, destinationRepo;
let currentTraveler;

//Event Listener
// estimateButton.addEventListener("click", calculateTripEstimate);
// submitButton.addEventListener("click");

// An example of how you tell webpack to use an image (also need to link to it in the index.html)

const fetchApiCalls = userID => {
  fetchData().then(data => {
    let travelerData = data[0].travelers;
    let tripData = data[1].trips;
    let destinationData = data[2].destinations;
    travelerRepo = new TravelerRepo(travelerData);
    tripRepo = new TripRepo(tripData);
    destinationRepo = new DestinationRepo(destinationData);
    currentTraveler = travelerRepo.findCurrentTraveler(44);
    tripRepo.filterTripsByTraveler(currentTraveler.id);

    loadPage();
  });
};

const loadPage = () => {
  welcomeTraveler();
  insertDestinationOptions();
  displayTripCards();
  calculateAmountSpentAnually();
  notifyAmountSpent();
};

const welcomeTraveler = () => {
  welcomeMessage.innerHTML = `welcome back, ${currentTraveler.returnFirstName()}!`;
};

const calculateAmountSpentAnually = () => {
  const userTrips = tripRepo.filterTripsByTraveler(currentTraveler.id);
  const result = userTrips.reduce((acc, trip) => {
    if (trip.date.includes("2022")) {
      acc += trip.cost;
    }
    return acc;
  }, 0);
  return result.toFixed(2);
};

const notifyAmountSpent = () => {
  let amountSpent = calculateAmountSpentAnually();
  budgetUpdate.innerHTML = `you've spent $${amountSpent} on travel this year!`;
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

const checkForValidInput = () => {
  if (
    !destinationsDropDown.value &&
    bookingDateInput.value &&
    durationInput.value &&
    guestsInput.value
  ) {
    return false;
  } else {
    return true;
  }
};

// const calculateTripEstimate = () => {};

window.addEventListener("load", fetchApiCalls());
// An example of how you tell webpack to use an image (also need to link to it in the index.html)

// console.log("This is the JavaScript entry file - your code begins here.");

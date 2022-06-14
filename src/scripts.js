//Imports
import "normalize.css";
import "./css/styles.css";
import TravelerRepo from "./traveler-repo";
import TripRepo from "./trip-repo";
import DestinationRepo from "./destination-repo";
import Traveler from "../src/traveler";
import apiCalls from "./apiCalls";
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

const fetchApiCalls = userID => {
  apiCalls.fetchData().then(data => {
    let travelerData = data[0].travelers;
    let tripData = data[1].trips;
    let destinationData = data[2].destinations;
    travelerRepo = new TravelerRepo(travelerData);
    tripRepo = new TripRepo(tripData);
    destinationRepo = new DestinationRepo(destinationData);
    currentTraveler = travelerRepo.findCurrentTraveler(12);
    tripRepo.filterTripsByTraveler(currentTraveler.id);

    loadPage();
  });
};

const getTravelerInputData = form => {
  console.log(form);
  return {
    id: parseInt(tripRepo.data.length + 1),
    userID: parseInt(currentTraveler.id),
    destinationID: parseInt(form[0].value),
    travelers: parseInt(form[3].value),
    date: dayjs(form[1].value).format("YYYY/MM/DD"),
    duration: parseInt(form[2].value),
    status: "pending",
    suggestedActivities: []
  };
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
    destinationsDropDown.innerHTML += `<option value="${destination.id}">${destination.destination}</option>`;
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

const postData = event => {
  event.preventDefault();
  console.log(event);
  const result = getTravelerInputData(event.target.form);
  apiCalls.postTripInfo(result).then(() => {
    tripCards.innerHTML = "";
    fetchApiCalls(currentTraveler.id);
  });
};

//Event Listener
// estimateButton.addEventListener("click");
submitButton.addEventListener("click", postData);
window.addEventListener("load", fetchApiCalls());

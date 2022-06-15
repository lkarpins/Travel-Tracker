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
const estimateMessage = document.querySelector("#estimateMessage");
const userName = document.querySelector("#userName");
const password = document.querySelector("#password");
const submitPasswordButton = document.querySelector("#submitPasswordButton");
const loginSection = document.querySelector("#loginSection");
const mainSelection = document.querySelector(".main-section");
const logoutButton = document.querySelector(".logout-button");

//Global Variables
let today = dayjs().format("YYYY/MM/DD");
let travelerRepo, tripRepo, destinationRepo;
let currentTraveler;
let travelerInput;
let userID;

const fetchApiCalls = userID => {
  apiCalls.fetchData().then(data => {
    let travelerData = data[0].travelers;
    let tripData = data[1].trips;
    let destinationData = data[2].destinations;
    travelerRepo = new TravelerRepo(travelerData);
    travelerRepo.instantiateTraveler();
    tripRepo = new TripRepo(tripData);
    tripRepo.instantiateTrips();
    destinationRepo = new DestinationRepo(destinationData);
    destinationRepo.instantiateDestination();
    tripRepo.filterTripsByTraveler(currentTraveler.id);
    loadPage();
  });
};

const getTravelerInputData = form => {
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

const toggleHidden = element => {
  element.classList.toggle("hidden");
};

const fetchUserCall = userID => {
  apiCalls.fetchUser(userID).then(data => {
    currentTraveler = new Traveler(data[0]);
    console.log(currentTraveler);
    tripCards.innerHTML = "";
    fetchApiCalls(userID);
    toggleHidden(loginSection);
    toggleHidden(mainSelection);
    toggleHidden(logoutButton);
  });
};

const verifyCredentials = () => {
  event.preventDefault();
  let user = userName.value.substring(0, 8);
  userID = userName.value.substring(8);
  if (
    password.value === "travel" &&
    user === "traveler" &&
    userID <= 50 &&
    userID >= 1
  ) {
    fetchUserCall(userID);
    return userID;
  } else {
    alert("Incorrect username or password! Try again!");
  }
};

const returnLogin = () => {
  event.preventDefault();
  toggleHidden(loginSection);
  toggleHidden(mainSelection);
  toggleHidden(logoutButton);
};

const welcomeTraveler = () => {
  welcomeMessage.innerHTML = `welcome back, ${currentTraveler.returnFirstName()}!`;
};

const calculateAmountSpentAnually = () => {
  const userTrips = tripRepo.filterTripsByTraveler(currentTraveler.id);
  const result = userTrips.reduce((acc, trip) => {
    if (trip.date.includes("2022") && trip.status === "approved") {
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
    console.log(tripRepo.tripList);
  });
  clearInput();
};

const displayTripEstimate = event => {
  let estimate = calculateEstimatedCost();
  estimateMessage.innerHTML = `your estimated trip cost is $${estimate}! press book it to confirm or choose a different trip!`;
};

const calculateEstimatedCost = form => {
  event.preventDefault();
  let newTripDestination = destinationRepo.findDestination(
    parseInt(destinationsDropDown.value)
  );
  let newTripDuration = durationInput.value;
  let newTripTravelers = guestsInput.value;
  let newTripCost =
    (newTripDestination.estimatedFlightCostPerPerson * newTripTravelers +
      newTripDestination.estimatedLodgingCostPerDay * newTripDuration) *
    1.1;
  return newTripCost.toFixed(2);
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

const clearInput = () => {
  destinationsDropDown.value = "";
  durationInput.value = "";
  guestsInput.value = "";
  bookingDateInput.value = "";
  estimateMessage.innerHTML = "";
};

const postData = event => {
  event.preventDefault();
  const result = getTravelerInputData(event.target.form);
  apiCalls.postTripInfo(result).then(() => {
    tripCards.innerHTML = "";
    fetchApiCalls(currentTraveler.id);
  });
};

//Event Listener
estimateButton.addEventListener("click", calculateEstimatedCost);
estimateButton.addEventListener("click", displayTripEstimate);
submitButton.addEventListener("click", postData);
submitPasswordButton.addEventListener("click", verifyCredentials);
logoutButton.addEventListener("click", returnLogin);

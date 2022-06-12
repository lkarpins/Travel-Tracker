// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "normalize.css";
import "./css/styles.css";
import dayjs from "dayjs";
import { fetchApiData, fetchData } from "./apiCalls";
import { TravelerRepo } from "./traveler-repo";
import { Trip } from "./trips";
//Global Variables
let today = dayjs().format("YYYY/MM/DD");
let travelerRepo, tripRepo, destinationRepo;

// An example of how you tell webpack to use an image (also need to link to it in the index.html)

const fetchApiCalls = userID => {
  apiCalls.fetchData().then(data => {
    let travelerData = data[0].travelers;
    let tripData = data[1].trips;
    let destinationData = data[2].destinations;
    travelerRepo = new TravelerRepo(travelerData);
    travelerRepo.instantiateTraveler();
    tripRepo = new TripRepo(tripData);
    tripRepo.instantiateTrip();
    destinationRepo = new DestinationRepo(destinationData);
    destinationRepo = instantiateDestination();
    loadPage();
  });
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(`${type} API error!`));
};

const loadPage = () => {
  fetchData().then(data => {
    console.log(data);
    return data;
  });
};

window.addEventListener("load", fetchApiCalls());
// An example of how you tell webpack to use an image (also need to link to it in the index.html)

console.log("This is the JavaScript entry file - your code begins here.");

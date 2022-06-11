// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";
import { fetchApiData, fetchData } from "./apiCalls";
import { Traveler } from "./Traveler";
//Global Variables
let allTravelers, allTrips, allDestinations;

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";

const loadHomePage = () => {
  fetchData().then(data => {
    console.log(data);
    return data;
    allTravelers = data.travelers;
    allTrips = data.trips;
    allDestinations = data.destinations;
  });
  console.log(allTravelers);
};

window.addEventListener("load", loadHomePage());

// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.css";
import dayjs from "dayjs";
import { fetchApiData, fetchData } from "./apiCalls";
import { Traveler } from "./traveler";
import { TravelerRepo } from "./traveler-repo";
import { Trip } from "./trips";
//Global Variables
let today = dayjs().format("YYYY/MM/DD");

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";

const loadHomePage = () => {
  fetchData().then(data => {
    console.log(data);
    return data;
  });
};

window.addEventListener("load", loadHomePage());

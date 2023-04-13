
var sidebar_pantry_planner = document.getElementById("pantry_planner");
var sidebar_my_food = document.getElementById("my_food");
var sidebar_recipes = document.getElementById("recipes");
var sidebar_settings = document.getElementById("settings");
var sidebar_shopping_list = document.getElementById("shopping_list");


import firebase from './firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB2DuI-rqRSZYiiEzvBasH4CUeppxX_FoY",
  authDomain: "pantryplanner-5d480.firebaseapp.com",
  databaseURL: "https://pantryplanner-5d480-default-rtdb.firebaseio.com",
  projectId: "pantryplanner-5d480",
  storageBucket: "pantryplanner-5d480.appspot.com",
  messagingSenderId: "407621335990",
  appId: "1:407621335990:web:c6ef5ac9f60b5ba09e9f17",
  measurementId: "G-56LV409GVC"
};

firebase.intializeApp(firebaseConfig);
var foodListDB = firebase.databaseURL().ref('foodList');

const saveFood = (name, expDate) => {
  var newFood = foodListDB.push();

  newFood.set({
      food : food,
      expDate : expDate,
  })
}








var ourURL = 'https://airfishi-bug-free-space-lamp-pgwj4rjxwrpf5vq-5000.preview.app.github.dev';

sidebar_pantry_planner.addEventListener("click", function() {
  window.location.href = ourURL + "/pantry_planner";
});

sidebar_my_food.addEventListener("click", function() {
    window.location.href = ourURL + "/my_food"
});

sidebar_recipes.addEventListener("click", function() {
    window.location.href = ourURL + "/recipes"
});

sidebar_settings.addEventListener("click", function() {
  window.location.href = ourURL + "/settings"
});

sidebar_shopping_list.addEventListener("click", function() {
  window.location.href = ourURL + "/shopping_list"
});
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, push, query, get, remove, orderByChild} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
//import { collection, onSnapshot, orderBy  } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
//require(dotnev).config();
const api = '{{FIREBASEAPI}}';
var i = 0;
const app = initializeApp({
  apiKey: api,
  authDomain: "pantryplannerfinal.firebaseapp.com",
  projectId: "pantryplannerfinal",
  storageBucket: "pantryplannerfinal.appspot.com",
  messagingSenderId: "150587264747",
  appId: "1:150587264747:web:1ef6199be3afe673fbf8ae",
  measurementId: "G-58F9K3EQJC"
});

const db = getDatabase(app);

let username = '{{ nickname }}';

fetch('/getnickname')
  .then(response => response.json())
  .then(json => { username = json.nickname;
    foodRef = ref(db, username + "/food");
    shoppingRef = ref(db, username + "/shopping");
    get(foodRef).then((snapshot) => {
      foodHandler(snapshot)
      });
  expHandler();
});

let foodRef = ref(db, username + "/food");
let shoppingRef = ref(db, username + "/shopping");

document.getElementById("sortByExp").addEventListener("click", function() {
  sortBy("exp", false);
}, false);
document.getElementById("RsortByExp").addEventListener("click", function() {
  sortBy("exp", true);
}, false);
document.getElementById("sortByName").addEventListener("click", function() {
  sortBy("item", false);
}, false);
document.getElementById("RsortByName").addEventListener("click", function() {
  sortBy("item", true);
}, false);
document.getElementById("sortByAdded").addEventListener("click", function() {
  sortBy("latest", true);
}, false);
document.getElementById("RsortByAdded").addEventListener("click", function() {
  sortBy("latest", false);
}, false);


export function sortBy(category, reverse){
  var sortedRef;
  if(category != "latest"){
    sortedRef = query(ref(db, username + '/food'), orderByChild(category))
  }
  else{
    sortedRef = ref(db, username + '/food')
  };
  get(sortedRef).then((snapshot) =>{
    let sortedList = [];
    let keyList = [];
    const list = document.getElementById("expList");
    list.innerHTML = "";
    snapshot.forEach(element =>{
      sortedList.push(element.val())
      keyList.push(element.key)
    });
    if(reverse){
      sortedList.reverse();
      keyList.reverse();
    }
    listFiller(sortedList, keyList);
  });
}

function listFiller(items, keys){
  const list = document.getElementById("expList");
  list.innerHTML = "";
  var i = 0;
  items.forEach(element => {        
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      const itemHeading = document.createElement("h2");
      var button = document.createElement("button");
      button.innerHTML = "remove item";
      button.value = (keys[i]);
      listItem.appendChild(button);
      button.style["float"] = "right";
      button.addEventListener("click", function(){
        buttonRemove("/food/", button.value);
      });
      itemHeading.appendChild(document.createTextNode(element.item));
      const expPara = document.createElement("p");
      expPara.appendChild(document.createTextNode(element.exp));
      listItem.appendChild(itemHeading);
      listItem.appendChild(expPara);
      list.appendChild(listItem);
      i++;
  });
}



export function addItemExp() {  
    console.log("addItemExp");  
    const itemInput = document.getElementById("item-input");
    const expInput = document.getElementById("exp-input");
    const invalid = document.getElementById("invalid-input-food");
    const item = itemInput.value;
    const exp = expInput.value;
    if(item != "" && exp != ""){
      push(foodRef, {
        item: item,
        exp: exp
      })
      .then(() => {
        invalid.style.display = "none";
        itemInput.value = "";
        expInput.value = "";
      })
      .catch((error) => {
        console.log("Write operation denied: " + error.message);
        invalid.style.display = "block";
      });
    }
    get(foodRef).then((snapshot) => {
      foodHandler(snapshot)
    });
    expHandler();
}

export function addItemShop() {    
  const itemInput = document.getElementById("shop-input");
  const item = itemInput.value;
  const invalid = document.getElementById("invalid-input-shop");
  if(item != ""){
    push(shoppingRef, {
      item: item
    }).then(() => {
      invalid.style.display = "none";
      itemInput.value = "";
    })
    .catch((error) => {
      console.log("Write operation denied: " + error.message);
      invalid.style.display = "block";
    });
  }
}

export function buttonRemove(category, id){
  var toRemove = ref(db, username + category + id); 
  remove(toRemove);
  get(foodRef).then((snapshot) => {
    foodHandler(snapshot)
  });
  expHandler();
}

function foodHandler(snapshot){
  const list = document.getElementById("expList");
  list.innerHTML = "";
  const trip = Object.values(snapshot.val());
  const keys = Object.keys(snapshot.val());
  var i = 0;
  trip.forEach(element => {        
      const listItem = document.createElement("li");
      listItem.classList.add("list-item");
      const itemHeading = document.createElement("h2");
      var button = document.createElement("button");
      button.innerHTML = "remove item";
      button.value = (keys[i]);
      listItem.appendChild(button);
      button.style["float"] = "right";
      button.addEventListener("click", function(){
        buttonRemove("/food/", button.value);
      });
      itemHeading.appendChild(document.createTextNode(element.item));
      const expPara = document.createElement("p");
      expPara.appendChild(document.createTextNode(element.exp));
      listItem.appendChild(itemHeading);
      listItem.appendChild(expPara);
      list.appendChild(listItem);
      i++;
  });
}


function expHandler(){
  var sortedRef = query(ref(db, username + '/food'), orderByChild("exp"))
  const list = document.getElementById("expSoon");
  var i = 0;
  get(sortedRef).then((snapshot) => {
    list.innerHTML = "";
    snapshot.forEach(element =>{
      if(i < 4){
        const listItem = document.createElement("li");
        listItem.classList.add("list-item");
        const itemHeading = document.createElement("h2");
        itemHeading.appendChild(document.createTextNode(element.val().item));
        const expPara = document.createElement("p");
        expPara.appendChild(document.createTextNode(element.val().exp));
        listItem.appendChild(itemHeading);
        listItem.appendChild(expPara);
        list.appendChild(listItem);
      i++;
      }
      });
    });    
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


document.getElementById("item-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addItemExp();
  }
});

document.getElementById("exp-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addItemExp();
  }
});

document.getElementById("shop-input").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addItemShop();
  }
});


  window.myFunction = myFunction;
  window.addItemExp = addItemExp; //changes the scope!!! most important line, makes global
  window.addItemShop = addItemShop;
  window.buttonRemove = buttonRemove;
  //window.changeUser = changeUser;
  window.sortBy = sortBy;

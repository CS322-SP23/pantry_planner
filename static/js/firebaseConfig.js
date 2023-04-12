      // Import the functions you need from the SDKs you need
    
      import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
      import { getDatabases } from "firebase/database";
      // TODO: Add SDKs for Firebase products that you want to use
    
      // https://firebase.google.com/docs/web/setup#available-libraries
    
    
      // Your web app's Firebase configuration
    
      const firebaseConfig = {
    
        apiKey: "AIzaSyB2DuI-rqRSZYiiEzvBasH4CUeppxX_FoY",
        authDomain: "pantryplanner-5d480.firebaseapp.com",
        databaseURL: "https://pantryplanner-5d480-default-rtdb.firebaseio.com",
        projectId: "pantryplanner-5d480",
        storageBucket: "pantryplanner-5d480.appspot.com",
        messagingSenderId: "407621335990",
        appId: "1:407621335990:web:c6ef5ac9f60b5ba09e9f17",
        measurementId: "G-56LV409GVC",
      };
    
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      var database = firebase.database();
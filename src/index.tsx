import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import App from "./App"

export const firebase = {
   apiKey: "AIzaSyAfw_ppTtl7oS8eQM18zyBbFm3TPJEu5b8",
   authDomain: "raftlab.firebaseapp.com",
   databaseURL: "https://raftlab-default-rtdb.firebaseio.com",
   projectId: "raftlab",
   storageBucket: "raftlab.appspot.com",
   messagingSenderId: "93780141998",
   appId: "1:93780141998:web:d405bebfd53d93b611ca3f"
 };

export const app = initializeApp(firebase);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore();
export const auth = getAuth();

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <BrowserRouter>
            <App/>
         </BrowserRouter>
      </Provider>
   </React.StrictMode>,
   document.getElementById("root")
);

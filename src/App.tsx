import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import RegisterPage from "./components/Register";
import Login from "./components/Login";
import UserList from "./pages/User";

function App(): JSX.Element {
   return (
      <div className="App">
         <Routes>
            <Route path="/" element={<PrivateRoute component={Home} />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
         </Routes>
      </div>
   );
}

export default App;

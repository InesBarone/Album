import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "./Components/Principal/Principal";
import "./App.css";
import React from "react";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/album" element={<Principal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

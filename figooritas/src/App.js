import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "./Components/Principal/Principal";
import "./App.css";
import React from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Principal />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

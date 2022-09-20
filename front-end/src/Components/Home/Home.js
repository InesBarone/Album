import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <h1 className="titulo-home">Album de figuritas del mundial</h1>
      <div className="buttons-contenedor">
        <Link to="/login">
          <button>Ingresar</button>
        </Link>
        <Link to="/register">
          <button>Registrarse</button>
        </Link>
      </div>
    </div>
  );
}

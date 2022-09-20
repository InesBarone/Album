import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const registro = (nombre, mail, password) => {
    fetch(`http://localhost:3002/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        mail: mail,
        password: password,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then(function (responseJSON) {
        console.log(responseJSON);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="register">
      <div className="header-registro">
        <Link to="/">
          <button>{"<"}</button>
        </Link>
        <h1 className="registro-titulo">Registro: </h1>
      </div>
      <form>
        <div className="input-contenedor">
          <label for="name">Nombre:</label>
          <input
            type="text"
            id="name"
            placeholder="Ingrese su nombre"
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="input-contenedor">
          <label for="email">Mail:</label>
          <input
            type="email"
            id="email"
            placeholder="Ingrese su email"
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div className="input-contenedor">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Ingrese su password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>
      <button id="login" onClick={(e) => registro(nombre, mail, password)}>
        Registrarse
      </button>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const loguearse = (mail, password) => {
    fetch(`http://localhost:3002/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        mail: mail,
        password: password,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then(function (responseJSON) {
        if (responseJSON.success) {
          localStorage.setItem("auth-token", responseJSON.auth_token);
          navigate("/album");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login">
      <div className="header-registro">
        <Link to="/">
          <button>{"<"}</button>
        </Link>
        <h1 className="registro-titulo">Ingresar:</h1>
      </div>
      <form>
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

      <button onClick={(e) => loguearse(mail, password)}>Entrar</button>
    </div>
  );
}

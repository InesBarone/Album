import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Figuritas from "../Figuritas/Figuritas";
import "./Principal.css";

export default function Principal() {
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [i, setI] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3002/figuritas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (responseJSON) {
        setTodo(responseJSON);
      })
      .catch((err) => console.log(err));
  }, [i]);

  const soloBanderas = todo.filter(
    (element) => element.categoria === "Bandera"
  );
  const soloJugadores = todo.filter(
    (element) => element.categoria === "Jugador"
  );

  const tengoFigurita = (id, obj) => {
    fetch(`http://localhost:3002/figuritas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        tengo: true,
        repetidas: obj.repetidas,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then(function (responseJSON) {
        setI(i + 1);
        console.log(responseJSON);
      });
  };

  const agregarRepetida = (id, obj) => {
    fetch(`http://localhost:3002/figuritas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        tengo: true,
        repetidas: obj.repetidas + 1,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then(function (responseJSON) {
        setI(i + 1);
        console.log(responseJSON);
      });
  };

  const restarRepetida = (id, obj) => {
    if (obj.repetidas !== 0) {
      fetch(`http://localhost:3002/figuritas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          tengo: true,
          repetidas: obj.repetidas - 1,
        }),
      })
        .then((r) => {
          return r.json();
        })
        .then(function (responseJSON) {
          setI(i + 1);
          console.log(responseJSON);
        });
    } else {
      fetch(`http://localhost:3002/figuritas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          tengo: false,
          repetidas: 0,
        }),
      })
        .then((r) => {
          return r.json();
        })
        .then(function (responseJSON) {
          setI(i + 1);
          console.log(responseJSON);
        });
    }
  };

  if (todo.length === 0) {
    return (
      <div>
        <p>Cargando</p>
      </div>
    );
  } else {
    return (
      <div className="Principal">
        <header>
          <h1>Figuritas del mundial</h1>
          <Link to="/">
            <button>Cerrar sesion</button>
          </Link>
        </header>
        <main>
          <div className="categoria-contenedor">
            <h2 className="subtitle">Banderas</h2>
            <div className="figuritas-contenedor">
              <ul className="lista-figuritas">
                {soloBanderas.map((obj, key) => {
                  return (
                    <li>
                      <Figuritas
                        obj={obj}
                        key={key}
                        tengoFigurita={tengoFigurita}
                        agregarRepetida={agregarRepetida}
                        restarRepetida={restarRepetida}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="categoria-contenedor">
            <h2 className="subtitle">Jugadores</h2>
            <div className="figuritas-contenedor">
              <ul className="lista-figuritas">
                {soloJugadores.map((obj, key) => {
                  return (
                    <li>
                      <Figuritas
                        obj={obj}
                        key={key}
                        tengoFigurita={tengoFigurita}
                        agregarRepetida={agregarRepetida}
                        restarRepetida={restarRepetida}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

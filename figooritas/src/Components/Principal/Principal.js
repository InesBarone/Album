import React, { useState, useEffect } from "react";
import Figuritas from "../Figuritas/Figuritas";
import "./Principal.css";

export default function Principal() {
  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [i, setI] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3002/figuritas", {
      method: "GET",
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (responseJSON) {
        setTodo(responseJSON);
      });
  }, [i]);

  const soloBanderas = todo.filter(
    (element) => element.categoria === "Bandera"
  );
  const soloJugadores = todo.filter(
    (element) => element.categoria === "Jugador"
  );

  const tengoFigurita = (id, setTodo) => {
    fetch(`http://localhost:3002/figuritas/${id}`, {
      method: "PUT",
      body: {
        tengo: true,
      },
    })
      .then((r) => {
        return r.json();
      })
      .then(function (responseJSON) {
        console.log(responseJSON);
        setI(i + 1);
      });
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
                        i={i}
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
                        i={i}
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

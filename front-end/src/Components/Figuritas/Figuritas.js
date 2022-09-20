import React, { useEffect } from "react";
import "./Figuritas.css";

export default function Figuritas({
  obj,
  setTodo,
  tengoFigurita,
  agregarRepetida,
  restarRepetida,
}) {
  return (
    <div>
      {obj.tengo ? (
        <div className="Figuritas">
          <div className="titulo-contenedor">
            <h1 className="titlo">{obj.nombre}</h1>
          </div>
          <div className={`img-contenedor ${obj.categoria}`}>
            <img src={obj.url_foto} className="img-figura" />
          </div>
          <div className="tiene">
            <button
              className="but but-agregar"
              onClick={() => agregarRepetida(obj.id, obj)}
            >
              {" "}
              +1{" "}
            </button>
            <button
              className="but but-restar"
              onClick={() => restarRepetida(obj.id, obj)}
            >
              {" "}
              -1{" "}
            </button>
          </div>
          <p>Tienes {obj.repetidas} figuritas repetidas</p>
        </div>
      ) : (
        <div className={`Figuritas`}>
          <div className="titulo-contenedor">
            <h1 className="titlo">{obj.nombre}</h1>
          </div>
          <div className={`img-contenedor ${obj.categoria}`}>
            <div className="no-tiene"></div>
          </div>
          <div className="tiene">
            <button
              className="but but-obtener"
              onClick={() => tengoFigurita(obj.id, obj)}
            >
              Agregar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// const tengoFigurita = (numeroDeFigurita, tengoFigurita) => {
//   fetch(`/figurita/${numeroDeFigurita}`, {
//     method: "PUT",
//     body: {
//       tengo: tengoFigurita,
//     },
//   }).then((r) => {
//     r.json();
//   });
// };

// const componente = ({numeroDeFigurita, tengo}) => {
//   return (
//       <div>
//           {tengo?
//               <button>Deje de tener</button>:
//               <button>Tengo</button>
//           }

//       </div>
//   )
// }

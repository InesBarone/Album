// EXPRESS

const express = require("express");
const app = express();
app.use(express.json());

//CORS
const cors = require("cors");
app.use(cors());

//CONTROLLERS
const figuritas = require("./controllers/usuario");

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/figuritas", figuritas.todasFiguritas);
app.get("/figuritas/tengo", figuritas.tieneFiguritas);
app.get("/figuritas/faltan", figuritas.faltanFiguritas);
app.get("/figuritas/repetidas", figuritas.repetidasFiguritas);

app.put("/figuritas/:id", figuritas.unaFigurita);

app.listen(3002, () => {
  console.log("Escuchando puerto 3002");
});

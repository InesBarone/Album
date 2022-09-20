// EXPRESS

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());

//CORS
const cors = require("cors");
app.use(cors());

//CONTROLLERS
const figuritas = require("./controllers/figuritas");
const auth = require("./controllers/auth");
app.use(auth);

//MIDDLEWARES
const { validateJWT } = require("./middlewares/jwt");

//ENDPOINTS
app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/figuritas", validateJWT, figuritas.todasFiguritas);
app.put("/figuritas/:id", figuritas.unaFigurita);

app.listen(3002, () => {
  console.log("Escuchando puerto 3002");
});

const express = require("express");
const app = express();

//KNEX

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "holaprog",
    database: "postgres",
  },
  searchPath: ["knex", "figuritas"],
});

exports.todasFiguritas = function (req, res, next) {
  const r = knex
    .columns("id", "nombre", "categoria", "url_foto", "tengo", "repetidas")
    .select("*")
    .from("figura")
    .orderBy("id")
    .then((resultado) => {
      res.status(200).json(resultado);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.unaFigurita = function (req, res, next) {
  const cambioTengo = req.body.tengo;
  const cambioRepetidas = req.body.repetidas;
  const id = req.params.id;
  const r = knex
    .update({
      tengo: cambioTengo,
      repetidas: cambioRepetidas,
    })
    .from("figura")
    .where("id", "=", id)
    .then((response) => {
      res.status(200).json({ message: "se agrego" });
      console.log("hola", cambioTengo, cambioRepetidas);
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};

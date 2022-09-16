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

exports.tieneFiguritas = function (req, res, next) {
  const r = knex
    .select("*")
    .from("figura")
    .where({
      tengo: "true",
    })
    .then((resultado) => {
      res.status(200).json(resultado);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.faltanFiguritas = function (req, res, next) {
  const r = knex
    .select("*")
    .from("figura")
    .where({
      tengo: "false",
    })
    .then((resultado) => {
      res.status(200).json(resultado);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.repetidasFiguritas = function (req, res, next) {
  const r = knex
    .select("*")
    .from("figura")
    .where("repetidas", ">", 0)
    .then((resultado) => {
      res.status(200).json(resultado);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.unaFigurita = function (req, res, next) {
  const cambio = req.body;
  const id = req.params.id;
  const r = knex
    .update({
      tengo: true,
    })
    .from("figura")
    .where("id", "=", id)
    .then((response) => {
      res.status(200).json({ message: "se agrego" });
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};

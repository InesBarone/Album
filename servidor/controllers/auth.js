const router = require("express").Router();

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

const bcrypt = require("bcrypt");
const { SECRET } = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const pwd = bcrypt.hashSync(req.body.password, salt);

  if (
    req.body.nombre.length === 0 ||
    req.body.mail.length === 0 ||
    req.body.password.length === 0
  ) {
    res.status(400).json({ msg: "falta nombre, mail o password" });
  }
  knex("usuarios")
    .returning(["id", "mail"])
    .insert({
      nombre: req.body.nombre,
      mail: req.body.mail,
      password: pwd,
    })
    .then((respuesta) => {
      res.status(201).json(respuesta[0]);
      next();
    })
    .catch((err) => {
      res.status(500).send("error");
      next();
    });
});

router.post("/login", (req, res, next) => {
  knex
    .select("id", "mail", "password")
    .from("usuarios")
    .where("mail", req.body.mail)
    .then((filas) => {
      if (filas.length === 1) {
        if (bcrypt.compareSync(req.body.password, filas[0].password)) {
          res.status(200).json({
            id: filas[0].id,
            success: true,
            msg: "logueado correctamente",
            auth_token: jwt.sign(
              {
                id: filas[0].id,
                mail: filas[0].mail,
                texto_random: "hola senpai",
              },
              SECRET
            ),
          });
        } else {
          res.status(404).json({ msg: "mail o password incorrecto" });
        }
      } else {
        res.status(404).json({ msg: "mail o password incorrecto" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("error");
      next();
    })
    .finally(() => {
      next();
    });
});

module.exports = router;

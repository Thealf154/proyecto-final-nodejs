const express = require("express");
const getData = express.Router();
const db = require("../config/database")

//Get routes
getData.get("/", async (req, res, next) => {
  const pkmn = await db.query("SELECT * FROM pokemon");
  return res.status(200).json({ code: 200, message: pkmn });
});

getData.get("/:id([0-9]{1,3})", async (req, res, next) => {
  const pokemon = await db.query("SELECT * FROM pokemon");
  const id = req.params.id - 1;
  if (id >= 0 && id < 722) {
    return res.status(200).json({ code: 200, message: pokemon[id] });
  }
  return res.status(404).json({ code: 404, message: "Pokemon no encontrado" });
});

getData.get("/:name([A-Za-z]+)", async (req, res, next) => {
  const name = req.params.name;
  let pokemon = await db.query(
    `SELECT pok_name FROM pokemon WHERE pok_name LIKE '%${name}%'`
  );
  if (pokemon.length > 0)
    return res
      .status(404)
      .json({ code: 404, message: "Pokemon no encontrado" });
  return res.status(200).send(pokemon);
});

//Post routes
getData.post("/", async (req, res, next) => {
  const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

  if (pok_name && pok_height && pok_base_experience && pok_weight) {
    let query =
      "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
    query += ` VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;
    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
      return res
        .status(200)
        .json({ code: 201, message: "Pokemon insertado correctamente" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
  }
  return res
    .status(500)
    .json({ code: 500, message: "Pokemon insertado sin éxito" });
});

//Delete routes
pokemonRoutes.delete("/:id([0-9]{1,3})", async (req, res, next) => {
  const query = `DELETE FROM pokemon WHERE pok_id=${req.params.id}`;
  const rows = await db.query(query);

  if (rows.affectedRows == 1) {
    return res
      .status(200)
      .json({ code: 200, message: "Pokemon borrado correctamente" });
  }
  return res.status(404).json({ code: 404, message: "Pokemon no encontrado" });
});

//Patch routes
getData.patch("/:id([0-9]{1,3})", async (req, res, next) => {
  const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

  if (req.body.pok_name) {
    let query = `UPDATE pokemon SET pok_name='${pok_name}' WHERE pok_id=${req.params.id}`;

    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
      return res
        .status(200)
        .json({ code: 200, message: "Pokemon actualizado correctamente" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
  }

  return res.status(500).json({ code: 500, message: "No existe el Pokemon" });
});
module.exports = getData;
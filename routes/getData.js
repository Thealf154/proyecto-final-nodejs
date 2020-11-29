const express = require("express");
const getData = express.Router();
const db = require("../config/database")

//Get routes
getData.get("/", async (req, res, next) => {
  const tabla = await db.query("SELECT * FROM Empleados");
  return res.status(200).json({ code: 200, message: tabla });
});

getData.get("/:id([0-9]{1,3})", async (req, res, next) => {
  const tabla = await db.query("SELECT * FROM Empleados");
  const id = req.params.id - 1;
  try {
    return res.status(200).json({ code: 200, message: tabla[id] });
  } catch (error) {
    return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
  }
});

getData.get("/:name([A-Za-z]+)", async (req, res, next) => {
  const name = req.params.name;
  let tabla = await db.query(
    `SELECT nombre FROM Empleados WHERE nombre LIKE '%${name}%'`
  );
  if (tabla.length > 0)
    return res
      .status(404)
      .json({ code: 404, message: "Empleado no encontrado" });
  return res.status(200).send(tabla);
});

//Post routes
getData.post("/", async (req, res, next) => {
  const { nombre, apellidos, telefono, correo, direccion} = req.body;
      
  if (nombre && apellidos && telefono && correo && direccion) {
    let query = "INSERT INTO Empleados (nombre, apellidos, telefono, correo, direccion)";
    query += ` VALUES('${nombre}', '${apellidos}', '${telefono}', '${correo}', '${direccion}')`;
    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
      return res
        .status(200)
        .json({ code: 201, message: "Empleado insertado correctamente" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
  }
  return res
    .status(500)
    .json({ code: 500, message: "Empleado insertado sin éxito" });
});

//Delete routes
getData.delete("/:id([0-9]{1,3})", async (req, res, next) => {
  const query = `DELETE FROM Empleados WHERE id_empleado=${req.params.id}`;
  const rows = await db.query(query);

  if (rows.affectedRows == 1) {
    return res
      .status(200)
      .json({ code: 200, message: "Empleado borrado correctamente" });
  }
  return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});

//Patch routes
getData.patch("/:id([0-9]{1,3})", async (req, res, next) => {
  const { nombre, apellidos, telefono, correo, direccion } = req.body;

  if (req.body.nombre) {
    let query = `UPDATE Empleados SET nombre='${nombre}' WHERE id_empleado=${req.params.id}`;

    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
      return res
        .status(200)
        .json({ code: 200, message: "Empleado actualizado correctamente" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
  }

  return res.status(500).json({ code: 500, message: "No existe el Empleado" });
});

module.exports = getData;
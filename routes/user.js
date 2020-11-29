const express = require("express");
const user = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../config/database");

user.post("/login", async (req, res, next) => {
  const { user_email, user_password } = req.body;
  const query = `SELECT * FROM user WHERE user_email = '${user_email}' AND user_password = '${user_password}';`;
  const rows = await db.query(query);

  if (user_email, user_password) {
    if (rows.length == 1)
    {
      //recieves the data to create an autentication token for the user
      const token = jwt.sign({
        user_id : rows[0].user_id,
        user_email : rows[0].user_email
      }, "debugkey"); //Debugkey is a varaiable not visible in the code but only in the server
      return res.status(200).json({ code: 200, message: token });
    }
    else
      return res.status(200).json({code : 200, message : "Usuario y/o contraseña equivocada"})
  }
    else
      return res
        .status(500)
        .json({ code: 500, message: "Campos incompletos" });
});

module.exports = user;
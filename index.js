//Load dependencies
const morgan = require("morgan")
const express = require('express');
const app = express();
//Routes
const getData = require("./routes/getData")
const user = require("./routes/user");

//Middleware
const auth = require("./middleware/auth")
const notFound = require("./middleware/notFound");
const index = require("./middleware/index");
const cors = require("./middleware/cors");

//Auth and morgan
app.use(cors);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//app.use("/", index);
app.get('/', index); 
app.use("/user", user);
app.use("/empleados", getData);
app.use(auth);
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running...");
});

//xd 
const xd;
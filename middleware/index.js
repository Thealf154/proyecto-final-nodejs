module.exports = (req, res, next) => {
  console.log(window);
  return res.status(200).send("Hola mundo"); //También es válido
}
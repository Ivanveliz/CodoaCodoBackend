const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = (req, res) => {
  const { email, password } = req.body;

  const hash = bcrypt.hashSync(password, 8);
  console.log(hash);

  res.json('OK')
}


module.exports = {
  register,
}
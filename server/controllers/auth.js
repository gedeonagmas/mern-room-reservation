const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* register */
async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User has already registered.");
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = User.create({ name, email, password: passwordHash });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
}

/* login */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ msg: "User does not exist." });

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch)
      return res.status(400).json({ msg: "Invalid credentials." });

    jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          _id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
        });
      }
    );
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
}

/* logout */
function logout(req, res) {
  res.cookie("token", "").json(true);
}

module.exports = { register, login, logout };

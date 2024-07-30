const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../../data/dbConfig');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'shh';

// Register endpoint
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "username and password required" });
  }

  try {
    const userExists = await db('users').where({ username }).first();

    if (userExists) {
      return res.status(400).json({ message: "username taken" });
    }

    const hash = bcrypt.hashSync(password, 8);
    const [id] = await db('users').insert({ username, password: hash });

    const newUser = await db('users').where({ id }).first();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "username and password required" });
  }

  try {
    const user = await db('users').where({ username }).first();

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ message: `welcome, ${username}`, token });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
});

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;

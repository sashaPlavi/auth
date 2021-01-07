const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
  const error = registerValidation(req.body);

  if (!error) {
    // checking  if email already exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //hash the pass
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });

    try {
      const savedUser = await user.save();

      res.send({ user_id: user._id });
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    res.status(400).send(error);
  }
});

//login

router.post('/login', async (req, res) => {
  const error = loginValidation(req.body);

  if (!error) {
    // checking  if email already exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email is not found');

    // is password corect ?
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('password is incorect');

    //token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
  } else {
    res.status(400).send(error);
  }
});

module.exports = router;

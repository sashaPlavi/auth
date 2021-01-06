const router = require('express').Router();
const User = require('../model/User');

// validation
const Joi = require('joi');

const Shema = {
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
};

router.post('/register', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    console.log(savedUser);
    res.send(savedUser);
  } catch (err) {
    //console.log(err);
    res.status(400).send(err);
    console.log(err);
  }
});

module.exports = router;

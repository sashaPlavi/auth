const router = require('express').Router();
const User = require('../model/User');
const { registerValidation } = require('../validation');

router.post('/register', async (req, res) => {
  const error = registerValidation(req.body);

  if (!error) {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    try {
      const savedUser = await user.save();

      res.send(savedUser);
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    res.status(400).send(error);
  }
});

module.exports = router;

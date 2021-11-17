// const express = require('express');
// const router = express.Router();
// const { Users } = require('../models');
// const bcrypt = require('bcrypt');
// const { sign } = require('jsonwebtoken');

// router.post('/', async (req, res) => {
//   const { username, password } = req.body;
//   const hash = await bcrypt.hash(password, 10);
//   Users.create({ username, password: hash });
//   res.json('success');
// });

// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   const users = await Users.findAll({ where: { username: username } });
//   const user = users.find((user) => user.username === username);
//   if (user) {
//     const match = await bcrypt.compare(password, user.password);
//     if (match) {
//       // const randomToken = String(Math.random() + Date.now());
//       const accessToken = sign(
//         { username: user.username, id: user.id },
//         'importantsecret'
//       );
//       res.json(accessToken);
//     } else {
//       res.json({ error: 'Wrong Username and Password combination' });
//     }
//   } else {
//     res.json({ error: "User Doesn't Exist" });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  Users.create({ username, password: hash });
  res.json('success');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  // const user = users.find(user => user.username === username)
  console.log(user);
  if (user) {
    console.log(username === user.username);
    const match = await bcrypt.compare(password, user.password);
    match
      ? res.json('You logged in!!!' + user.username)
      : res.json({
          error: 'Wrong Username and Password combination' + user.username,
        });
  } else {
    res.json({ error: "User Doesn't Exist" });
  }
});

module.exports = router;

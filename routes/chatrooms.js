const express = require('express');
const router = express.Router();

const Chatroom = require('../models/Chatroom');

router.route('/')
.get((req, res) => {
  Chatroom.find({}, (err, chatrooms) => {
    res.status(err ? 400 : 200).send(err || chatrooms);
  })
})
.post((req, res) => {

  Chatroom.create(req.body)
    .then(chatroom => {
      res.send(chatroom);
    })
    .catch(err => {
      res.status(400).send(err)
    })

})

module.exports = router;

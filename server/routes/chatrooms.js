const express = require('express');
const router = express.Router();

const Chatroom = require('../models/Chatroom');

// Add messages
router.route('/message/:id')
  .post((req, res) => {
    Chatroom.findById(req.params.id)
    .then(chatroom => {
      let newMessage = req.body;
      newMessage.timeCreated = Date.now();
      chatroom.messages.unshift(newMessage);
      // console.log('chatroom.messages', chatroom.messages);
      return chatroom.save();
    })
    .then(() => {
      // res.send(savedMessage)
    // })
    // .then(() => {
      return Chatroom.find({});
    })
    .then((chatRooms) => {
      // res.io.emit('chatRooms', {
      //   type: 'NEW_DATA',
      //   payload: { chatRooms }
      // })
      res.socketEmitter('chatRooms', chatRooms)
      // console.log('chatRooms', chatRooms)
      res.send()
    })
    .catch(err => {
      res.status(400).send(err)
    })
  })

router.route('/')
  // View chatroom
  .get((req, res) => {
    Chatroom.find({}, (err, chatrooms) => {
      res.status(err ? 400 : 200).send(err || chatrooms);
    })
  })
  // Add new chatroom
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

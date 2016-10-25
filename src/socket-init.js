// const io = require('socket.io-client');
import io from 'socket.io-client';
// import AppDispatcher from './AppDispatcher';
import ServerActions from './actions/ServerActions'

const socket = io();
socket.on('chatRooms', function(data) {
  console.log('SOCKET IO ROOMS: ', data);
  ServerActions.gotRooms(data);
});

export default socket;

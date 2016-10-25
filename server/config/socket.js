// module.exports = function(app, io) {
//   io.on('connection', socket => {
//     console.log('connected!');
//
//     socket.on('click', (data) => {
//       console.log('data', data);
//       socket.emit('action', {
//         type: 'NEW_DATA',
//         payload: {
//           data: data.num
//         }
//       })
//     });
//
//     socket.on('disconnect', () => {
//       console.log('disconnected');
//     });
//   });
//
//   app.use((req, res, next) => {
//     req.socketEmitter = io;
//     next();
//   })
// }

module.exports = (app, io) => {

  let socketEmitter;
  io.on('connection', (socket) => {
    console.log('SOCKET ON');
    socketEmitter = (type, data) => io.sockets.emit(type, data);
  });

  app.use((req, res, next) => {
    res.socketEmitter = socketEmitter;
    next();
  });

}

// LOAD ENV VARIABLES
require('dotenv').config({ silent: true });


// SET SERVER PORT
const PORT = process.env.PORT || 8080;
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/chatroomdb';
const MONGODB_URI = 'mongodb://localhost/chatroomdb';

// REQUIRES
const http = require('http');
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const webpack = require('webpack')
const webpackConfig = require('../webpack.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const mongoose = require('mongoose');

// Set promise
mongoose.Promise = Promise;

mongoose.connect(MONGODB_URI, err => {
  console.log(err || `Mongo connect to ${MONGODB_URI}`)
});

// APP DECLARATION
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// SOCKET.IO
require('./config/socket')(app, io);

const compiler = webpack(webpackConfig)


// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath, noInfo: true
}))

app.use(webpackHotMiddleware(compiler))

// ROUTES
app.use('/api', require('./routes/api'));

app.use("*", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// SERVER LISTEN
server.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
  // if (err) throw err;
  // process.stdout.write(`Server listening on port ${PORT}`);
});

// SOCKETS
// let count = 0;
//
// io.on('connection', socket => {
//   count++;
//   console.log(`${count} clients connected!!!`);
//
//   socket.emit('welcome', {message: 'hello!'});
//
//   socket.on('disconnect', () => {
//     count--;
//     console.log('client disconnected')
//   })
//
//   setInterval(() => {
//     socket.emit('time', Date.now());
//   }, 1000)
// })

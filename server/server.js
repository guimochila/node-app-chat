const path = require('path');
const http = require('http');
const express = require('express');
const exphbs = require('express-handlebars');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const users = new Users();

const viewsPath = path.join(__dirname, 'views/');
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
});

app.set('views', viewsPath);
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('home');
});

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  socket.on('join', (params, callback) => {
    const userRoom = params.room.toLowerCase();

    if(!isRealString(params.name) || !isRealString(userRoom)) {
      return callback('Name and room name are required');
    }

    if(users.isUserAlreadyTaken(params.name)) {
      return callback('Username is already taken. Please, choose a new user');
    }

    if(users.getListRooms().indexOf(userRoom) === -1) {
      users.addRoom(userRoom);
    }

    socket.join(userRoom);
    users.addUser(socket.id, params.name, userRoom);

    io.to(userRoom).emit('updateUserList', users.getUserList(userRoom));
    socket.emit(
      'newMessage',
      generateMessage('Admin', 'Welcome To the chat app')
    );
    socket.broadcast.to(userRoom).emit(
      'newMessage',
      generateMessage('Admin', `${params.name} has joined.`)
    );
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      io.to(user.room).emit(
        'newMessage',
        generateMessage(user.name, message.text)
      );
    }
   callback();
  });

  socket.on('createLocationMessage', (coords) => {
    const user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        'newLocationMessage',
        generateLocationMessage(user.name, coords.latitude, coords.longitude)
      );
    }
  });

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        'updateUserList',
        users.getUserList(user.room)
      );
      io.to(user.room).emit(
        'newMessage',
        generateMessage('Admin', `${user.name} has left`)
      );
    }
  });
});

server.listen(port, () => {
  console.log('Server is up on port 3000');
});


const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const socketIO = require('socket.io');
const socketCookieParser = require('socket.io-cookie');
const base64 = require('base-64');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const users = new Users();

const viewsPath = path.join(__dirname, 'views');
const hbs = exphbs.create({
  layoutsDir: path.join(__dirname, 'views/layouts'),
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
            'raw-helper': function(options) {
              return options.fn();
            },
        },
});


app.engine('.hbs', hbs.engine);
app.set('views', viewsPath);
app.set('view engine', '.hbs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/', (req, res) => {
  let name;
  let room;

  if(req.cookies.chatName && req.cookies.chatRoom) {
    name = base64.decode(req.cookies.chatName);
    room = base64.decode(req.cookies.chatRoom);
  }
  res.render('home', {
    rooms: users.getListRooms(),
    name,
    room,
  });
});

app.get('/chat', (req, res) => {
  res.redirect('/');
});

app.post('/chat', (req, res) => {
  const name = req.body.name;
  const room = req.body.room;

  res.cookie('chatName', base64.encode(name));
  res.cookie('chatRoom', base64.encode(room));
  res.render('chat', {});
});

app.use(express.static(publicPath));

io.use(socketCookieParser);

io.on('connection', (socket) => {
  socket.on('join', (callback) => {
    const userRoom = base64.decode(
      socket.request.headers.cookie.chatRoom
      ).toLowerCase();
    const userName = base64.decode(socket.request.headers.cookie.chatName);

    if(!isRealString(userName) || !isRealString(userRoom)) {
      return callback('Name and room name are required');
    }

    if(users.isUserAlreadyTaken(userName)) {
      return callback('Username is already taken. Please, choose a new user');
    }

    if(users.getListRooms().indexOf(userRoom) === -1) {
      users.addRoom(userRoom);
    }

    socket.join(userRoom);
    users.addUser(socket.id, userName, userRoom);

    io.to(userRoom).emit('updateUserList', users.getUserList(userRoom));
    socket.emit(
      'newMessage',
      generateMessage('Admin', 'Welcome To the chat app')
    );
    socket.broadcast.to(userRoom).emit(
      'newMessage',
      generateMessage('Admin', `${userName} has joined.`)
    );
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


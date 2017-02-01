const {ChatRoom} = require('./chatroom');

class Users extends ChatRoom {
  constructor() {
    super();
    this.users = [];
  }

  addUser(id, name, room) {
    const user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    const user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    } else {
      return user;
    }


    if (!this.isRoomEmpty(user.room)) {
      this.removeRoom(user.room);
    }
    return user;
  }

  isRoomEmpty(room) {
    return this.users.find((user) => user.room === room);
  }

  getUser(id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  getUserList(room) {
    const users = this.users.filter((user) => user.room === room);
    const namesArray = users.map((user) => user.name);

    return namesArray;
  }

  isUserAlreadyTaken(newUser) {
    return this.users.find((user) => user.name === newUser);
  }

}

module.exports = {Users};

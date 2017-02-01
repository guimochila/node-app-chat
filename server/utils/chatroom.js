class ChatRoom {
  constructor() {
    this.chatRooms = [];
  }

  addRoom(roomName) {
    this.chatRooms.push(roomName);
    return roomName;
  }

  getListRooms() {
    return this.chatRooms;
  }

  removeRoom(room) {
    const roomIndex = this.chatRooms.indexOf(room);
    if (roomIndex !== -1) {
      this.chatRooms.splice(roomIndex, 1);
    }

    return this.chatRooms;
  }

}

module.exports = {ChatRoom};

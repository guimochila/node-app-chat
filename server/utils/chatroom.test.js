const expect = require('expect');

const {ChatRoom} = require('./chatroom');

describe('ChatRoom class', () => {
  var chatRooms;
  chatRooms = new ChatRoom();

  it('should add new room', () => {
    const room = chatRooms.addRoom('Test');

    expect(room).toEqual('Test');
  });

  it('should remove a room', () => {
    const room = chatRooms.removeRoom('Test');

    expect(room).toEqual([]);
  });

  it('should get the room list', () => {
    chatRooms.addRoom('Test');
    chatRooms.addRoom('Test2');
    const list = chatRooms.getListRooms();

    expect(list).toEqual(['Test', 'Test2']);
  });
});

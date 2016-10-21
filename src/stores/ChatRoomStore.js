import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher'

let _rooms = null;

class ChatRoomStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch (action.type) {
        case 'GOT_ROOMS':
          _rooms = action.payload.data;
          this.emit('CHANGE');
          break;
      }
    })
  }

  startListening(cb) {
    this.on('CHANGE',cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE',cb)
  }

  getAllRooms() {
    return _rooms;
  }

}

export default new ChatRoomStore;

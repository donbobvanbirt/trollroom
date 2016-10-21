import axios, { get, post } from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  getRooms() {
    get('/api/chatrooms')
    .then(res => {
      let { data } = res;
      // console.log("data", data)
      ServerActions.gotRooms(data);
    })
    .catch(console.error)
  },

  sendMessage(roomId, msgObj) {
    post(`/api/chatrooms/message/${roomId}`, msgObj)
    .then(res => {
      let { data } = res;
      // console.log('data', data)
      this.getRooms();
    })
    .catch(console.error)
  },

  newRoom(name) {
    let nameObj = { name: name }
    console.log('nameObj', nameObj)
    post(`/api/chatrooms`, nameObj)
    .then(res => {
      let { data } = res;
      console.log('data', data)
      // this.getRooms();
    })
    .catch(console.error)
  }

}

export default API;

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
  }

}

export default API;

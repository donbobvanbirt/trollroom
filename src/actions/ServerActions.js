import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  gotRooms(data) {
    AppDispatcher.dispatch({
      type: 'GOT_ROOMS',
      payload: { data }
    })
  }
}

export default ServerActions

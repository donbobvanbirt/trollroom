import React, { Component } from 'react';
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { Header, List, Image } from 'semantic-ui-react'

import RoomActions from '../actions/RoomActions'
import ChatRoomStore from '../stores/ChatRoomStore'

export default class RoomList extends Component {
  constructor() {
    super();
    this.state = {
      rooms: ChatRoomStore.getAllRooms()
    }
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    RoomActions.getRooms();
    ChatRoomStore.startListening(this._onChange)
  }

  componentWillUnmount () {
    ChatRoomStore.stopListening(this._onChange)
  }

  _onChange() {
    this.setState({
      rooms: ChatRoomStore.getAllRooms()
    })
  }

  selectRoom(id) {
    browserHistory.push(`/room/${id}`);
  }

  render() {
    console.log('this.state', this.state)
    let { rooms } = this.state;
    let roomList = '';

    if (rooms) {
      roomList = (
        <List>

          {rooms.map(room => {
            let { _id, createdAt, name } = room;
            return (
              <List.Item key={_id}>
                {/* <List.Icon name='github' size='large' verticalAlign='middle' /> */}
                <Image avatar src='https://craigdodson.files.wordpress.com/2016/03/trollface.png' />
                <List.Content>
                  <List.Header as='a' onClick={() => this.selectRoom(_id)}>{name}</List.Header>
                  <List.Description as='a' onClick={() => this.selectRoom(_id)}>Created at {createdAt}</List.Description>
                </List.Content>
              </List.Item>
            )
          })}

        </List>
      )
    }

    return (
      <div>
        {roomList}
      </div>
    )
  }
}

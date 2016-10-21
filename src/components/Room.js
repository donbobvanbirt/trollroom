import React, { Component } from 'react';
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { Header, List, Image, Button, Form, Input, TextArea } from 'semantic-ui-react'

import RoomActions from '../actions/RoomActions'
import ChatRoomStore from '../stores/ChatRoomStore'

export default class Room extends Component {
  constructor() {
    super();
    this.state = {
      rooms: ChatRoomStore.getAllRooms(),
      currentRoom: null
    }
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    let { id } = this.props.params;
    this.setState({ currentRoom: id })
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

  render() {
    console.log('this.state', this.state)
    let { rooms, currentRoom } = this.state;
    let chatList = '';

    if (rooms) {
      let thisRoom = rooms.filter(room => {
        return room._id === currentRoom;
      })
      console.log('thisRoom', thisRoom)
      let { name, messages } = thisRoom[0];

      chatList = (
        <div>
          <h1>{name}</h1>
          <Header as='h1' textAlign='center'></Header>
          <List>
            <Form>
              <Form.Input label='Name' name='name' placeholder='Name' />
              <Form.TextArea name='message' placeholder='Message' rows='3' />
              <Button type='submit'>Troll</Button>
            </Form>
            <hr/>

            {messages.map((message, i) => {
              let { author, text, timeCreated } = message;
              console.log('message', message)
              return (
                <List.Item key={i}>
                  <Image avatar src='https://craigdodson.files.wordpress.com/2016/03/trollface.png' />
                  <List.Content>
                    <List.Header>{text}</List.Header>
                    <List.Description>By {author} at {timeCreated}</List.Description>
                  </List.Content>
                </List.Item>
              )
            })}

          </List>
        </div>
      )

    }

    return (
      <div>

        {chatList}
      </div>
    )
  }
}

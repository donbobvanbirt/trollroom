import React, { Component } from 'react';
import { render } from 'react-dom'
import { Form, Input, Button } from 'semantic-ui-react'

import RoomActions from '../actions/RoomActions'

export default class NewRoom extends Component {
  constructor() {
    super();
    this.state = { newName: null }
    this.typeName = this.typeName.bind(this);
    this.submitNewRoom = this.submitNewRoom.bind(this);
  }

  typeName(e) {
    this.setState({ newName: e.target.value })
  }

  submitNewRoom(e) {
    e.preventDefault();
    let { newName } = this.state;
    if (newName) {
      RoomActions.newRoom(newName)
    }
  }

  render() {

    return (
      <Form onSubmit={this.submitNewRoom} success>
        <Form.Input name="newRoomInput" label='New Trollroom' placeholder='Room name' onChange={this.typeName} />
        <Button>Submit</Button>
      </Form>
    )
  }
}

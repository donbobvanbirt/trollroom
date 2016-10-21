import React, { Component } from 'react'
import { Link } from 'react-router'
import { Container, Menu } from 'semantic-ui-react'

export default class Layout extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: 'home'
    }
  }

  handleItemClick(name) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Container>
          <Menu inverted>
            <Menu.Item header>Trollroom</Menu.Item>
            <Menu.Item name='Rooms' active={activeItem === 'home'} link to='/'></Menu.Item>
          </Menu>
          {this.props.children}
        </Container>
      </div>
    )
  }
}

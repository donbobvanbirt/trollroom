import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import { Container, Menu } from 'semantic-ui-react'

export default class Layout extends Component {
  constructor() {
    super();
    this.state = {
      activeItem: 'home'
    }
    this.linkHome = this.linkHome.bind(this);
    this.linkNew = this.linkNew.bind(this);
  }

  handleItemClick(name) {
    this.setState({ activeItem: name });
  }

  linkHome() {
    this.handleItemClick('home')
    browserHistory.push('/')
  }

  linkNew() {
    this.handleItemClick('newRoom')
    browserHistory.push('/new')
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Container>
          <Menu inverted>
            <Menu.Item header>Trollroom</Menu.Item>
            <Menu.Item name='Rooms' active={activeItem === 'home'} onClick={this.linkHome}></Menu.Item>
            <Menu.Item name='Add New Room' active={activeItem === 'newRoom'} onClick={this.linkNew}></Menu.Item>
          </Menu>
          {this.props.children}
        </Container>
      </div>
    )
  }
}

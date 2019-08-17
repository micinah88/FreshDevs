import React, { Component } from 'react';
import { Menu, Button, Form, Container, Header, Table } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import UserController from './controllers/UserController'

class App extends Component {

  state = {
    activeItem: 'Add User',
    users: []
  }

  componentDidMount() {
    this.getUserList()
  }

  getUserList = async () => {
    const users = await UserController.getUsers()
    this.setState({
      users
    })
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const userObj = {
      FirstName: e.target.FirstName.value,
      LastName: e.target.LastName.value
    }
    e.target.FirstName.value = ""
    e.target.LastName.value = ""
    if (this.state.activeItem === 'Update User') {
      userObj.ID = e.target.ID.value
      await UserController.updateUser(userObj)
      e.target.ID.value = ""
    }
    else
      await UserController.addUser(userObj)

    this.getUserList();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    const userTableJSX = this.state.users.map(user => {
      return (<Table.Row>
        <Table.Cell>
          <Header as='h2' textAlign='center'>
            {user.ID}
          </Header>
        </Table.Cell>
        <Table.Cell singleLine>{user.FirstName}</Table.Cell>
        <Table.Cell singleLine>{user.LastName}</Table.Cell>
      </Table.Row>)

    })

    return (
      <Container>
        <Menu tabular>
          <Menu.Item name='Add User' active={activeItem === 'Add User'} onClick={this.handleItemClick} />
          <Menu.Item name='Update User' active={activeItem === 'Update User'} onClick={this.handleItemClick} />
        </Menu>

        <Form autocomplete="off" onSubmit={this.onSubmit}>
          <Form.Field>
            <label>First Name</label>
            <input name="FirstName" placeholder='First Name' />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input name="LastName" placeholder='Last Name' />
          </Form.Field>
          {this.state.activeItem === 'Update User' ? <Form.Field>
            <label>User Id</label>
            <input type='number' name="ID" placeholder='42' />
          </Form.Field>
            : null}
          <Button type='submit'>Submit</Button>
        </Form>

        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>ID</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {userTableJSX}
          </Table.Body>
        </Table>
      </Container>
    )
  }
}

export default App;


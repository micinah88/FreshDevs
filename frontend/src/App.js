import React, { Component } from 'react';
import { Menu, Button, Form, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import UserController from './controllers/UserController'

class App extends Component {

  state = { activeItem: 'Add User' }

  onSubmit = async (e) => {
    e.preventDefault();

    const userObj = {
      FirstName: e.target.FirstName.value,
      LastName: e.target.LastName.value
    }
    let response;
    if(this.state.activeItem === 'Update User') {
      userObj.ID = e.target.ID.value
      response = await UserController.updateUser(userObj)
    }
    else
      response = await UserController.addUser(userObj)

    console.log(response)
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <Container>
        <Menu tabular>
          <Menu.Item name='Add User' active={activeItem === 'Add User'} onClick={this.handleItemClick} />
          <Menu.Item name='Update User' active={activeItem === 'Update User'} onClick={this.handleItemClick} />
        </Menu>

        <Form onSubmit={this.onSubmit}>
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
                                                    : null }
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>
    )
  }

}

export default App;
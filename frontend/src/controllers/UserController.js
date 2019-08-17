import axios from 'axios'

const UserController = {
  addUser: async (newUser) => {
      const response = await axios.post(`/api/users`, newUser)
      return response.data
  },
  updateUser: async (user) => {
      const response = await axios.put(`/api/users/${user.ID}`, user)
      return response.data
  }
}

export default UserController
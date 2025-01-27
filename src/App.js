import React, { Component } from 'react';
import './App.css';
import { fetchUsers, addUser, updateUser, deleteUser } from './services/api';

class App extends Component {
  state = {
    users: [],
    newUser: '',
    error: '',
  };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = async () => {
    try {
      const apiUsers = await fetchUsers();
      const localUsers = JSON.parse(localStorage.getItem('newUsers')) || [];
      this.setState({ users: [...apiUsers, ...localUsers] });
    } catch (error) {
      this.setState({ error: 'Failed to fetch users.' });
    }
  };

  handleInputChange = (event) => {
    this.setState({ newUser: event.target.value });
  };

  addNewUser = (event) => {
    event.preventDefault();
    const { newUser, users } = this.state;

    if (newUser.trim()) {
      const newLocalUser = {
        id: Date.now(),
        name: newUser,
        email: 'example@example.com',
      };

      const localUsers = JSON.parse(localStorage.getItem('newUsers')) || [];
      localUsers.push(newLocalUser);
      localStorage.setItem('newUsers', JSON.stringify(localUsers));

      this.setState({
        users: [...users, newLocalUser],
        newUser: '',
      });
    }
  };

  editUser = async (index) => {
    const newName = prompt('Edit user name:', this.state.users[index].name);
    if (newName) {
      const users = [...this.state.users];
      const user = users[index];

      if (user.id > 100) {
        user.name = newName;
        const localUsers = JSON.parse(localStorage.getItem('newUsers')) || [];
        const updatedLocalUsers = localUsers.map((localUser) =>
          localUser.id === user.id ? { ...localUser, name: newName } : localUser
        );
        localStorage.setItem('newUsers', JSON.stringify(updatedLocalUsers));
      } else {
        try {
          const updatedUser = await updateUser(user.id, { ...user, name: newName });
          users[index] = updatedUser;
        } catch (error) {
          console.error('Failed to update user:', error);
          this.setState({ error: 'Failed to update user.' });
        }
      }

      this.setState({ users });
    }
  };

  deleteUserById = async (id) => {
    const isLocalUser = id > 100;

    if (isLocalUser) {
      const localUsers = JSON.parse(localStorage.getItem('newUsers')) || [];
      const updatedLocalUsers = localUsers.filter((user) => user.id !== id);
      localStorage.setItem('newUsers', JSON.stringify(updatedLocalUsers));
    } else {
      try {
        await deleteUser(id);
      } catch (error) {
        this.setState({ error: 'Failed to delete user.' });
        return;
      }
    }

    this.setState((prevState) => ({
      users: prevState.users.filter((user) => user.id !== id),
    }));
  };

  render() {
    const { users, newUser, error } = this.state;

    return (
      <div className="container-main">
        <h2 className="heading">User Management</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form className="user-form" onSubmit={this.addNewUser}>
          <input
            className="user-input"
            type="text"
            placeholder="Enter user name"
            value={newUser}
            onChange={this.handleInputChange}
          />
          <button className="submit-button" type="submit">
            Add User
          </button>
        </form>
        <ul>
          {users.map((user, index) => (
            <li key={user.id}>
              <span>{user.name}</span>
              <div className="button-group">
                <button className="edit" onClick={() => this.editUser(index)}>
                  Edit
                </button>
                <button className="delete" onClick={() => this.deleteUserById(user.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;

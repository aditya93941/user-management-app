import React, { Component } from "react";
import { fetchUsers, deleteUser } from "../services/api";

class UserList extends Component {
    state = {
        users: [],
        error: "",
    };

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers = async () => {
        try {
            const users = await fetchUsers();
            this.setState({ users });
        } catch (error) {
            this.setState({ error: error.message });
            console.error("Error loading users:", error);
        }
    };

    handleDelete = async (id) => {
        try {
            await deleteUser(id);
            this.setState({ users: this.state.users.filter((user) => user.id !== id) });
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user.");
        }
    };

    render() {
        const { users, error } = this.state;
        return (
            <div>
                <h1>User Management</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button onClick={() => this.props.onAdd()}>Add User</button>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name} - {user.email}
                            <button onClick={() => this.props.onEdit(user)}>Edit</button>
                            <button onClick={() => this.handleDelete(user.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default UserList;
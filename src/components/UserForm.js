import React, { Component } from "react";
import { addUser, updateUser } from "../services/api";

class UserForm extends Component {
    state = {
        id: null,
        name: "",
        email: "",
    };

    componentDidMount() {
        if (this.props.user) {
            this.setState({ ...this.props.user });
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { id, ...data } = this.state;
        try {
            if (id) {
                await updateUser(id, data);
            } else {
                await addUser(data);
            }
            this.props.onSuccess();
        } catch (error) {
            console.error("Error saving user:", error);
            alert("Failed to save user.");
        }
    };

    render() {
        const { name, email } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    placeholder="Name"
                />
                <input
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    placeholder="Email"
                />
                <button type="submit">Save</button>
            </form>
        );
    }
}

export default UserForm;
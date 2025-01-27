const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = async () => {
    try {
        const response = await fetch(BASE_URL);
        console.log('Response for fetchUsers:', response); // Log the response for debugging
        if (!response.ok) {
            throw new Error("Failed to fetch users.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const addUser = async (user) => {
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        console.log('Response for addUser:', response); // Log the response for debugging
        if (!response.ok) {
            throw new Error("Failed to add user.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
};

export const updateUser = async (id, user) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        console.log('Response for updateUser:', response); // Log the response for debugging
        if (!response.ok) {
            throw new Error("Failed to update user.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
        console.log('Response for deleteUser:', response); // Log the response for debugging
        if (!response.ok) {
            throw new Error("Failed to delete user.");
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};

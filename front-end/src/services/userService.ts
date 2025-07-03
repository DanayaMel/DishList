import { User } from "../types/User"; // Adjust the path if needed

class UserServices {
  baseUrl: string;

  constructor() {
    this.baseUrl = "/users";
  }

  async getUsers(): Promise<User[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  }

  async getUserById(id: number): Promise<User> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user with ID: ${id}`);
    }
    return await response.json();
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return await response.json();
  }

  async updateUser(id: number, updatedData: Partial<User>): Promise<User> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user with ID: ${id}`);
    }

    return await response.json();
  }

  async deleteUser(id: number): Promise<null | { message?: string }> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete user with ID: ${id}`);
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  }
}

export default new UserServices();

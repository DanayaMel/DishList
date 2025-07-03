import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import "./App.css";
import UserList from "../UserList/UserList";
import UserForm from "../UserForm/UserForm";
import userService from "../../services/userService";
import { User } from "../../types/User";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    userService.getUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    await userService.deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleSave = async (userData: Partial<User>) => {
    if (userData.id) {
      const updated = await userService.updateUser(userData.id, userData);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    } else {
      const created = await userService.createUser(userData);
      setUsers((prev) => [...prev, created]);
    }
    setIsModalVisible(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <br />
        <h1 className="App-title">Welcome to DishList</h1>
        <Button
          className="Add-user-button"
          variant="filled"
          onClick={handleAdd}
        >
          Add User
        </Button>
      </header>

      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal
        open={isModalVisible}
        title={editingUser ? "Edit User" : "Add User"}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        <UserForm
          user={editingUser}
          onSave={handleSave}
          onCancel={() => setIsModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default App;

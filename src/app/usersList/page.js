"use client";
import { useState, useEffect } from "react";
import UsersComponent from "./UsersComponent";

const usersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const handleRoleChange = (login, newRole) => {
    const updatedUsers = users.map((user) =>
      user.login === login ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return <UsersComponent users={users} onRoleChange={handleRoleChange} />;
};

export default usersList;

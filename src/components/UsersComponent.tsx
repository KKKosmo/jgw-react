// src/components/UsersComponent.tsx

import React, { useState, useEffect } from 'react';

const UsersComponent: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users Component</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user.user_id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersComponent;

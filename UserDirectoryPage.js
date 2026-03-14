import React, { useState, useEffect } from 'react';
import Controls from './Controls';
import UserList from './UserList';

const API_URL = 'https://69a1df2e2e82ee536fa26e6f.mockapi.io/user_api';

export default function UserDirectoryPage() {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState('id');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("API Fetch Error:", error));
  }, []);

  const handleSortByIdClick = () => {
    const sortedArray = [...users].sort((a, b) => a.id - b.id);
    setUsers(sortedArray);
    setSortBy('id');
  };

  const handleSortByGroupClick = () => {
    const sortedArray = [...users].sort((a, b) => a.group.localeCompare(b.group));
    setUsers(sortedArray);
    setSortBy('group');
  };

  const handleViewToggleClick = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  const handleDeleteClick = (userId) => {
    fetch(`${API_URL}/${userId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setUsers(users.filter((user) => String(user.id) !== String(userId)));
        }
      })
      .catch((error) => console.error("API Delete Error:", error));
  };

  return (
    <div className="user-directory">
      <h1>User Directory</h1>
      <Controls 
        onSortByIdClick={handleSortByIdClick}
        onSortByGroupClick={handleSortByGroupClick}
        onViewToggleClick={handleViewToggleClick}
        onDeleteClick={handleDeleteClick}
      />
      <UserList users={users} viewMode={viewMode} />
    </div>
  );
}

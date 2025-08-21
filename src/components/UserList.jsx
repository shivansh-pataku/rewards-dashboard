import { useState } from 'react';

function UserList({ users, selectedUser, setSelectedUser, addUser }) {
  const [newUserName, setNewUserName] = useState('');

  const handleAddUser = () => {
    if (newUserName.trim()) {
      addUser(newUserName);
      setNewUserName('');
    }
  };

  return (
    <div className="user-list">
      <h2>Select User</h2>
      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
        <option value="">Select a user</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
      <div className="add-user">
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
          placeholder="Enter new user name"
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
}

export default UserList;
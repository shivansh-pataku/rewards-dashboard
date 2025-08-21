import { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import ClaimHistory from './components/ClaimHistory.jsx';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [message, setMessage] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [history, setHistory] = useState([]);

  // Fetch users
  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch leaderboard
  useEffect(() => {
    axios.get('http://localhost:5000/api/leaderboard')
      .then((res) => setLeaderboard(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch claim history
  useEffect(() => {
    axios.get('http://localhost:5000/api/history')
      .then((res) => setHistory(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Add new user
  const addUser = async (name) => {
    try {
      const res = await axios.post('http://localhost:5000/api/users', { name });
      setUsers([...users, res.data]);
      setMessage(`User ${name} added successfully!`);
    } catch (err) {
      setMessage('Error adding user');
    }
  };

  // Claim points
  const claimPoints = async () => {
    if (!selectedUser) {
      setMessage('Please select a user');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/claim', { userId: selectedUser });
      setMessage(`${res.data.user.name} claimed ${res.data.points} points!`);
      // Refresh leaderboard and history
      const leaderboardRes = await axios.get('http://localhost:5000/api/leaderboard');
      setLeaderboard(leaderboardRes.data);
      const historyRes = await axios.get('http://localhost:5000/api/history');
      setHistory(historyRes.data);
    } catch (err) {
      setMessage('Error claiming points');
    }
  };

  return (
  <div className="home">
    <div className="app">
      <h1>Rewards Dashboard</h1>
      <UserList
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        addUser={addUser}
      />
      <button onClick={claimPoints}>Claim Points</button>
      <p>{message}</p>
      <Leaderboard leaderboard={leaderboard} />
      <ClaimHistory history={history} />
    </div>
 </div>
  );
}

export default App;
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new user
router.post('/users', async (req, res) => {
  try {
    const { name } = req.body;
    const user = new User({ name });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Claim points for a user
router.post('/claim', async (req, res) => {
  try {
    const { userId } = req.body;
    const points = Math.floor(Math.random() * 10) + 1; // Random points 1-10

    // Update user's total points
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.totalPoints += points;
    await user.save();

    // Save claim history
    const claim = new ClaimHistory({ userId, points });
    await claim.save();

    res.json({ user, points });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get leaderboard (sorted by totalPoints)
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      totalPoints: user.totalPoints,
    }));
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get claim history
router.get('/history', async (req, res) => {
  try {
    const history = await ClaimHistory.find().populate('userId', 'name');
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
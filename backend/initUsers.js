const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  const users = [
    { name: 'Rahul' },
    { name: 'Kamal' },
    { name: 'Sanak' },
    { name: 'Priya' },
    { name: 'Amit' },
    { name: 'Neha' },
    { name: 'Vikram' },
    { name: 'Sneha' },
    { name: 'Ravi' },
    { name: 'Anjali' },
  ];

  await User.deleteMany({});
  await User.insertMany(users);
  console.log('Users initialized');
  mongoose.connection.close();
});
// // entry.js
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const userRoutes = require('./routes/userRoutes');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());  // To parse incoming JSON requests

// // Routes
// app.get('/', (req, res) => {
//   res.send('Welcome to the FreeLance Hub API!');
// });

// app.use('/auth', userRoutes); // Your user-related routes

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log('Connected to MongoDB'))
// .catch(err => console.error('MongoDB connection error:', err));

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log('Server is running on port ${PORT}');
// });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
//const recruiterRoutes = require('./routes/recruiterRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the FreeLance Hub API!');
});

app.use('/auth', userRoutes);
//app.use('/recruiter', recruiterRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

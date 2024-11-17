// const Recruiter = require('../models/recruiterModel');
// const bcrypt = require('bcrypt');

// // Create a new recruiter during signup
// const signupRecruiter = async (req, res) => {
//   const { username, email, password, phoneNumber } = req.body;

//   // Validate required fields
//   if (!username || !email || !password || !phoneNumber) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     // Check if email already exists
//     const existingRecruiter = await Recruiter.findOne({ email });
//     if (existingRecruiter) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new recruiter
//     const recruiter = new Recruiter({
//       username,
//       email,
//       password: hashedPassword,
//       phoneNumber,
//     });

//     // Save the recruiter to the database
//     await recruiter.save();

//     res.status(201).json({
//       message: 'Recruiter created successfully',
//       recruiter: {
//         username: recruiter.username,
//         email: recruiter.email,
//         phoneNumber: recruiter.phoneNumber,
//         _id: recruiter._id,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating recruiter: ' + err.message });
//   }
// };

// // Export the controller functions
// module.exports = { signupRecruiter };

const Recruiter = require('../models/recruiterModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupRecruiter = async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;

  if (!username || !email || !password || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingRecruiter = await Recruiter.findOne({ email });
    //couldn't find Recruiter
    if (existingRecruiter) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const recruiter = new Recruiter({ username, email, password: hashedPassword, phoneNumber });

    await recruiter.save();
    res.status(201).json({
      message: 'Recruiter created successfully',
      recruiter: { username: recruiter.username, email: recruiter.email, phoneNumber: recruiter.phoneNumber, _id: recruiter._id },
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating recruiter: ' + err.message });
  }
};


// Authenticate a user during sign-in
const signinRecruiter = async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('Sign-in successful:', { token, user }); // Log response

    res.status(200).json({
      message: 'Sign-in successful',
      token,
      user: {
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        skills: user.skills,
        _id: user._id,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Error signing in: ' + err.message });
  }
};

// Export the controller functions
module.exports = { signupRecruiter, signinRecruiter };

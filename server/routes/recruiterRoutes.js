const express = require('express');
const { signupRecruiter, signinRecruiter } = require('../controllers/recruiterController');
const router = express.Router();

//const {signupRecruiter} = require('../controllers/recruiterController');
router.post('/signup', signupRecruiter);
router.post('/signin', signinRecruiter);

module.exports = router;


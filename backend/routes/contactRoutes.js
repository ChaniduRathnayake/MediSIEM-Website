const express = require('express');
const { body } = require('express-validator');
const { submitContact } = require('../controllers/contactController');
const contactRateLimiter = require('../middleware/contactRateLimiter');

const router = express.Router();

const contactValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('A valid email is required'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
];

router.post('/', contactRateLimiter, contactValidationRules, submitContact);

module.exports = router;

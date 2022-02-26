import validator from 'express-validator';

export const registerValidations = [
  validator
      .body('email', 'Input e-mail')
      .isEmail()
      .withMessage('Email is invalid'),
  validator
      .body('password', 'Input password')
      .isLength({ min: 6 }),
];
import validator from 'express-validator';

export const notesValidations = [
  validator
      .body('name', 'Input name')
      .isString()
      .isLength({ max: 20 })
      .withMessage('Name is invalid'),
];
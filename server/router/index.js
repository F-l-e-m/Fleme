import { Router } from 'express';
import userController from '../controllers/user.js';
import noteController from'../controllers/note.js';
const router = new Router();
import { body } from'express-validator';
import authMiddleware from'../middleware/auth-middleware.js';
import { registerValidations } from "../validations/register.js";
import { notesValidations } from "../validations/notes.js";

router.post('/registration',
    ...registerValidations,
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);

router.get('/notes/all', authMiddleware, ...notesValidations, noteController.index);
router.get('/notes/:id', authMiddleware, noteController.show);
router.post('/notes/create', authMiddleware, noteController.create);
router.delete('/notes/delete/:id', authMiddleware, noteController.delete);

export default router;
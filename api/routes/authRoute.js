import express from 'express';
import { loginController, registerController } from '../controllers/authController.js';

// Route object
const router = express.Router();

// rotas
// Registrar um usuário || POST
router.post('/register', registerController);

// Login do usuário || POST
router.post('/login', loginController);

// Exporta o objeto router
export default router;

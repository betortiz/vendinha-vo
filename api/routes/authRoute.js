import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { loginController, registerController, testControler } from '../controllers/authController.js';

// Route object
const router = express.Router();

// rotas
// Registrar um usuário || POST
router.post('/register', registerController);

// Login do usuário || POST
router.post('/login', loginController);

// Teste de rota protegida || GET
router.get('/test', requireSignIn, testControler);

// Rota protegida auth || GET
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true})
});


// Exporta o objeto router
export default router;

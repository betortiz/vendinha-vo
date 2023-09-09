import express from 'express';
import { requireSignIn } from './../middlewares/authMiddleware.js';
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  updateProductController,
} from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

// routes
// cadastrar produto
router.post(
  '/create-product',
  requireSignIn,
  formidable(),
  createProductController
);

// Listar produtos
router.get('/get-product', requireSignIn, getProductController);

// Buscar um produto
router.get('/get-product/:slug', requireSignIn, getSingleProductController);

// Deletar produto
router.delete('/delete-product/:slug', requireSignIn, deleteProductController);

// Atualizar produto
router.put(
  '/update-product/:slug',
  requireSignIn,
  formidable(),
  updateProductController
);

export default router;

import express from 'express';
import { requireSignIn } from './../middlewares/authMiddleware.js';
import {
  countProductController,
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productListController,
  searchProductController,
  updateProductController,
  listAllProductsController,
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

router.get('/get-all-product', requireSignIn, listAllProductsController);

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

// Contar produtos
router.get('/product-count', requireSignIn, countProductController);

// Produtos por página
router.get('/product-list/:page', requireSignIn, productListController);

// Buscar um produto
router.get('/search/:keyword', requireSignIn, searchProductController);

export default router;

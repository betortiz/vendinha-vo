import productModel from '../models/productModel.js';
import slugify from 'slugify';

// Criar produto
export const createProductController = async (req, res) => {
  try {
    // Dados do produto
    const { name, price, description, quantity, slug } = req.fields;

    // Validação
    switch (true) {
      case !name:
        return res.status(500).send({ error: 'Nome é obrigatório' });
      case !price:
        return res.status(500).send({ error: 'Preço é obrigatório' });
      case !description:
        return res.status(500).send({ error: 'Descrição é obrigatório' });
      case !quantity:
        return res.status(500).send({ error: 'Quantidade é obrigatório' });
    }

    // Criar produto
    const products = new productModel({ ...req.fields, slug: slugify(name) });
    // Salvar produto
    await products.save();

    res.status(201).send({
      success: true,
      message: 'Produto criado com sucesso',
      products,
    });
  } catch (error) {
    res.status(500).send({
      succcess: false,
      message: 'Erro ao criar produto',
      error: error.message,
    });
  }
};

// Listar produtos
export const getProductController = async (req, res) => {
  try {
    // Listar produtos
    const products = await productModel
      .find({})
      .limit(10)
      .sort({ createdAt: -1 });
    // Resposta
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: 'Produtos listados com sucesso',
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succcess: false,
      message: 'Erro ao listar produtos',
      error: error.message,
    });
  }
};

// Buscar um produto
export const getSingleProductController = async (req, res) => {
  try {
    // Buscar produto
    const product = await productModel.findOne({ slug: req.params.slug });
    // Resposta
    res.status(200).send({
      success: true,
      message: 'Produto encontrado com sucesso',
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succcess: false,
      message: 'Erro ao buscar produto',
      error: error.message,
    });
  }
};

// Deletar produto
export const deleteProductController = async (req, res) => {
  try {
    // Deletar produto
    const product = await productModel.findOneAndDelete({
      slug: req.params.slug,
    });
    // Resposta
    res.status(200).send({
      success: true,
      message: 'Produto deletado com sucesso',
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succcess: false,
      message: 'Erro ao deletar produto',
      error: error.message,
    });
  }
};

// Atualizar produto
export const updateProductController = async (req, res) => {
  try {
    // Atualizar produto
    const product = await productModel.findOneAndUpdate(
      { slug: req.params.slug },
      req.fields,
      { new: true }
    );
    // Resposta
    res.status(200).send({
      success: true,
      message: 'Produto atualizado com sucesso',
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succcess: false,
      message: 'Erro ao atualizar produto',
      error: error.message,
    });
  }
};

// Contar produtos
export const countProductController = async (req, res) => {
  try {
    // Contar produtos
    const total = await productModel.find({}).estimatedDocumentCount();
    // Resposta
    res.status(200).send({
      success: true,
      message: 'Total de produtos',
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succcess: false,
      message: 'Erro ao contar produtos',
      error: error.message,
    });
  }
};

// Produtos por página
export const productListController = async (req, res) => {
  try {
    // Produtos por página
    const limit = 5;
    const page = req.params.page ? req.params.page : 1;
    // Listar produtos
    const products = await productModel
      .find({}) // Listar todos os produtos
      .skip((page - 1) * limit) // Pular produtos
      .limit(limit) // Produtos por página
      .sort() // Ordenar por data de criação { createdAt: -1 } se for o caso
      .exec(); // Executar

    const totalProducts = await productModel.find({}).estimatedDocumentCount();

    // Resposta
    res.status(200).send({
      success: true,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      message: 'Produtos listados com sucesso',
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      succcess: false,
      message: 'Erro ao listar produtos',
      error: error.message,
    });
  }
};

// Buscar um produto
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    // Buscar produto
    const results = await productModel.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ],
    });

    // Resposta
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succcess: false,
      message: 'Erro ao buscar produto',
      error,
    });
  }
};

// Listar todos os produtos
export const listAllProductsController = async (req, res) => {
  try {
    const products = await productModel.find({}).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: 'Produtos listados com sucesso',
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

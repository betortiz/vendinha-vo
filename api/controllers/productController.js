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
        return res.status(500).send({error: 'Nome é obrigatório'});
      case !price:
        return res.status(500).send({error: 'Preço é obrigatório'});
      case !description:
        return res.status(500).send({error: 'Descrição é obrigatório'});
      case !quantity:
        return res.status(500).send({error: 'Quantidade é obrigatório'});      
    }

    // Criar produto
    const products = new productModel({...req.fields, slug: slugify(name)});
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
    const products = await productModel.find({}).limit(10).sort({ createdAt: -1 });
    // Resposta
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: 'Produtos listados com sucesso',
      products,
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      succcess: false,
      message: 'Erro ao listar produtos',
      error: error.message,
    });
  }
}

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
    console.log(error)
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
    const product = await productModel.findOneAndDelete({ slug: req.params.slug });
    // Resposta
    res.status(200).send({
      success: true,
      message: 'Produto deletado com sucesso',
      product,
    });
  } catch (error) {
    console.log(error)
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
    console.log(error)
    res.status(500).send({
      succcess: false,
      message: 'Erro ao atualizar produto',
      error: error.message,
    });
  }
};
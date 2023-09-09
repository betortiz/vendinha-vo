import productModel from '../models/productModel.js';
import slugify from 'slugify';

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

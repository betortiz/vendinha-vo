import userModel from '../models/userModel.js';
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import jwt from 'jsonwebtoken';

// Função para registrar um usuário
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se o usuário já existe
    if (!name) {
      return res.send({ message: 'Nome é obrigatório' });
    }
    if (!email) {
      return res.send({ message: 'Email é obrigatório' });
    }
    if (!password) {
      return res.send({ message: 'Senha é obrigatório' });
    }

    // Verifica se existe um usuário com o mesmo email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: 'Usuário já existe',
      });
    }

    // Cria o usuário
    const hashedPassword = await hashPassword(password);
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    // Retorna o usuário criado
    res.status(201).send({
      success: true,
      message: 'Usuário criado com sucesso',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Erro ao registrar usuário',
      error: error.message,
    });
  }
};

// Função para logar um usuário
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verifica se email e password foram informados
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: 'Email e senha são inválidos'
      });
    }

    // Verifica se o usuário existe
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Email não registrado.'
      });
    }

    // Verifica a senha do usuário
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: 'Senha inválida.'
      });
    }

    // Cria o token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1d'
    });

    // Retorna o usuário e o token
    res.status(200).send({
      success: true,
      message: 'Usuário logado com sucesso',
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Erro ao logar usuário',
      error
    });
  }
};

// Teste de rota protegida
export const testControler = async (req, res) => {
  res.send({ message: 'Rota protegida' });
};
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './style.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função para redirecionar o usuário para a página de login
  const navigate = useNavigate();

  // Função para enviar os dados do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', {
        name,
        email,
        password,
      });

      if (res.data && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Algo deu errado');
    }
  };

  return (
    <Layout title='Vendinha da Vó | Register'>
      <div className='form-container'>
        <Form onSubmit={handleSubmit}>
          <h3 className='title'>Registro</h3>
          <Form.Group className='mb-2'>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type='text'
              placeholder='Digite seu nome'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Digite seu email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type='password'
              placeholder='Digite sua senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            variant='primary'
            type='submit'
            className='text-center mt-2 mb-2'
          >
            Submit
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default Register;

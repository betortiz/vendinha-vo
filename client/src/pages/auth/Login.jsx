import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Layout from '../../components/Layout/Layout';
import './style.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Função para enviar os dados do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <Layout>
      <Form className='form-stl' onSubmit={handleSubmit}>
        <div className='topo'>
          <h3>Login</h3>
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
        </div>
      </Form>
    </Layout>
  );
};

export default Login;

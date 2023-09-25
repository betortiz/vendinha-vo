import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import Menu from '../../components/Layout/Menu';
import toast from 'react-hot-toast';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import './../../assets/css/products.css';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [products, setProducts] = useState([]);

  // Função para criar um produto
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('quantity', quantity);

      const { data } = await axios.post(
        '/api/product/create-product',
        productData
      );
      if (data.success) {
        toast.success(data.message);
        clearForm();
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  // Apagar formulário
  const clearForm = () => {
    setName('');
    setDescription('');
    setPrice('');
    setQuantity('');
  };

  return (
    <Layout title={'Vendinha da Vó | Produto'}>
      <div
        className='container-fluid p-3 m-3'
        style={{ textTransform: 'uppercase' }}
      >
        <div className='dash row'>
          <div className='col-md-3'>
            <Menu />
          </div>
          <div className='col-md-9'>
            <div className='w-75'>
              <h4 className='text-center'>Cadastrar produto</h4>
              <div className='m-3'>
                <Form>
                  <Form.Group className='mb-3'>
                    <Form.Label>Produto</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Produto'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Descrição'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Preço</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Preço'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder='Quantidade'
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </Form.Group>
                </Form>
                <div className='mb-3'>
                  <button
                    className='btn btn-primary w-100'
                    onClick={handleCreate}
                  >
                    Cadastrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

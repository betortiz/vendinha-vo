import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import Menu from '../../components/Layout/Menu';
import toast from 'react-hot-toast';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const navigate = useNavigate();
  const params = useParams();

  // Buscar o produto pelo slug
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/api/product/get-product/${params.slug}`);
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
    // eslint-disable-next-line
  }, []);

  // Atualizar produto
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData()
      productData.append('name', name)
      productData.append('description', description)
      productData.append('price', price)
      productData.append('quantity', quantity)
      const { data } = await axios.put(`/api/product/update-product/${params.slug}`, productData);
      if (data?.success) {
        toast.success('Produto atualizado com sucesso');
        navigate('/dashboard/list-product');
      } else {
        toast.error('Erro ao atualizar o produto');
      }
    } catch (error) {
      console.log(error);
      toast.error('Erro ao atualizar o produto');
    }
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
              <h4 className='text-center'>Atualizar produto</h4>
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
                    onClick={handleUpdate}
                  >
                    Atualizar
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

export default UpdateForm;

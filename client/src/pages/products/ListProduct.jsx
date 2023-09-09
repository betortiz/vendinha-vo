import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import Menu from '../../components/Layout/Menu';
import toast from 'react-hot-toast';
import Table from 'react-bootstrap/Table';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import axios from 'axios';

const ListProduct = () => {
  const [products, setProducts] = useState([]);

  // Listar todos os produtos cadastrados
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get('/api/product/get-product');
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error('Erro ao listar os produtos');
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const formatPrice = (price) => {
    return price.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <Layout title={'Vendinha da Vó | Produto'}>
      <div className='container-fluid p-3 m-3'>
        <div className='row'>
          <div className='col-md-3'>
            <Menu />
          </div>
          <div className='col-md-9'>
            <div className='text-center w-75'>
              <h3>Lista de Produtos</h3>
              <div>
                <Table striped bordered hover variant='dark'>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Preço</th>
                      <th>Quantidade</th>
                      <th colSpan={2}>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((product, index) => (
                      <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{formatPrice(product.price)}</td>
                        <td>{product.quantity}</td>
                        <td>
                          <button className='btn btn-primary'>
                            <AiOutlineEdit />
                          </button>
                        </td>
                        <td>
                          <button className='btn btn-danger'>
                            <MdDeleteOutline />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListProduct;

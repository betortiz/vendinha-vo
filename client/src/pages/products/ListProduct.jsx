import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import Menu from '../../components/Layout/Menu';
import toast from 'react-hot-toast';
import Table from 'react-bootstrap/Table';
import { MdDeleteOutline } from 'react-icons/md';
import axios from 'axios';
import { AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

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
          <div className='col-md-9' style={{ textTransform: 'uppercase' }}>
            <div className='text-center w-75'>
              <h4>Lista de Produtos</h4>
              <div>
                <Table striped bordered hover variant='light'>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Produto</th>
                      <th>Descrição</th>
                      <th>Preço</th>
                      <th>Qtd</th>
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
                          <Link
                            to={`/dashboard/update-product/${product.slug}`}
                            className='btn btn-primary'
                          >
                            <AiOutlineEdit />
                          </Link>
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

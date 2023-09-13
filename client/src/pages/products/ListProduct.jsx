import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import Menu from '../../components/Layout/Menu';
import toast from 'react-hot-toast';
import Table from 'react-bootstrap/Table';
import { MdDeleteOutline } from 'react-icons/md';
import axios from 'axios';
import UpdateModal from '../../components/Layout/UpdateModal';
import Paginate from '../../components/Layout/Paginate';
import Button from 'react-bootstrap/Button';

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  console.log(page);

  useEffect(() => {
    getAllProducts();
    getTotal();
    // eslint-disable-next-line
  }, []);

  // Listar todos os produtos cadastrados
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error('Erro ao listar os produtos');
    }
  };

  // Contar o total de produtos cadastrados
  const getTotal = async () => {
    try {
      const { data } = await axios.get('/api/product/product-count');
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Carregar mais produtos
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Deletar um produto
  const handleDelete = async (slug) => {
    let answer = window.confirm('Deseja deletar o produto?');
    if (!answer) return;
    try {
      const { data } = await axios.delete(
        `/api/product/delete-product/${slug}`
      );
      if (data?.success) {
        toast.success('Produto deletado com sucesso');
        getAllProducts();
      } else {
        toast.error('Erro ao deletar o produto');
      }
    } catch (error) {
      console.log(error);
      toast.error('Erro ao deletar o produto');
    }
  };

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
                          <div className='btn btn-primary'>
                            <UpdateModal
                              slug={product.slug}
                              onClose={() => {
                                getAllProducts();
                              }}
                            />
                          </div>
                        </td>
                        <td>
                          <button
                            className='btn btn-danger'
                            onClick={() => handleDelete(product.slug)}
                          >
                            <MdDeleteOutline />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
            <div className='m-2 p-3'>
              {products && products.length < total && (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  Carregar mais
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListProduct;

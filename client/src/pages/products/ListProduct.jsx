import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import Menu from '../../components/Layout/Menu';
import toast from 'react-hot-toast';
import Table from 'react-bootstrap/Table';
import { MdDeleteOutline } from 'react-icons/md';
import axios from 'axios';
import UpdateModal from '../../components/Layout/UpdateModal';
import Pagination from 'react-bootstrap/Pagination';
import PageItem from 'react-bootstrap/PageItem';

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const maxButtons = 5; // Número máximo de botões na paginação

  useEffect(() => {
    getAllProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    getAllProducts(page);
  };

  // Listar todos os produtos cadastrados
  const getAllProducts = async (page) => {
    try {
      const { data } = await axios.get(`/api/product/product-list/${page}`);
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.log(error);
      toast.error('Erro ao listar os produtos');
    }
  };

  const renderPageItems = () => {
    const pageItems = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    for (let page = startPage; page <= endPage; page++) {
      pageItems.push(
        <PageItem
          key={page}
          active={page == currentPage}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </PageItem>
      );
    }

    return pageItems;
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
    // <Layout title={'Vendinha da Vó | Produto'}>
      <div className='container-fluid m-3' style={{ minHeight: '71vh' }}>
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
            <div>
              <Pagination>
                <Pagination.First
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === '1'}
                />
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === '1'}
                />
                {renderPageItems()}
                <Pagination.Ellipsis />
                <Pagination.Item
                  onClick={() => handlePageChange(10)}
                  disabled={currentPage === '10'}
                >
                  {10}
                </Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item
                  onClick={() => handlePageChange(20)}
                  disabled={currentPage === '20'}
                >
                  {20}
                </Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Last
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    // </Layout>
  );
};

export default ListProduct;

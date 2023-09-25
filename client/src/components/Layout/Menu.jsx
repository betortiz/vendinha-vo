import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import toast from 'react-hot-toast';
import axios from 'axios';

const Menu = ({ products }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getTotal();
  }, [products]);

  // Contar o total de produtos cadastrados
  const getTotal = async () => {
    try {
      if (products.results.length > 0) {
        setTotal(products.results.length);
        return;
      } else {
        const { data } = await axios.get('/api/product/get-all-product');
      setTotal(data.products.length);
      }
    } catch (error) {
      console.log(error);
      toast.error('Erro ao contar o total de produtos');
    }
  };

  return (
    <>
      <div className='text-center' style={{ textTransform: 'uppercase' }}>
        <h4>Painel de controle</h4>
        <ListGroup defaultActiveKey='/dashboard'>
          <ListGroup.Item
            action
            href='/dashboard/create-product'
            variant='light'
          >
            Cadastrar produto
          </ListGroup.Item>
          <ListGroup.Item action href='/dashboard/search' variant='light'>
            Listar produtos
          </ListGroup.Item>
          <ListGroup.Item variant='light'>
            Total de produtos: <strong>{total}</strong>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  );
};

export default Menu;

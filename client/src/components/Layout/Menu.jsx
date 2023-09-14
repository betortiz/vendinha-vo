import React, {useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import toast from 'react-hot-toast';

const Menu = () => {
  const [total, setTotal] = useState(0);

  // Contar o total de produtos cadastrados
  const getTotal = async () => {
    try {
      const { data } = await axios.get('/api/product/product-count');
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
      toast.error('Erro ao contar o total de produtos');
    }
  };

  useEffect(() => {
    getTotal();
  }, []);
  
  return (
    <>
      <div className='text-center' style={{textTransform: "uppercase"}}>
        <h4>Painel de controle</h4>
          <ListGroup defaultActiveKey='/dashboard'>
            <ListGroup.Item
              action
              href='/dashboard/create-product'
              variant='light'
            >
              Cadastrar produto
            </ListGroup.Item>
            <ListGroup.Item
              action
              href='/dashboard/list-product'
              variant='light'
            >
              Listar produtos
            </ListGroup.Item>
            <ListGroup.Item
              variant='light'
            >
              Total de produtos: <strong>{total}</strong>
            </ListGroup.Item>
          </ListGroup>
      </div>
    </>
  );
};

export default Menu;

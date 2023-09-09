import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const Menu = () => {
  return (
    <>
      <div className='text-center'>
        <h4>Painel de controle</h4>
          <ListGroup defaultActiveKey='/dashboard'>
            <ListGroup.Item
              action
              href='/dashboard/create-product'
              variant='dark'
            >
              Cadastrar produto
            </ListGroup.Item>
            <ListGroup.Item
              action
              href='/dashboard/list-product'
              variant='dark'
            >
              Listar produtos
            </ListGroup.Item>
          </ListGroup>
      </div>
    </>
  );
};

export default Menu;

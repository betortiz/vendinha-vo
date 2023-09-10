import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const Menu = () => {
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
          </ListGroup>
      </div>
    </>
  );
};

export default Menu;

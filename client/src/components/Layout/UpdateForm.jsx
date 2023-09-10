import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineEdit } from 'react-icons/ai';
import './styles.css'

const UpdateForm = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button variant='primary' onClick={handleShow}><AiOutlineEdit /></Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Atualizar produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='produto'
                autoFocus
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='Descrição'
                autoFocus
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='number'
                placeholder='Preço'
                autoFocus
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='number'
                placeholder='Quantidade'
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{background: '#323539'}}>
          <Button variant='secondary' onClick={handleClose}>
            Fechar
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Savar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateForm;

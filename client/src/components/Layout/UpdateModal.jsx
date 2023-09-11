import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UpdateModal = ({slug}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  // Buscar o produto pelo slug
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/product/get-product/${slug}`
      );
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
  const handleUpdate = async () => {
    try {
      const productData = new FormData();
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('quantity', quantity);
      const { data } = await axios.put(
        `/api/product/update-product/${slug}`,
        productData
      );
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

  function handleClick(e) {
    handleClose();
    handleUpdate();
    window.location.reload();
  }
  
  return (
    <div>
      <div onClick={handleShow}>
        <AiOutlineEdit />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Atualizar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Produto</Form.Label>
              <Form.Control
                type='text'
                placeholder='Produto'
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
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
                type='text'
                placeholder='Preço'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type='text'
                placeholder='Qauntidade'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Sair
          </Button>
          <Button variant='primary' onClick={handleClick}>
            Atualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateModal;

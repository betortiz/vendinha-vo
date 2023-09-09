import React, { useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Spiner from 'react-bootstrap/Spinner';

const Spinner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 && navigate('/login', {
      state: location.pathname,
    });
    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <div
      className='d-flex flex-column justify-content-center align-items-center'
      style={{ height: '100vh' }}
    >
      <h1 className='test-center me-3'>Você será redirecionado em {count} segundos</h1>
      <Spiner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spiner>
    </div>
  );
};

export default Spinner;

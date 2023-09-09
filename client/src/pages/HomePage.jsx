import React from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import foto from './../assets/image/vendinha.jpeg';
import './homePage.css';

const HomePage = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout>
      <div className='form-container'>
        <h1>Vendinha da Vó</h1>
        <div>
          <img src={foto} alt='vendinha' className='card'/>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

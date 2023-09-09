import React from 'react';
import Layout from '../../components/Layout/Layout';
import Menu from '../../components/Layout/Menu';
import { useAuth } from '../../context/auth';
import './dashboard.css';

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={'Vendinha da Vó | Dashboard'}>
      <div className='container-fluid p-3 m-3'>
        <div className='row'>
          <div className='col-md-3'>
            <Menu />
          </div>
          <div className='col-md-9'>
            <div className='card w-75 p-3'>
              <h3>Nome: {auth?.user?.name}</h3>
              <h3>Email: {auth?.user?.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

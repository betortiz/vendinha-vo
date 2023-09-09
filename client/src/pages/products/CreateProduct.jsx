import React from 'react';
import Layout from '../../components/Layout/Layout';
import Menu from '../../components/Layout/Menu';

const CreateProduct = () => {
  return (
    <Layout title={'Vendinha da Vó | Produto'}>
      <div className='container-fluid p-3 m-3'>
        <div className='row'>
          <div className='col-md-3'>
            <Menu />
          </div>
          <div className='col-md-9'>
            <div className='text-center w-75'>
              <h3>Cadastrar produto</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;

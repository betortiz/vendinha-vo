import React from 'react';
import Layout from './../../components/Layout/Layout';
import { useSearch } from '../../context/search';
import ListProduct from './ListProduct';

const Search = () => {
  const [values, setValues] = useSearch();

  return (
    <Layout title={'Search Product'}>
      <div className='container'>
        <div className='text-center'>
          <h1>Search product</h1>
          <h6>
            {values?.results.length < 1
              ? (<ListProduct />)
              : (`${values?.results.length} products found`)}
          </h6>
        </div>
      </div>
    </Layout>
  );
};

export default Search;

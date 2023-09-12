import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const Paginate = ({ page }) => {

  let active = page;
  let items = [];

  return (
    <div>
      <Pagination>
        <Pagination.First />
        <Pagination.Prev/>
        <Pagination.Item key={page} active={page === active} >{page}</Pagination.Item>        
        {items.map((number) => (
          <Pagination.Item key={number} active={number === active}>
            {number}
          </Pagination.Item>
        ))}
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </div>
  );
};

export default Paginate;

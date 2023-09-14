// Criar um contexto para buscar a lista produtos da API
import React, { createContext, useState, useEffect, useContext  } from 'react';
import axios from 'axios';

export const ListProductContext = createContext();

const ListProductContextProvider = (children) => {
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/products')
      .then((response) => setListProduct(response.data));
  }, []);

  return (
    <ListProductContext.Provider value={{ listProduct }}>
      {children}
    </ListProductContext.Provider>
  );
};

export const useListProduct = () => useContext(ListProductContext);

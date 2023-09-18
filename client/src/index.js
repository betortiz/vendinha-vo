import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/auth';
import { Toaster } from 'react-hot-toast';
import { SearchProvider } from './context/search';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <SearchProvider>
        <Toaster position='top-center' reverseOrder={true} />
        <App />
      </SearchProvider>
    </AuthProvider>
  </BrowserRouter>
);

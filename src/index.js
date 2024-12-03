import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes } from 'react-router-dom';
import AuthProvider from './Context/AuthContext';
import GenerateRoutes from '../src/Utils/GenerateRoutes';
import { ToastProvider } from './Context/ToastContext';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <AuthProvider >
      <ToastProvider>
        <Routes>
          {GenerateRoutes()}
        </Routes>
      </ToastProvider>
    </AuthProvider>
  </BrowserRouter>
);
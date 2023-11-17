import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import Home from './pages/home'
import Login from './pages/cliente/loginCliente';
import Cadastro from './pages/cliente/cadastroCliente';
import Compra from './pages/telaCompra';
import Admin from './pages/admin/loginAdmin';
import Cadastrar from './pages/admin/cadastrarAdmin';
import Config from './pages/admin/configAdmin';
import Controle from './pages/admin/controleCliente';
import Perfiladmin from './pages/admin/perfilAdmin';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/loginCliente' element = {<Login/>} />
        <Route path='/cadastroCliente' element = {<Cadastro/>} />
        <Route path='/telaCompra' element = {<Compra/>} />
        <Route path='/loginAdmin' element = {<Admin/>} />
        <Route path='/cadastrarAdmin' element = {<Cadastrar/>} />
        <Route path='/configAdmin' element = {<Config/>} />
        <Route path='/alterar/:idparams' element = {<Config/>} />
        <Route path='/controleCliente' element = {<Controle/>} />
        <Route path='/perfilAdmin' element = {<Perfiladmin/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);



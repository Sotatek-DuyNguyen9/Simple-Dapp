import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/01.layout';
import Routes from './routers/Routes';
import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core'

function getLibrary(provider:any) {
  const web3 = new Web3(provider);

  return web3;
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <Layout>
          <Routes />
        </Layout>
      </BrowserRouter>
    </Web3ReactProvider>
  );
}

export default App;

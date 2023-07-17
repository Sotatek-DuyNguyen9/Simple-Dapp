import React from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/01.layout';
import Routes from './routers/Routes';
import Web3 from 'web3';
import Moralis from 'moralis';
import { Web3ReactProvider } from '@web3-react/core'

function getLibrary(provider:any) {
  const web3 = new Web3(provider);

  return web3;
}

function startMoralis() {
  Moralis.start({
    apiKey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImM5MjJmNTJhLTVlNWUtNGYyOC1iNTk4LWYxZTgwYThlYjhmMSIsIm9yZ0lkIjoiMzQ4NTY0IiwidXNlcklkIjoiMzU4Mjc4IiwidHlwZUlkIjoiNDcyZjc1NjItODM2Yi00NjZiLWEyMDEtZWJhZGU3OGU4MzRmIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODk1NTg1NTgsImV4cCI6NDg0NTMxODU1OH0.3Ca5z2U_-GEDGr9v2R7TdgCm27p2vYQUpKFnoSa7epM",
  });
}

function App() {
  startMoralis();

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

import React from 'react';
import logo from './logo.svg';
import "./App.css";
import Navbar from './components/Navbar';
import Header from './components/Header';
import Transactions from './components/Transactions';
import Web3 from "web3";

function App() {

  return (
    <div className="">
        <Navbar />
        <Header />
        <Transactions />
    </div>
  );
}

export default App;

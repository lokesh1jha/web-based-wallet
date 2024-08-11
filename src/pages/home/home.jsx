import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleCreateWalletClick = () => {
    navigate('/create-wallet');
  };

  return (
    <div className="home-container">
      <div className="content">
        <h1 className="title">Welcome to Sniff 🐕 Web Wallet</h1>

        <button className="create-wallet-button" onClick={handleCreateWalletClick}>
          Create a Wallet
        </button>
      </div>
    </div>
  );
}

export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleCreateWalletClick = () => {
    navigate('/create-wallet'); // Replace '/create-wallet' with the actual route you want to navigate to
  };

  return (
    <div className="home-container">
      <div className="content">
        <h1 className="title">Welcome to Simple Web Wallet</h1>

        <button className="create-wallet-button" onClick={handleCreateWalletClick}>
          Create a Wallet
        </button>
      </div>
    </div>
  );
}

export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from './image-1.webp'; // Adjust the path based on your directory structure

function Home() {
  const navigate = useNavigate();

  const handleCreateWalletClick = () => {
    navigate('/create-wallet');
  };

  return (
    <div className="home-container">
      <div className="content">
        <h1 className="title">Welcome to Sniff 🐕 Web Wallet</h1>
        <div>
          <img src={image1} alt="Wallet" className="home-image" /> {/* Use the imported image */}
        </div>
        <div style={{ marginTop: '20px' }}>
          <button className="create-wallet-button" onClick={handleCreateWalletClick}>
            Create a Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;

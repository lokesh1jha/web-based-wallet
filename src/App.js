import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home';
import CreateWallet from './pages/create-wallet/create-wallet';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-wallet' element={<CreateWallet />} />
      </Routes>
    </Router>
  );
}

export default App;

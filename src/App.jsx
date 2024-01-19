import './scss/styles.scss';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import ReviewPage from './pages/ReviewPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/reviews/:productId" element={<ReviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;


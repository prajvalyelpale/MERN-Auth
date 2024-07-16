import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Product from './Pages/Product.jsx';
import Home from './Pages/Home.jsx';
import './App.css';
import RefreshHandler from './Pages/Auth/RefreshHandler.jsx';

const App = () => {
  const [IsAuth, setIsAuth] = useState(false);

  const PrivateRoute = ({ element }) => {
    return IsAuth ? element : <Navigate to="/" />;
  };

  return (
    <div>
    <RefreshHandler setIsAuth={setIsAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<PrivateRoute element={<Product setIsAuth={setIsAuth}/>} />} />
      </Routes>
    </div>
  );
};

export default App;

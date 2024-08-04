import React, { useState, useEffect } from 'react';
import './App.css';
import NavBar from './NavBar';
import AppRoutes from './AppRoutes';

function App() {
  useEffect(() => {
  }, []);

  return (
      <div className='App'>
        <NavBar />
        <div className='container'>
          <AppRoutes></AppRoutes>
        </div>
      </div>
  );
}

export default App;

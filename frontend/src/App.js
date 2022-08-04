import './App.css';

import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Pages/Home/Home';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import LoginPage from './Pages/LoginPage/LoginPage';

const App = () => {
  
  return (
    <Router>
        <div className="App" id='deactivateSidebar'>
          <Routes >
            <Route path='/' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/homepage' element={<Home />} />
          </Routes>
        </div>
      </Router>
  )
}

export default App
import './App.css';

import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Pages/Home/Home';

const App = () => {
  return (
    <Router>
        <div className="App" id='deactivateSidebar'>
          <Routes >
            <Route path='/' element={<Home/>} />
          </Routes>
        </div>
      </Router>
  )
}

export default App
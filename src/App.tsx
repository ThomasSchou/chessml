import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './Pages/Home';
import Settings from './Pages/Settings';
import Setup from './Pages/Setup';
import Chess from './Pages/Chess';
import History from './Pages/History';


function App() {
  return (
    <BrowserRouter>
    <div className='d-flex justify-content-center'>
          <ul className="nav nav-pills">
            <li className="nav-item">
            <NavLink to="/Setup" className={"nav-link"}>Play</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/Settings"  className={"nav-link"}>Settings</NavLink>
            </li>
          </ul>
        </div>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/Settings" element={<Settings></Settings>}></Route>
        <Route path="/Setup" element={<Setup></Setup>}></Route>
        
        <Route path="/Chess/:gameID/:gameType" element={
          <div className='hero-grid'><div className='gridchild1'><Chess></Chess></div><div className='gridchild2'><History></History></div></div>
        }></Route>
        <Route path="/Chess" element={
          <div className='hero-grid'><div className='gridchild1'><Chess></Chess></div><div className='gridchild2'><History></History></div></div>
        }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

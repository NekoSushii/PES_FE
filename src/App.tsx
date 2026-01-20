import React from 'react';
import { Route, Routes } from "react-router-dom";
import Feedback from './components/Feedback';
import Home from './components/Home';
import Admin from './components/Admin';

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="feedback" element={<Feedback />} />
    <Route path="peanuts" element={<Admin />} />
    {/* <Route path="login" element={<Login />} /> */}
    <Route path="*" element={<h2>404 – page not found</h2>} />
  </Routes>
);

export default App;

import React from 'react';
import { Route, Routes } from "react-router-dom";
import Feedback from './components/Feedback';
import Home from './components/Home';

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="feedback" element={<Feedback />} />
    {/* <Route path="login" element={<Login />} /> */}
    <Route path="*" element={<h2>404 – page not found</h2>} />
  </Routes>
);

export default App;

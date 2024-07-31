import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import About from './components/about';
import  { CountryProvider, ThemeProvider } from './components/countryContext'


function App() {
  return (
    <ThemeProvider>
    <CountryProvider>
      <Router>
        <Routes>
          
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
           
        </Routes>
      </Router>
    </CountryProvider>
    </ThemeProvider>
  );
}

export default App;


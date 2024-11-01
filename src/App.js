import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './App.css';
import { FaArrowRight } from 'react-icons/fa';

import JsonFormatter from './formatter/JsonFormatter';

function App() {

  const getInitialTheme = () => {
    const devtools = JSON.parse(localStorage.getItem('devtools'));
    if (!devtools) {
      localStorage.setItem('devtools', JSON.stringify({ theme: 'light' }));
      return false; // 'light' theme by default
    }
    return devtools.theme === 'dark';
  };

  const [collapsed, setCollapsed] = useState(false);
  const [manualCollapse, setManualCollapse] = useState(false);
  const [darkTheme, setDarkTheme] = useState(getInitialTheme());

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
    setManualCollapse(!manualCollapse); // only updates when button is clicked
  };

  const toggleTheme = () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    const theme = newTheme ? 'dark' : 'light';
    const devtools = JSON.parse(localStorage.getItem('devtools'));
    devtools.theme = theme;
    localStorage.setItem('devtools', JSON.stringify(devtools));

    document.body.classList.toggle('dark', newTheme);
    document.body.classList.toggle('light', !newTheme);
  };

  useEffect(() => {
    document.body.classList.add(darkTheme ? 'dark' : 'light');
  }, [darkTheme]);
  
  // const [collapsed, setCollapsed] = useState(false);
  // const [manualCollapse, setManualCollapse] = useState(false);
  // const [darkTheme, setDarkTheme] = useState(false);

  // const handleToggleCollapse = () => {
  //   // Toggle sidebar on button click only
  //   setCollapsed(!collapsed);
  //   setManualCollapse(!manualCollapse); // only updates when button is clicked
  // };

  // console.log("App.js - darkTheme:", darkTheme);

  // const toggleTheme = () => {
  //   setDarkTheme(!darkTheme);
  //   console.log("App.js - Toggled darkTheme:", !darkTheme);
  //   if(darkTheme)
  //     document.body.classList.toggle('dark'); // Toggle main background color
  //   else
  //     document.body.classList.toggle('light'); // Toggle main background color
  // };

  const handleMouseEnter = () => {
    // Expand on hover only if it was manually collapsed
    if (manualCollapse) setCollapsed(false);
  };

  const handleMouseLeave = () => {
    // Collapse back on mouse leave if it was manually collapsed
    if (manualCollapse) setCollapsed(true);
  };

  return (
    <Router>
     <div className={`app-container ${darkTheme ? 'dark' : 'light'}`}>
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={handleToggleCollapse}
        onHoverEnter={handleMouseEnter}
        onHoverLeave={handleMouseLeave}
        onToggleTheme={toggleTheme}
        darkTheme={darkTheme}
      />
      {collapsed && (
          <button onClick={handleToggleCollapse} className="collapse-btn">
            <FaArrowRight className={`expand-icon ${darkTheme ? 'dark' : 'light'}`} />
          </button>
        )}
      <div className={`main-content ${darkTheme ? 'dark' : 'light'}`}>       
            <Routes>
                <Route path="/json-formatter" element={<JsonFormatter darkTheme={darkTheme} />} />
                {/* <Route path="/xml-formatter" element={<XmlFormatter />} /> */}
                {/* Add more formatter routes as needed */}
            </Routes>
        
      </div>
    </div>
    </Router>
  );
}

export default App;

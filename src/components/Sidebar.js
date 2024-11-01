// Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FaRegLightbulb, FaLightbulb, FaMoon, FaDev ,FaCode, FaCodepen, FaArrowLeft, FaSearch, FaSun, FaChevronLeft, FaHome, FaUsers, FaCalendar, FaFileAlt, FaBug, FaPenFancy, FaCog, FaChevronRight } from 'react-icons/fa';


const Sidebar = ({ collapsed, onToggleCollapse, onHoverEnter, onHoverLeave, onToggleTheme, darkTheme }) => {
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleThemeToggle = () => {
    console.log("Before toggle - darkTheme in Sidebar.js:", darkTheme);
    onToggleTheme();
    console.log("after toggle - darkTheme in Sidebar.js:", darkTheme);
  };

  const menuItems = [
    { title: 'Home', icon: <FaHome />, children: null },
    { title: 'Team', icon: <FaUsers />, children: null },
    { title: 'Calendar', icon: <FaCalendar />, children: null },
    {
      title: 'Documents', icon: <FaFileAlt />, children: [
        { title: 'Reports' },
        { title: 'Invoices' }
      ]
    },
    {
      title: 'Formatter', icon: <FaPenFancy />, children: [
        { title: 'JSON Formatter', path:'/json-formatter' },
        { title: 'XML Formatter' },
        { title: 'HTML Formatter' }
      ]
    },
    { title: 'Bugs', icon: <FaBug />, children: null },
    { title: 'Signatures', icon: <FaPenFancy />, children: null },
    { title: 'Settings', icon: <FaCog />, children: null },
  ];

  const toggleExpand = (index) => {
    setExpandedMenu(expandedMenu === index ? null : index);
  };

  // Filter menu items based on search query

  const filteredMenuItems = menuItems.filter(item => 

    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||

    (item.children && item.children.some(child => child.title.toLowerCase().includes(searchQuery.toLowerCase())))

  );

//   {collapsed ? 'collapsed' : ''} {darkTheme ? 'sidebar-dark' : 'sidebar-light'}
  return (
    <div 
    className={`sidebar ${collapsed ? 'collapsed' : ''} ${darkTheme ? 'dark' : 'light'}`} >
        <div className="sidebar-header">
      <div className= {`top-icons ${darkTheme ? 'sidebar-dark' : 'sidebar-light'}`}>
        <div className="logo">{collapsed ? <FaLightbulb className="bulb"/> : <FaDev />}</div>
        {!collapsed && (
          <>
          <div>
            <button onClick={handleThemeToggle} className={`theme-btn ${darkTheme ? 'sidebar-dark' : 'sidebar-light'}`}>
                {darkTheme ? <FaSun /> : <FaMoon />}
                </button>
                <button onClick={onToggleCollapse} className= {`collapse-btn ${darkTheme ? 'sidebar-dark' : 'sidebar-light'}`}>
                <FaArrowLeft />
                </button>
          </div>
            
          </>
        )}
        {collapsed && (
          <button onClick={onToggleCollapse} className="collapse-btn">
            <FaChevronLeft />
          </button>
        )}
      </div>
      </div>

 <div className="sidebar-middle" onMouseEnter={onHoverEnter}
      onMouseLeave={onHoverLeave}> 
      <div className="search-box" >
        {!collapsed ? (
          <input 
            type="text" 
            placeholder="Search" 
            className="search-input" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        ) : (
          <FaSearch className="icon-collapsed" />
        )}
      </div>

      <ul className={`menu ${darkTheme ? 'sidebar-dark' : 'sidebar-light'}`}  >
        {filteredMenuItems.map((item, index) => (
          <li key={index}>
            <div className={`menu-item ${darkTheme ? 'sidebar-dark' : 'sidebar-light'}`} onClick={() => toggleExpand(index)}>
              <div className={collapsed ? 'icon-collapsed' : 'icon-expanded'}>{item.icon}</div>
              {!collapsed && <span className="menu-title">{item.title}</span>}
              {item.children && !collapsed && <FaChevronRight className={`chevron ${expandedMenu === index ? 'rotate' : ''}`} />}
            </div>
            {item.children && expandedMenu === index && !collapsed && (
              <ul className="submenu">
                {item.children.map((child, childIndex) => (
                  <li key={childIndex} className="submenu-item">
                    <Link to={child.path}>{child.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      </div>
      <div className="sidebar-footer">

      </div>
    </div>
  );
};

export default Sidebar;

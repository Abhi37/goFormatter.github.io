// BaseView.js
import React, { useState } from 'react';
import './BaseView.css';
import { FaPencilAlt } from 'react-icons/fa';

const BaseView = ({ children, darkTheme }) => {
    const [tabs, setTabs] = useState([{ id: 1, name: "Tab 1", isEditing: false }]);
    const [activeTab, setActiveTab] = useState(1);

    const addTab = () => {
        const newTab = { id: tabs.length + 1, name: `Tab ${tabs.length + 1}`, isEditing: false };
        setTabs([...tabs, newTab]);
        setActiveTab(newTab.id);
    };

    const removeTab = (id) => {
        const updatedTabs = tabs.filter(tab => tab.id !== id);
        setTabs(updatedTabs);
        if (activeTab === id && updatedTabs.length > 0) {
            setActiveTab(updatedTabs[0].id);
        }
    };

    const handleDoubleClick = (id) => {
        setTabs(tabs.map(tab => 
            tab.id === id ? { ...tab, isEditing: true } : tab
        ));
    };

    const handleNameChange = (id, newName) => {
        setTabs(tabs.map(tab => 
            tab.id === id ? { ...tab, name: newName } : tab
        ));
    };

    const handleBlurOrEnter = (id) => {
        setTabs(tabs.map(tab => 
            tab.id === id ? { ...tab, isEditing: false } : tab
        ));
    };

    return (
        <div className={`base-view ${darkTheme ? 'dark' : 'light'}`}>
            <header className="tab-header">
                {tabs.map(tab => (
                    <div
                        key={tab.id}
                        className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.isEditing ? (
                            <input
                                type="text"
                                className="tab-input"
                                value={tab.name}
                                onChange={(e) => handleNameChange(tab.id, e.target.value)}
                                onBlur={() => handleBlurOrEnter(tab.id)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleBlurOrEnter(tab.id);
                                }}
                                autoFocus
                            />
                        ) : (
                            <>
                                <span onDoubleClick={() => handleDoubleClick(tab.id)}>{tab.name}</span>
                                <FaPencilAlt
                                    className="edit-icon"
                                    onClick={() => handleDoubleClick(tab.id)}
                                />
                                <button className="close-tab" onClick={() => removeTab(tab.id)}>x</button>
                            </>
                        )}
                    </div>
                ))}
                <button className="add-tab" onClick={addTab}>+ Add Tab</button>
            </header>
            <div className="base-content">
                {/* <h2>{tabs.find(tab => tab.id === activeTab)?.name}</h2> */}
                {children}
            </div>
        </div>
    );
};

export default BaseView;
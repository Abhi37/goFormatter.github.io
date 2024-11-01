// MainContainer.js
import React, { useState } from 'react';
import BaseView from './components/baseView/BaseView';
import JsonFormatter from '../formatter/JsonFormatter'; // Adjust path as needed

const MainContainer = ({ darkTheme }) => {
    const [tabsContent, setTabsContent] = useState([{ id: 1, component: <JsonFormatter /> }]);
    const [activeTab, setActiveTab] = useState(1);

    const addNewTab = () => {
        const newTabId = tabsContent.length + 1;
        setTabsContent([...tabsContent, { id: newTabId, component: <JsonFormatter /> }]);
        setActiveTab(newTabId);
    };

    return (
        <BaseView
            darkTheme={darkTheme}
            tabsContent={tabsContent}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            addNewTab={addNewTab}
        />
    );
};

export default MainContainer;

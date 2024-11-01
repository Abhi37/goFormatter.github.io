// SidebarItem.js
import React, { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa';

function SidebarItem({ item, collapsed }) {
  const [expanded, setExpanded] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  return (
    <li className="sidebar-item">
      <div onClick={() => setExpanded(!expanded)} className="item-header">
        <span>{item.icon}</span>
        {!collapsed && (
          <>
            <span>{item.name}</span>
            {hasChildren && <FaAngleRight className={`expand-icon ${expanded ? 'expanded' : ''}`} />}
          </>
        )}
      </div>
      {!collapsed && expanded && hasChildren && (
        <ul className="child-list">
          {item.children.map((child) => (
            <li key={child.name} className="child-item">
              {child.name}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default SidebarItem;

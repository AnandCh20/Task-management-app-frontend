import React from 'react';
import './Sidebar.css'; // Importing a separate CSS file for styling
import logo from '../assets/logo.png';
import board from '../assets/layout.png';
import database from '../assets/database.png';
import setting from '../assets/settings.png';
import logout from '../assets/Logout.png';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div className="sidebar">
            <div className="logo">
                <img src={logo} alt="Pro Manage" /> {/* Logo */}
                <h4>Pro Manage</h4>
            </div>
            <ul className="menu" >
                <li className="menu-item active" onClick={() => navigate('/task')}>
                    <i className="icon board-icon"></i>
                    <span className='sideImage'><img src={board} alt="Board" /> Board</span>
                </li>
                <li className="menu-item" onClick={() => navigate('/analytics')}>
                    <i className="icon analytics-icon"></i>
                    <span className='sideImage'><img src={database} alt="Analytics" />Analytics</span>
                </li>
                <li className="menu-item" onClick={() => navigate('/settings')}>
                    <i className="icon settings-icon"></i>
                    <span className='sideImage'><img src={setting} alt="Settings" />Settings</span>
                </li>
            </ul>
            <div className="logout">
                <img src={logout} alt="Board" /><button className="logout-btn">Log out</button>
            </div>
        </div>
    );
};

export default Sidebar;

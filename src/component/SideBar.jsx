import React from 'react';
import logo from '../assets/logo.png';
import board from '../assets/layout.png';
import database from '../assets/database.png';
import setting from '../assets/settings.png';
import logout from '../assets/Logout.png';
import { useNavigate } from 'react-router-dom';
import '../component/SideBar.css'

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <div className="logo">
                <img src={logo} alt="Pro Manage" />
                <h4>Pro Manage</h4>
            </div>
            <ul className="menu">
                <li className="menu-item active" onClick={() => navigate('/task')}>
                    <span className='sideImage'>
                        <img src={board} alt="Board" /> Board
                    </span>
                </li>
                <li className="menu-item" onClick={() => navigate('/analytics')}>
                    <span className='sideImage'>
                        <img src={database} alt="Analytics" /> Analytics
                    </span>
                </li>
                <li className="menu-item" onClick={() => navigate('/settings')}>
                    <span className='sideImage'>
                        <img src={setting} alt="Settings" /> Settings
                    </span>
                </li>
            </ul>
            <div className="logout">
                <img src={logout} alt="Logout" />
                <button className="logout-btn"  onClick={()=>navigate('/login')}>Log out</button>
            </div>
      </div>

    );
};

export default Sidebar;

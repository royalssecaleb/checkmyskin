import React from 'react';
import { useNavigate } from 'react-router-dom';

// css
import '../../../assets/css/admin/navbar.css'

const Navbar = () => {
    const navigate = useNavigate();
    const handleSignOut = () => {
        window.localStorage.clear();
        navigate('/admin/login');
    }

    return (
        <React.Fragment>
            <div className="d-flex flex-row justify-content-between">
                <span className='soan-button' onClick={() => navigate('/')}>Go to HomePage</span>
                <span className='soan-button' onClick={handleSignOut}>Log Out</span>
            </div>

        </React.Fragment>
    )
}

export default Navbar;
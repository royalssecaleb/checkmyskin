import React, { useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { doctorLoginHeader, UserHeader } from '../reducer/HeaderReducer';

// logo image
import logo from '../assets/image/logo.png';

// svg
import logoutSvg from '../assets/icons/logout.svg';

// css
import '../assets/css/header.css'
import { doctorLoginFooter, UserFooter } from "../reducer/FooterReducer";

const Header = () => {
    const header = useSelector((state) => state.header.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDoctor = () => {
        navigate('/doctor/login');
        window.localStorage.setItem("header", "login");
        window.localStorage.setItem("footer", "login");
        dispatch(doctorLoginHeader());
        dispatch(doctorLoginFooter());
    };

    const handleHome = () => {
        navigate('/');
        window.localStorage.setItem("header", "user");
        window.localStorage.setItem("footer", "user");
        dispatch(UserHeader());
        dispatch(UserFooter());
    }

    const handleCheckMole = () => {
        navigate('/check-my-mole');
        window.localStorage.setItem("header", "user");
        window.localStorage.setItem("footer", "user");
        dispatch(UserHeader());
        dispatch(UserFooter());
    }

    const handleCheckRash = () => {
        navigate('/check-my-rash');
        window.localStorage.setItem("header", "user");
        window.localStorage.setItem("footer", "user");
        dispatch(UserHeader());
        dispatch(UserFooter());
    }

    const handleStatus = () => {
        navigate('/check-status');
        window.localStorage.setItem("header", "user");
        window.localStorage.setItem("footer", "user");
        dispatch(UserHeader());
        dispatch(UserFooter());
    }

    const handleLogOut = () => {
        navigate('/doctor/login');
        window.localStorage.clear();
        window.localStorage.setItem("header", "login");
        window.localStorage.setItem("footer", "login");
        window.localStorage.removeItem("user");
        dispatch(doctorLoginHeader());
        dispatch(doctorLoginFooter());
    }

    useEffect(() => {
        if (window.localStorage.getItem("header") === "login") {
            dispatch(doctorLoginHeader());
        }
        if (window.localStorage.getItem("header") === "user") {
            dispatch(UserHeader());
        }
    }, [])

    return (
        <div>

            {header === "user" && <Navbar expand="lg">
                <Container>
                    <Navbar.Brand onClick={handleHome}><img src={logo} alt="logo" style={{ marginRight: "10px" }} /><span className="logo-check">check</span><span className="logo-myskin">myskin</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link className="header-nav-items" onClick={handleHome}>Home</Nav.Link>
                            <Nav.Link className="header-nav-items" onClick={handleCheckMole}>Check My Mole</Nav.Link>
                            <Nav.Link className="header-nav-items" onClick={handleCheckRash}>Check My Rash</Nav.Link>
                            <Nav.Link className="header-nav-items" onClick={handleStatus}>Check Status</Nav.Link>
                            <Nav.Link className="header-nav-items" onClick={handleDoctor}>Doctor Login</Nav.Link>
                            <NavDropdown title="EN" id="basic-nav-dropdown" className="header-nav-items">
                                <NavDropdown.Item>SP</NavDropdown.Item>
                                <NavDropdown.Item>GB</NavDropdown.Item>
                                <NavDropdown.Item>RU</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>}
            {header === "login" && <></>}
            {header === "doctor" && <Navbar expand="lg">
                <Container>
                    <Navbar.Brand><img src={logo} alt="logo" style={{ marginRight: "10px" }} /><span className="logo-check">check</span><span className="logo-myskin">myskin</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                        <Nav>
                            <Nav.Link className="doctor-header-nav-items" onClick={() => navigate('/doctor/request')}>Open Request</Nav.Link>
                            <Nav.Link className="doctor-header-nav-items" onClick={() => navigate('/doctor/inquiry')}>Answered Inquiries</Nav.Link>
                            <Nav.Link className="doctor-header-nav-items" onClick={() => navigate('/doctor/statistics')}>Statistics</Nav.Link>
                        </Nav>
                        <div className="header-logout" onClick={handleLogOut}>
                            <img src={logoutSvg} alt="logout" />
                            <label>Logout</label>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>}
        </div >
    )
}

export default Header;
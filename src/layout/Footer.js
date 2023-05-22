import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { doctorLoginFooter, UserFooter } from '../reducer/FooterReducer'
// import { Link } from 'react-router-dom';

// icons
import { BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs';
import { FaFacebookSquare } from 'react-icons/fa';

// logo image
import logo from '../assets/image/logo.png';

// css
import '../assets/css/footer.css'

const Footer = () => {
    const footer = useSelector((state) => state.header.value);
    const dispatch = useDispatch();

    useEffect(() => {
        if (window.localStorage.getItem("footer") === "login") {
            dispatch(doctorLoginFooter());
        }
        if (window.localStorage.getItem("footer") === "user") {
            dispatch(UserFooter());
        }
    }, []);

    return (
        <React.Fragment>
            {footer === "user" && <div className="footer">
                <div className="footer-header">
                    <img src={logo} alt="logo" style={{ marginRight: "10px" }} /><span className="footer-check">check</span><span className="footer-myskin">myskin</span>
                </div>
                <div className="footer-lists-desktop">
                    <div className="footer-lists mt-3">
                        <div className="footer-list" >Home</div>
                        <div className="footer-list" >Step by Step</div>
                        <div className="footer-list" >Check Status</div>
                        <div className="footer-list" >About</div>
                    </div>
                </div>
                <div className="footer-lists-mobile mt-3">
                    <div className="footer-lists">
                        <div className="footer-list" >Home</div>
                        <div className="footer-list" >Step by Step</div>
                        <div className="footer-list" >Check Status</div>
                    </div>
                    <div className="footer-list mt-3" >About</div>
                </div>
                <hr className="container mt-4" style={{ height: "2px", color: "#ffffff" }} />
                <div className="container footer-bottom mt-3">
                    <span>
                        © 2022 CheckMySkin. All rights reserved
                    </span>
                    <div className="footer-icons">
                        <div className="footer-icon"><BsInstagram /></div>
                        <div className="footer-icon"><FaFacebookSquare /></div>
                        <div className="footer-icon"><BsTwitter /></div>
                        <div className="footer-icon"><BsYoutube /></div>
                    </div>
                </div>
            </div>}
            {footer === "login" && <></>}
            {footer === "doctor" && <></>}

        </React.Fragment>
    )
}

export default Footer;
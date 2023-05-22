import React from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd'

const HomeBanner = () => {
    const navigate = useNavigate();
    return (
        <div className="home-banner mt-5 pt-5 pb-5">
            <div className="container home-banner-contents p-5">
                <p>
                    Still uncertain about your mole or rash? Let us check your skin! Upload a photo, and have it assessed by our certified dermatologists. Quick & Easy!
                </p>
                <div className="home-header-btns">
                    <Button className="home-header-mole-btn me-3" type="primary" size="large" onClick={() => navigate('/check-my-mole')}>Check My Mole</Button>
                    <Button className="home-header-rash-btn" type="default" size="large" onClick={() => navigate('/check-my-rash')}>Check My Rash</Button>
                </div>
            </div>
        </div>
    )
}

export default HomeBanner
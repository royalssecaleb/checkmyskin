import React from "react";
import { useNavigate } from 'react-router-dom'
import { Row, Col, Button } from 'antd';

// image
import home from '../../assets/image/home1.png';

const Home1 = () => {
    const navigate = useNavigate();
    return (
        <div className="home-header">
            <Row className="container">
                <Col md={8} className="home-header-contents">
                    <h1>Worried about your skin?</h1>
                    <p className="mt-3">Upload a photo of your skin and have it assessed by our certified dermatologists and skin cancer specialists. Quick & Easy!</p>
                    <div className="home-header-btns">
                        <Button className="home-header-mole-btn me-3" type="primary" size="large" onClick={() => navigate('/check-my-mole')}>Check My Mole</Button>
                        <Button className="home-header-rash-btn" type="default" size="large" onClick={() => navigate('/check-my-rash')}>Check My Rash</Button>
                    </div>
                </Col>
                <Col md={16}>
                    <img src={home} alt="home-header" className="home-header-image" />
                </Col>
            </Row>
        </div>
    )
}

export default Home1;
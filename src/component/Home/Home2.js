import React from "react";
import { Row, Col } from 'antd'

const Home2 = () => {
    return (
        <div className="container mt-5 home-check-skin">
            <h1>
                3 easy steps to examine your skin
            </h1>
            <Row className="mt-5 home-check-skin-step">
                <Col md={8}>
                    <div className="home-check-skin-li"></div>
                    <h4 className="mt-3">Upload your photo</h4>
                    <p>Take and upload a photo of your mole or rash</p>
                </Col>
                <Col md={8}>
                    <div className="home-check-skin-li"></div>
                    <h4 className="mt-3">Add some information</h4>
                    <p>Provide some bachground information to help our doctors in making a diagnosis</p>
                </Col>
                <Col md={8}>
                    <div className="home-check-skin-li"></div>
                    <h4 className="mt-3">Await your result</h4>
                    <p>Your result will be sent within 2-5 days</p>
                </Col>
            </Row>
        </div>
    )
}

export default Home2
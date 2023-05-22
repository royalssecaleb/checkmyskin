import React from "react";
import { Row, Col } from 'antd';

// images
import image1 from '../../assets/image/Image1.png';
import image2 from '../../assets/image/Image2.png';
import image3 from '../../assets/image/Image3.png';

const Home3 = () => {
    return (
        <div className="container mt-5">
            <Row className="home-check-skin-container">
                <Col md={12} className="home-check-skin-method">
                    <h2>Self-monitor your skin using ABCD method</h2>
                    <p>The Skin Cancer Foundation and the American Academy of Dermatology recommend using the ABCD method to help detect melanoma: A (most early melanomas are asymmetrical); B (borders of melanomas are uneven); C (color; varied shades of brown, tan, or black are often the first sign of melanoma); and D (diameter; early melanomas tend to grow larger than common moles).</p>
                </Col>
                <Col md={12}>
                    <div className="home-check-skin-method-images">
                        <img src={image1} className="image1" alt="image1" />
                        <img src={image2} className="image2" alt="image2" />
                        <img src={image3} className="image3" alt="image3" />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Home3
import React, { useEffect, useState } from "react";
import { Row, Col } from 'antd';
import { Storage } from 'aws-amplify';
import jsonData from '../../../assets/json/jsonData.json';

const InquiryDetailMole = (props) => {

    const { dataSource } = props;

    const [isImage, setImage] = useState('');

    useEffect(() => {
        Storage.get(dataSource.image).then(res => setImage(res)).catch(err => console.log(err))
    }, [])

    return (
        <Row gutter={[32, 32]} className="mb-5">
            <Col md={8} className="inquiry-image-col">
                <img src={isImage} alt="inquiry" width="100%" style={{ borderRadius: "16px" }} />
            </Col>
            <Col md={16}>
                <div className="inquiry-info-col p-5">
                    <h2>User Information</h2>
                    <Row className="mt-5">
                        <Col md={12} className="inquiry-info-detail">
                            <label>Age</label>
                            <p className="mt-2">{dataSource.age} years old</p>
                        </Col>
                        <Col md={12} className="inquiry-info-detail">
                            <label>Gender</label>
                            <p className="mt-2">{dataSource.gender}</p>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="inquiry-info-detail">
                            <label>How long have you had this mole?</label>
                            <p className="mt-2">{jsonData.howLogSkin[dataSource.long - 1].value}</p>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="inquiry-info-detail">
                            <label>Have there been cases of melanoma (black skin cancer) in your family or have you been affected yourself?</label>
                            <p className="mt-2">{jsonData.melanoma[dataSource.melanoma - 1].value}</p>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="inquiry-info-detail">
                            <label>Do you have your skin and birthmarks checked regularly by a dermatologist?</label>
                            <p className="mt-2">{jsonData.dermatologist[dataSource.dermatologist - 1].value}</p>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="inquiry-info-detail">
                            <label>Please enter the maximum diameter of your mole (In mm).</label>
                            <p className="mt-2">{dataSource.diameter} mm</p>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="inquiry-info-detail">
                            <label>Has your mole changed in relation to the following factors?</label>
                            <Row className="mt-3">
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Colour</span></Col>
                                        <Col md={12}><p>{dataSource.factors.colour.toString()}</p></Col>
                                    </Row>

                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Itching</span></Col>
                                        <Col md={12}><p>{dataSource.factors.itching.toString()}</p></Col>
                                    </Row>

                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Shape</span></Col>
                                        <Col md={12}><p>{dataSource.factors.shape.toString()}</p></Col>
                                    </Row>

                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Size</span></Col>
                                        <Col md={12}><p>{dataSource.factors.size.toString()}</p></Col>
                                    </Row>

                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Blood Discharge</span></Col>
                                        <Col md={12}><p>{dataSource.factors.blood.toString()}</p></Col>
                                    </Row>

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default InquiryDetailMole;
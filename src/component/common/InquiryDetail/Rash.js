import React, { useEffect, useState } from "react";
import { Row, Col } from 'antd';
import { Storage } from 'aws-amplify';
import jsonData from '../../../assets/json/jsonData.json';

const InquiryDetailRash = (props) => {

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
                            <label>How long have you had this rash?</label>
                            <p className="mt-2">{jsonData.howLogSkin[dataSource.long - 1].value}</p>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="inquiry-info-detail">
                            <label>How this rash currently distributed on your body?</label>
                            <Row className="mt-3">
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Generalized</span></Col>
                                        <Col md={12}><p>{dataSource.distributed.generalized.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Unilateral</span></Col>
                                        <Col md={12}><p>{dataSource.distributed.unilateral.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Localized</span></Col>
                                        <Col md={12}><p>{dataSource.distributed.localized.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Skin folds</span></Col>
                                        <Col md={12}><p>{dataSource.distributed.blood.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Symmetric</span></Col>
                                        <Col md={12}><p>{dataSource.distributed.symmetric.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>On sun exposed areas</span></Col>
                                        <Col md={12}><p>{dataSource.distributed.sun.toString()}</p></Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="inquiry-info-detail">
                            <label>Where is this rash currently located on your body?</label>
                            <Row className="mt-3">
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Scalp</span></Col>
                                        <Col md={12}><p>{dataSource.rashLocation.scalp.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Legs</span></Col>
                                        <Col md={12}><p>{dataSource.rashLocation.legs.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Face</span></Col>
                                        <Col md={12}><p>{dataSource.rashLocation.face.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Palms or Soles</span></Col>
                                        <Col md={12}><p>{dataSource.rashLocation.palmsOrSoles.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Torso</span></Col>
                                        <Col md={12}><p>{dataSource.rashLocation.torso.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Other (eg. Nails, Hair, mucosal surface)</span></Col>
                                        <Col md={12}><p>{dataSource.rashLocation.other.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Arms</span></Col>
                                        <Col md={12}><p>{dataSource.rashLocation.arms.toString()}</p></Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="inquiry-info-detail">
                            <label>How could you define this rash type?</label>
                            <Row className="mt-3">
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Flat</span></Col>
                                        <Col md={12}><p>{dataSource.rashType.flat.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Pustules</span></Col>
                                        <Col md={12}><p>{dataSource.rashType.pustules.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Papules</span></Col>
                                        <Col md={12}><p>{dataSource.rashType.papules.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Wheals</span></Col>
                                        <Col md={12}><p>{dataSource.rashType.wheals.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Palpable plaque</span></Col>
                                        <Col md={12}><p>{dataSource.rashType.plaque.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Scaling</span></Col>
                                        <Col md={12}><p>{dataSource.rashType.scaling.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Blisters</span></Col>
                                        <Col md={12}><p>{dataSource.rashType.blister.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Scarring</span></Col>
                                        <Col md={12}><p>{dataSource.rashType.scarring.toString()}</p></Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="inquiry-info-detail">
                            <label>What symptoms do you feel around this rash?</label>
                            <Row className="mt-3">
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Itch</span></Col>
                                        <Col md={12}><p>{dataSource.symptoms.itch.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Bleeding</span></Col>
                                        <Col md={12}><p>{dataSource.symptoms.bleeding.toString()}</p></Col>
                                    </Row>

                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Pain</span></Col>
                                        <Col md={12}><p>{dataSource.symptoms.pain.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Systemic symptoms (eg. fever, malaise, other)</span></Col>
                                        <Col md={12}><p>{dataSource.symptoms.systemic.toString()}</p></Col>
                                    </Row>
                                </Col>
                                <Col md={12}>
                                    <Row>
                                        <Col md={12}><span>Burning</span></Col>
                                        <Col md={12}><p>{dataSource.symptoms.burning.toString()}</p></Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="inquiry-info-detail">
                            <label>How severe this rash felt?</label>
                            <p className="mt-2">{jsonData.severe[dataSource.severe - 1].value}</p>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="inquiry-info-detail">
                            <label>Any relevant information you want to add?</label>
                            <p className="mt-2">{dataSource.relevant}</p>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default InquiryDetailRash;
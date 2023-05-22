import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DoctorHeader } from "../../reducer/HeaderReducer";
import { DoctorFooter } from "../../reducer/FooterReducer";
import { Breadcrumb, Row, Col, Radio, Button, notification } from "antd";
import { Container } from "react-bootstrap";
import { DataStore, API } from "aws-amplify";
import {
    CheckSkinType,
    CheckSkin,
    CheckSkinStatus,
    Clinic,
    PaymentStatus,
} from "../../models";
import moment, { now } from "moment";

// component
import InquiryDetailMole from "../../component/common/InquiryDetail/Mole";
import InquiryDetailRash from "../../component/common/InquiryDetail/Rash";

// css
import "../../assets/css/inquirydetail.css";

const InquiryDetail = () => {
    const { usercode } = useParams();
    const [api, ContextHolder] = notification.useNotification();
    const { state, pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isvalue, setValue] = useState(0);
    const [ischeck, setCheck] = useState(false);
    const [isShow, setShow] = useState(false);
    const [isResponseData, setResponseData] = useState([]);

    useEffect(() => {
        const auth = window.localStorage.getItem("user");
        if (auth) {
            window.localStorage.setItem("header", "doctor");
            window.localStorage.setItem("footer", "doctor");
            if (window.localStorage.getItem("header") === "doctor") {
                dispatch(DoctorHeader());
            }
            if (window.localStorage.getItem("footer") === "doctor") {
                dispatch(DoctorFooter());
            }

            getResponseData();
            if (state.checkskinstatus === CheckSkinStatus.ANSWERED) {
                setShow(true);
                setValue(state.doctorAnswer);
            } else {
                setValue(0);
            }
        } else {
            navigate("/doctor/login");
        }
    }, []);

    const getResponseData = async () => {
        const response_data = await DataStore.query(Clinic, (c) =>
            c.id("eq", state.clinicID)
        );
        if (response_data.length) {
            setResponseData(response_data[0].standardResponses);
        }
    };

    const handleRadio = (e) => {
        setValue(e.target.value);
        setCheck(e.target.checked);
    };

    const handleResponse = async () => {
        const inquiry = await DataStore.query(CheckSkin, (c) =>
            c.usercode("eq", usercode)
        );
        const clinic = await DataStore.query(Clinic, inquiry[0].clinicID);
        const url = window.location.origin;
        const amount = parseFloat((clinic.rateInAus + clinic.taxInAus).toPrecision(12));
        let payment_id = inquiry[0].payment_id.split("_secret")[0];
        let first_id = payment_id.slice(0, 5);
        let last_id = payment_id.slice(-3);
        let receipt_no = first_id + last_id;
        const data = {
            usercode,
            url,
            email: inquiry[0].email,
            amount,
            payment_id: receipt_no,
            status: inquiry[0].type === "MOLE" ? "mole" : "rash",
            payment: "refund",
            date: moment(now()).format("YYYY-MM-DD"),
        };
        if (inquiry.length) {
            if (isvalue === -1) {
                // const payment_id = inquiry[0].payment_id;
                API.post("stripeapi", "/refund/payment", {
                    body: { payment_id },
                })
                    .then((result) => {
                        if (result.success) {
                            // API.post("sendmailapi", "/patient-sendmail", { body: data })
                            //     .then((result) => {
                            //         console.log(result);
                            //     })
                            //     .catch((err) => console.log(err));
                            DataStore.save(
                                CheckSkin.copyOf(inquiry[0], (item) => {
                                    item.doctorAnswer = isvalue;
                                    item.checkskinstatus = CheckSkinStatus.ANSWERED;
                                    item.payment_status = PaymentStatus.REFUND;
                                    item.payment_id = result.data.id;
                                })
                            )
                                .then((res) => {
                                    api.success({
                                        message: <label>Success</label>,
                                        description: <label>The operation was successful.</label>,
                                        duration: 3,
                                    });
                                    setShow(true);
                                    navigate('/doctor/request')
                                })
                                .catch((err) => {
                                    api.error({
                                        message: <label>Error</label>,
                                        description: <label>{err}</label>,
                                        duration: 3,
                                    });
                                });
                        }
                    })
                    .catch((err) => console.log(err));
            } else {
                DataStore.save(
                    CheckSkin.copyOf(inquiry[0], (item) => {
                        item.doctorAnswer = isvalue;
                        item.checkskinstatus = CheckSkinStatus.ANSWERED;
                        item.payment_status = PaymentStatus.COMPLETE;
                    })
                )
                    .then((res) => {
                        api.success({
                            message: <label>Success</label>,
                            description: <label>The operation was successful.</label>,
                            duration: 3,
                        });
                        setShow(true);
                        navigate('/doctor/request')
                    })
                    .catch((err) => {
                        api.error({
                            message: <label>Error</label>,
                            description: <label>{err}</label>,
                            duration: 3,
                        });
                    });
            }
        }
    };

    return (
        <React.Fragment>
            {ContextHolder}
            <Container className="mt-4">
                {pathname.includes("request") && (
                    <Breadcrumb separator=">" className="check-skin-breadcrumb">
                        <Breadcrumb.Item className="breadcrumb-home">
                            <Link to="/doctor/request">Open Request</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item className="breadcrumb-check-mole">
                            Inquiry {usercode}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                )}
                {pathname.includes("inquiry") && (
                    <Breadcrumb separator=">" className="check-skin-breadcrumb">
                        <Breadcrumb.Item className="breadcrumb-home">
                            <Link to="/doctor/inquiry">Answered Inquiries</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item className="breadcrumb-check-mole">
                            Inquiry {usercode}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                )}
                <h1 className="mt-4 inquiry-header">Inquiry {usercode}</h1>
                <p className="mt-2 inquiry-submit-date">
                    Submitted {moment(state.createdAt).format("MM/DD/YYYY, hh:mm")}
                </p>
                {state.type === CheckSkinType.MOLE && (
                    <InquiryDetailMole dataSource={state} />
                )}
                {state.type === CheckSkinType.RASH && (
                    <InquiryDetailRash dataSource={state} />
                )}
                <div className="inquiry-response mt-5 mb-5">
                    <h2>Response</h2>
                    <Radio.Group
                        onChange={handleRadio}
                        value={isvalue}
                        disabled={isShow ? true : false}
                    >
                        <Row gutter={[8, 32]} className="mt-4 mb-4" justify="space-between">
                            {isResponseData?.map((item, key) => (
                                <Col
                                    md={7}
                                    key={key}
                                    className={
                                        isvalue === item.value && ischeck === true
                                            ? "response-item-select"
                                            : "response-items"
                                    }
                                >
                                    <Row className="p-4">
                                        <Col className="response-item">
                                            <Radio value={item.value} className="doctor-answer">
                                                <span>{item.answer}</span>
                                            </Radio>
                                        </Col>
                                    </Row>
                                </Col>
                            ))}
                        </Row>
                    </Radio.Group>
                    {isShow === false && (
                        <Button
                            className="mt-5 mb-5"
                            type="primary"
                            size="large"
                            onClick={handleResponse}
                            disabled={isvalue === 0 ? true : false}
                        >
                            Send Response
                        </Button>
                    )}
                </div>
            </Container>
        </React.Fragment>
    );
};

export default InquiryDetail;

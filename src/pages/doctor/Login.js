import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from 'react-redux';
import { doctorLoginHeader, DoctorHeader } from '../../reducer/HeaderReducer';
import { doctorLoginFooter, DoctorFooter } from '../../reducer/FooterReducer';
import { useNavigate } from 'react-router-dom'
import { Row, Col, Form, Input, Button, notification } from 'antd';
import ReCAPTCHA from "react-google-recaptcha"
// import PasswordChecklist from "react-password-checklist"
import { DataStore } from 'aws-amplify';
import { Doctor } from '../../models';

// logo image
import logo from '../../assets/image/logo.png';

// css
import '../../assets/css/doctor-login.css';
import { Container } from "react-bootstrap";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const captchaRef = useRef(null);
    const [isBot, setBot] = useState(false);
    // const [password, SetPassword] = useState('');
    // const [ispasswordValid, SetIsValidPassword] = useState(false);

    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        window.localStorage.setItem("header", "login");
        window.localStorage.setItem("footer", "login");
        if (window.localStorage.getItem("header") === "login") {
            dispatch(doctorLoginHeader());
        }
        if (window.localStorage.getItem("footer") === "login") {
            dispatch(doctorLoginFooter());
        }

    }, []);

    const [form] = Form.useForm();

    const handelRegister = () => {
        navigate('/doctor/register');
    }

    const onFinish = async (values) => {
        const token = captchaRef.current.getValue();
        if (token) {
            const doctor_available = await DataStore.query(Doctor, (c) => c.email("eq", values.email));
            console.log(doctor_available[0]);
            // await DataStore.observeQuery(Doctor, (c) => c.email("eq", values.email)).subscribe(({ items }) => {
            if (values.email) {
                if (doctor_available.length) {
                    const data = doctor_available[0];
                    if (data.status) {
                        if (data.password === values.password) {
                            navigate('/doctor/request');
                            window.localStorage.setItem("header", "doctor");
                            window.localStorage.setItem("footer", "doctor");
                            window.localStorage.setItem("user", data.id);
                            dispatch(DoctorHeader());
                            dispatch(DoctorFooter());
                        } else if (values.password === undefined) {
                            api.error({
                                message: <label>Error</label>,
                                description: <label>Please input Password.</label>
                            })
                        } else {
                            api.error({
                                message: <label>Error</label>,
                                description: <label>Password is incorrect.</label>
                            })
                        }
                    } else {
                        api.error({
                            message: <label>Error</label>,
                            description: <label>User is not available. Please contact Admin.</label>
                        })
                    }
                } else {
                    api.error({
                        message: <label>Error</label>,
                        description: <label>User is not exist.</label>
                    })
                }
            } else {
                api.error({
                    message: <label>Error</label>,
                    description: <label>Please input Email</label>
                })
            }
            // });
        } else {
            setBot(true);
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    return (
        <React.Fragment>
            <Container>
                {contextHolder}
                <Row gutter={64}>
                    <Col md={12} className="doctor-login-contents">
                        <div className="doctor-login-logo mb-2" onClick={() => navigate('/')}><img src={logo} alt="logo" style={{ marginRight: "10px" }} /><span className="logo-check">check</span><span className="logo-myskin">myskin</span></div>
                        <h1 className="doctor-login-h1 mt-4">Login</h1>
                        <p className="doctor-login-p">Enter your credentials to login</p>
                        <Form form={form} layout="vertical" autoComplete='off' onFinish={onFinish}
                            onFinishFailed={onFinishFailed} >
                            <Form.Item label="Email" name="email" rules={[{ required: true, message: "" }]}>
                                <Input type="email" className='w-100' placeholder="Enter your email" />
                            </Form.Item>
                            <Form.Item label="Password" name="password" rules={[{ required: true, message: "" }]}>
                                <Input.Password className='w-100' placeholder="Enter your password" />
                            </Form.Item>
                            <Form.Item>
                                <span className="forgot-password" onClick={() => navigate('/doctor/forgot-password')}>Forgot Password?</span>
                            </Form.Item>
                            <Form.Item>
                                <Row>
                                    <ReCAPTCHA sitekey='6LdihQEhAAAAAK65cLHk8cV8aEOeNh7dQYj40xWO' style={{ display: "inline-block", width: "100%" }} size="normal" theme="light" ref={captchaRef} />
                                    {isBot ? <span className="err-recaptcha">This is ReCAPTCHA for human testing.</span> : ""}
                                </Row>
                            </Form.Item>
                            <Form.Item>
                                <label className="doctor-account-label">Don't have account?&nbsp;&nbsp;</label>
                                <span className="register-now" onClick={handelRegister}>Register Now</span>
                            </Form.Item>
                            <Button type="primary" size="large" htmlType="submit">Login</Button>
                        </Form>
                    </Col>
                    <Col md={12} className="doctor-login-image"></Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Login;
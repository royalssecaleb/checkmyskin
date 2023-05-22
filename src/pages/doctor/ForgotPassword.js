import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { doctorLoginHeader } from '../../reducer/HeaderReducer';
import { doctorLoginFooter } from '../../reducer/FooterReducer';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Input, Button, notification, DatePicker } from 'antd';

import { DataStore } from 'aws-amplify';
import { Doctor } from '../../models';
import { API } from 'aws-amplify';

// logo image
import logo from '../../assets/image/logo.png';

// css
import '../../assets/css/doctor-login.css';
import { Container } from "react-bootstrap";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [bith, setBith] = useState("");
    const [btn_loading, setBtnLoading] = useState(false);

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
        navigate('/doctor/login');
    }

    const onFinish = async (values) => {
        // API.get('sendmailapi', '/forgot-password').then((res) => {
        //     console.log(res);
        // }).catch((err) => console.log(err))
        const query = await DataStore.query(Doctor, (c) => c.email('eq', values.email).dob('eq', bith));
        if (query.length === 0) {
            api.error({
                message: <label>Error</label>,
                description: <label>Account doesn't exist or Wrong birthday.</label>
            })
        } else {
            setBtnLoading(true);
            API.post('sendmailapi', '/forgot-password', {
                body: { password: query[0].password, email: values.email }
            }).then(result => {
                if (result) {
                    console.log(result);
                    setBtnLoading(false);
                    form.resetFields();
                    api.success({
                        message: <label>Success</label>,
                        description: <label>"Email has been sent.</label>
                    })
                }
            }).catch(err => {
                setBtnLoading(false);
                api.error({
                    message: <label>Error</label>,
                    description: <label>{err}</label>
                })
            })
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    const handleDate = (value, dateString) => {
        setBith(dateString);
    }

    return (
        <React.Fragment>
            <Container>
                {contextHolder}
                <Row gutter={64}>
                    <Col md={12} className="doctor-login-contents">
                        <div className="doctor-login-logo mb-2" onClick={() => navigate('/')}><img src={logo} alt="logo" style={{ marginRight: "10px" }} /><span className="logo-check">check</span><span className="logo-myskin">myskin</span></div>
                        <h1 className="doctor-login-h1 mt-4">Forgot Password</h1>
                        <p className="doctor-login-p">Enter your email</p>
                        <Form form={form} layout="vertical" autoComplete='off' onFinish={onFinish}
                            onFinishFailed={onFinishFailed} >
                            <Form.Item label="Email" name="email" rules={[{ required: true, message: "" }]}>
                                <Input type="email" className='w-100' placeholder="Enter your email" />
                            </Form.Item>
                            <Form.Item label="Date of Birth" name="birthday" rules={[{ required: true, message: "" }]}>
                                <DatePicker className="w-100" format="YYYY-MM-DD" placeholder="YYYY-MM-DD" onChange={handleDate} />
                            </Form.Item>
                            <Form.Item>
                                <span className="register-now" onClick={handelRegister}>Go to Login</span>
                            </Form.Item>
                            <Button type="primary" size="large" htmlType="submit" loading={btn_loading}>Send Email</Button>
                        </Form>
                    </Col>
                    <Col md={12} className="doctor-login-image"></Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default ForgotPassword;
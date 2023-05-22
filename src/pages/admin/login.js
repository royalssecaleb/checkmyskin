import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { doctorLoginHeader } from '../../reducer/HeaderReducer';
import { Button, Form, Input, Row, Col } from 'antd';
import { DataStore } from 'aws-amplify';
import { Admin } from '../../models'
import moment from 'moment';

import '../../assets/css/admin/login.css';

const AdminLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.localStorage.setItem("header", "login");
        window.localStorage.setItem("footer", "login");
        if (window.localStorage.getItem("header") === "login") {
            dispatch(doctorLoginHeader());
        }
        console.log(moment().valueOf());
    }, []);

    const onFinish = async (values) => {
        const model = await DataStore.query(Admin, (c) => c.username('eq', values.username).password('eq', values.password));
        if (model.length) {
            window.localStorage.setItem("expired", moment().valueOf())
            window.localStorage.setItem("admin_info", model[0].id);
            navigate('/admin');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <React.Fragment>
            <Row>
                <Col md={5} />
                <Col md={14}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className='admin-login'
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 12,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Log In
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col md={5} />
            </Row>
        </React.Fragment>
    )
}

export default AdminLogin;
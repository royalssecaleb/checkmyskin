import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { doctorLoginHeader } from '../../reducer/HeaderReducer';
import { doctorLoginFooter } from '../../reducer/FooterReducer';
import { Row, Col, Form, Input, Button, Select, DatePicker, notification, Space } from 'antd';
import PasswordChecklist from "react-password-checklist"
import { DataStore } from 'aws-amplify';
import { Admin, Doctor, GenderEnum } from '../../models';
import jsonData from '../../assets/json/jsonData.json';

// logo image
import logo from '../../assets/image/logo.png';

// css
import '../../assets/css/doctor-login.css';
import { Container } from "react-bootstrap";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [api, ContextHolder] = notification.useNotification();
    const [password, SetPassword] = useState('');
    const [ispasswordValid, SetIsValidPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bith, setBith] = useState("");

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

    const handleFinish = async (values) => {
        const verifycode = await DataStore.query(Admin, (c) => c.verifyCode("eq", values.verifycode));
        if (verifycode.length) {
            if (ispasswordValid) {
                const model = await DataStore.query(Doctor, (c) => c.email("eq", values.email));
                const phonedata = await DataStore.query(Doctor, (c) => c.phone("eq", values.phone));
                if (model.length === 0) {
                    if (phonedata.length) {
                        api.error({
                            message: <label>Error</label>,
                            description: <label>Phone Number is already use.</label>
                        })
                    } else {
                        setLoading(true);
                        await DataStore.save(
                            new Doctor({
                                firstname: values.firstname,
                                lastname: values.lastname,
                                email: values.email,
                                password: values.password,
                                dob: bith,
                                phone: values.phone,
                                address: values.address,
                                gender: values.gender,
                                specialised: values.specialised,
                                status: false,
                                bankdetail: values.bankdetail,
                                payRate: 0
                            })
                        ).then(res => {
                            setLoading(false)
                            api.success({
                                message: <label>Success</label>,
                                description: <label>Correctly registered.</label>,
                                duration: 3
                            })
                            setTimeout(() => {
                                navigate('/doctor/login');
                            }, 3000)

                        }).catch(err => {
                            api.error({
                                message: <label>Error</label>,
                                description: <label>{err}</label>
                            })
                        })
                    }
                } else {
                    api.error({
                        message: <label>Error</label>,
                        description: <label>The Email is already exist.</label>
                    })
                }
            }
        } else {
            api.error({
                message: <label>Error</label>,
                description: <label>Verify code is incorrect.</label>
            })
        }
    }

    const handleDate = (value, dateString) => {
        setBith(dateString);
    }

    const handleLogin = () => {
        navigate('/doctor/login')
    }

    return (
        <React.Fragment>
            <Container>
                {ContextHolder}
                <Row gutter={64}>
                    <Col md={12} className="doctor-login-contents">
                        <div className="doctor-login-logo mb-2" onClick={() => navigate('/')}><img src={logo} alt="logo" style={{ marginRight: "10px" }} /><span className="logo-check">check</span><span className="logo-myskin">myskin</span></div>
                        <h1 className="doctor-login-h1 mt-4">Register</h1>
                        <p className="doctor-login-p">Enter your credentials to register</p>
                        <Form form={form} layout="vertical" autoComplete='off' onFinish={handleFinish}>
                            <Form.Item label="Verify Code" name="verifycode" rules={[{ required: true, message: "" }]}>
                                <Input className='w-100' placeholder="Enter your verify code" />
                            </Form.Item>
                            <Form.Item label="First Name" name="firstname" rules={[{ required: true, message: "" }]}>
                                <Input className='w-100' placeholder="Enter your first name" />
                            </Form.Item>
                            <Form.Item label="Last Name" name="lastname" rules={[{ required: true, message: "" }]}>
                                <Input className='w-100' placeholder="Enter your last name" />
                            </Form.Item>
                            <Form.Item label="Email" name="email" rules={[{ required: true, message: "" }]}>
                                <Input className='w-100' type="email" placeholder="Enter your email" />
                            </Form.Item>
                            <Form.Item label="Password" name="password" rules={[{ required: true, message: "" }]} onChange={(e) => SetPassword(e.target.value)}>
                                <Input.Password className='w-100' placeholder="Enter your password" />
                            </Form.Item>
                            {
                                password !== '' &&
                                <PasswordChecklist
                                    rules={["minLength", "specialChar", "number", "capital"]}
                                    className={ispasswordValid ? 'input-password-valid-hide' : 'input-password-valid-show'}
                                    minLength={8}
                                    value={password}
                                    onChange={(isValid) => {
                                        SetIsValidPassword(isValid);
                                    }}
                                />
                            }
                            <Form.Item label="Date of Birth" name="birthday" rules={[{ required: true, message: "" }]}>
                                <DatePicker className="w-100" format="YYYY-MM-DD" placeholder="YYYY-MM-DD" onChange={handleDate} />
                            </Form.Item>
                            <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "" }]}>
                                <Input className='w-100' placeholder="Enter your phone number" />
                            </Form.Item>
                            <Form.Item label="Address" name="address" rules={[{ required: true, message: "" }]}>
                                <Input className='w-100' placeholder="Enter your address" />
                            </Form.Item>
                            <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "" }]}>
                                <Select className='w-100' placeholder="Select your gender">
                                    <Select.Option key={GenderEnum.MALE}>{GenderEnum.MALE}</Select.Option>
                                    <Select.Option key={GenderEnum.FEMALE}>{GenderEnum.FEMALE}</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label="Specialised " name="specialised" rules={[{ required: true, message: "" }]}>
                                <Select className='w-100' placeholder="Select your specialised">
                                    {jsonData.specialised && jsonData.specialised.map((item) => <Select.Option key={item.key}>{item.value}</Select.Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item label="Bank Details" name="bankdetail">
                                <Input className='w-100' placeholder="Enter your Bank details" />
                            </Form.Item>
                            <Space size={8}>
                                <Button type="default" size="large" onClick={handleLogin}>Go to Login</Button>
                                <Button type="primary" size="large" htmlType="submit" loading={loading}>Register</Button>
                            </Space>

                        </Form>
                    </Col>
                    <Col md={12} className="doctor-login-image"></Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Register;
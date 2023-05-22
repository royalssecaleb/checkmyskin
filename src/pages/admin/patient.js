import React, { useEffect, useState } from 'react';
import { Row, Col, Layout, Button, Space, Table, Modal, notification, Form, Input, Select, InputNumber, Switch, Slider, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doctorLoginHeader } from '../../reducer/HeaderReducer';
import SideBar from './layout/sidebar';
import Navbar from './layout/navbar';
import { DataStore, API, Storage } from 'aws-amplify';
import { CheckSkin, CheckSkinStatus, GenderEnum, PaymentStatus, Clinic, Doctor } from '../../models';
import jsonData from '../../assets/json/jsonData.json';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment, { now } from "moment";

import '../../assets/css/admin/clinic.css';

const { Header, Sider, Content } = Layout

const Patient = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [patient_table, setPatientTable] = useState([]);
    const [isVisible, setVisible] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const [isType, setType] = useState(false);
    const [isAge, setAge] = useState(0);
    const [isGender, setGender] = useState("");
    const [isEmail, setEmail] = useState("");
    const [isUsercode, setUsercode] = useState("");
    const [isCheckSkinStatus, setCheckSkingStatus] = useState("");
    const [isDoctorAnswer, setDoctorAnswer] = useState("");
    const [isLong, setLong] = useState("");
    const [isMelanoma, setMelanoma] = useState("");
    const [isDermatologist, setDermatologist] = useState("");
    const [isFactor, setFactor] = useState({});
    const [isSevere, setSevere] = useState("");
    const [isRelevant, setRelevant] = useState("");
    const [isDistributed, setDistributed] = useState({});
    const [isRashLocation, setRashLocation] = useState({});
    const [isRashType, setRashType] = useState({});
    const [isSymptoms, setSymptoms] = useState({});
    const [isPaymentStatus, setPaymentStatus] = useState("");
    const [isPhoto, setPhoto] = useState("");
    const [doctorModal, setDoctorModal] = useState(false);
    const [isClinicName, setClinicName] = useState("");
    const [isDoctorNames, setDoctorNames] = useState([]);
    const [doctorvalue, setDoctorValue] = useState("");

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRows(selectedRows);
        },
    };

    useEffect(() => {
        window.localStorage.setItem("header", "login");
        window.localStorage.setItem("footer", "login");
        if (window.localStorage.getItem("header") === "login") {
            dispatch(doctorLoginHeader());
        }
        const auth = window.localStorage.getItem("admin_info");
        if (!auth) {
            navigate('/admin/login')
        } else {
            getCheckSkin();
        }
    }, []);


    const getCheckSkin = async () => {
        const patient_data = await DataStore.query(CheckSkin);
        let source_data = [];
        await Promise.all(patient_data.map(async (item) => {
            let doctor_name;
            if (item.doctorID !== null) {
                let doctor = await DataStore.query(Doctor, item.doctorID);
                doctor_name = JSON.parse(JSON.stringify(doctor["firstname"])) + " " + JSON.parse(JSON.stringify(doctor["lastname"]))
            } else {
                doctor_name = "";
            }
            source_data.push({
                ...item,
                doctorName: doctor_name
            })
        }))

        let data = source_data.map((item, key) => {
            return {
                ...item,
                key: key + 1,
            }
        });
        setPatientTable(data);
    }

    const handleView = async () => {
        if (selectedRowKeys.length === 1) {
            const clinic_name = await DataStore.query(Clinic, selectedRows[0].clinicID);
            clinic_name.standardResponses.map((item) => {
                if (item.value === selectedRows[0].doctorAnswer) {
                    setDoctorAnswer(item.answer)
                }
            })
            Storage.get(selectedRows[0].image).then((res) => setPhoto(res)).catch(err => console.log(err));
            if (selectedRows[0].type === "RASH") {
                setType(true);
                setAge(selectedRows[0].age);
                setGender(selectedRows[0].gender);
                setEmail(selectedRows[0].email);
                setLong(selectedRows[0].long);
                setUsercode(selectedRows[0].usercode);
                setCheckSkingStatus(selectedRows[0].checkskinstatus);
                setRashLocation(selectedRows[0].rashLocation);
                setRelevant(selectedRows[0].relevant);
                setDistributed(selectedRows[0].distributed);
                setRashType(selectedRows[0].rashType);
                setSymptoms(selectedRows[0].symptoms);
                setSevere(selectedRows[0].severe);
                setMelanoma(selectedRows[0].melanoma);
                setDermatologist(selectedRows[0].dermatologist);
                setSliderValue(selectedRows[0].diameter);
                setFactor(selectedRows[0].factors);
                setPaymentStatus(selectedRows[0].payment_status);

            }
            if (selectedRows[0].type === "MOLE") {
                setType(false);
                setAge(selectedRows[0].age);
                setGender(selectedRows[0].gender);
                setEmail(selectedRows[0].email);
                setUsercode(selectedRows[0].usercode);
                setCheckSkingStatus(selectedRows[0].checkskinstatus);
                setLong(selectedRows[0].long);
                setMelanoma(selectedRows[0].melanoma);
                setDermatologist(selectedRows[0].dermatologist);
                setSliderValue(selectedRows[0].diameter);
                setFactor(selectedRows[0].factors);
                setRashLocation(selectedRows[0].rashLocation);
                setRelevant(selectedRows[0].relevant);
                setDistributed(selectedRows[0].distributed);
                setRashType(selectedRows[0].rashType);
                setSymptoms(selectedRows[0].symptoms);
                setSevere(selectedRows[0].severe);
                setMelanoma(selectedRows[0].melanoma);
                setPaymentStatus(selectedRows[0].payment_status);
            }
            setVisible(true);
        } else {
            api.error({
                message: <label>Error</label>,
                description: <label>Please select one CheckSkin</label>
            })
        }
    }

    const handleAddDoctor = async () => {
        if (selectedRowKeys.length === 1) {
            if (selectedRows[0].checkskinstatus === CheckSkinStatus.OPENED) {
                // if (selectedRows[0].payment_status === PaymentStatus.PAID) {
                const clinic_name = await DataStore.query(Clinic, selectedRows[0].clinicID);
                setClinicName(clinic_name.name);
                const doctorName_arr = [];
                await Promise.all(clinic_name.doctorsID.map(async (item) => {
                    const doctor_name = await DataStore.query(Doctor, item);
                    doctorName_arr.push(doctor_name);
                }));
                setDoctorNames(doctorName_arr);
                setDoctorModal(true);
                // } else {
                //     api.error({
                //         message: <label>Error</label>,
                //         description: <label>This Checkskin is already refund.</label>
                //     })
                // }
            } else {
                api.error({
                    message: <label>Error</label>,
                    description: <label>This Checkskin is already Answered.</label>
                })
            }
        } else {
            api.error({
                message: <label>Error</label>,
                description: <label>Please select one CheckSkin</label>
            })
        }
    }

    const handlerefund = async () => {
        if (selectedRowKeys.length === 1) {
            if (selectedRows[0].payment_status === PaymentStatus.REFUND) {
                api.error({
                    message: <label>Error</label>,
                    description: <label>This Checkskin is already refund.</label>
                })
            } else {
                let content = "";
                if (selectedRows[0].payment_status === PaymentStatus.PAID) {
                    content = "Are you sure you want to refund it?";
                } else {
                    content = "Are you sure to Refund the Completed checkskin?";
                }
                const model = await DataStore.query(CheckSkin, selectedRows[0].id);
                const clinic = await DataStore.query(Clinic, selectedRows[0].clinicID);
                const url = window.location.origin;
                const amount = parseFloat((clinic.rateInAus + clinic.taxInAus).toPrecision(12));
                Modal.confirm({
                    title: 'Confirm',
                    icon: <ExclamationCircleOutlined />,
                    content: content,
                    okText: 'Ok',
                    cancelText: 'Cancel',
                    onOk: () => {
                        const payment_id = model.payment_id.split("_secret")[0];
                        let first_id = payment_id.slice(0, 5);
                        let last_id = payment_id.slice(-3);
                        let receipt_no = first_id + last_id;
                        const data = {
                            usercode: selectedRows[0].usercode,
                            url,
                            email: selectedRows[0].email,
                            amount,
                            payment_id: receipt_no,
                            status: selectedRows[0].type === "MOLE" ? "mole" : "rash",
                            payment: "refund",
                            date: moment(now()).format("YYYY-MM-DD"),
                        };
                        API.post('stripeapi', '/refund/payment', {
                            body: { payment_id },
                        }).then(result => {
                            console.log(result);
                            if (result.success) {
                                API.post("sendmailapi", "/patient-sendmail", { body: data })
                                    .then((result) => {
                                        console.log(result);
                                    })
                                    .catch((err) => console.log(err));
                                DataStore.save(CheckSkin.copyOf(model, item => {
                                    item.payment_status = PaymentStatus.REFUND;
                                    item.payment_id = result.data.id;
                                    item.checkskinstatus = CheckSkinStatus.ANSWERED;
                                })).then(res => {
                                    getCheckSkin();
                                    api.success({
                                        message: <label>Success</label>,
                                        description: <label>Correctly refund checkskin.</label>,
                                    })
                                })
                            } else {
                                api.error({
                                    message: <label>Errer</label>,
                                    description: <label>{result.err.type}</label>,
                                })
                            }
                        }).catch(err => {
                            api.error({
                                message: <label>Errer</label>,
                                description: <label>{err}</label>,
                            })
                        })
                        setSelectedRowKeys([]);
                        setSelectedRows([]);
                    },
                    onCancel: () => {
                        setSelectedRowKeys([]);
                        setSelectedRows([]);
                    }
                });
            }
        } else {
            api.error({
                message: <label>Error</label>,
                description: <label>Please select one CheckSkin</label>
            })
        }
    }

    const handleDelete = () => {
        if (selectedRowKeys.length) {
            Modal.confirm({
                title: 'Confirm',
                icon: <ExclamationCircleOutlined />,
                content: 'Are you sure you want to delete it?',
                okText: 'Ok',
                cancelText: 'Cancel',
                onOk: () => {
                    let flag = true;
                    selectedRows.map(async (item) => {
                        if (item.payment_status !== PaymentStatus.PAID && item.payment_status !== PaymentStatus.REFUND && item.payment_status !== PaymentStatus.COMPLETE && item.payment_status !== PaymentStatus.FINISH) {
                            const modelDelete = await DataStore.query(CheckSkin, item.id);
                            DataStore.delete(modelDelete);
                            Storage.remove(item.image).then(res => console.log(res)).catch(err => console.log(err))
                            getCheckSkin();
                        } else {
                            flag = false;
                        }
                    })
                    if (flag) {
                        api.success({
                            message: <label>Success</label>,
                            description: <label>Correctly delete checkskin.</label>,
                        })
                    } else {
                        api.warning({
                            message: <label>Warning</label>,
                            description: <label>You can't delete this checkskin.</label>,
                        })
                    }
                    setSelectedRowKeys([]);
                    setSelectedRows([]);

                },
                onCancel: () => {
                    setSelectedRowKeys([]);
                    setSelectedRows([]);
                }
            });
        } else {
            api.error({
                message: <label>Error</label>,
                description: <label>Please select CheckSkins</label>
            })
        }
    }

    const handleOk = () => {
        setVisible(false);
        setAllClear();
    }

    const handleCancel = () => {
        setVisible(false);
        setAllClear();
    }

    const setAllClear = () => {
        setPhoto("");
        setSelectedRowKeys([]);
        setSelectedRows([]);
    }

    const handleDoctorOk = async () => {
        let ids = [];
        let doctor = await DataStore.query(Doctor, doctorvalue);
        ids = doctor.checkskinsID;
        if (ids.length) {
            ids = [...ids, selectedRows[0].id];
        } else {
            ids = [selectedRows[0].id];
        }

        await DataStore.save(Doctor.copyOf(doctor, item => {
            item.checkskinsID = ids;
        })).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
        const checkskin = await DataStore.query(CheckSkin, selectedRows[0].id);
        DataStore.save(CheckSkin.copyOf(checkskin, item => {
            item.doctorID = doctorvalue;
        })).then(res => {
            getCheckSkin();
            api.success({
                message: <label>Success</label>,
                description: <label>Correctly Add Doctor.</label>,
                duration: 3
            })

            setAllClear();
        }).catch(err => {
            api.error({
                message: <label>Error</label>,
                description: <label>{err}</label>,
            })
        })
        setDoctorModal(false);
    }

    const handleDoctorCancel = () => {
        setDoctorModal(false)
        setDoctorValue("");
        setAllClear();
    }

    const onChangeRadio = (e) => {
        setDoctorValue(e.target.value)
    }

    const columns = [
        {
            title: 'Submitted',
            dataIndex: 'createdAt',
            render: (val) => moment(val).format("MM/DD/YYYY, hh:mm"),
            sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix()
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email)
        },
        {
            title: 'Age',
            dataIndex: 'age',
            sorter: (a, b) => a.age - b.age
        },
        {
            title: 'gender',
            dataIndex: 'gender',
            sorter: (a, b) => a.gender.localeCompare(b.gender)
        },
        {
            title: 'Type',
            dataIndex: 'type',
            sorter: (a, b) => a.type.localeCompare(b.type)
        },
        {
            title: 'Usercode',
            dataIndex: 'usercode',
            sorter: (a, b) => a.usercode.localeCompare(b.usercode)
        },
        {
            title: 'CustomerID',
            dataIndex: 'customer_id',
            sorter: (a, b) => a.customer.localeCompare(b.customer)
        },
        {
            title: 'CheckSkinStatus',
            dataIndex: 'checkskinstatus',
            sorter: (a, b) => a.checkskinstatus.localeCompare(b.checkskinstatus)
        },
        {
            title: 'Payment',
            dataIndex: 'payment_status',
            sorter: (a, b) => a.payment_status.localeCompare(b.payment_status)
        },
        {
            title: 'Doctor Name',
            dataIndex: 'doctorName',
            sorter: (a, b) => a.doctorName.localeCompare(b.doctorName)
        }
    ];

    return (
        <React.Fragment>
            {contextHolder}
            <Layout>
                <Header>
                    <Navbar />
                </Header>
                <Content>
                    <Layout>
                        <Sider>
                            <SideBar navitem="patient" />
                        </Sider>
                        <Content>
                            <div className='p-4'>
                                <h1>Patient</h1>
                                <Space className='mt-4 d-flex flex-row justify-content-end'>
                                    <Button onClick={handleView}>View</Button>
                                    <Button onClick={handleAddDoctor}>Add Doctor</Button>
                                    <Button onClick={handlerefund}>Refund</Button>
                                    <Button onClick={handleDelete}>Delete</Button>
                                </Space>
                                <Table className='mt-3' rowSelection={rowSelection} columns={columns} dataSource={patient_table} scroll={{ x: 1200 }} />
                            </div>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Modal title="Patient" visible={isVisible} onOk={handleOk} onCancel={handleCancel} width="900px">
                <Form layout='vertical'>
                    <img src={isPhoto} alt='checkskin' width="250px" height="250px" style={{ borderRadius: "5px" }} />
                    {isType ?
                        <Row gutter={32} className="mt-3">
                            <Col md={12}>
                                <Row gutter={16}>
                                    <Col md={12}>
                                        <Form.Item label="Age" name="age" rules={[{ required: true, message: "" }]}>
                                            <div>
                                                <InputNumber min={0} max={99} className='w-100' placeholder="Enter age" value={isAge} readOnly={true} />
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Item label="Gender" className='w-100' name="gender" rules={[{ required: true, message: "" }]}>
                                            <div>
                                                <Select className='w-100' placeholder="Choose" value={isGender} disabled={true}>
                                                    <Select.Option key={GenderEnum.MALE}>Male</Select.Option>
                                                    <Select.Option key={GenderEnum.FEMALE}>Female</Select.Option>
                                                </Select>
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="Email" name="email" rules={[{ required: true, message: "" }]}>
                                            <div>
                                                <Input className='w-100' type="email" placeholder="Enter email" value={isEmail} readOnly={true} />
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="How long have you had this rash?" name="howLongSkin" rules={[{ required: true, message: "" }]}>
                                            <div>
                                                <Select className='w-100' placeholder="Choose" value={isLong} disabled={true}>
                                                    {jsonData.howLogSkin && jsonData.howLogSkin.map((item) => <Select.Option key={item.key}>{item.value}</Select.Option>)}
                                                </Select>
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="Usercode" name="usercode" rules={[{ required: true, message: "" }]}>
                                            <div>
                                                <Input className='w-100' placeholder="Enter usercode" value={isUsercode} readOnly={true} />
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="CheckSkinStatus" name="status" rules={[{ required: true, message: "" }]}>
                                            <div>
                                                <Select className='w-100' placeholder="Choose" value={isCheckSkinStatus} disabled={true}>
                                                    <Select.Option key={CheckSkinStatus.ANSWERED}>Answered</Select.Option>
                                                    <Select.Option key={CheckSkinStatus.OPENED}>Opened</Select.Option>
                                                </Select>
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="DoctorAnswer" name="answer" rules={[{ required: true, message: "" }]}>
                                            <div>
                                                <Input.TextArea className='w-100 text-area-class' placeholder="Doctor Answer" value={isDoctorAnswer} readOnly={true} />
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="Where is this rash currently located on your body?">
                                            <Row>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isRashLocation.scalp} disabled={true} /><label>Scalp</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isRashLocation.face} disabled={true} /><label>Face</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isRashLocation.torso} disabled={true} /><label>Torso</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isRashLocation.arms} disabled={true} /><label>Arms</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isRashLocation.legs} disabled={true} /><label>Legs</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isRashLocation.palmsOrSoles} disabled={true} /><label>Palms or Soles</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isRashLocation.other} disabled={true} /><label>Other (eg. Nails, Hair, mucosal surface)</label></Space>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="Any relevant information you want to add?" name="relevant">
                                            <div>
                                                <Input.TextArea rows={4} className='w-100 text-area-class' placeholder="Enter additional information" value={isRelevant} readOnly={true} />
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12}>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="How this rash currently distributed on your body?">
                                            <Row>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isDistributed.generalized} disabled={true} /><label>Generalized</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isDistributed.localized} disabled={true} /><label>Localized</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isDistributed.symmetric} disabled={true} /><label>Symmetric</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isDistributed.unilateral} disabled={true} /><label>Unilateral</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isDistributed.blood} disabled={true} /><label>Skin folds</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isDistributed.sun} disabled={true} /><label>On sun exposed areas</label></Space>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="How could you define this rash type?">
                                            <Row>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isRashType.flat} disabled={true} /><label>Flat</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isRashType.papules} disabled={true} /><label>Papules</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isRashType.plaque} disabled={true} /><label>Palpable plaque</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isRashType.blister} disabled={true} /><label>Blisters</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isRashType.pustules} disabled={true} /><label>Pustules</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isRashType.wheals} disabled={true} /><label>Wheals</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isRashType.scaling} disabled={true} /><label>Scaling</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isRashType.scarring} disabled={true} /><label>Scarring</label></Space>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="What symptoms do you feel around this rash?">
                                            <Row>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isSymptoms.itch} disabled={true} /><label>Itch</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isSymptoms.pain} disabled={true} /><label>Pain</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isSymptoms.burning} disabled={true} /><label>Burning</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isSymptoms.bleeding} disabled={true} /><label>Bleeding</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isSymptoms.systemic} disabled={true} /><label>Systemic symptoms (eg. fever, malaise, other)</label></Space>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="How severe this rash felt?" name="severe" rules={[{ required: true, message: "" }]}>
                                            <div>
                                                <Select className='w-100' placeholder="Choose" value={isSevere} disabled={true}>
                                                    {jsonData.severe && jsonData.severe.map((item) => <Select.Option key={item.key}>{item.value}</Select.Option>)}
                                                </Select>
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="Payment" name="paymentstatus" rules={[{ required: true, message: "" }]}>
                                            <div>
                                                <Select className='w-100' placeholder="Choose" value={isPaymentStatus} disabled={true}>
                                                    <Select.Option key={PaymentStatus.PAID}>Paid</Select.Option>
                                                    <Select.Option key={PaymentStatus.REFUND}>Refund</Select.Option>
                                                </Select>
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                        </Row> : <Row gutter={32} className="mt-3">
                            <Col md={12}>
                                <Row gutter={16}>
                                    <Col md={12}>
                                        <Form.Item label="Age" name="age" rules={[{ required: true, message: "" }]}>
                                            <div>
                                                <InputNumber min={0} max={99} className='w-100' placeholder={"Enter age"} value={isAge} readOnly={true} />
                                            </div>
                                        </Form.Item>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Item label="Gender" className='w-100' name="gender" rules={[{ required: true, message: "" }]}>
                                            <div>
                                                <Select className='w-100' placeholder="Choose" value={isGender} disabled={true}>
                                                    <Select.Option key={GenderEnum.MALE}>Male</Select.Option>
                                                    <Select.Option key={GenderEnum.FEMALE}>Female</Select.Option>
                                                </Select>
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="Email address" name="email" rules={[{ required: true, message: "" }]}>
                                            <div>
                                                <Input className='w-100' type="email" placeholder="Enter email" value={isEmail} readOnly={true} />
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="Usercode" name="usercode" rules={[{ required: true, message: "" }]}>
                                            <div>
                                                <Input className='w-100' placeholder="Enter usercode" value={isUsercode} readOnly={true} />
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="CheckSkinStatus" name="status" rules={[{ required: true, message: "" }]}>
                                            <div>
                                                <Select className='w-100' placeholder="Choose" value={isCheckSkinStatus} disabled={true}>
                                                    <Select.Option key={CheckSkinStatus.ANSWERED}>Answered</Select.Option>
                                                    <Select.Option key={CheckSkinStatus.OPENED}>Opened</Select.Option>
                                                </Select>
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="DoctorAnswer" name="answer" rules={[{ required: true, message: "" }]}>
                                            <div>
                                                <Input.TextArea className='w-100 text-area-class' placeholder="Doctor Answer" value={isDoctorAnswer} readOnly={true} />
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="How long have you had this mole?" name="howLongSkin" rules={[{ required: true, message: "" }]}>
                                            <div>
                                                <Select className='w-100' placeholder="Choose" value={isLong} disabled={true}>
                                                    {jsonData.howLogSkin && jsonData.howLogSkin.map((item) => <Select.Option key={item.key}>{item.value}</Select.Option>)}
                                                </Select>
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12}>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="Have there been cases of melanoma(black skin cancer) in your family or have you been affected yourself?" name="melanoma" rules={[{ required: true, message: "" }]}>
                                            <div>
                                                <Select className='w-100' placeholder="Choose" value={isMelanoma} disabled={true}>
                                                    {jsonData.melanoma && jsonData.melanoma.map((item) => <Select.Option key={item.key}>{item.value}</Select.Option>)}
                                                </Select>
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="Do you have skin and birthmarks checked regularly by a dermatologist?" name="dermatologist" rules={[{ required: true, message: "" }]}>
                                            <div>
                                                <Select className='w-100' placeholder="Choose" value={isDermatologist} disabled={true}>
                                                    {jsonData.dermatologist && jsonData.dermatologist.map((item) => <Select.Option key={item.key}>{item.value}</Select.Option>)}
                                                </Select>
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="Please enter the maximum diameter of your mole (in mm).">
                                            <div className='mt-3'>
                                                <label><span>{sliderValue}</span>mm</label>
                                                <Slider min={1} max={30} tipFormatter={null} value={sliderValue} />
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="Has your mole changed in relation to the following factors?">
                                            <Row>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isFactor.colour} /><label>Colour</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isFactor.shape} /><label>Shape</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isFactor.size} /><label>Size</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isFactor.itching} /><label>Itching</label></Space>
                                                    </Row>
                                                </Col>
                                                <Col md={24} className="mt-2">
                                                    <Row gutter={8}>
                                                        <Space><Switch checked={isFactor.blood} /><label>Blood Discharge</label></Space>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col md={24}>
                                        <Form.Item label="Payment" name="paymentstatus" rules={[{ required: true, message: "" }]}>
                                            <div>
                                                <Select className='w-100' placeholder="Choose" value={isPaymentStatus} disabled={true}>
                                                    <Select.Option key={PaymentStatus.PAID}>Paid</Select.Option>
                                                    <Select.Option key={PaymentStatus.REFUND}>Refund</Select.Option>
                                                </Select>
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    }
                </Form>
            </Modal>
            <Modal title="Add Doctor" visible={doctorModal} onOk={handleDoctorOk} onCancel={handleDoctorCancel}>
                <h3>Clinic Name: {isClinicName}</h3>
                <div className='mt-4'>
                    {isDoctorNames.length !== 0 ? <Radio.Group onChange={onChangeRadio} value={doctorvalue}>
                        <Space direction='vertical'>
                            {isDoctorNames.map((item, key) => {
                                return <Radio value={item.id} className="mt-3 doctor-name-radio" key={key}><span>{item.firstname} {item.lastname}</span></Radio>
                            })}
                        </Space>
                    </Radio.Group>
                        : <>No Data</>}
                </div>
            </Modal>
        </React.Fragment>
    )
}

export default Patient;
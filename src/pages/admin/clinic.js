import React, { useEffect, useState } from 'react';
import { Row, Col, Layout, Table, Tag, Space, Button, Modal, notification, Form, Input, Select, Switch, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doctorLoginHeader } from '../../reducer/HeaderReducer';
import SideBar from './layout/sidebar';
import Navbar from './layout/navbar';
import { DataStore } from 'aws-amplify';
import { Clinic, ClinicType, Doctor } from '../../models';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const AdminClinic = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const [clinic_table, setClinicTable] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isVisible, setVisible] = useState(false);
    const [clinic_name, setClinicName] = useState("");
    const [description, setDescription] = useState("");
    const [rateInAus, setRateInAus] = useState(0);
    const [taxInAus, setTaxInAus] = useState(0);
    const [clinic_type, setClinicType] = useState("");
    const [isActive, setActive] = useState(false);
    const [isView, setView] = useState(false);
    const [refundAnswer, setRefundAnswer] = useState("");
    const [firstAnswer, setFirstAnswer] = useState("");
    const [secondAnswer, setSecondAnswer] = useState("");
    const [modalStatus, setModalStatus] = useState("");
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isTitle, setTitle] = useState("");

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Description',
            dataIndex: 'description',
            width: "30%",
            // sorter: (a, b) => a.description.localeCompare(b.description)
        },
        {
            title: 'Active',
            dataIndex: 'active',
            render: (val) => val ? <Tag color="green">True</Tag> : <Tag color="red">False</Tag>,
            sorter: (a, b) => a.active - b.active
        },
        {
            title: 'RateInAus',
            dataIndex: 'rateInAus',
            sorter: (a, b) => a.rateInAus - b.rateInAus
        },
        {
            title: 'TaxInAus',
            dataIndex: 'taxInAus',
            sorter: (a, b) => a.taxInAus - b.taxInAus
        },
        {
            title: 'Type',
            dataIndex: 'type',
            render: (val) => <Tag color="cyan">{val}</Tag>,
            sorter: (a, b) => a.type.localeCompare(b.type)
        },
        {
            title: 'Doctors',
            dataIndex: 'doctorsID',
            render: (val) => val ? val.length : 0,
            sorter: (a, b) => a.doctorsID.length - b.doctorsID.length
        },
    ];

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
            getClinic();
        }
    }, []);

    const getClinic = async () => {
        const clinic_data = await DataStore.query(Clinic);

        let data = clinic_data.map((item, key) => {
            return {
                ...item,
                key: key + 1,
            };
        })
        setClinicTable(data);
    }

    const handleView = () => {
        setModalStatus("view");
        setTitle("Clinic View");
        setView(true);
        if (selectedRowKeys.length === 1) {
            setVisible(true);
            setClinicName(selectedRows[0].name);
            setDescription(selectedRows[0].description);
            setRateInAus(selectedRows[0].rateInAus);
            setTaxInAus(selectedRows[0].taxInAus);
            setClinicType(selectedRows[0].type);
            setActive(selectedRows[0].active);
            selectedRows[0].standardResponses.map((item) => {
                if (item.value === -1) {
                    setRefundAnswer(item.answer)
                }
                if (item.value === 1) {
                    setFirstAnswer(item.answer)
                }
                if (item.value === 2) {
                    setSecondAnswer(item.answer);
                }
            })
        } else {
            api.error({
                message: <label>Error</label>,
                description: <label>Please select one Row</label>
            })
        }
    }

    const handleAdd = () => {
        setTitle("Clinic Add");
        setModalStatus("add");
        setView(false);
        setVisible(true);
    }

    const handleEdit = () => {
        setTitle("Clinic Edit");
        setModalStatus("edit");
        setView(false);
        if (selectedRowKeys.length === 1) {
            setVisible(true);
            setClinicName(selectedRows[0].name);
            setDescription(selectedRows[0].description);
            setRateInAus(selectedRows[0].rateInAus);
            setTaxInAus(selectedRows[0].taxInAus);
            setClinicType(selectedRows[0].type);
            setActive(selectedRows[0].active);
            selectedRows[0].standardResponses.map((item) => {
                if (item.value === -1) {
                    setRefundAnswer(item.answer)
                }
                if (item.value === 1) {
                    setFirstAnswer(item.answer)
                }
                if (item.value === 2) {
                    setSecondAnswer(item.answer);
                }
            })
        } else {
            api.error({
                message: <label>Error</label>,
                description: <label>Please select one Clinic!</label>
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
                    selectedRows.map(async (item) => {
                        const modelDelete = await DataStore.query(Clinic, item.id);
                        DataStore.delete(modelDelete);
                        getClinic();
                    })
                    selectClear();
                    api.success({
                        message: <label>Success</label>,
                        description: <label>Correctly delete clnic.</label>,
                    })
                },
                onCancel: () => {
                    selectClear();
                }
            });
        } else {
            api.error({
                message: <label>Error</label>,
                description: <label>Please select Rows</label>
            })
        }

    }

    const selectClear = () => {
        setSelectedRows([]);
        setSelectedRowKeys([]);

    }

    const handleOk = async () => {
        if (!isView) {
            setConfirmLoading(true);
            if (clinic_name && refundAnswer && firstAnswer && secondAnswer && rateInAus && taxInAus && clinic_type) {
                let response = [];
                response.push({ value: -1, answer: refundAnswer });
                response.push({ value: 1, answer: firstAnswer });
                response.push({ value: 2, answer: secondAnswer });
                if (modalStatus === "add") {
                    DataStore.save(
                        new Clinic({
                            name: clinic_name,
                            description: description,
                            standardResponses: response,
                            active: isActive,
                            rateInAus: rateInAus,
                            taxInAus: taxInAus,
                            type: clinic_type
                        })
                    ).then(res => {
                        setConfirmLoading(false);
                        getClinic();
                        selectClear();
                        api.success({
                            message: <label>Success</label>,
                            description: <label>Correctly add clnic.</label>,
                        })
                    }).catch(err => {
                        api.error({
                            message: <label>Error</label>,
                            description: <label>{err}</label>,
                        })
                    })
                }
                if (modalStatus === "edit") {
                    const model = await DataStore.query(Clinic, (c) => c.id('eq', selectedRows[0].id))

                    DataStore.save(Clinic.copyOf(model[0], item => {
                        item.name = clinic_name;
                        item.description = description;
                        item.standardResponses = response;
                        item.active = isActive;
                        item.rateInAus = rateInAus;
                        item.taxInAus = taxInAus;
                        item.type = clinic_type;
                    })).then(res => {
                        setConfirmLoading(false);
                        getClinic();
                        selectClear();
                        api.success({
                            message: <label>Success</label>,
                            description: <label>Correctly update clinic.</label>,
                            duration: 3
                        })
                    }).catch(err => {
                        api.error({
                            message: <label>Error</label>,
                            description: <label>{err}</label>,
                        })
                    })
                }
                setVisible(false);
                allClear();
            } else {
                if (clinic_name === "") {
                    api.error({
                        message: <label>Error</label>,
                        description: <label>Please input Clinic name</label>
                    })
                } else if (refundAnswer === "" || firstAnswer === "" || secondAnswer === "") {
                    api.error({
                        message: <label>Error</label>,
                        description: <label>Please input Answers</label>
                    })
                } else if (rateInAus === "") {
                    api.error({
                        message: <label>Error</label>,
                        description: <label>Please input rate</label>
                    })
                } else if (taxInAus === "") {
                    api.error({
                        message: <label>Error</label>,
                        description: <label>Please input tax</label>
                    })
                } else if (clinic_type === "") {
                    api.error({
                        message: <label>Error</label>,
                        description: <label>Please input Clinic type</label>
                    })
                }

                setConfirmLoading(false);
            }

        } else {
            setVisible(false);
            selectClear();
            allClear();
        }
    };

    const handleCancel = () => {
        allClear();
        selectClear();
        setVisible(false);
    };

    const allClear = () => {
        setClinicName("");
        setDescription("");
        setRefundAnswer("");
        setFirstAnswer("");
        setSecondAnswer("");
        setRateInAus(0);
        setTaxInAus(0);
        setClinicType("");
        setActive(false);
    }

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
                            <SideBar navitem="clinic" />
                        </Sider>
                        <Content>
                            <div className='p-4'>
                                <h1>Clinic</h1>
                                <Space className='mt-4 d-flex flex-row justify-content-end'>
                                    <Button onClick={handleView}>View</Button>
                                    <Button onClick={handleAdd}>Add</Button>
                                    <Button onClick={handleEdit}>Edit</Button>
                                    <Button onClick={handleDelete}>Delete</Button>
                                </Space>
                                <Table className='mt-3' rowSelection={rowSelection} columns={columns} dataSource={clinic_table} scroll={{ x: 1200 }}  />
                            </div>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Modal title={isTitle} visible={isVisible} onOk={handleOk} onCancel={handleCancel} confirmLoading={confirmLoading} width="800px">
                <Form onFinish={handleOk}>
                    <Row>
                        <Col md={12}>
                            <Form.Item label="Clinic Name" rules={[{ required: true, message: "" }]}>
                                <Input type="text" value={clinic_name} onChange={(e) => setClinicName(e.target.value)} placeholder="Enter clinic name" readOnly={isView} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <Form.Item label="Description" >
                                <Input.TextArea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className='w-100 text-area-class' type="text" placeholder="Enter description" readOnly={isView} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={24}>
                            <Form.Item label="StandradResponse" rules={[{ required: true, message: "" }]}>
                                <Row className="mt-2">
                                    <Col md={4}>
                                        <Space><label>values: -1</label></Space>
                                    </Col>
                                    <Col md={20}>
                                        <Row >
                                            <Col md={3}>
                                                <label>Answer:</label>
                                            </Col>
                                            <Col md={21}>
                                                <Input.TextArea rows={2} className='w-100 text-area-class' value={refundAnswer} onChange={(e) => setRefundAnswer(e.target.value)} type="text" placeholder="Enter Refund Answer" readOnly={isView} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col md={4}>
                                        <Space><label>values: 1</label></Space>
                                    </Col>
                                    <Col md={20}>
                                        <Row >
                                            <Col md={3}>
                                                <label>Answer:</label>
                                            </Col>
                                            <Col md={21}>
                                                <Input.TextArea rows={2} className='w-100 text-area-class' value={firstAnswer} onChange={(e) => setFirstAnswer(e.target.value)} type="text" placeholder="Enter Doctor Answer" readOnly={isView} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col md={4}>
                                        <Space><label>values: 2</label></Space>
                                    </Col>
                                    <Col md={20}>
                                        <Row >
                                            <Col md={3}>
                                                <label>Answer:</label>
                                            </Col>
                                            <Col md={21}>
                                                <Input.TextArea rows={2} className='w-100 text-area-class' value={secondAnswer} onChange={(e) => setSecondAnswer(e.target.value)} type="text" placeholder="Enter Doctor Answer" readOnly={isView} />
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col md={12}>
                            <Form.Item label="RateInAus" rules={[{ required: true, message: "" }]}>
                                <InputNumber className='w-100' value={rateInAus} onChange={(e) => setRateInAus(e)} placeholder="Enter RateInAus" readOnly={isView} />
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item label="TaxInAus" rules={[{ required: true, message: "" }]}>
                                <InputNumber className='w-100' value={taxInAus} onChange={(e) => setTaxInAus(e)} placeholder="Enter TaxInAus" readOnly={isView} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col md={12}>
                            <Form.Item label="Clinic Type" rules={[{ required: true, message: "" }]}>
                                <Select className='w-100' value={clinic_type} placeholder="Choose" disabled={isView} onChange={(e) => setClinicType(e)}>
                                    <Select.Option key={ClinicType.MOLE}>Mole</Select.Option>
                                    <Select.Option key={ClinicType.RASH}>Rash</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={12}>
                            <Form.Item label="Clinic Active">
                                <Switch checked={isActive} disabled={isView} onChange={(e) => setActive(e)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button size="large" variant="filled" htmlType='submit' style={{ display: "none" }}>Continue</Button>
                </Form>
            </Modal>
        </React.Fragment>
    )
}

export default AdminClinic;
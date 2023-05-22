import React, { useEffect, useState } from 'react';
import { Row, Col, Layout, Table, Button, Space, Tag, Modal, Form, notification, Input, Select, DatePicker, Switch, Transfer, Checkbox, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doctorLoginHeader } from '../../reducer/HeaderReducer';
import { DataStore } from 'aws-amplify';
import { Clinic, Doctor, GenderEnum, CheckSkin, PaymentStatus, CheckSkinType, ClinicType, Transaction } from '../../models';
import SideBar from './layout/sidebar';
import Navbar from './layout/navbar';
import jsonData from '../../assets/json/jsonData.json';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import '../../assets/css/admin/doctor.css';

const { Header, Sider, Content } = Layout

const AdminDoctor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [doctor_table, setDoctorTable] = useState([]);
    const [isVisible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    // const [confirmLoading1, setConfirmLoading1] = useState(false);
    const [modalStatus, setModalStatus] = useState(0);
    const [isTitle, setTitle] = useState("");
    const [isFirstname, setFirstName] = useState("");
    const [isLastname, setLastName] = useState("");
    const [isGender, setGender] = useState("");
    const [isEmail, setEmail] = useState("");
    const [isBirthday, setBirthday] = useState("");
    const [isPhone, setPhone] = useState("");
    const [isAddress, setAddress] = useState("");
    const [isBankdetail, setBankdetail] = useState("");
    const [isSpecialised, setSpecialised] = useState("");
    const [isStatus, setStatus] = useState(false);
    const [isClinic, setClinic] = useState([]);
    const [ClinicName, setClinicName] = useState([]);
    const [isClinicName, setIsClinicName] = useState([]);
    const [isSame, setSame] = useState("");
    const [isCheckSkin, setCheckSkin] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [isAllCheckSkin, setAllCheckSkin] = useState(0);
    const [isCompleteCheckSkin, setCompleteCheckSkin] = useState(0);
    const [isRefundCheckSkin, setRefundCheckSkin] = useState(0);
    const [isPayRate, setPayRate] = useState(0);
    const [isPayModal, setPayModal] = useState(false);
    const [isCheckSkinList, setCheckSkinList] = useState([]);
    const [isDoctorPayment, setDoctorPayment] = useState(false);
    const [isPayDoctorTable, setPayDoctorTable] = useState([]);
    const [isTotalPay, setTotalPay] = useState(0);
    const [isDoctorName, setDoctorName] = useState("");
    const [isDcotorBankDetail, setDoctorBankDetail] = useState("");
    const [isPaymentDate, setPaymentDate] = useState("");
    const [isConfirmCheck, setConfirmCheck] = useState(true);
    const [isReceiptNo, setReceiptNo] = useState("");

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (val, record) => <span className='text-nowrap'>{record.firstname} {record.lastname}</span>,
            sorter: (a, b) => (a.firstname + a.lastname).localeCompare(b.firstname + b.lastname)
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email)
        },
        {
            title: 'gender',
            dataIndex: 'gender',
            sorter: (a, b) => a.gender.localeCompare(b.gender)
        },
        {
            title: 'Birthday',
            dataIndex: 'dob',
            sorter: (a, b) => moment(a.dob).unix() - moment(b.dob).unix()
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.localeCompare(b.phone)
        },
        {
            title: 'Pay Rate',
            dataIndex: 'payRate',
            sorter: (a, b) => a.payRate - b.payRate
        },
        {
            title: 'Specialised',
            dataIndex: 'specialised',
            render: (val) => val === "1" ? <Tag color="blue">Mole</Tag> : val === "2" ? <Tag color="blue">Rash</Tag> : val === "3" ? <Tag color="blue">Both</Tag> : "",
            sorter: (a, b) => a.specialised.localeCompare(b.specialised)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (val) => val ? <Tag color="green">True</Tag> : <Tag color="red">False</Tag>,
            sorter: (a, b) => a.status - b.status
        },
        {
            title: 'Clinic',
            dataIndex: 'clinic',
            sorter: (a, b) => a.clinic.localeCompare(b.clinic)
        },
    ];

    const doctorPayColumns = [
        {
            title: 'ITEM',
            dataIndex: 'item',
        },
        {
            title: 'QTY',
            dataIndex: 'qty',
        },
        {
            title: 'UNIT PRICE',
            dataIndex: 'unit',
        },
        {
            title: 'TOTAL(AUD)',
            dataIndex: 'total',
        },
    ]

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
            getDoctor();
        }
    }, []);

    const getDoctor = async () => {
        const doctor_data = await DataStore.query(Doctor);
        const clinic_data = await DataStore.query(Clinic);
        const clinic_name = [];
        clinic_data.map((item) => {
            clinic_name.push({
                id: item.id,
                name: item.name
            })
        })
        await DataStore.start();
        let data = await Promise.all(doctor_data.map(async (item, key) => {
            let clinic_name = JSON.parse(item.clinicID);
            let clinic = null;
            if (clinic_name !== null) {
                if (clinic_name.length === 1) {
                    clinic = (await DataStore.query(Clinic, clinic_name[0])).name
                } else if (clinic_name.length === 2) {
                    clinic = (await DataStore.query(Clinic, clinic_name[0])).name + '/' + (await DataStore.query(Clinic, clinic_name[1])).name
                }
            }

            return {
                ...item,
                key: key + 1,
                clinic: clinic
            }
        }))
        setClinicName(clinic_name);
        setDoctorTable(data);
    }

    const getCheckSkin = async (doctor) => {
        let source_data = [];
        let clinicSource = JSON.parse(doctor.clinicID);
        let doctor_checkSkin = await DataStore.query(CheckSkin, (c) => c.doctorID('eq', doctor.id));
        await DataStore.start();
        await Promise.all(clinicSource.map(async (clinic_id) => {
            let checkSkin_data = await DataStore.query(CheckSkin, (c) => c.clinicID('eq', clinic_id));
            checkSkin_data.map((item, key) => {
                if (item.doctorID === null) {
                    source_data.push(item);
                }
            })
        }))
        let all_checkskin = source_data.concat(doctor_checkSkin);
        let data = all_checkskin.map((item, key) => (
            {
                ...item,
                key: key,
                disabled: item.doctorAnswer !== null || item.payment_status === PaymentStatus.REFUND ? true : false
            }
        ))
        let initial = data.filter((item) => item.doctorID === doctor.id).map((item) => item.key);
        setDataSource(data);
        setTargetKeys(initial);
    }

    const handleView = async () => {
        setTitle("Doctor View");
        setModalStatus(1);
        let clinic_name;
        if (selectedRows.length === 1) {
            let all_checkskin = selectedRows[0]?.checkskinsID;
            let refundanswer = 0;
            let completeanswer = 0;
            if(all_checkskin) {
                await Promise.all(all_checkskin?.map(async (item) => {
                    let checkanswer = await DataStore.query(CheckSkin, item);
                    if (checkanswer.doctorAnswer === -1) {
                        refundanswer++;
                    } else if (checkanswer.doctorAnswer !== null) {
                        completeanswer++;
                    }
                }));
            }
            setRefundCheckSkin(refundanswer);
            setCompleteCheckSkin(completeanswer);
            setFirstName(selectedRows[0].firstname);
            setLastName(selectedRows[0].lastname);
            setGender(selectedRows[0].gender);
            setEmail(selectedRows[0].email);
            setBirthday(selectedRows[0].dob);
            setPhone(selectedRows[0].phone);
            setAddress(selectedRows[0].address);
            setBankdetail(selectedRows[0].bankdetail);
            setSpecialised(selectedRows[0].specialised);
            setStatus(selectedRows[0].status);
            setClinic(JSON.parse(selectedRows[0].clinicID));
            setAllCheckSkin(selectedRows[0]?.checkskinsID?.length);
            setPayRate(selectedRows[0].payRate);
            setVisible(true);
            if (selectedRows[0].specialised === "1") {
                clinic_name = ClinicName.filter(item => item.name === "Mole");
            } else if (selectedRows[0].specialised === "2") {
                clinic_name = ClinicName.filter(item => item.name === "Rash");
            } else {
                clinic_name = ClinicName;
            }
            setIsClinicName(clinic_name)
        } else {
            api.error({
                message: <label>Error</label>,
                description: <label>Please select doctor</label>
            })
        }
    }

    const handleAdd = () => {
        setTitle("Doctor Add");
        setModalStatus(2);
        setVisible(true);
    }

    const handleEdit = () => {
        setTitle("Doctor Edit")
        setModalStatus(3);
        let clinic_name;
        if (selectedRows.length === 1) {
            if (selectedRows[0].clinicID === null) {
                setClinic([]);
                setSame([]);
            } else {
                setClinic(JSON.parse(selectedRows[0].clinicID));
                setSame(JSON.parse(selectedRows[0].clinicID));
            }
            setVisible(true);
            setFirstName(selectedRows[0].firstname);
            setLastName(selectedRows[0].lastname);
            setGender(selectedRows[0].gender);
            setEmail(selectedRows[0].email);
            setBirthday(selectedRows[0].dob);
            setPhone(selectedRows[0].phone);
            setAddress(selectedRows[0].address);
            setBankdetail(selectedRows[0].bankdetail);
            setSpecialised(selectedRows[0].specialised);
            setStatus(selectedRows[0].status);
            setPayRate(selectedRows[0].payRate);
            if (selectedRows[0].specialised === "1") {
                clinic_name = ClinicName.filter(item => item.name === "Mole");
            } else if (selectedRows[0].specialised === "2") {
                clinic_name = ClinicName.filter(item => item.name === "Rash");
            } else {
                clinic_name = ClinicName;
            }
            setIsClinicName(clinic_name);
        } else {
            api.error({
                message: <label>Error</label>,
                description: <label>Please select doctor</label>
            })
        }
    }

    const setAllClear = () => {
        setFirstName("");
        setLastName("");
        setGender("");
        setEmail("");
        setBirthday("")
        setPhone("");
        setAddress("");
        setBankdetail("");
        setSpecialised("");
        setStatus(false);
        setClinic([]);
        setAllCheckSkin(0);
        setCompleteCheckSkin(0);
        setRefundCheckSkin(0);
        setPayRate(0);
        setSelectedRowKeys([]);
        setSelectedRows([]);
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
                        const modelDelete = await DataStore.query(Doctor, item.id);
                        DataStore.delete(modelDelete);
                        const clinicIDs = JSON.parse(item.clinicID);
                        await Promise.all(clinicIDs.map(async (clinic_id) => {
                            const remove_model = await DataStore.query(Clinic, clinic_id);
                            let old_arr = JSON.parse(JSON.stringify(remove_model["doctorsID"]));
                            if (old_arr.length) {
                                let update_arr = old_arr.filter((item1) => item1 != item.id);
                                console.log(update_arr);
                                DataStore.save(Clinic.copyOf(remove_model, item => {
                                    item.doctorsID = update_arr;
                                }))
                            }

                            getDoctor();
                        }))
                    })
                    setSelectedRowKeys([]);
                    setSelectedRows([]);
                    
                    api.success({
                        message: <label>Success</label>,
                        description: <label>Correctly delete clinic.</label>,
                    })
                },
                onCancel: () => {
                    setSelectedRowKeys([]);
                    setSelectedRows([]);
                }
            });
        } else {
            api.error({
                message: <label>Error</label>,
                description: <label>Please select Doctors</label>
            })
        }
    }

    const updateDoctor = async (previous_clinic, next_clinic, ids) => {
        await DataStore.start();
        let add_model = await DataStore.query(Clinic, next_clinic);
        let new_arr = JSON.parse(JSON.stringify(add_model["doctorsID"]));
        if (new_arr === null) {
            new_arr = [];
        }
        new_arr.push(ids);
        if (previous_clinic) {
            let remove_model = await DataStore.query(Clinic, previous_clinic);
            let old_arr = JSON.parse(JSON.stringify(remove_model["doctorsID"]));
            if (old_arr.length) {
                let update_arr = old_arr.filter((item) => item != ids);
                DataStore.save(Clinic.copyOf(remove_model, item => {
                    item.doctorsID = update_arr;
                }))
            }
        }

        DataStore.save(Clinic.copyOf(add_model, item => {
            item.doctorsID = new_arr;
        }))
    }

    const onOk = async () => {
        await DataStore.start();
        if (modalStatus !== 1) {
            if (!isFirstname) {
                api.error({
                    message: <label>Error</label>,
                    description: <label>Please input first name</label>
                })
            } else if (!isLastname) {
                api.error({
                    message: <label>Error</label>,
                    description: <label>Please input last name</label>
                })
            } else if (!isGender) {
                api.error({
                    message: <label>Error</label>,
                    description: <label>Please select gender</label>
                })
            } else if (!isEmail) {
                api.error({
                    message: <label>Error</label>,
                    description: <label>Please input email</label>
                })
            } else if (!isBirthday) {
                api.error({
                    message: <label>Error</label>,
                    description: <label>Please input birthday</label>
                })
            } else if (!isPhone) {
                api.error({
                    message: <label>Error</label>,
                    description: <label>Please input phone number</label>
                })
            } else if (!isAddress) {
                api.error({
                    message: <label>Error</label>,
                    description: <label>Please input address</label>
                })
            } else if (!isBankdetail) {
                api.error({
                    message: <label>Error</label>,
                    description: <label>Please input bank detail</label>
                })
            } else if (!isSpecialised) {
                api.error({
                    message: <label>Error</label>,
                    description: <label>Please select specialised</label>
                })
            } else if (!isClinic) {
                api.error({
                    message: <label>Error</label>,
                    description: <label>Please select Clinic</label>
                })
            } else {
                setConfirmLoading(true);
                if (modalStatus === 2) {
                    DataStore.save(
                        new Doctor({
                            firstname: isFirstname,
                            lastname: isLastname,
                            gender: isGender,
                            email: isEmail,
                            dob: isBirthday,
                            phone: isPhone,
                            address: isAddress,
                            bankdetail: isBankdetail,
                            specialised: isSpecialised,
                            status: isStatus,
                            clinicID: JSON.stringify(isClinic),
                            payRate: isPayRate
                        })
                    ).then(async (res) => {
                        await Promise.all(isClinic.map(async (clinic_id) => {
                            const model = await DataStore.query(Clinic, clinic_id);
                            let new_arr = JSON.parse(JSON.stringify(model["doctorsID"]));
                            if (new_arr === null) {
                                new_arr = [];
                            }
                            new_arr.push(res.id);
                            DataStore.save(Clinic.copyOf(model, item => {
                                item.doctorsID = new_arr;
                            }))
                        }))
                        setConfirmLoading(false);
                        getDoctor();
                        setVisible(false);
                        setAllClear();
                        api.success({
                            message: <label>Success</label>,
                            description: <label>Correctly add doctor.</label>,
                        });
                    }).catch(err => {
                        setConfirmLoading(false);
                        api.error({
                            message: <label>Error</label>,
                            description: <label>{err}</label>,
                        })
                        setVisible(false);
                    })
                }
                if (modalStatus === 3) {
                    const model = await DataStore.query(Doctor, selectedRows[0].id);
                    DataStore.save(Doctor.copyOf(model, item => {
                        item.firstname = isFirstname;
                        item.lastname = isLastname;
                        item.gender = isGender;
                        item.email = isEmail;
                        item.dob = isBirthday;
                        item.phone = isPhone;
                        item.address = isAddress;
                        item.bankdetail = isBankdetail;
                        item.specialised = isSpecialised;
                        item.status = isStatus;
                        item.clinicID = JSON.stringify(isClinic);
                        item.payRate = isPayRate;
                    })).then(async (res) => {
                        if (isSpecialised !== "3") {
                            if (JSON.stringify(isSame) !== JSON.stringify(isClinic)) {
                                updateDoctor(isSame[0], isClinic[0], res.id);
                            }
                        } else {
                            if (isClinic.length === 2) {
                                if (JSON.stringify(isSame) !== JSON.stringify(isClinic)) {
                                    await Promise.all(isClinic.map(async (clinic_id) => {
                                        let clinics = await DataStore.query(Clinic, clinic_id);
                                        console.log("clinic", clinics);
                                        console.log("id", selectedRows[0].id);
                                        if (!clinics?.doctorsID?.includes(selectedRows[0].id)) {
                                            let new_arr = JSON.parse(JSON.stringify(clinics["doctorsID"]));
                                            console.log(new_arr);
                                            if (new_arr === null) {
                                                new_arr = [];
                                            }
                                            new_arr.push(selectedRows[0].id)
                                            DataStore.save(Clinic.copyOf(clinics, item => {
                                                item.doctorsID = new_arr;
                                            }))
                                        }
                                    }))
                                }
                            } else if (isSame.length === 2) {
                                if (JSON.stringify(isSame) !== JSON.stringify(isClinic)) {
                                    let remove_arr = isSame.filter(function (el) {
                                        return !isClinic.includes(el);
                                    });
                                    updateDoctor(remove_arr[0], isClinic[0], res.id)
                                }
                            } else {
                                if (JSON.stringify(isSame) !== JSON.stringify(isClinic)) {
                                    updateDoctor(isSame[0], isClinic[0], res.id);
                                }
                            }
                        }
                        setConfirmLoading(false);
                        getDoctor();
                        api.success({
                            message: <label>Success</label>,
                            description: <label>Correctly update doctor.</label>,
                            duration: 3
                        })
                        setVisible(false);
                        setAllClear();
                    }).catch(err => {
                        setConfirmLoading(false);
                        api.error({
                            message: <label>Error</label>,
                            description: <label>{err}</label>,
                        })
                        setVisible(false);
                    })
                }
            }
        }
    }

    const onCancel = () => {
        setConfirmLoading(false);
        setVisible(false);
        setAllClear();
    }

    const handleDate = (value, dateString) => {
        setBirthday(dateString);
    }

    const handleCheckSKin = () => {
        if (selectedRows.length === 1) {
            setCheckSkin(true)
            getCheckSkin(selectedRows[0]);
        } else {
            api.error({
                message: <label>Error</label>,
                description: <label>Please select 1 doctor.</label>
            })
        }

    }

    const handleCancel = () => {
        setCheckSkin(false);
        setAllClear();
    }

    const onChangeTransfer = async (nextTargetKeys, direction, moveKeys) => {
        await DataStore.start();
        let checkskin_group = [];
        let data = [];
        let checkskins = [];
        let doctor_data = await DataStore.query(Doctor, selectedRows[0].id);
        dataSource.map((item) => {
            selectedKeys.map((index) => {
                if (item.key === index) {
                    data.push(item)
                }
            })
        })
        let checkskin_ids = data.map((item) => item.id);
        if (direction === "right") {
            checkskins = targetKeys.concat(selectedKeys);
            await Promise.all(checkskin_ids.map(async (item) => {
                let checkskin_data = await DataStore.query(CheckSkin, item);
                DataStore.save(CheckSkin.copyOf(checkskin_data, item => {
                    item.doctorID = doctor_data.id;
                }))
            }))
        } else if (direction === "left") {
            let ids = targetKeys;
            selectedKeys.map((id) => {
                targetKeys.map((item, key) => {
                    if (id === item) {
                        ids.splice(key, 1)
                    }
                })
            })
            checkskins = ids;
            await Promise.all(checkskin_ids.map(async (item) => {
                let checkskin_data = await DataStore.query(CheckSkin, item);
                DataStore.save(CheckSkin.copyOf(checkskin_data, item => {
                    item.doctorID = null;
                }))
            }))

        }

        dataSource.map((item) => {
            checkskins.map((index) => {
                if (item.key === index) {
                    checkskin_group.push(item.id)
                }
            })
        })

        // getCheckSkin(selectedRows[0])

        DataStore.save(Doctor.copyOf(doctor_data, item => {
            item.checkskinsID = checkskin_group;
        })).then(res => {
            api.success({
                message: <label>Success</label>,
                description: <label>Correctly add checkskin.</label>,
                duration: 3
            })
            getDoctor();
        }).catch(err => {
            api.error({
                message: <label>Error</label>,
                description: <label>{err}</label>,
            })
        })

        setTargetKeys(nextTargetKeys);
    };

    const onSelectionChange = (sourceSelectedKeys, targetSelectedKeys) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    }

    const handlePay = async () => {
        await DataStore.start();
        if (selectedRows.length === 1) {
            let checkskin_arr = [];
            let checkskin_mole = 0;
            let checkskin_rash = 0;
            let mole_clinic = await DataStore.query(Clinic, (c) => c.type('eq', ClinicType.MOLE));
            let rash_clinic = await DataStore.query(Clinic, (c) => c.type('eq', ClinicType.RASH));
            let transaction = await DataStore.query(Transaction, (c) => c.DoctorID('eq', selectedRows[0].id));
            if (selectedRows[0].checkskinsID !== null) {
                await Promise.all(selectedRows[0].checkskinsID.map(async (item) => {
                    const checkskin = await DataStore.query(CheckSkin, item);
                    if (checkskin.payment_status === PaymentStatus.COMPLETE) {
                        if (checkskin.type === CheckSkinType.MOLE) {
                            checkskin_mole++;
                        } else {
                            checkskin_rash++;
                        }
                        checkskin_arr.push(checkskin);
                    }
                }))
            }
            let mole_unit = ((mole_clinic[0].rateInAus + mole_clinic[0].taxInAus) * selectedRows[0].payRate).toFixed(2)
            let rash_unit = ((rash_clinic[0].rateInAus + rash_clinic[0].taxInAus) * selectedRows[0].payRate).toFixed(2)
            let table_data = [
                {
                    key: 1,
                    item: "Mole Check",
                    qty: checkskin_mole,
                    unit: mole_unit,
                    total: mole_unit * checkskin_mole
                },
                {
                    key: 2,
                    item: "Rash Check",
                    qty: checkskin_rash,
                    unit: rash_unit,
                    total: rash_unit * checkskin_rash
                },
            ];
            setTotalPay(mole_unit * checkskin_mole + rash_unit * checkskin_rash)
            setPayDoctorTable(table_data);
            setPayModal(true);
            setCheckSkinList(checkskin_arr);
            setDoctorName(selectedRows[0].firstname + ' ' + selectedRows[0].lastname);
            setDoctorBankDetail(selectedRows[0].bankdetail);
            if (transaction.length === 0) {
                setPaymentDate("NA");
            } else {
                setPaymentDate(moment(transaction[transaction.length - 1].createdAt).format("DD/MM/YYYY"));
            }

        } else {
            api.error({
                message: <label>Error</label>,
                description: <label>Please select doctor!</label>
            })
        }
    }

    const handlePayCancel = () => {
        setPayModal(false);
        setDoctorPayment(false);
        setConfirmCheck(true);
        setReceiptNo("");
        setAllClear();
    }

    const handleDoctorPay = () => {
        if (selectedRows[0].payRate !== 0) {
            setDoctorPayment(true);
        } else {
            api.error({
                message: <label>Error</label>,
                description: <label>Please input Doctor pay rate!</label>
            })
        }

    }

    const handleSpecial = (e) => {
        setClinic([])
        setSpecialised(e);
        let clinic_name;
        if (e === "1") {
            clinic_name = ClinicName.filter(item => item.name === "Mole");
        } else if (e === "2") {
            clinic_name = ClinicName.filter(item => item.name === "Rash");
        } else {
            clinic_name = ClinicName;
        }
        setIsClinicName(clinic_name)
    }

    const handleClinicName = (e) => {
        setClinic(e);
    }

    const handlePaidCheck = (e) => {
        setConfirmCheck(!e.target.checked)
    }

    const DoctorPayConfirm = async () => {
        if (isReceiptNo !== "") {
            await DataStore.start();
            let usercodes = [];
            await Promise.all(isCheckSkinList.map(async (checkskin) => {
                await DataStore.save(Clinic.copyOf(checkskin, item => {
                    item.payment_status = PaymentStatus.FINISH
                }));
                usercodes.push(checkskin.usercode)
            }))
            DataStore.save(
                new Transaction({
                    DoctorID: selectedRows[0].id,
                    recept_no: isReceiptNo,
                    usercodes: usercodes,
                    last_payment_date: isPaymentDate,
                    total_amount: isTotalPay
                })
            ).then((res) => {
                api.success({
                    message: <label>Success</label>
                })
                handlePayCancel();
            }).catch((err) => {
                api.error({
                    message: <label>Error</label>,
                    description: <label>{err}</label>
                })
            })
        } else {
            api.error({
                message: <label>Error</label>,
                description: <label>Please input receipt No!</label>,
            })
        }
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
                            <SideBar navitem="doctor" />
                        </Sider>
                        <Content>
                            <div className='p-4'>
                                <h1>Doctor</h1>
                                <Space className='mt-4 d-flex flex-row justify-content-end'>
                                    <Button onClick={handleView}>View</Button>
                                    <Button onClick={handleAdd}>Add</Button>
                                    <Button onClick={handleEdit}>Edit</Button>
                                    <Button onClick={handleCheckSKin}>Add CheckSkin</Button>
                                    <Button onClick={handlePay}>Pay</Button>
                                    <Button onClick={handleDelete}>Delete</Button>
                                </Space>
                                <Table className='mt-3' rowSelection={rowSelection} columns={columns} dataSource={doctor_table} scroll={{ x: 1200 }}  />
                            </div>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Modal title={isTitle} visible={isVisible} onOk={onOk} onCancel={onCancel} confirmLoading={confirmLoading} width="800px">
                <Form onFinish={onOk} layout='vertical'>
                    <Row gutter={24}>
                        <Col md={9}>
                            <Form.Item label="First Name" rules={[{ required: true, message: "" }]}>
                                <Input className='w-100' value={isFirstname} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter first name" readOnly={modalStatus === 1 ? true : false} />
                            </Form.Item>
                        </Col>
                        <Col md={9}>
                            <Form.Item label="Last Name" rules={[{ required: true, message: "" }]}>
                                <Input className='w-100' value={isLastname} onChange={(e) => setLastName(e.target.value)} placeholder="Enter last name" readOnly={modalStatus === 1 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col md={9}>
                            <Form.Item label="Gender" rules={[{ required: true, message: "" }]}>
                                <Select className='w-100' placeholder="Choose" value={isGender} onChange={(e) => setGender(e)} disabled={modalStatus === 1 ? true : false}>
                                    <Select.Option key={GenderEnum.MALE}>Male</Select.Option>
                                    <Select.Option key={GenderEnum.FEMALE}>Female</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={15}>
                            <Form.Item label="Email" rules={[{ required: true, message: "" }]}>
                                <Input className='w-100' type="email" value={isEmail} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" readOnly={modalStatus === 1 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col md={9}>
                            <Form.Item label="Birthday" rules={[{ required: true, message: "" }]}>
                                <DatePicker className="w-100" value={isBirthday === "" ? "" : moment(isBirthday)} format="YYYY-MM-DD" placeholder="YYYY-MM-DD" onChange={handleDate} disabled={modalStatus === 1 ? true : false} />
                            </Form.Item>
                        </Col>
                        <Col md={15}>
                            <Form.Item label="Phone" rules={[{ required: true, message: "" }]}>
                                <Input className='w-100' value={isPhone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Phone Number" readOnly={modalStatus === 1 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col md={24}>
                            <Form.Item label="Address" rules={[{ required: true, message: "" }]}>
                                <Input className='w-100' value={isAddress} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address" readOnly={modalStatus === 1 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col md={24}>
                            <Form.Item label="BankDetail" rules={[{ required: true, message: "" }]}>
                                <Input className='w-100' value={isBankdetail} onChange={(e) => setBankdetail(e.target.value)} placeholder="Enter your bank detail" readOnly={modalStatus === 1 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col md={6}>
                            <Form.Item label="Pay Rate">
                                <InputNumber className='w-100' value={isPayRate} onChange={(e) => setPayRate(e)} readOnly={modalStatus === 1 ? true : false} />
                            </Form.Item>
                        </Col>
                        <Col md={6}>
                            <Form.Item label="Specialised" rules={[{ required: true, message: "" }]}>
                                <Select className='w-100' placeholder="Choose" value={isSpecialised} onChange={handleSpecial} disabled={modalStatus === 1 ? true : false}>
                                    {jsonData.specialised.map((item) => (
                                        <Select.Option key={item.key}>{item.value}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={6}>
                            <Form.Item label="Clinic" rules={[{ required: true, message: "" }]}>
                                <Select mode='multiple' className='w-100' placeholder="Choose" value={isClinic} onChange={handleClinicName} disabled={modalStatus === 1 ? true : false}>
                                    {isClinicName.map((item) => (
                                        <Select.Option key={item.id}>{item.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col md={6}>
                            <Form.Item label="Doctor Status">
                                <Switch checked={isStatus} onChange={(e) => setStatus(e)} disabled={modalStatus === 1 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {modalStatus === 1 && <Row gutter={24}>
                        <Col md={9}>
                            <Form.Item label="All Checkskin" rules={[{ required: true, message: "" }]}>
                                <Input className='w-100' value={isAllCheckSkin ? isAllCheckSkin : 0} readOnly={modalStatus === 1 ? true : false} />
                            </Form.Item>
                        </Col>
                        <Col md={9}>
                            <Form.Item label="Complete" rules={[{ required: true, message: "" }]}>
                                <Input className='w-100' value={isCompleteCheckSkin} readOnly={modalStatus === 1 ? true : false} />
                            </Form.Item>
                        </Col>
                        <Col md={6}>
                            <Form.Item label="Refund" rules={[{ required: true, message: "" }]}>
                                <Input className='w-100' value={isRefundCheckSkin} readOnly={modalStatus === 1 ? true : false} />
                            </Form.Item>
                        </Col>
                    </Row>}
                </Form>
            </Modal>
            <Modal title="Add Checkskin" visible={isCheckSkin} onCancel={handleCancel} footer={false}>
                <Transfer dataSource={dataSource} listStyle={{ width: 300, height: 300 }} titles={['Source', 'Target']} targetKeys={targetKeys} selectedKeys={selectedKeys} onChange={onChangeTransfer} onSelectChange={onSelectionChange} render={(item) => item.usercode + ' / ' + item.type} />
            </Modal>
            <Modal title="Payment" visible={isPayModal} onCancel={handlePayCancel} footer={false}>
                {isDoctorPayment === false && (isCheckSkinList.length !== 0 ? <div>
                    {isCheckSkinList.map((item, key) => <Row key={key} className="mt-3">
                        <Col md={8}>{item.usercode}</Col>
                        <Col md={8}>{item.payment_status}</Col>
                        <Col md={8}>{moment(item.createdAt).format("YYYY-MM-DD")}</Col>
                    </Row>)}
                    <Button type='primary' className='mt-4 pay-confirm-btn' onClick={handleDoctorPay}>Pay Now</Button>
                </div> : <>No Data</>)}
                {isDoctorPayment && <Row>
                    <Col md={24} className="payment-info-doctor">
                        <label>Doctor:</label>
                        <p className='ml-2'>{isDoctorName}</p>
                    </Col>
                    <Col md={24} className="payment-info-doctor">
                        <label>Bank details:</label>
                        <p className='ml-2'>{isDcotorBankDetail}</p>
                    </Col>
                    <Col md={24} className="payment-info-doctor">
                        <label>Last Payment Date:</label>
                        <p className='ml-2'>{isPaymentDate}</p>
                    </Col>
                    <Col md={24}>
                        <Table columns={doctorPayColumns} dataSource={isPayDoctorTable} pagination={false} />
                    </Col>
                    <Col md={24} className="mt-3 checkskin-checkbox">
                        <Checkbox onChange={handlePaidCheck}>Paid All Answered CheckSkins</Checkbox>
                        <label>TOTAL: {isTotalPay.toFixed(2)}</label>
                    </Col>
                    <Col md={24} className="receipt-no mt-3">
                        <label>Receipt No:</label>
                        <Input className='w-30' value={isReceiptNo} onChange={(e) => setReceiptNo(e.target.value)} />
                    </Col>
                    <Col md={24}>
                        <Button type='primary' className='mt-4 pay-confirm-btn' disabled={isConfirmCheck} onClick={DoctorPayConfirm}>Confirm</Button>
                    </Col>
                </Row>}
            </Modal>
        </React.Fragment>
    )
}

export default AdminDoctor;
import React, { useEffect, useState } from 'react';
import { Row, Col, Layout, Table, notification, Space, Button, Modal, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import SideBar from './layout/sidebar';
import Navbar from './layout/navbar';
import { DataStore } from 'aws-amplify';
import { CheckSkin, CheckSkinType, Clinic, ClinicType, Doctor, Transaction } from '../../models';
import moment from 'moment';

const { Header, Sider, Content } = Layout

const TransactionHistory = () => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [transaction_table, setTransactionTable] = useState([]);
    const [isVisible, setVisible] = useState(false);
    const [isDoctorName, setDoctorName] = useState("");
    const [isDcotorBankDetail, setDoctorBankDetail] = useState("");
    const [isPaymentDate, setPaymentDate] = useState("");
    const [isTotalPay, setTotalPay] = useState(0);
    const [isReceiptNo, setReceiptNo] = useState("");
    const [isCheckSkinSource, setCheckSkinSource] = useState([]);

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

    const columns = [
        {
            title: "Receipt No",
            dataIndex: "recept_no",
            sorter: (a, b) => a.recept_no.localeCompare(b.recept_no)
        },
        {
            title: "Doctor Name",
            dataIndex: "doctor_name",
            sorter: (a, b) => a.doctor_name.localeCompare(b.doctor_name)
        },
        {
            title: "CheckSkin",
            dataIndex: "usercodes",
            render: (val) => val.length,
            sorter: (a, b) => a.usercodes.length - b.usercodes.length
        },
        {
            title: "Paid Date",
            dataIndex: "createdAt",
            render: (val) => moment(val).format("DD/MM/YYYY"),
            sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix()
        },
    ];


    useEffect(() => {
        const auth = window.localStorage.getItem("admin_info");
        if (!auth) {
            navigate("/admin/login")
        } else {
            getTransaction()
        }
    }, [])

    const getTransaction = async () => {
        let transactions = await DataStore.query(Transaction);
        let data = await Promise.all(transactions.map(async (item, key) => {
            let doctor_name = await DataStore.query(Doctor, item.DoctorID);
            return {
                ...item,
                key: key + 1,
                doctor_name: doctor_name.firstname + " " + doctor_name.lastname,
                bankdetail: doctor_name.bankdetail,
                payRate: doctor_name.payRate
            }
        }));
        setTransactionTable(data);
    }

    const handleView = async () => {
        if (selectedRowKeys.length === 1) {
            let transaction = selectedRows[0];
            let mole_price = 0;
            let mole_unit = 0;
            let rash_price = 0;
            let rash_unit = 0;
            setVisible(true);
            setDoctorName(transaction.doctor_name)
            setDoctorBankDetail(transaction.bankdetail)
            setReceiptNo(transaction.recept_no)
            setPaymentDate(transaction.last_payment_date)
            const clinic = await DataStore.query(Clinic);
            clinic.map((item) => {
                if (item.type === ClinicType.MOLE) {
                    mole_price = ((item.taxInAus + item.rateInAus) * transaction.payRate).toFixed(2)
                } else {
                    rash_price = ((item.taxInAus + item.rateInAus) * transaction.payRate).toFixed(2)
                }
            })
            await Promise.all(transaction.usercodes.map(async (item) => {
                const checkskin = await DataStore.query(CheckSkin, (c) => c.usercode('eq', item))
                if (checkskin[0].type === CheckSkinType.MOLE) {
                    mole_unit++;
                } else {
                    rash_unit++;
                }
            }))
            let table_data = [
                {
                    key: 1,
                    item: "Mole Check",
                    qty: mole_unit,
                    unit: mole_price,
                    total: mole_unit * mole_price
                },
                {
                    key: 2,
                    item: "Rash Check",
                    qty: rash_unit,
                    unit: rash_price,
                    total: rash_unit * rash_price
                },
            ];
            setTotalPay(mole_unit * mole_price + rash_unit * rash_price)
            setCheckSkinSource(table_data)
        } else {
            api.error({
                message: <label>Error</label>,
                description: <label>Please select one transaction!</label>
            })
        }
    }

    const handleDelete = () => {

    }

    const onCancel = () => {
        setVisible(false)
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
                            <SideBar navitem="transaction" />
                        </Sider>
                        <Content>
                            <div className='p-4'>
                                <h1>Transaction</h1>
                                <Space className='mt-4 d-flex flex-row justify-content-end'>
                                    <Button onClick={handleView}>View</Button>
                                    <Button onClick={handleDelete}>Delete</Button>
                                </Space>
                                <Table className='mt-3' rowSelection={rowSelection} columns={columns} dataSource={transaction_table} />
                            </div>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Modal title="Transaction" visible={isVisible} footer={false} onCancel={onCancel}>
                <Row>
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
                        <Table columns={doctorPayColumns} dataSource={isCheckSkinSource} pagination={false} />
                    </Col>
                    <Col md={24} className="mt-3 checkskin-checkbox-transaction">
                        <label>TOTAL: {isTotalPay.toFixed(2)}</label>
                    </Col>
                    <Col md={24} className="receipt-no mt-3">
                        <label>Receipt No:</label>
                        <Input className='w-30' value={isReceiptNo} readOnly={true} />
                    </Col>
                </Row>
            </Modal>
        </React.Fragment>
    )
}

export default TransactionHistory;
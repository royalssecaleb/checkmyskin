import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DoctorHeader } from '../../reducer/HeaderReducer';
import { DoctorFooter } from '../../reducer/FooterReducer';
import { Table } from 'antd';
import { Container } from 'react-bootstrap';
import { DataStore } from "aws-amplify";
import { CheckSkin, CheckSkinType, Transaction } from "../../models";
import moment from "moment";

import '../../assets/css/statistics.css';

const Statistics = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [dataSource, setDataSource] = useState([])

    const columns = [
        {
            title: 'Date',
            dataIndex: 'createdAt',
            render: (value) => moment(value).format("DD/MM/YYYY")
        },
        {
            title: 'Receipt No',
            dataIndex: 'recept_no',
        },
        {
            title: 'Mole',
            dataIndex: 'mole_count',
        },
        {
            title: 'Rash',
            dataIndex: 'rash_count',
        },
        {
            title: 'Total',
            dataIndex: 'total_amount',
        },
    ];

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
            getStatistics(auth);
        } else {
            navigate('/doctor/login')
        }

    }, []);

    const getStatistics = async (auth) => {
        const statistics = await DataStore.query(Transaction, (c) => c.DoctorID('eq', auth));
        let data = await Promise.all(statistics.map(async (transaction, key) => {
            let mole_count = 0;
            let rash_count = 0;
            await Promise.all(transaction.usercodes.map(async (checkskin) => {
                let checkskins = await DataStore.query(CheckSkin, (c) => c.usercode('eq', checkskin));
                if (checkskins[0].type === CheckSkinType.MOLE) {
                    mole_count++;
                } else {
                    rash_count++;
                }
            }))

            return {
                ...transaction,
                key,
                mole_count,
                rash_count
            }
        }))

        setDataSource(data);
    }

    return (
        <React.Fragment>
            <Container className='mt-4'>
                <h1 className='request-header'>Statistics</h1>
                <p className='request-description mt-1'>Overview data from user's responses</p>
                {/* <Tabs defaultActiveKey="1" onChange={onChange}>
                    <TabPane tab="Mole" key="1">
                        <Mole />
                    </TabPane>
                    <TabPane tab="Rash" key="2">
                        <Rash />
                    </TabPane>
                </Tabs> */}
                <Table columns={columns} dataSource={dataSource} pagination={false} scroll={{ x: 1200 }} />
            </Container>
        </React.Fragment>
    )
}

export default Statistics;
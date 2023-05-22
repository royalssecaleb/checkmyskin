import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { DoctorHeader } from '../../reducer/HeaderReducer';
import { DoctorFooter } from '../../reducer/FooterReducer';
import { Tabs } from 'antd';
import { DataStore } from 'aws-amplify';
import { CheckSkin, CheckSkinType, CheckSkinStatus, PaymentStatus } from '../../models';

import Mole from '../../component/common/Mole';
import Rash from '../../component/common/Rash';

// css
import '../../assets/css/request.css';
import { Container } from 'react-bootstrap';

const { TabPane } = Tabs;

const Request = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mole, setMole] = useState([]);
    const [rash, setRash] = useState([]);

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

            getMoleData(auth);

            getRashData(auth);

        } else {
            navigate('/doctor/login');
        }
    }, []);

    const getMoleData = async (id) => {
        let moleData = await DataStore.query(CheckSkin, (c) => c.type('eq', CheckSkinType.MOLE).checkskinstatus('eq', CheckSkinStatus.OPENED).doctorID('eq', id).payment_status('eq', PaymentStatus.PAID));
        let table_data = moleData.map((item, key) => (
            {
                ...item,
                key: key
            }
        ))
        setMole(table_data);
    }

    const getRashData = async (id) => {
        let rashData = await DataStore.query(CheckSkin, (c) => c.type('eq', CheckSkinType.RASH).checkskinstatus('eq', CheckSkinStatus.OPENED).doctorID('eq', id).payment_status('eq', PaymentStatus.PAID));
        let table_data = rashData.map((item, key) => (
            {
                ...item,
                key: key
            }
        ))
        setRash(table_data);
    }

    return (
        <React.Fragment>
            <Container className='mt-4'>
                <h1 className='request-header'>Open Request</h1>
                <p className='request-description mt-1'>All requests that require a response</p>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Mole" key="1">
                        <Mole mole={mole} status="request" />
                    </TabPane>
                    <TabPane tab="Rash" key="2">
                        <Rash rash={rash} status="request" />
                    </TabPane>
                </Tabs>
            </Container>
        </React.Fragment>
    )
}

export default Request;
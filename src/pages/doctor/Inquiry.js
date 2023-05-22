import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { DoctorHeader } from '../../reducer/HeaderReducer';
import { DoctorFooter } from '../../reducer/FooterReducer';
import { Tabs } from 'antd';
import { Container } from 'react-bootstrap';
import { DataStore } from 'aws-amplify';
import { CheckSkin, CheckSkinType, CheckSkinStatus } from '../../models';

import Mole from '../../component/common/Mole';
import Rash from '../../component/common/Rash';

const { TabPane } = Tabs;

const Inquiry = () => {
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
            navigate('/doctor/login')
        }


    }, []);

    const getMoleData = async (auth) => {
        let moleData = await DataStore.query(CheckSkin, (c) => c.type('eq', CheckSkinType.MOLE).checkskinstatus('eq', CheckSkinStatus.ANSWERED).doctorID('eq', auth));
        let table_data = moleData.map((item, key) => (
            {
                ...item,
                key: key
            }
        ))
        setMole(table_data);
    }

    const getRashData = async (auth) => {
        let rashData = await DataStore.query(CheckSkin, (c) => c.type('eq', CheckSkinType.RASH).checkskinstatus('eq', CheckSkinStatus.ANSWERED).doctorID('eq', auth));
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
                <h1 className='request-header'>Answered Inquiries</h1>
                <p className='request-description mt-1'>All requests that has been answered</p>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Mole" key="1">
                        <Mole mole={mole} status="inquiry" />
                    </TabPane>
                    <TabPane tab="Rash" key="2">
                        <Rash rash={rash} status="inquiry" />
                    </TabPane>
                </Tabs>
            </Container>
        </React.Fragment>
    )
}

export default Inquiry;
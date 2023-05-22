import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doctorLoginHeader } from '../../reducer/HeaderReducer';
import { Tabs, Layout } from 'antd';
import SideBar from './layout/sidebar';
import Navbar from './layout/navbar';

import Mole from "./statistics/Mole";
import Rash from "./statistics/Rash";

import '../../assets/css/statistics.css';

const { TabPane } = Tabs;

const { Header, Sider, Content } = Layout

const Statistics = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        window.localStorage.setItem("header", "login");
        window.localStorage.setItem("footer", "login");
        if (window.localStorage.getItem("header") === "login") {
            dispatch(doctorLoginHeader());
        }

        const auth = window.localStorage.getItem("admin_info");

        if (!auth) {
            navigate('/admin/login')
        }

    }, []);

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <React.Fragment>
            <Layout>
                <Header>
                    <Navbar />
                </Header>
                <Content>
                    <Layout>
                        <Sider>
                            <SideBar navitem="statistics" />
                        </Sider>
                        <Content>
                            <div className='p-4'>
                                <h1>Statistics</h1>
                                <Tabs defaultActiveKey="1" onChange={onChange}>
                                    <TabPane tab="Mole" key="1">
                                        <Mole />
                                    </TabPane>
                                    <TabPane tab="Rash" key="2">
                                        <Rash />
                                    </TabPane>
                                </Tabs>
                            </div>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </React.Fragment>
    )
}

export default Statistics;
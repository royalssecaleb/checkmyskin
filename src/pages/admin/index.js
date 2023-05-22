import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doctorLoginHeader } from '../../reducer/HeaderReducer';
import { Row, Col, Layout } from 'antd'
import SideBar from './layout/sidebar';
import Navbar from './layout/navbar';

const { Header, Sider, Content } = Layout

const Admin = () => {
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
    }, [])

    return (
        <React.Fragment>
            <Layout>
                <Header>
                    <Navbar />
                </Header>
                <Content>
                    <Layout>
                        <Sider>
                            <SideBar navitem="home" />
                        </Sider>
                        <Content>
                            <h1>Admin</h1>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </React.Fragment>
    )
}

export default Admin;
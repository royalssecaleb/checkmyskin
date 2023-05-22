import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doctorLoginHeader } from '../../reducer/HeaderReducer';
import { Layout, Row, Col, Space, Button, notification, Modal, Checkbox } from 'antd';
import { DataStore, Storage } from 'aws-amplify';
import SideBar from './layout/sidebar';
import Navbar from './layout/navbar';
import { CheckSkin } from "../../models";
import moment from "moment";

import { ExclamationCircleOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout

const SpamImage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSpamImage, setSpamImage] = useState([]);
    const [isSelect, setSelect] = useState([]);
    const [api, contextHolder] = notification.useNotification();

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
            getSpamImage();
        }

    }, []);

    const getSpamImage = async () => {
        const spam = [];
        let s3_image = await Storage.list('');
        let checkskin = await DataStore.query(CheckSkin);

        let all_image = s3_image.filter(item => item.key !== "" && item.key !== "home1.png" && item.key !== "logo.png" && !item.key.includes("Spam"));
        let spam_image = all_image.filter(o1 => !checkskin.some(o2 => o1.key === o2.image));
        await Promise.all(spam_image.map(async (item) => {
            let image = await Storage.get(item.key);
            spam.push({ image, key: item.key, date: item.lastModified });
        }));

        setSpamImage(spam);
    }

    const handleDelete = () => {
        if (isSelect.length) {
            Modal.confirm({
                title: 'Confirm',
                icon: <ExclamationCircleOutlined />,
                content: 'Are you sure you want to delete it?',
                okText: 'Ok',
                cancelText: 'Cancel',
                onOk: () => {
                    let key = 0;
                    isSelect.map((item) => {
                        Storage.copy({key: item}, {key: `Spam/${item}`}).then(res => {
                            console.log(res);
                            if (res.key) {
                                Storage.remove(item);
                                key++;
                                if (key === isSelect.length) {
                                    api.success({
                                        message: <label>Success</label>,
                                        description: <label>Correctly Delete spam images.</label>,
                                        duration: 3
                                    })
                                    setSelect([]);
                                    getSpamImage();
                                }
                            }

                        }).catch(err => {
                            api.error({
                                message: <label>Error</label>,
                                description: <label>{err}</label>,
                            })
                        })
                        // Storage.remove(item).then(res => {
                        //     key++;
                        //     if (key === isSelect.length) {
                        //         api.success({
                        //             message: <label>Success</label>,
                        //             description: <label>Correctly Delete spam images.</label>,
                        //             duration: 3
                        //         })
                        //         setSelect([]);
                        //         getSpamImage();
                        //     }
                        // }).catch(err => {
                        //     api.error({
                        //         message: <label>Error</label>,
                        //         description: <label>{err}</label>,
                        //     })
                        // })
                    })
                },
                onCancel: () => { }
            })
        } else {
            api.error({
                message: <label>Error</label>,
                description: <label>Please select spam image!</label>,
            })
        }

    }

    const onChangeSpam = (e) => {
        setSelect(e);
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
                            <SideBar navitem="spam" />
                        </Sider>
                        <Content>
                            <div className='p-4'>
                                <h1>Spam Image</h1>
                                <Space className='mt-4 d-flex flex-row justify-content-end'>
                                    <Button onClick={handleDelete} disabled={isSpamImage.length ? false : true}>MoveToSpamFolder</Button>
                                </Space>
                                <Checkbox.Group style={{ width: '100%' }} onChange={onChangeSpam} >
                                    <Row className="mt-3" gutter={[32, 20]}>
                                        {isSpamImage?.map((item, key) => {
                                            return (
                                                <Col md={6} key={key}>
                                                    <img src={item.image} alt={item.image} width="200px" height="200px" />
                                                    <div className="mt-2">
                                                        <Checkbox value={item.key} le>
                                                            <div>
                                                                <div><span style={{overflowWrap: 'anywhere'}}>{item.key}</span></div>
                                                                <span>{moment(item.date).format("YYYY-MM-DD")}</span>
                                                            </div>
                                                        </Checkbox>
                                                    </div>
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                </Checkbox.Group>
                            </div>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </React.Fragment>
    )
}

export default SpamImage;
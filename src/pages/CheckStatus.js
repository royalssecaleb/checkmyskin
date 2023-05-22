import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { UserHeader } from '../reducer/HeaderReducer';
import { UserFooter } from '../reducer/FooterReducer';
import { useNavigate } from 'react-router-dom';
import { Input, Button, notification } from "antd";
import { DataStore, Storage } from 'aws-amplify';
import { CheckSkin, CheckSkinStatus, Clinic } from '../models';

// components
import SkinBreadcrumb from "../component/common/Breadcrumb";

// css
import "../assets/css/check-mole.css";

const CheckStatus = () => {
    const navigate = useNavigate();
    const [checkStatus, setCheckStatus] = useState(-1);
    const [codeValue, setCodeValue] = useState("");
    const [isAnswer, setAnswer] = useState("");
    const [isPhoto, setPhoto] = useState("");

    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        window.localStorage.setItem("header", "user");
        window.localStorage.setItem("footer", "user");
        if (window.localStorage.getItem("header") === "user") {
            dispatch(UserHeader());
        }
        if (window.localStorage.getItem("footer") === "user") {
            dispatch(UserFooter());
        }
    }, []);

    const handleCheckStatus = (value) => {
        DataStore.query(CheckSkin, (c) => c.usercode("eq", value)).then(res => {
            if (res.length) {
                if (res[0].checkskinstatus === CheckSkinStatus.OPENED) {
                    setCheckStatus(0);
                } else if (res[0].checkskinstatus === CheckSkinStatus.ANSWERED) {
                    DataStore.query(Clinic, (c) => c.id('eq', res[0].clinicID)).then(res_clinic => {
                        if (res_clinic.length) {
                            res_clinic[0].standardResponses.map((item) => {
                                if (item.value === res[0].doctorAnswer) {
                                    setAnswer(item);
                                    Storage.get(res[0].image).then((res) => setPhoto(res)).catch(err => console.log(err));
                                }
                            })
                        }
                    }).catch(err => console.log(err))
                    setCheckStatus(1)
                }
            } else {
                api.error({
                    message: <label>Error</label>,
                    description: <label>This usercode is not exist.</label>
                })
            }
        }).catch(err => console.log(err));
    }

    return (
        <div className="container mt-4 mb-5">
            {contextHolder}
            <SkinBreadcrumb text="Check Status" />
            <h1 className="mt-4 mb-4 check-mole-header">Check Status</h1>
            <p className="check-status-p">
                You can check the status of your request. Please enter your personal code, which you received by e-mail after submitting the form.
            </p>
            {checkStatus === -1 && (
                <div className="mt-5 mb-5 py-4 check-status">
                    <p>Please enter your personal code</p>
                    <Input placeholder="Input your code" className="w-50" value={codeValue} onChange={(e) => setCodeValue(e.target.value)} />
                    <Button type="primary" size="large" className="mt-4" onClick={() => handleCheckStatus(codeValue)}>
                        Check Status
                    </Button>
                </div>
            )}
            {checkStatus === 0 && (
                <div className="mt-5 mb-5 py-4 check-status">
                    <p>Dermatologist's answer:</p>
                    <span className="check-status-span">Your request has not yet been processed.</span>
                    <Button type="primary" size="large" className="mt-4" onClick={() => navigate('/')}>
                        Back to Home
                    </Button>
                </div>
            )}
            {checkStatus === 1 && (
                <div className="mt-5 mb-5 py-4 check-status">
                    <p>Dermatologist's answer:</p>
                    <img src={isPhoto} alt="skin-status" className="mt-2" width="300px" height="300px" />
                    <span className="check-status-span mt-3">{isAnswer.answer}</span>
                    <Button type="primary" size="large" className="mt-4" onClick={() => navigate('/')}>
                        Back to Home
                    </Button>
                </div>
            )}
            <p className="check-status-p">
                Haven't examine your skin? Let's upload a photo, and have it checked by our expert dermatologist, easily.
            </p>
        </div>
    );
};

export default CheckStatus;

import React, { useEffect, useState } from 'react';
import { Row, Space, Button } from 'antd';
import copySvg from '../../../assets/icons/copy.svg';
import { useNavigate } from 'react-router-dom'
import { FcCheckmark } from 'react-icons/fc';

const Success = (props) => {
    const { current, setCurrent } = props;
    const [userCode, setUserCode] = useState("")
    const [isCopy, setIsCopy] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkmyskin = JSON.parse(window.localStorage.getItem("checkSkin"));
        setUserCode(checkmyskin.data.usercode);
        setCurrent(current);
    }, []);

    const copyTextToClipboard = async (text) => {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    const handleCopyClick = () => {
        copyTextToClipboard(userCode)
            .then(() => {
                setIsCopy(true);
                setTimeout(() => {
                    setIsCopy(false);
                }, 500);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const clearAll = () => {
        window.localStorage.removeItem('fileName');
        window.localStorage.removeItem('payment_id');
        window.localStorage.removeItem('checkSkin');
        window.localStorage.removeItem('amount');
        window.localStorage.removeItem('clinic');
        window.localStorage.removeItem('customer');
    }

    return (
        <React.Fragment>
            <Row className='check-status-container'>
                <p>Thank you for your inquiry</p>
                <p>Your photo will be examined by a certified dermatologist and your result will be ready within 2-5 working days. Please use the Personal Code below to check your status, which has been sent to your email as well. </p>
            </Row>
            <Space className='check-status-contents mt-4' size="large">
                <div className='check-status-code'>{userCode}</div>
                {isCopy ? <Button className='check-status-code-copy' type='text'>
                    <FcCheckmark />&nbsp;&nbsp;Copied Code
                </Button> : <Button className='check-status-code-copy' type='text' onClick={handleCopyClick}>
                    <img src={copySvg} alt="copy" />&nbsp;&nbsp;Copy Code
                </Button>}
            </Space>
            <div className="mb-5 mt-5">
                <Space>
                    <Button type="primary" size="large" onClick={() => { navigate('/check-status'); clearAll() }}>Check Status</Button>
                    <Button type="default" size="large" onClick={() => { navigate('/'); clearAll() }}>Back to Home</Button>
                </Space>
            </div>
        </React.Fragment>
    )
}

export default Success
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Divider, Modal } from 'antd';
import { API, DataStore } from 'aws-amplify';
import { Clinic, ClinicType } from '../../../models';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51LNry5EWOJEPqRneA3w5siGSej6m7Xp7d01on0NWa2el8aqCcRv6L67Fj4hkyxnPtF2j2IkViv9pzGZZPO96NVyw00Tpsn74Ui");

const Payment = (props) => {

    const { setCurrent, current, pay, status, checkSkin } = props;
    const [loading, setLoading] = useState(false);
    const [isClinic, setClinic] = useState({});
    const [clientSecret, setClientSecret] = useState("");
    const [isVisible, setVisible] = useState(false);
    const [isData, setData] = useState({});

    useEffect(() => {
        if (status === 'mole') {
            getMoleClinic()
        } else if (status === 'rash') {
            getRashClinic();
        }
        setLoading(false);
    }, []);

    const appearance = {
        theme: 'stripe',

        variables: {
            fontSize3Xs: '0px'
        }
    };
    const options = {
        clientSecret,
        appearance,
    };

    const onhandlePay = (event) => {
        event.preventDefault();
        const url = window.location.origin;
        const amount = parseFloat(((isClinic?.rateInAus + isClinic?.taxInAus) * 100).toPrecision(12));
        setLoading(true);
        console.log(amount);
        API.post('stripeapi', '/checkout/payment', {
            body: { amount: amount, status, url },
        }).then(result => {
            if (result) {
                console.log(result.paymentIntent);
                window.localStorage.setItem("checkSkin", JSON.stringify(checkSkin));
                window.localStorage.setItem("payment_id", result.paymentIntent.client_secret);
                window.localStorage.setItem("amount", parseFloat((isClinic?.rateInAus + isClinic?.taxInAus).toPrecision(12)));
                window.localStorage.setItem("clinic", isClinic.id);
                window.localStorage.setItem("customer", result.paymentIntent.customer);
                setData(result.data)
                setClientSecret(result.paymentIntent.client_secret)
                setLoading(false);
                setVisible(true)
            }

        }).catch(err => console.log(err))
    };

    const handleCancel = () => {
        setVisible(false)
    }

    const handleContinue = async () => {
        setCurrent(current + 1);
    }

    const getMoleClinic = async () => {
        const mole_clinic = await DataStore.query(Clinic, (c) => c.type('eq', ClinicType.MOLE).active('eq', true));
        if (mole_clinic.length) {
            setClinic(mole_clinic[0]);
        }
    }

    const getRashClinic = async () => {
        const rash_clinic = await DataStore.query(Clinic, (c) => c.type('eq', ClinicType.RASH).active('eq', true));
        if (rash_clinic.length) {
            setClinic(rash_clinic[0]);
        }
    }

    return (
        <React.Fragment>
            {pay ?
                <div className='pay-receivce'>
                    <label>Thank you, we received your payment!</label>
                    <p className='mt-3'>Click the button below to see your personal code, we also will send your personal code to your email.</p>
                    <div className="steps-action mt-5 mb-5"><Button type="primary" size="large" variant="filled" onClick={handleContinue}>Continue</Button></div>
                </div> :
                <>
                    <Row gutter={[24, 24]}>
                        <Col md={12} className="pay-now-container">
                            <p>One more step! We use the highest secure payment system. Please finalise the payment. <b>We will refund full amount to you if the quality of your photo is not sufficient for diagnosis.</b></p>
                            {isVisible === false && <Button type="primary" size="large" variant="filled" className='mt-4' onClick={onhandlePay} loading={loading}>Pay Now</Button>}
                        </Col>
                        <Col md={12} className="order-summary-div">
                            <div className='order-summary-container'>
                                <Col md={24}>
                                    <h3>Order Summary</h3>
                                </Col>
                                <Col md={24}>
                                    <Row justify='space-between' className='order-summary'>
                                        <Col md={12} className="space-between-label"><label>Skin check</label></Col>
                                        <Col md={12} className="space-between-price"><label>${(isClinic?.rateInAus)}</label></Col>
                                    </Row>
                                    <Row justify='space-between' className='order-summary mt-2'>
                                        <Col md={12} className="space-between-label"><label>TAX</label></Col>
                                        <Col md={12} className="space-between-price"><label>${(isClinic?.taxInAus)}</label></Col>
                                    </Row>
                                    <Divider />
                                    <Row justify='space-between' className='order-summary'>
                                        <Col md={12} className="space-between-label"><label>Total</label></Col>
                                        <Col md={12} className="space-between-price"><label>${parseFloat((isClinic?.rateInAus + isClinic?.taxInAus).toPrecision(12))} </label></Col>
                                    </Row>
                                </Col>
                            </div>
                        </Col>
                    </Row>
                </>
            }
            <Modal title="Payment" visible={isVisible} onCancel={handleCancel} className="payment-modal" footer={false}>
                {
                    clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm data={isData} />
                        </Elements>
                    )
                }
            </Modal>
        </React.Fragment>
    )
}

export default Payment
import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import { BiCircle } from "react-icons/bi";
import { FaRegDotCircle, FaCheckCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { Storage, DataStore, API } from "aws-amplify";
import {
    CheckSkin,
    CheckSkinStatus,
    CheckSkinType,
    PaymentStatus,
} from "../../models";
import moment, { now } from "moment";
import UploadFile from "./CheckMyMole/UploadFile";
import Information from "./CheckMyMole/Information";
import Payment from "./CheckMyMole/Payment";
import Success from "./CheckMyMole/Success";
import "../../assets/css/common/progress.css";

// eslint-disable-next-line import/no-anonymous-default-export
const Progress = (props) => {
    const { status } = props;
    const [current, setCurrent] = useState(0);
    const [checkSkin, setCheckSkin] = useState({});
    const { search } = useLocation();
    const [pay, setPay] = useState(false);

    let mobile_steps = [];
    const steps = [
        {
            title: "Upload Photo",
            content: <UploadFile setCurrent={setCurrent} current={current} />,
        },
        {
            title: "Fill Information",
            content: (
                <Information
                    status={status}
                    setCurrent={setCurrent}
                    current={current}
                    setCheckSkin={setCheckSkin}
                />
            ),
        },
        {
            title: "Payment",
            content: (
                <Payment
                    setCurrent={setCurrent}
                    current={current}
                    pay={pay}
                    status={status}
                    checkSkin={checkSkin}
                />
            ),
        },
        {
            title: "Success",
            content: <Success setCurrent={setCurrent} current={current} />,
        },
    ];

    switch (current) {
        case 0:
            mobile_steps = steps.slice(0, 2);
            break;
        case 1:
            mobile_steps = steps.slice(0, 2);
            break;
        case 2:
            mobile_steps = steps.slice(1, 3);
            break;
        case 3:
            mobile_steps = steps.slice(2, 4);
            break;
        default:
            break;
    }

    useEffect(() => {
        if (search.includes("succeeded")) {
            console.log("success");
            const sendMail = async () => {
                const url = window.location.origin;
                const checkSkin = JSON.parse(window.localStorage.getItem("checkSkin"));
                const payment_id = window.localStorage.getItem("payment_id");
                let first_id = payment_id.split("_")[1].slice(0, 2);
                let last_id = payment_id.split("_")[1].slice(-3);
                let receipt_no = first_id + last_id;
                const file = window.localStorage.getItem("fileName");
                const amount = window.localStorage.getItem("amount");
                const clinic_id = window.localStorage.getItem("clinic");
                const customer_id = window.localStorage.getItem("customer");
                const checkCode = await DataStore.query(CheckSkin, (c) =>
                    c.usercode("eq", checkSkin.data.usercode)
                );
                let date = moment(now()).format("YYYY-MM-DD");
                if (checkCode.length === 0) {
                    if (checkSkin?.data.status === "mole") {
                        DataStore.save(
                            new CheckSkin({
                                age: checkSkin.data.value.age,
                                gender: checkSkin.data.value.gender,
                                email: checkSkin.data.value.email,
                                usercode: checkSkin.data.usercode,
                                diameter: checkSkin.data.sliderValue,
                                type: CheckSkinType.MOLE,
                                long: checkSkin.data.value.howLongSkin,
                                melanoma: checkSkin.data.value.melanoma,
                                dermatologist: checkSkin.data.value.dermatologist,
                                factors: checkSkin.data.factors,
                                image: file,
                                checkskinstatus: CheckSkinStatus.OPENED,
                                clinicID: clinic_id,
                                payment_id: payment_id,
                                payment_status: PaymentStatus.PAID,
                                customer_id: customer_id
                            })
                        )
                            .then((res) => console.log(res))
                            .catch((err) => console.log(err));
                    } else if (checkSkin?.data.status === "rash") {
                        DataStore.save(
                            new CheckSkin({
                                age: checkSkin.data.value.age,
                                gender: checkSkin.data.value.gender,
                                email: checkSkin.data.value.email,
                                type: CheckSkinType.RASH,
                                long: checkSkin.data.value.howLongSkin,
                                severe: checkSkin.data.value.severe,
                                relevant: checkSkin.data.value?.relevant,
                                usercode: checkSkin.data.usercode,
                                distributed: checkSkin.data.distributed,
                                rashLocation: checkSkin.data.rashLocation,
                                rashType: checkSkin.data.rashType,
                                symptoms: checkSkin.data.symptoms,
                                image: file,
                                checkskinstatus: CheckSkinStatus.OPENED,
                                clinicID: clinic_id,
                                payment_id: payment_id,
                                payment_status: PaymentStatus.PAID,
                                customer_id: customer_id
                            })
                        )
                            .then((res) => console.log(res))
                            .catch((err) => console.log(err));
                    }
                }
                API.post("sendmailapi", "/patient-sendmail", {
                    body: {
                        usercode: checkSkin.data.usercode,
                        url,
                        email: checkSkin.data.value.email,
                        amount: amount,
                        date: date,
                        payment_id: receipt_no,
                        status: checkSkin.data.status,
                        payment: "checkout",
                    },
                })
                    .then((result) => {
                        console.log(result);
                    })
                    .catch((err) => console.log(err));
            };
            setPay(true);
            setCurrent(2);
            sendMail();
        } else {
            const fileKey = window.localStorage.getItem("fileName");
            if (fileKey) {
                Storage.remove(fileKey)
                    .then((res) => console.log(res))
                    .catch((err) => console.log(err));
            }
            window.localStorage.removeItem("checkSkin");
            window.localStorage.removeItem("fileName");
            window.localStorage.removeItem("payment_id");
            window.localStorage.removeItem("amount");
            window.localStorage.removeItem("clinic");
            window.localStorage.removeItem("customer");
        }
    }, []);

    return (
        <React.Fragment>
            <Steps
                current={current}
                labelPlacement="vertical"
                className="steps-container mobile-hide"
                responsive={false}
            >
                {steps.map((p, i) => (
                    <Steps.Step
                        key={p.title}
                        title={current === i && p.title}
                        icon={
                            current === 3 ? (
                                <FaCheckCircle />
                            ) : current === i ? (
                                <FaRegDotCircle />
                            ) : i < current ? (
                                <FaCheckCircle />
                            ) : (
                                <BiCircle />
                            )
                        }
                    />
                ))}
            </Steps>
            <div>
                {current <= 1 && (
                    <Steps
                        current={current}
                        labelPlacement="vertical"
                        className="steps-container mobile-show"
                        responsive={false}
                    >
                        {mobile_steps.map((p, i) => (
                            <Steps.Step
                                key={p.title}
                                title={current === i && p.title}
                                icon={
                                    current === 3 ? (
                                        <FaCheckCircle />
                                    ) : current === i ? (
                                        <FaRegDotCircle />
                                    ) : i < current ? (
                                        <FaCheckCircle />
                                    ) : (
                                        <BiCircle />
                                    )
                                }
                            />
                        ))}
                    </Steps>
                )}
                {current === 2 && (
                    <Steps
                        current={current}
                        labelPlacement="vertical"
                        className="steps-container mobile-show"
                        responsive={false}
                    >
                        <Steps.Step
                            key={mobile_steps[0].title}
                            title={mobile_steps[0].title}
                            icon={<FaCheckCircle />}
                        />
                        <Steps.Step
                            key={mobile_steps[0].title}
                            title={mobile_steps[1].title}
                            icon={<FaRegDotCircle />}
                        />
                    </Steps>
                )}
                {current === 3 && (
                    <Steps
                        current={current}
                        labelPlacement="vertical"
                        className="steps-container mobile-show"
                        responsive={false}
                    >
                        <Steps.Step
                            key={mobile_steps[0].title}
                            title={mobile_steps[0].title}
                            icon={<FaCheckCircle />}
                        />
                        <Steps.Step
                            key={mobile_steps[0].title}
                            title={mobile_steps[1].title}
                            icon={<FaCheckCircle />}
                        />
                    </Steps>
                )}
            </div>
            <div className="steps-content my-5">{steps[current].content}</div>
        </React.Fragment>
    );
};

export default Progress;

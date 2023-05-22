import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Select, Form, Input, InputNumber, Slider, Switch, Space, Checkbox, Button } from 'antd';
// import { DataStore } from 'aws-amplify';
import { GenderEnum } from '../../../models';
import ReCAPTCHA from "react-google-recaptcha"
import jsonData from '../../../assets/json/jsonData.json';

const Information = (props) => {
    const { status, setCurrent, current, setCheckSkin } = props;
    const [sliderValue, setSliderValue] = useState(0);
    const [isdisable, setDisable] = useState(false);
    const [factors, setFactors] = useState({ colour: false, shape: false, size: false, itching: false, blood: false });
    const [distributed, setDistributed] = useState({ generalized: false, localized: false, symmetric: false, unilateral: false, blood: false, sun: false });
    const [rashLocation, setRashLocation] = useState({ scalp: false, face: false, torso: false, arms: false, legs: false, palmsOrSoles: false, other: false });
    const [rashType, setRashType] = useState({ flat: false, papules: false, plaque: false, blister: false, pustules: false, wheals: false, scaling: false, scarring: false });
    const [symptoms, setSymptoms] = useState({ itch: false, pain: false, burning: false, bleeding: false, systemic: false });
    const [form] = Form.useForm();
    const [isBot, setBot] = useState(false);
    const captchaRef = useRef(null);

    useEffect(() => {
        // setContinueBtn(true);
        // captchaRef.current.reset();
    }, [])

    const handleFinish = (value) => {
        const token = captchaRef.current.getValue();
        if (token) {
            const usercode = Math.random().toString(36).substr(2, 9);
            window.scrollTo(0, 0);
            if (status === 'mole') {
                setCheckSkin({ data: { value, sliderValue, factors, usercode, status } })
            } else if (status === 'rash') {
                setCheckSkin({ data: { value, distributed, rashLocation, rashType, symptoms, usercode, status } })
            }
            setCurrent(current + 1);
        } else {
            setBot(true)
        }

    }

    const handleCheckBox = (e) => {
        setDisable(e.target.checked);
    }

    const handleFactorSwitch = (checked, type) => {
        const updateData = { [type]: checked }
        setFactors(data => ({ ...data, ...updateData }))
    }

    const handleDistributedSwitch = (checked, type) => {
        const updateData = { [type]: checked };
        setDistributed(data => ({ ...data, ...updateData }))
    }

    const handleRashLocationSwitch = (checked, type) => {
        const updateData = { [type]: checked };
        setRashLocation(data => ({ ...data, ...updateData }))
    }

    const handleRashTypeSwitch = (checked, type) => {
        const updateData = { [type]: checked };
        setRashType(data => ({ ...data, ...updateData }))
    }

    const handleSymptomsSwitch = (checked, type) => {
        const updateData = { [type]: checked };
        setSymptoms(data => ({ ...data, ...updateData }))
    }


    return <React.Fragment>
        <Form form={form} layout="vertical" autoComplete='off' onFinish={handleFinish}>
            {status === "rash" &&
                <Row gutter={32}>
                    <Col md={12}>
                        <Row gutter={16}>
                            <Col md={12}>
                                <Form.Item label="Your Age" name="age" rules={[{ required: true, message: "" }]}>
                                    <InputNumber min={0} max={99} className='w-100' placeholder="Enter your age" />
                                </Form.Item>
                            </Col>
                            <Col md={12}>
                                <Form.Item label="Your Gender" className='w-100' name="gender" rules={[{ required: true, message: "" }]}>
                                    <Select className='w-100' placeholder="Choose">
                                        <Select.Option key={GenderEnum.MALE}>Male</Select.Option>
                                        <Select.Option key={GenderEnum.FEMALE}>Female</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col md={24}>
                                <Form.Item label="How long have you had this rash?" name="howLongSkin" rules={[{ required: true, message: "" }]}>
                                    <Select className='w-100' placeholder="Choose">
                                        {jsonData.howLogSkin && jsonData.howLogSkin.map((item) => <Select.Option key={item.key}>{item.value}</Select.Option>)}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col md={24}>
                                <Form.Item label="How this rash currently distributed on your body?">
                                    <Row>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={distributed.generalized} onChange={(e) => handleDistributedSwitch(e, "generalized")} /><label>Generalized</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={distributed.localized} onChange={(e) => handleDistributedSwitch(e, "localized")} /><label>Localized</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={distributed.symmetric} onChange={(e) => handleDistributedSwitch(e, "symmetric")} /><label>Symmetric</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={distributed.unilateral} onChange={(e) => handleDistributedSwitch(e, "unilateral")} /><label>Unilateral</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={distributed.blood} onChange={(e) => handleDistributedSwitch(e, "blood")} /><label>Skin folds</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={distributed.sun} onChange={(e) => handleDistributedSwitch(e, "sun")} /><label>On sun exposed areas</label></Space>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col md={24}>
                                <Form.Item label="Where is this rash currently located on your body?">
                                    <Row>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={rashLocation.scalp} onChange={(e) => handleRashLocationSwitch(e, "scalp")} /><label>Scalp</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={rashLocation.face} onChange={(e) => handleRashLocationSwitch(e, "face")} /><label>Face</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={rashLocation.torso} onChange={(e) => handleRashLocationSwitch(e, "torso")} /><label>Torso</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={rashLocation.arms} onChange={(e) => handleRashLocationSwitch(e, "arms")} /><label>Arms</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={rashLocation.legs} onChange={(e) => handleRashLocationSwitch(e, "legs")} /><label>Legs</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={rashLocation.palmsOrSoles} onChange={(e) => handleRashLocationSwitch(e, "palmsOrSoles")} /><label>Palms or Soles</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={rashLocation.other} onChange={(e) => handleRashLocationSwitch(e, "other")} /><label>Other (eg. Nails, Hair, mucosal surface)</label></Space>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col md={24}>
                                <Form.Item label="Any relevant information you want to add?" name="relevant">
                                    <Input.TextArea rows={4} className='w-100 text-area-class' placeholder="Enter additional information" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={12}>
                        <Row gutter={16}>
                            <Col md={24}>
                                <Form.Item label="How could you define this rash type?">
                                    <Row>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={rashType.flat} onChange={(e) => handleRashTypeSwitch(e, "flat")} /><label>Flat</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={rashType.papules} onChange={(e) => handleRashTypeSwitch(e, "papules")} /><label>Papules</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={rashType.plaque} onChange={(e) => handleRashTypeSwitch(e, "plaque")} /><label>Palpable plaque</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={rashType.blister} onChange={(e) => handleRashTypeSwitch(e, "blister")} /><label>Blisters</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={rashType.pustules} onChange={(e) => handleRashTypeSwitch(e, "pustules")} /><label>Pustules</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={rashType.wheals} onChange={(e) => handleRashTypeSwitch(e, "wheals")} /><label>Wheals</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={rashType.scaling} onChange={(e) => handleRashTypeSwitch(e, "scaling")} /><label>Scaling</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={rashType.scarring} onChange={(e) => handleRashTypeSwitch(e, "scarring")} /><label>Scarring</label></Space>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col md={24}>
                                <Form.Item label="What symptoms do you feel around this rash?">
                                    <Row>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={symptoms.itch} onChange={(e) => handleSymptomsSwitch(e, "itch")} /><label>Itch</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={symptoms.pain} onChange={(e) => handleSymptomsSwitch(e, "pain")} /><label>Pain</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={symptoms.burning} onChange={(e) => handleSymptomsSwitch(e, "burning")} /><label>Burning</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={symptoms.bleeding} onChange={(e) => handleSymptomsSwitch(e, "bleeding")} /><label>Bleeding</label></Space>
                                            </Row>
                                        </Col>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={symptoms.systemic} onChange={(e) => handleSymptomsSwitch(e, "systemic")} /><label>Systemic symptoms (eg. fever, malaise, other)</label></Space>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col md={24}>
                                <Form.Item label="How severe this rash felt?" name="severe" rules={[{ required: true, message: "" }]}>
                                    <Select className='w-100' placeholder="Choose">
                                        {jsonData.severe && jsonData.severe.map((item) => <Select.Option key={item.key}>{item.value}</Select.Option>)}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col md={24}>
                                <Form.Item label="Your email address" name="email" rules={[{ required: true, message: "" }]}>
                                    <Input className='w-100' type="email" placeholder="Enter your email" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col md={24} className="not-robot">
                                <ReCAPTCHA sitekey='6LdihQEhAAAAAK65cLHk8cV8aEOeNh7dQYj40xWO' style={{ display: "inline-block" }} theme="light" ref={captchaRef} />
                                {isBot ? <span className="err-recaptcha">This is ReCAPTCHA for human testing.</span> : ""}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            }
            {status === "mole" &&
                <Row gutter={32}>
                    <Col md={12}>
                        <Row gutter={16}>
                            <Col md={12}>
                                <Form.Item label="Your Age" name="age" rules={[{ required: true, message: "" }]}>
                                    <InputNumber min={0} max={99} className='w-100' placeholder="Enter your age" />
                                </Form.Item>
                            </Col>
                            <Col md={12}>
                                <Form.Item label="Your Gender" className='w-100' name="gender" rules={[{ required: true, message: "" }]}>
                                    <Select className='w-100' placeholder="Choose">
                                        <Select.Option key={GenderEnum.MALE}>Male</Select.Option>
                                        <Select.Option key={GenderEnum.FEMALE}>Female</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col md={24}>
                                <Form.Item label="How long have you had this mole?" name="howLongSkin" rules={[{ required: true, message: "" }]}>
                                    <Select className='w-100' placeholder="Choose">
                                        {jsonData.howLogSkin && jsonData.howLogSkin.map((item) => <Select.Option key={item.key}>{item.value}</Select.Option>)}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col md={24}>
                                <Form.Item label="Have there been cases of melanoma(black skin cancer) in your family or have you been affected yourself?" name="melanoma" rules={[{ required: true, message: "" }]}>
                                    <Select className='w-100' placeholder="Choose">
                                        {jsonData.melanoma && jsonData.melanoma.map((item) => <Select.Option key={item.key}>{item.value}</Select.Option>)}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col md={24}>
                                <Form.Item label="Has your mole changed in relation to the following factors?">
                                    <Row>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={factors.colour} onChange={(e) => handleFactorSwitch(e, "colour")} /><label>Colour</label></Space>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={factors.shape} onChange={(e) => handleFactorSwitch(e, "shape")} /><label>Shape</label></Space>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={factors.size} onChange={(e) => handleFactorSwitch(e, "size")} /><label>Size</label></Space>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={factors.itching} onChange={(e) => handleFactorSwitch(e, "itching")} /><label>Itching</label></Space>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={24} className="mt-2">
                                            <Row gutter={8}>
                                                <Space><Switch checked={factors.blood} onChange={(e) => handleFactorSwitch(e, "blood")} /><label>Blood Discharge</label></Space>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={12}>
                        <Row gutter={16}>
                            <Col md={24}>
                                <Form.Item label="Do you have skin and birthmarks checked regularly by a dermatologist?" name="dermatologist" rules={[{ required: true, message: "" }]}>
                                    <Select className='w-100' placeholder="Choose">
                                        {jsonData.dermatologist && jsonData.dermatologist.map((item) => <Select.Option key={item.key}>{item.value}</Select.Option>)}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col md={24}>
                                <Form.Item label="Please enter the maximum diameter of your mole (in mm).">
                                    <div className='mt-4 slide-wrapper'>
                                        <label className='slider-value'><span>{sliderValue}</span>mm</label>
                                        <Slider min={1} max={30} tipFormatter={null} onChange={setSliderValue} value={sliderValue} />
                                    </div>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col md={24}>
                                <Form.Item label="Your email address" name="email" rules={[{ required: true, message: "" }]}>
                                    <Input className='w-100' type="email" placeholder="Enter your email" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col md={24} className="not-robot">
                                <Row>
                                    <ReCAPTCHA sitekey='6LdihQEhAAAAAK65cLHk8cV8aEOeNh7dQYj40xWO' style={{ display: "inline-block" }} theme="light" ref={captchaRef} />
                                    {isBot ? <span className="err-recaptcha">This is ReCAPTCHA for human testing.</span> : ""}
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            }
            <Row className='mt-5'>
                <Col md={24}>
                    <Checkbox className='info-checkbox' onChange={handleCheckBox}>
                        <p>I accept that the data I have given will be collected and sent to a dermatologist at CheckMySkin. These data relate exclusively to the control of the mole/rash and are not used for any other purpose. For further information on the use of your data, please contact us.</p>
                        <p>I understand that this check-up is only a first step in examining my skin and in no case replaces a check-up by a doctor or dermatologist and that all responsibility is excluded.</p>
                    </Checkbox>
                </Col>
            </Row>
            <div className="steps-action mt-5 mb-5"><Button type="primary" size="large" variant="filled" htmlType='submit' disabled={isdisable === false ? true : false}>Continue</Button></div>
        </Form>
    </React.Fragment>
}

export default Information;
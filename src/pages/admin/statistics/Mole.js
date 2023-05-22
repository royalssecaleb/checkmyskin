import { Row, Table, Col } from "antd";
import { DataStore } from "aws-amplify";
import React, { useEffect, useState } from "react";

import Chart from '../../../component/common/Chart';
import { CheckSkin, CheckSkinType, Doctor, GenderEnum } from "../../../models";

const Mole = () => {

    const [tableData, setTableData] = useState([]);
    const [responseData, setResponseData] = useState([]);
    const [genderData, setGenderData] = useState([]);

    const columns = [
        {
            title: 'Dermatologist Name',
            dataIndex: 'dermatologist',
        },
        {
            title: 'Harmless Birthmarks',
            dataIndex: 'harmless',
        },
        {
            title: 'Insufficient Image Quality',
            dataIndex: 'insufficient',
        },
        {
            title: 'Sucpicious Birthmarks',
            dataIndex: 'sucpicious',
        },
        {
            title: 'Female',
            dataIndex: 'female',
        },
        {
            title: 'Male',
            dataIndex: 'male',
        },
        {
            title: 'Requests',
            dataIndex: 'requests',
        },
        {
            title: '%Portion',
            dataIndex: 'portion',
        }
    ]

    useEffect(() => {
        getMoleData();
    }, [])

    const getMoleData = async () => {
        let doctors = await DataStore.query(Doctor);
        let data = [];
        let all_harmless = 0;
        let all_insufficient = 0;
        let all_sucpicious = 0;
        let all_female = 0;
        let all_male = 0;
        await Promise.all(doctors.map(async (item, key) => {
            let harmless = 0;
            let insufficient = 0;
            let sucpicious = 0;
            let female = 0;
            let male = 0;
            let mole_request = 0;
            if (item.specialised === "1" || item.specialised === "3") {
                if (item.checkskinsID !== null) {
                    await Promise.all(item.checkskinsID.map(async (checkskin_id) => {
                        let checkskin = await DataStore.query(CheckSkin, checkskin_id);
                        if (checkskin.type === CheckSkinType.MOLE) {
                            mole_request++;
                            if (checkskin.doctorAnswer === -1) {
                                insufficient++;
                            }
                            if (checkskin.doctorAnswer === 1) {
                                harmless++;
                            }
                            if (checkskin.doctorAnswer === 2) {
                                sucpicious++;
                            }
                            if (checkskin.gender === GenderEnum.FEMALE) {
                                female++;
                            } else {
                                male++;
                            }
                        }
                    }))
                }
            }
            data.push({
                "key": key,
                "dermatologist": item.firstname + item.lastname,
                "harmless": harmless,
                "insufficient": insufficient,
                "sucpicious": sucpicious,
                "female": female,
                "male": male,
                "requests": mole_request,
                "portion": ((harmless + insufficient + sucpicious) / mole_request * 100).toFixed(2)
            })
        }))
        let checkskins = await DataStore.query(CheckSkin, (c) => c.type('eq', CheckSkinType.MOLE));
        await Promise.all(checkskins.map((item) => {
            if (item.doctorID !== null) {
                if (item.doctorAnswer === -1) {
                    all_insufficient++;
                }
                if (item.doctorAnswer === 1) {
                    all_harmless++;
                }
                if (item.doctorAnswer === 2) {
                    all_sucpicious++;
                }
                if (item.doctorAnswer !== null) {
                    if (item.gender === GenderEnum.FEMALE) {
                        all_female++;
                    } else {
                        all_male++;
                    }
                }
            }
        }))
        setResponseData([
            {
                key: 1,
                type: "Harmless Birthmarks",
                value: all_harmless
            },
            {
                key: 2,
                type: "Insufficient Image Quality",
                value: all_insufficient
            },
            {
                key: 3,
                type: "Sucpicious Birthmarks",
                value: all_sucpicious
            }
        ])
        setGenderData([
            {
                type: "Male",
                value: all_male
            },
            {
                type: "Femal",
                value: all_female
            }
        ])
        setTableData(data);
    }

    return (
        <React.Fragment>
            <div className="mt-3 p-4 statistics-mole">
                <h1>Number of Responses by Doctor</h1>
                <Table className="statistics-table" columns={columns} dataSource={tableData} pagination={false} scroll={{ x: 1200 }} />
            </div>
            <Row className="mt-4 mb-5" gutter={[32, 32]}>
                <Col className="gutter-row" md={12}>
                    <div className="response-result p-4">
                        <h2>Responses Result</h2>
                        <Chart data={responseData} />
                    </div>
                </Col>
                <Col className="gutter-row" md={12}>
                    <div className="result-by-gender p-4">
                        <h2>Result by Gender</h2>
                        <Chart data={genderData} />
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default Mole;
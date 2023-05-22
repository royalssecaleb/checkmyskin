import { Table } from "antd";
import React from "react";

const Mole = () => {

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

    const datasource = [
        {
            key: 1,
            dermatologist: "Mark White",
            harmless: 70,
            insufficient: 123,
            sucpicious: 51,
            female: 80,
            male: 164,
            requests: 244,
            portion: "6th"

        },
        {
            key: 2,
            dermatologist: "Mark White",
            harmless: 70,
            insufficient: 123,
            sucpicious: 51,
            female: 80,
            male: 164,
            requests: 244,
            portion: "6th"

        },
        {
            key: 3,
            dermatologist: "Mark White",
            harmless: 70,
            insufficient: 123,
            sucpicious: 51,
            female: 80,
            male: 164,
            requests: 244,
            portion: "6th"

        },
        {
            key: 4,
            dermatologist: "Mark White",
            harmless: 70,
            insufficient: 123,
            sucpicious: 51,
            female: 80,
            male: 164,
            requests: 244,
            portion: "6th"

        },
        {
            key: 5,
            dermatologist: "Mark White",
            harmless: 70,
            insufficient: 123,
            sucpicious: 51,
            female: 80,
            male: 164,
            requests: 244,
            portion: "6th"

        },
        {
            key: 6,
            dermatologist: "Mark White",
            harmless: 70,
            insufficient: 123,
            sucpicious: 51,
            female: 80,
            male: 164,
            requests: 244,
            portion: "6th"

        },
        {
            key: 7,
            dermatologist: "Mark White",
            harmless: 70,
            insufficient: 123,
            sucpicious: 51,
            female: 80,
            male: 164,
            requests: 244,
            portion: "6th"

        }
    ]

    return (
        <React.Fragment>
            <div className="mt-3 p-4 statistics-mole">
                <h1>Number of Responses by Doctor</h1>
                <Table className="statistics-table" columns={columns} dataSource={datasource} pagination={false} scroll={{ x: 1200 }} />
            </div>
        </React.Fragment>
    )
}

export default Mole;
import React from "react";
import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import moment from 'moment';
import jsonData from '../../assets/json/jsonData.json';

const Rash = (props) => {
    const navigate = useNavigate();
    const { rash, status } = props;

    const columns = [
        {
            title: 'Submitted',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (updatedAt) => (
                <span className="table-tbody">{moment(updatedAt).format('YYYY/MM/DD, hh:mm')}</span>
            ),
            sorter: (a, b) => moment(a.updatedAt).unix() - moment(b.updatedAt).unix()
        },
        {
            title: 'User Code',
            dataIndex: 'usercode',
            key: 'usercode',
            render: (usercode) => (
                <span className="usercode">{usercode}</span>
            ),
            sorter: (a, b) => a.usercode.localeCompare(b.usercode)
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            render: (age) => (
                <span className="table-tbody">{age}</span>
            ),
            sorter: (a, b) => a.age - b.age
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender) => (
                <span className="table-tbody">{gender}</span>
            ),
            sorter: (a, b) => a.gender.localeCompare(b.gender)
        },
        {
            title: 'Status',
            dataIndex: 'checkskinstatus',
            key: 'checkskinstatus',
            render: (checkskinstatus) => (
                <span className="table-status">{checkskinstatus}</span>
            ),
            sorter: (a, b) => a.checkskinstatus.localeCompare(b.checkskinstatus)
        },
        {
            title: 'Rash Severity',
            dataIndex: 'severe',
            key: 'severe',
            render: (severe) => (
                <span className="table-tbody">{jsonData?.severe[severe - 1]?.value}</span>
            ),
            sorter: (a, b) => a.severe.localeCompare(b.severe)
        }
    ];

    const handleRow = (item) => {
        if (status === "request") {
            navigate("/doctor/request/" + item.usercode, { replace: true, state: item });
        }
        if (status === "inquiry") {
            navigate("/doctor/inquiry/" + item.usercode, { replace: true, state: item });
        }
    }

    return (
        <React.Fragment>
            <Table className="mt-4" columns={columns} dataSource={rash} pagination={false} scroll={{ x: 1200 }} onRow={(record, index) => {
                return {
                    onClick: () => handleRow(record)
                }
            }} />
        </React.Fragment>
    )
}

export default Rash;
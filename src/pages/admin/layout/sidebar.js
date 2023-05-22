import React from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined, CreditCardOutlined, DashboardOutlined, MedicineBoxOutlined, TeamOutlined } from '@ant-design/icons';
import { IoStatsChartSharp } from 'react-icons/io5';
import { BsFillExclamationOctagonFill } from 'react-icons/bs';
import { Menu } from 'antd';

// css
import '../../../assets/css/admin/sidebar.css'

const SideBar = (props) => {
    const { navitem } = props;
    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const items = [
        getItem(<Link to='/admin'>Dashboard</Link>, 'home', <DashboardOutlined />),
        getItem(<Link to='/admin/clinic'>Clinic</Link>, 'clinic', <HomeOutlined />),
        getItem(<Link to='/admin/doctor'>Doctor</Link>, 'doctor', <MedicineBoxOutlined />),
        getItem(<Link to='/admin/patient'>Patient</Link>, 'patient', <TeamOutlined />),
        getItem(<Link to='/admin/transaction'>Transaction</Link>, 'transaction', <CreditCardOutlined />),
        getItem(<Link to='/admin/statistics'>Statistics</Link>, 'statistics', <IoStatsChartSharp />),
        getItem(<Link to='/admin/spam'>Spam</Link>, 'spam', <BsFillExclamationOctagonFill />),
    ];

    return (
        <Menu
            className="side-bar"
            defaultSelectedKeys={navitem}
            mode="inline"
            items={items}
        />
    )
}

export default SideBar;
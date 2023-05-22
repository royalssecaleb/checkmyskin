import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from 'antd';

// css
import '../../assets/css/common/breadcrumb.css';

const SkinBreadcrumb = (props) => {
    const { text } = props
    return (
        <Breadcrumb separator=">" className="check-skin-breadcrumb">
            <Breadcrumb.Item className="breadcrumb-home"><Link to='/'>Home</Link></Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-check-skin"><Link to={text === "Check My Mole" ? '/check-my-mole' : '/check-my-rash'}>{text}</Link></Breadcrumb.Item>
        </Breadcrumb>
    )
}

export default SkinBreadcrumb;
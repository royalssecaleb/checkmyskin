import React, { useEffect } from "react";
// import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { UserHeader } from '../reducer/HeaderReducer';

// component
import Home1 from '../component/Home/Home1';
import Home2 from "../component/Home/Home2";
import Home3 from "../component/Home/Home3";
import HomeBanner from "../component/Home/HomeBanner";

//css
import '../assets/css/home.css';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        window.localStorage.setItem("header", "user");
        window.localStorage.setItem("footer", "user");
        if (window.localStorage.getItem("header") === "user") {
            dispatch(UserHeader());
        }
    }, []);

    return (
        <div>
            <Home1 />
            <Home2 />
            <Home3 />
            <HomeBanner />
        </div>
    )
}

export default Home;
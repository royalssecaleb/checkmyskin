import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserHeader } from "../reducer/HeaderReducer";
import { UserFooter } from "../reducer/FooterReducer";
import { notification } from "antd";
import { DataStore } from "aws-amplify";
import { Clinic, ClinicType } from "../models";

// components
import SkinBreadcrumb from "../component/common/Breadcrumb";
import Progress from "../component/common/Progress";

// css
import "../assets/css/check-mole.css";

const CheckMyRash = () => {
  const dispatch = useDispatch();
  const [api, ContextHolder] = notification.useNotification();
  const [isVisible, setVisible] = useState(false);
  // const [isClinic, setClinic] = useState([]);

  useEffect(() => {
    window.localStorage.setItem("header", "user");
    window.localStorage.setItem("footer", "user");
    if (window.localStorage.getItem("header") === "user") {
      dispatch(UserHeader());
    }
    if (window.localStorage.getItem("footer") === "user") {
      dispatch(UserFooter());
    }

    getClinicStatus();

    // if (isClinic.length) {
    //   api.error({
    //     message: <label>Error</label>,
    //     description: <label>Clinic is not available.</label>,
    //   });
    // }

  }, []);

  const getClinicStatus = async () => {
    // const clinic_status = DataStore.observeQuery(Clinic, (c) =>
    //   c.active("eq", true).type("eq", ClinicType.RASH)
    // ).subscribe(({ items }) => {
    //   if (items.length) {
    //     setVisible(true);
    //   }
    //   setClinic(items);
    // });

    // return () => {
    //   clinic_status.unsubscribe();
    // };

    const clinic_model = await DataStore.query(Clinic, (c) => c.active("eq", true).type("eq", ClinicType.RASH));
    if(clinic_model.length > 0) {
      setVisible(true)
    } else {
      api.error({
        message: <label>Error</label>,
        description: <label>Clinic is not available.</label>,
      });
    }
  };

  return (
    <div className="container mt-4">
      {ContextHolder}
      <SkinBreadcrumb text="Check My Rash" />
      <h1 className="mt-4 mb-4 check-mole-header">Check My Rash</h1>
      {isVisible && <Progress status="rash" />}
    </div>
  );
};

export default CheckMyRash;

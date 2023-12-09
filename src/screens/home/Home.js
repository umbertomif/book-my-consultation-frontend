import React, { useState } from "react";
import Header from "../../common/header/Header";
import { Tab, Tabs } from "@material-ui/core";
import DoctorList from "../doctorList/DoctorList";
import Appointment from "../appointment/Appointment";

const Home = () => {
    const [tabValue, setTabValue] = useState(0);

    const tabSwitchHandler = (event, tabValue) => {
        setTabValue(tabValue);
    };

    return (
        <div>
            <Header />
            <Tabs
                variant="fullWidth"
                indicatorColor="primary"
                value={tabValue}
                onChange={tabSwitchHandler}
            >
                <Tab label="Doctors" />
                <Tab label="Appointment" />
            </Tabs>
            {tabValue === 0 && (
                <DoctorList />
            )}
            {tabValue === 1 && (
                <Appointment />
            )}
        </div>
    );
};

export default Home;
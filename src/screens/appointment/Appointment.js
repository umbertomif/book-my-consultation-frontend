import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";


const Appointment = () => {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userAppointments,] = useState([]);

    // Retrieve access-token data from session storage
    useEffect(() => {
        const accessToken = sessionStorage.getItem('access-token');
        if (accessToken) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    useEffect(() => {
        const accessToken = sessionStorage.getItem('access-token');
        if (accessToken) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [isLoggedIn]);

    const typographyStyle = {
        margin: 15,
        textAlign: "center"
    };

    return (
        <>
            {!isLoggedIn ? (
                <Typography variant="h6" component="h5" style={typographyStyle}>
                    Login to see appointments
                </Typography>
            ) : userAppointments.length === 0 ? (
                <Typography variant="h6" component="h5" style={typographyStyle}>
                    No Current Appointments to Show.
                </Typography>
            ) : (
                <div></div>
            )}
        </>
    );
}

export default Appointment;

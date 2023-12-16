import React, { useState, useEffect } from "react";
import { Typography, Paper, Button } from "@material-ui/core";
import Modal from "react-modal";
import appointmentService from "../../services/AppointmentService";
import RateAppointment from "./RateAppointment";

const Appointment = () => {

    const typographyStyle = {
        margin: 15,
        textAlign: "center"
    };

    const paperStyle = {
        margin: 15,
        padding: 20,
    }

    const rateAppointmentModal = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            width: "40%",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "0px",
        },
    };

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userAppointments, setUserAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState("");
    const [isModalRateAppointmentOpen, setToggleRateAppointmentModal] = useState(false);

    const getUserAppointments = async (emailId) => {
        try {
            console.log("getUserAppointments")
            const response = await appointmentService.getUserAppointments(emailId);
            if (response) {
                console.log("getUserAppointments successful");
                setUserAppointments(response);
            } else {
                console.error("getUserAppointments error:");
            }
        } catch (error) {
            console.error("getUserAppointments error:", error);
        }
    };

    const rateAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setToggleRateAppointmentModal(true);
    }

    const toggleRateAppointmentModal = () => {
        setToggleRateAppointmentModal(!isModalRateAppointmentOpen);
    }

    useEffect(() => {
        const accessToken = sessionStorage.getItem('access-token');
        if (accessToken) {
            setLoggedIn(true);
        }
        const emailId = sessionStorage.getItem("user-id");
        if (emailId) {
            getUserAppointments(emailId);
        }
    }, []);

    return (
        <>
            {!isLoggedIn ? (
                <Typography variant="h6" component="h5" style={typographyStyle}>
                    Login to see appointments
                </Typography>
            ) : isLoggedIn === true && userAppointments.length > 0 && (
                <>
                    {userAppointments.map((appointment) => (
                        <Paper style={paperStyle} variant="elevation" elevation={2} key={appointment.appointmentId}>
                            <Typography variant="h6">
                                Dr. {appointment.doctorName}
                            </Typography>
                            <Typography variant="body1">
                                Date: {appointment.appointmentDate}
                            </Typography>
                            <Typography variant="body1">
                                Symptoms: {appointment.symptoms}
                            </Typography>
                            <Typography variant="body1">
                                priorMedicalHistory: {appointment.priorMedicalHistory}
                            </Typography>
                            <br />
                            <br />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => { rateAppointment(appointment) }}
                            >
                                Rate Appointment
                            </Button>
                        </Paper>
                    ))}
                    <Modal
                        style={rateAppointmentModal}
                        ariaHideApp={false}
                        isOpen={isModalRateAppointmentOpen}
                        onRequestClose={toggleRateAppointmentModal}
                    >
                        <RateAppointment
                            appointment={selectedAppointment}
                            toggleRateAppointmentModal={toggleRateAppointmentModal}
                        />
                    </Modal>
                </>
            )}
        </>
    );
}

export default Appointment;

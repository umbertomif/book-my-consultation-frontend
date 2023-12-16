import React, { useState, useEffect } from "react";
import { Select, MenuItem, Typography, Grid, Paper, Button } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import Modal from "react-modal";
import doctorService from "../../services/DoctorService";
import DoctorDetails from "./DoctorDetails";
import BookAppointment from "./BookAppointment";

const DoctorList = () => {

    const gridStyle = {
        padding: 10,
        margin: 2,
    };

    const paperStyle = {
        padding: 20,
        margin: 2,
        width: "40%",
    };

    const typographyStyle = {
        textAlign: "center",
        padding: 10
    };

    const selectStyle = {
        minWidth: "250px"
    };

    const doctorDetailsModal = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "0px",
        },
    };

    const bookingAppointmentModal = {
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

    const [specialityList, setSpecialityList] = useState([]);
    const [speciality, setSpeciality] = useState("");
    
    const [doctorsList, setDoctorList] = useState([]);
    const [doctor, setDoctor] = useState("");
    
    const [isModalDoctorDetailsOpen, setToggleDoctorDetailsModal] = useState(false);
    const [isModalBookAppointmentOpen, setToggleBookAppointmentModal] = useState(false);

    const getSpeciality = async () => {
        try {
            const response = await doctorService.getSpeciality();
            if (response) {
                console.log("getDoctorsList successful");
                setSpecialityList(response);
            } else {
                console.error("getDoctorsList error:");
            }
        } catch (error) {
            console.error("getDoctorsList error:", error);
        }
    };

    const getDoctorsList = async () => {
        try {
            const response = await doctorService.getDoctorsList();
            if (response) {
                console.log("getDoctorsList successful");
                setDoctorList(response);
            } else {
                console.error("getDoctorsList error:");
            }
        } catch (error) {
            console.error("getDoctorsList error:", error);
        }
    }

    const getFilteredDoctors = async (speciality) => {
        try {
            const response = await doctorService.getFilteredDoctors(speciality);
            if (response) {
                console.log("getFilteredDoctors successful");
                setDoctorList(response);
            } else {
                console.error("getFilteredDoctors error:");
            }
        } catch (error) {
            console.error("getFilteredDoctors error:", error);
        }
    }

    const handlerChangeSpeciality = (event) => {
        setSpeciality(event.target.value);
        getFilteredDoctors(event.target.value);
    };

    const toggleDoctorDetailsModal = () => {
        setToggleDoctorDetailsModal(!isModalDoctorDetailsOpen);
    }

    const toggleBookAppointmentModal = () => {
        setToggleBookAppointmentModal(!isModalBookAppointmentOpen);
    }

    const doctorDetails = (doctor) => {
        setDoctor(doctor);
        toggleDoctorDetailsModal(true);
    }

    const bookAppointment = (doctor) => {
        setDoctor(doctor);
        setToggleBookAppointmentModal(true);
    }

    useEffect(() => {
        getSpeciality();
        getDoctorsList();
    }, []);

    return (
        <>
            <Grid container alignItems="center" direction="column" style={gridStyle}>
                <Typography style={typographyStyle}>
                    Select Speciality:
                </Typography>
                <Select id="speciality"
                    variant="filled"
                    value={speciality}
                    style={selectStyle}
                    onChange={handlerChangeSpeciality}
                >
                    <MenuItem key={"none"} value={""}>
                        NONE
                    </MenuItem>
                    {specialityList.map((item) => (
                        <MenuItem key={item} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </Grid>
            <Grid container alignItems="center" direction="column" style={gridStyle}>
                {doctorsList.map((doctor) => {
                    return (
                        <Paper key={doctor.id} variant="elevation" elevation={2} style={paperStyle}>
                            <Typography variant="h6" component="h2" style={{ marginBottom: 20 }}>
                                Doctor Name : {doctor.firstName} {doctor.lastName}
                            </Typography>
                            <Typography component="h4" variant="body1">
                                Speciality : {doctor.speciality}
                            </Typography>
                            <Typography component="h4" variant="body1">
                                Rating : <Rating name="read-only" value={doctor.rating} readOnly />
                            </Typography>
                            <Button style={{ width: "40%", margin: "10px" }}
                                variant="contained"
                                color="primary"
                                onClick={() => { bookAppointment(doctor) }}
                            >
                                Book Appointment
                            </Button>
                            <Button style={{ width: "40%", margin: "10px", backgroundColor: 'green' }}
                                variant="contained"
                                color="primary"
                                onClick={() => { doctorDetails(doctor) }}
                            >
                                View Details
                            </Button>
                        </Paper>
                    )
                })}
            </Grid>
            <Modal
                style={bookingAppointmentModal}
                ariaHideApp={false}
                isOpen={isModalBookAppointmentOpen}
                onRequestClose={toggleBookAppointmentModal}
            >
                <BookAppointment doctor={doctor} setToggleBookAppointmentModal={setToggleBookAppointmentModal} />
            </Modal>
            <Modal
                style={doctorDetailsModal}
                ariaHideApp={false}
                isOpen={isModalDoctorDetailsOpen}
                onRequestClose={toggleDoctorDetailsModal}
            >
                <DoctorDetails doctor={doctor} />
            </Modal>
        </>
    );
}

export default DoctorList;

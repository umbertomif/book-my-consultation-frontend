import React, { useState, useEffect } from "react";
import { Select, MenuItem, Typography, Grid, Paper, Button } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import doctorService from "../../services/DoctorService";
import "./DoctorList.css";

const DoctorList = () => {

    const [specialityList, setSpecialityList] = useState([]);
    const [doctorsList, setDoctorList] = useState([]);
    const [speciality, setSpeciality] = useState("");

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

    useEffect(() => {
        getSpeciality();
        getDoctorsList();
    }, []);

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
                            >
                                Book Appointment
                            </Button>
                            <Button style={{ width: "40%", margin: "10px", backgroundColor: 'green' }}
                                variant="contained"
                                color="primary"
                            >
                                View Details
                            </Button>
                        </Paper>
                    )
                })}
            </Grid>
        </>
    );
}

export default DoctorList;

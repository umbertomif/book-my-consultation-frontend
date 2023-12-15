import React, { useState, useEffect } from "react";
import { Paper, CardHeader, CardContent, TextField, FormControl, InputLabel, FormHelperText, Select, MenuItem, Button } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { Alert } from "@material-ui/lab";
import doctorService from "../../services/DoctorService";
import appointmentService from "../../services/AppointmentService";
import DateFnsUtils from "@date-io/date-fns";
import "./BookAppointment.css"

const BookAppointment = ({ doctor, setToggleBookAppointmentModal }) => {

    const dateFormatter = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const [availableSlotList, setAvailableSlotList] = useState([]);
    const [userAppointments, setUserAppointments] = useState([]);

    const [selectedDate, setSelectedDate] = useState(dateFormatter(new Date()));
    const [selectedDateError, setSelectedDateError] = useState(null);

    const [timeSlot, setTimeSlot] = useState("");
    const [timeSlotError, setTimeSlotError] = useState(null);

    const [medicalHistory, setMedicalHistory] = useState("");
    const [symptoms, setSymptoms] = useState("");

    const [error, setError] = useState(null);
    const [bookedSuccessfully, setBookedSuccessfully] = useState(false);

    const formStyle = {
        margin: 10
    };

    const selectStyle = {
        minWidth: "200px"
    };

    const getAvailableSlots = async (doctorId, selectedDate) => {
        try {
            const response = await doctorService.getAvailableSlots(doctorId, selectedDate);
            if (response) {
                console.log("getAvailableSlots successful");
                setAvailableSlotList(response.timeSlot);
            } else {
                console.error("getAvailableSlots error:");
            }
        } catch (error) {
            console.error("getAvailableSlots error:", error);
        }
    };

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

    const handlerChangeAvaiableSlot = (event) => {
        setTimeSlot(event.target.value);
    };

    const handlerChangeSelectedDate = (date) => {
        setSelectedDate(dateFormatter(date));
    };

    const validateForm = () => {
        if (selectedDate.trim() === "") {
            setSelectedDateError(true);
            return false;
        } else {
            setSelectedDateError(false);
        }
        if (timeSlot.trim() === "") {
            setTimeSlotError(true);
            return false;
        } else {
            setTimeSlotError(false);
        }
        const accessToken = sessionStorage.getItem('access-token');
        if (!accessToken) {
            alert("Please Login to Book an appointment");
            return false;
        }
        const existingAppointment = userAppointments.filter((appointment) => {
            if (appointment.appointmentDate === selectedDate && appointment.timeSlot === timeSlot) {
                return appointment;
            }
            return null;
        }
        );
        if (existingAppointment.length > 0) {
            alert("Either the slot is already booked or not available");
            return false;
        }
        return true
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const userId = sessionStorage.getItem("user-id");
                const firstName = sessionStorage.getItem("user-firstName");
                const lastName = sessionStorage.getItem("user-lastName");
                const data = {
                    doctorId: doctor.id,
                    doctorName: `${doctor.firstName} ${doctor.lastName}`,
                    userId: userId,
                    userName: `${firstName} ${lastName}`,
                    userEmailId: userId,
                    timeSlot: timeSlot,
                    appointmentDate: selectedDate,
                    createdDate: dateFormatter(new Date()),
                    symptoms: symptoms,
                    priorMedicalHistory: medicalHistory,
                };
                const response = await appointmentService.bookAppointment(data);
                if (response) {
                    console.log("Book Appointment Successful");
                    setBookedSuccessfully(true);
                    setTimeout(() => {
                        setToggleBookAppointmentModal(false);
                    }, 2000)
                }
            } catch (error) {
                console.error("Book Appointment error:", error);
                setError(error.message);
            }
        }
    };

    useEffect(() => {
        const emailId = sessionStorage.getItem("user-id");
        if (emailId) {
            getUserAppointments(emailId);
        }
    }, []);

    useEffect(() => {
        getAvailableSlots(doctor.id, selectedDate);
    }, [doctor, selectedDate]);

    return (
        <Paper key={doctor.id} variant="elevation" elevation={2}>
            <CardHeader className="card-header" title="Book an Appointment" />
            <CardContent key={doctor.id} >
                <form onSubmit={handleSubmit} noValidate>
                    <TextField
                        style={formStyle}
                        disabled
                        required
                        label="Doctor Name"
                        value={`${doctor.firstName}  ${doctor.lastName}`}
                    /><br />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            style={formStyle}
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            label="Date picker inline"
                            value={selectedDate}
                            onChange={handlerChangeSelectedDate}
                            KeyboardButtonProps={{
                                "aria-label": "change date",
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    {selectedDateError === true && (
                        <FormHelperText>
                            <span style={{ color: "red" }}>Select a time slot</span>
                        </FormHelperText>)
                    }
                    <br />
                    <FormControl style={formStyle}>
                        <InputLabel>Time Slot</InputLabel>
                        <Select id="timeSlotInput"
                            variant="filled"
                            value={timeSlot}
                            style={selectStyle}
                            onChange={handlerChangeAvaiableSlot}
                        >
                            <MenuItem key={"none"} value={""}>
                                NONE
                            </MenuItem>
                            {availableSlotList.map((item) => (
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            ))}
                        </Select>
                        {timeSlotError === true && (
                            <FormHelperText>
                                <span style={{ color: "red" }}>Select a time slot</span>
                            </FormHelperText>)
                        }
                    </FormControl>
                    <br />
                    <FormControl style={formStyle}>
                        <TextField
                            id="standard-multiline-static"
                            label="Medical History"
                            multiline
                            rows={4}
                            value={medicalHistory}
                            onChange={(e) => setMedicalHistory(e.target.value)}
                        />
                    </FormControl>
                    <br />
                    <FormControl style={formStyle}>
                        <TextField
                            id="standard-multiline-static"
                            label="Symptoms"
                            multiline
                            rows={4}
                            placeholder="ex.Cold, Swelling, etc"
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                        />
                    </FormControl>
                    <br />
                    <Button
                        style={formStyle}
                        id="bookappointment"
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Book Appointment
                    </Button>
                    {
                        bookedSuccessfully &&
                        <Alert variant="filled" severity="success">
                            Appointment booked successfully
                        </Alert>
                    }
                    {
                        error &&
                        <Alert variant="filled" severity="error">
                            {error}
                        </Alert>
                    }
                </form>
            </CardContent>
        </Paper>
    );
};

export default BookAppointment;
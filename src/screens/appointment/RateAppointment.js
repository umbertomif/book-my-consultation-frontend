import React, { useState } from "react";
import { Paper, CardHeader, CardContent, TextField, FormControl, FormHelperText, Typography, Button } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { Alert } from "@material-ui/lab";
import ratingService from "../../services/RatingService";

const RateAppointment = ({ appointment, toggleRateAppointmentModal }) => {

    const formStyle = {
        margin: 15,
    };

    const [comments, setComments] = useState("");

    const [rating, setRating] = useState(0);
    const [ratingRequiredClass, setRatingRequiredClass] = useState("none");
    const [ratingError, setRatingError] = useState(null);

    const [error, setError] = useState(null);
    const [ratingSuccessfully, setRatingSuccessfully] = useState(false);

    const handlerRatingChange = (e, value) => {
        setRating(value);
        setRatingRequiredClass("none");
    };

    const validateForm = () => {
        if (rating === 0 || rating === null || ratingRequiredClass === "block") {
            setRatingError(true);
            setRatingRequiredClass("block");
            return false;
        } else {
            setRatingError(false);
            setRatingRequiredClass("none");
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const data = {
                    appointmentId: appointment.appointmentId,
                    doctorId: appointment.doctorId,
                    rating: rating,
                    comments: comments
                };
                const response = await ratingService.ratings(data);
                if (response) {
                    console.log("Rating Appointment Successful");
                    setRatingSuccessfully(true);
                    setTimeout(() => {
                        toggleRateAppointmentModal();
                    }, 2000)
                }
            } catch (error) {
                console.error("Rating Appointment error:", error);
                setError(error.message);
            }
        }
    }

    return (
        <Paper variant="elevation" key={appointment.id} elevation={2}>
            <CardHeader className="card-header" title="Rate an Appointment" />
            <CardContent key={appointment.id} >
                <form onSubmit={handleSubmit} noValidate>
                    <FormControl style={formStyle}>
                        <TextField
                            label="Comments"
                            multiline
                            rows={4}
                            defaultValue=""
                            onChange={(e) => setComments(e.target.value)}
                        />
                    </FormControl>
                    <br />
                    <FormControl style={formStyle}>
                        <Typography variant="body1">
                            Rating: &nbsp;
                            <Rating
                                name={appointment.appointmentId}
                                value={rating}
                                onChange={handlerRatingChange}
                            />
                        </Typography>
                        {ratingError === true && (
                            <FormHelperText>
                                <span style={{ color: "red" }}>Select a rating</span>
                            </FormHelperText>)
                        }
                    </FormControl>
                    <br /><br />
                    <Button
                        style={formStyle}
                        id="bookappointment"
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        RATE APPOINTMENT
                    </Button>
                    {
                        ratingSuccessfully &&
                        <Alert variant="filled" severity="success">
                            Appointment Rate successfully
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
}

export default RateAppointment;
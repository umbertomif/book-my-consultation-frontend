import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import authService from "../../services/AuthService";

const useStyles = makeStyles((theme) => ({
    form: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    typography: {
        padding: theme.spacing(1),
        backgroundColor: "#464646",
        color: "white",
        fontSize: "14px",
    },
}));

const Register = () => {

    const classes = useStyles();

    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState(null);

    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState(null);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(null);

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const [contactNo, setContactNo] = useState("");
    const [contactNoError, setContactNoError] = useState(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const [error, setError] = useState(null);

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const initialState = () => {
        setFirstNameError(null);
        setLastNameError(null);
        setEmailError(null);
        setPasswordError(null);
        setContactNoError(null);
        setError(null);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setContactNo("");
    }

    const validateForm = () => {
        if (firstName.trim() === "") {
            setFirstNameError(true);
            setAnchorEl(document.getElementById("firstName"));
            return false;
        }
        if (lastName.trim() === "") {
            setLastNameError(true);
            setAnchorEl(document.getElementById("lastName"));
            return false;
        }
        if (email.trim() === "") {
            setEmailError(true);
            setAnchorEl(document.getElementById("email"));
            return false;
        }
        if (password.trim() === "") {
            setPasswordError(true);
            setAnchorEl(document.getElementById("password"));
            return false;
        }
        if (contactNo.trim() === "") {
            setContactNoError(true);
            setAnchorEl(document.getElementById("contactNo"));
            return false;
        }
        return true
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await authService.registerService(email, password, firstName, lastName, contactNo);
                if (response) {
                    console.log("Registered successful");
                    // Reset the form
                    initialState();
                    // Redirect to home screen using window.location
                    window.location.href = '/';
                } else {
                    console.error("Registered error:");
                }
            } catch (error) {
                console.error("Login error:", error);
                setError(error.message);
            }
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
        setParentAnchorElNull();
    };

    const setParentAnchorElNull = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        setAnchorEl(anchorEl);
    }, [anchorEl]);

    return (
        <>
            <Container component="main" maxWidth="xs">
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        required
                        id="firstName"
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        error={firstNameError}
                        helperText={firstNameError ? "First Name is required" : ""}
                    />
                    <TextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        required
                        id="lastName"
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        error={lastNameError}
                        helperText={lastNameError ? "Last Name is required" : ""}
                    />
                    <TextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        required
                        id="email"
                        label="Email Address"
                        value={email}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError}
                        helperText={emailError ? "Username is required" : ""}
                    />
                    <TextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        required
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={passwordError}
                        helperText={passwordError ? "Password is required" : ""}
                    />
                    <TextField
                        variant="standard"
                        margin="normal"
                        fullWidth
                        required
                        id="phone"
                        label="Mobile No."
                        value={contactNo}
                        type="number"
                        onChange={(e) => setContactNo(e.target.value)}
                        error={contactNoError}
                        helperText={contactNoError ? "Phone is required" : ""}
                    />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            REGISTER
                        </Button>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom", horizontal: "center"
                            }}
                            transformOrigin={{
                                vertical: "top", horizontal: "center"
                            }}
                        >
                            <Typography className={classes.typography}>
                                Please fill out this field
                            </Typography>
                        </Popover>
                    </div>
                </form>
            </Container>
            {
                error &&
                <Alert variant="filled" severity="error">
                    {error}
                </Alert>
            }
        </>
    );
}

export default Register;
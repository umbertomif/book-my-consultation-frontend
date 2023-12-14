import React, { useState, useEffect } from "react";
import { Container, Button, Typography, FormControl, InputLabel, Input, FormHelperText } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import { Alert } from "@material-ui/lab";
import authService from "../../services/AuthService";
import { makeStyles } from "@material-ui/core/styles";

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
    formControl: {
        margin: 10
    },
    container: {
        textAlign: "center"
    }
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
    const [success, setSuccess] = useState(null);

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const initialState = () => {
        setFirstNameError(null);
        setLastNameError(null);
        setEmailError(null);
        setPasswordError(null);
        setContactNoError(null);
        setError(null);
        setSuccess(null);
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
        const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\\.,;:\s@"]{2,})$/i;
        if (!email.match(emailRegex)) {
            setEmailError(true);
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
        const contactNoRegex = /^[6-9]\d{9}$/i;
        if (!contactNo.match(contactNoRegex)) {
            setContactNoError(true);
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
                    console.log("Registration Successful");
                    setSuccess("Registration Successful");
                    // wait for 2 second and after log in.
                    setTimeout(() => {
                        handleLogin();
                    }, 2000);
                } else {
                    console.error("Registered error:");
                }
            } catch (error) {
                console.error("Registered error:", error);
                setError(error.message);
            }
        }
    };

    const handleLogin = async () => {
        try {
            const response = await authService.loginService(email, password);
            if (response) {
                console.log("Login successful");
                // Reset the form
                initialState();
                // Redirect to home screen using window.location
                window.location.href = '/';
            } else {
                console.error("Login error:");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError(error.message);
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
            <Container component="main" maxWidth="xs" className={classes.container}>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                        <Input
                            id="firstName"
                            value={firstName}
                            onChange={({ target }) => setFirstName(target.value)}
                        />
                        {firstNameError === true && (
                            <FormHelperText>
                                <span style={{ color: "red" }}>First Name is required</span>
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                        <Input
                            id="lastName"
                            value={lastName}
                            onChange={({ target }) => setLastName(target.value)}
                        />
                        {lastNameError === true && (
                            <FormHelperText>
                                <span style={{ color: "red" }}>Last Name is required</span>
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            id="email"
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                        />
                        {emailError === true && (
                            <FormHelperText>
                                <span style={{ color: "red" }}>Enter valid Email</span>
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            type="password"
                        />
                        {passwordError === true && (
                            <FormHelperText>
                                <span style={{ color: "red" }}>Password is required</span>
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl required={true}>
                        <InputLabel htmlFor="contactNo">Mobile No.</InputLabel>
                        <Input
                            id="contactNo"
                            value={contactNo}
                            onChange={({ target }) => setContactNo(target.value)}
                        />
                        {contactNoError === true && (
                            <FormHelperText>
                                <span style={{ color: "red" }}>Enter valid mobile number</span>
                            </FormHelperText>
                        )}
                    </FormControl>
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
            {
                success &&
                <Alert variant="filled" severity="success">
                    {success}
                </Alert>
            }
        </>
    );
}

export default Register;
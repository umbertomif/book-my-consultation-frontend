import React, { useState, useEffect } from "react";
import { Container, Button, Typography, FormControl, InputLabel, Input, FormHelperText } from "@material-ui/core";
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
    formControl: {
        margin: 15
    },
    container: {
        textAlign: "center"
    }
}));

const Login = () => {

    const classes = useStyles();

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(null);

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const [error, setError] = useState(null);

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const initialState = () => {
        setError(null);
        setEmailError(null);
        setPasswordError(null);
        setEmail("");
        setPassword("");
    };

    const validateForm = () => {
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
        setError(null);
        setEmailError(false);
        setPasswordError(false);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
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
                            LOGIN
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

export default Login;

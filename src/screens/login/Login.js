import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import { Alert } from "@material-ui/lab";
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

    const validateForm = (event) => {
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
        setError(null);
        setEmailError(false);
        setPasswordError(false);
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm(e)) {
            try {
                console.log("Login successful");
                // Reset the form
                initialState();
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
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        autoComplete="email"
                        value={email}
                        onInput={e => { setEmail(e.target.value) }}
                        error={emailError}
                        helperText={emailError ? "Email is required" : ""}
                    />
                    <TextField
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onInput={e => setPassword(e.target.value)}
                        error={passwordError}
                        helperText={passwordError ? "Password is required" : ""}
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

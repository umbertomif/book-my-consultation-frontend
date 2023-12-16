import React, { useState, useEffect } from "react";
import "./Header.css";
import logoImage from "../../assets/logo.jpeg";
import { Box, AppBar, Toolbar, Typography, Button, Card, Paper, CardHeader, CardContent } from '@material-ui/core';

import Modal from "react-modal";
import { Tab } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import Register from "../../screens/register/Register";
import Login from "../../screens/login/Login";
import authService from "../../services/AuthService";

const Header = () => {

    const modalStyle = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "50%",
            padding: "0",
            transform: "translate(-50%, -50%)",
        }
    };

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isModalOpen, setToggleModal] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    function toggleModal() {
        setToggleModal(!isModalOpen);
    }

    const handleTabValueChange = (event, value) => {
        setTabValue(value);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.logoutService();
            if (response) {
                setLoggedIn(false);
            } else {
                console.error("Logout error:");
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

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

    return (
        <>
            <AppBar className="header-container" position="static">
                <Toolbar disableGutters className="toolbar-container">
                    <img src={logoImage} alt="Doctor Finder" sx={{ flexGrow: 1 }} className="header-logo-image" />
                    <Typography noWrap variant="h6" sx={{ color: 'white', flexGrow: 1 }}>
                        Doctor Finder
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    {(!isLoggedIn) ?
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={toggleModal}
                        >
                            LOGIN
                        </Button>
                        :
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleLogout}
                        >
                            LOGOUT
                        </Button>
                    }
                </Toolbar>
            </AppBar>
            <Card component="main">
                <Modal
                    ariaHideApp={false}
                    isOpen={isModalOpen}
                    onRequestClose={toggleModal}
                    style={modalStyle}
                    centered
                >
                    <Paper variant="elevation" elevation={2}>
                        <CardHeader className="card-header" title="Authentication" />
                        <CardContent>
                            <Tabs value={tabValue} onChange={handleTabValueChange}>
                                <Tab label="Login" />
                                <Tab label="Register" />
                            </Tabs>
                            {tabValue === 0 && (
                                <Login setLoggedIn={setLoggedIn} toggleModal={toggleModal} />
                            )}
                            {tabValue === 1 && (
                                <Register setLoggedIn={setLoggedIn} toggleModal={toggleModal} />
                            )}
                        </CardContent>
                    </Paper>
                </Modal>
            </Card>
        </>
    );
}

export default Header;
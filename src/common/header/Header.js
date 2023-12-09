import React, { useState, useEffect } from "react";
import "./Header.css";
import logoImage from "../../assets/logo.jpeg";
import { Box, AppBar, Toolbar, Typography, Button, Container } from '@material-ui/core';

import Modal from "react-modal";
import { Tab } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import Register from "../../screens/register/Register";
import Login from "../../screens/login/Login";

export default function Header() {
    const [ ,setLoggedIn] = useState(false);
    const [isModalOpen, setToggleModal] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    // Retrieve access-token data from session storage
    useEffect(() => {
        const accessToken = sessionStorage.getItem('access-token');
        if (accessToken) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    // Toggle Modal
    function toggleModal() {
        setToggleModal(!isModalOpen);
    }

    const handleTabValueChange = (event, value) => {
        setTabValue(value);
    };

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

    return (
        <>
            <AppBar className="header-container" position="static">
                <Toolbar disableGutters className="toolbar-container">
                    <img src={logoImage} alt="Doctor Finder" sx={{ flexGrow: 1 }} className="header-logo-image" />
                    <Typography noWrap variant="h6" sx={{ color: 'white', flexGrow: 1 }}>
                        Doctor Finder
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    {(true) ?
                        //{(isLoggedIn) ?
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
                        >
                            LOGOUT
                        </Button>
                    }
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xs">
                <Modal
                    ariaHideApp={false}
                    isOpen={isModalOpen}
                    onRequestClose={toggleModal}
                    style={modalStyle}
                    centered
                >
                    <Box className="box-container" >
                        Authentication
                    </Box>
                    <Tabs value={tabValue} onChange={handleTabValueChange}>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                    {tabValue === 0 && (
                        <Login />
                    )}
                    {tabValue === 1 && (
                        <Register />
                    )}
                </Modal>
            </Container>
        </>
    );
}
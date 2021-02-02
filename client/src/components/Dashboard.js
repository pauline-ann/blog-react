import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Button, Modal } from "semantic-ui-react";
import { Link } from 'react-router-dom';

import NewPost from "./NewPost";

//Dashboard
const Dashboard = (props) => {

    const modalTriggerStyle = {
        "text-align": "center",
        'width': '100%',
        'text-align': 'center',
        'padding-top': '3rem',
        'padding-bottom': '3rem',
        'background': 'rgb(254,212,139)'
    }

    return (
        <div>
            <Container textAlign="center">
                <h1>Dashboard</h1><br/>
                <Modal trigger={
                    <Button style={modalTriggerStyle}>New Post</Button>
                }>
                    <Modal.Header>New Post</Modal.Header>
                    <Modal.Content>
                        <NewPost />
                    </Modal.Content>
                </Modal>
            </Container>
        </div>
    );
}

export default Dashboard;
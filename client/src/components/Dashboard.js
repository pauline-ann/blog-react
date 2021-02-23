import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Button, Modal, Divider, List, Image } from "semantic-ui-react";
import { Redirect } from 'react-router-dom';

import CreateForm from "./CreateForm";
import PostList from './PostList';

//Dashboard
const Dashboard = (props) => {

    // Component Styling

    const modalTriggerStyle = {
        'text-align': "center",
        'width': '100%',
        'padding-top': '3rem',
        'padding-bottom': '3rem',
        'background': 'rgb(254,237,207)'
    }

    const headerStyle = {
        'text-align': 'center'
    }

    return (
        <React.Fragment>
            <Container>
                <h1 style={headerStyle}>Dashboard</h1><br />
                <Modal closeIcon trigger={
                    <Button style={modalTriggerStyle}>Create New Post</Button>
                }>
                    <Modal.Header textAlign='center'>New Post</Modal.Header>
                    <Modal.Content>
                        <CreateForm />
                    </Modal.Content>
                </Modal>
                <br />
                <Divider section />
                <h2 style={headerStyle}>Edit Posts</h2><br />
                <PostList />
            </Container>
        </React.Fragment>
    );
}

export default Dashboard;
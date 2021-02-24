import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Modal, Divider, List, Image } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import CreateForm from './CreateForm';
import PostList from './PostList';

//Dashboard
const Dashboard = (props) => {

    // Component Styling

    const modalTriggerStyle = {
        textAlign: 'center',
        width: '100%',
        paddingTop: '3rem',
        paddingBottom: '3rem',
        background: 'rgb(254,237,207)'
    }

    const headerStyle = {
        textAlign: 'center'
    }

    return (
        <React.Fragment>
            <Container>
                <h1 style={headerStyle}>Dashboard</h1><br />
                <Modal closeIcon trigger={
                    <Button style={modalTriggerStyle}>Create New Post</Button>
                }>
                    <Modal.Header style={headerStyle}>New Post</Modal.Header>
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
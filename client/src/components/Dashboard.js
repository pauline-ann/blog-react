import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Divider } from 'semantic-ui-react';
import axios from 'axios';

import CreateForm from './CreateForm';
import FeaturedForm from './FeaturedForm';
import PostList from './PostList';

//Dashboard
const Dashboard = (props) => {

    // Component Styling

    const modalTriggerStyle = {
        textAlign: 'center',
        width: '49%',
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
                {/* Create New Post Button */}
                <Modal
                    closeIcon
                    trigger={
                        <Button style={modalTriggerStyle} floated='left'>New Post</Button>
                    }>
                    <Modal.Header
                        style={headerStyle}>New Post</Modal.Header>
                    <Modal.Content>
                        <CreateForm />
                    </Modal.Content>
                </Modal>
                {/* Set Featured Posts Button */}
                <Modal
                    closeIcon
                    trigger={
                        <Button style={modalTriggerStyle} floated='right'>Set Featured</Button>
                    }>
                    <Modal.Header
                        style={headerStyle}>Set Featured Posts</Modal.Header>
                    <Modal.Content>
                        <FeaturedForm />
                    </Modal.Content>
                </Modal>
                <br />
                <Divider section clearing horizontal />
                <h2 style={headerStyle}>Edit Posts</h2><br />
                <PostList />
            </Container>
        </React.Fragment>
    );
}

export default Dashboard;
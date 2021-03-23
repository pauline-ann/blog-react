import React from 'react';
import { Container, Button, Modal, Divider } from 'semantic-ui-react';

import CreateForm from '../CreateForm/CreateForm';
import PostList from '../PostList';

import './Dashboard.css';

//Dashboard
const Dashboard = (props) => {

    return (
        <React.Fragment>
            <Container className='dashboard-container'>
                <h1 className='dashboard-header'>Dashboard</h1><br />
                {/* Create New Post Button */}
                <Modal
                    closeIcon
                    trigger={
                        <Button className='dashboard-modal-trigger'><span className='dashboard-modal-trigger--text'>New Post</span></Button>
                    }>
                    <Modal.Header
                        className='dashboard-header'>New Post</Modal.Header>
                    <Modal.Content>
                        <CreateForm />
                    </Modal.Content>
                </Modal>
                <br />
                <Divider section clearing horizontal />
                <Divider section clearing horizontal />
                <h2 className='dashboard-header'>Edit Posts</h2><br />
                <PostList />
            </Container>
        </React.Fragment>
    );
}

export default Dashboard;
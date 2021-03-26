import React, { useState } from 'react';
import { Container, Button, Modal, Divider, Dimmer, Loader } from 'semantic-ui-react';

import CreateForm from '../CreateForm/CreateForm';
import PostList from '../PostList/PostList';

import './Dashboard.css';

//Dashboard
const Dashboard = (props) => {

    const [loading, setLoading] = useState(false);

    // set loading to true when loading

    return (
        <React.Fragment>
            <Dimmer active={loading} page>
                <Loader active inline='centered' size='huge'>
                    Loading...
                </Loader>
            </Dimmer>
            <Container className='dashboard-container'>
                <h1 className='dashboard-header'>Dashboard</h1><br />
                {/* Pop-up for Creating Post */}
                <Modal
                    closeIcon
                    trigger={
                        // Trigger to Open Pop-up
                        <Button className='dashboard-modal-trigger'><span className='dashboard-modal-trigger--text'>New Post</span></Button>
                    }>
                    <Modal.Header
                        className='dashboard-header'>New Post</Modal.Header>
                    <Modal.Content>
                        {/* Component Containing Form */}
                        <CreateForm
                            onLoad={setLoading}
                        />
                    </Modal.Content>
                </Modal>
                <br />
                <Divider section clearing horizontal />
                <Divider section clearing horizontal />
                <h2 className='dashboard-header'>Edit Posts</h2><br />
                {/* List of Posts */}
                <PostList onLoad={setLoading}/>
            </Container>
        </React.Fragment>
    );
}

export default Dashboard;
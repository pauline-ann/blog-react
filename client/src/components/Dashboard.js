import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Button, Modal } from "semantic-ui-react";

import NewPost from "./NewPost";

//Dashboard
const Dashboard = (props) => {

    return (
        <div>
            <Container textAlign="center">
                <Modal trigger={<Button color="teal">New Post</Button>}>
                    <Modal.Header>New Post</Modal.Header>
                    <Modal.Content>
                        <NewPost />
                    </Modal.Content>
                </Modal>
                Dashboard
            </Container>
        </div>
    );
}

export default Dashboard;
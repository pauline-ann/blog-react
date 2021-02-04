import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Button, Modal, Divider, List, Image } from "semantic-ui-react";

import CreatePost from "./CreatePost";
import UpdateDeletePost from './UpdateDeletePost';
import sample from "../assets/images/ramen-icon.png";

//Dashboard
const Dashboard = (props) => {

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

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await axios.get('/api/posts')
                .then((res) => {
                    // handle success
                    console.log(res);
                    setPosts(res.data);
                })
                .catch((err) => {
                    // handle error
                    console.log(err);
                });
        }
        fetchData();
    }, [])

    return (
        <div>
            <Container>
                <h1 style={headerStyle}>Dashboard</h1><br />
                <Modal closeIcon trigger={
                    <Button style={modalTriggerStyle}>Create New Post</Button>
                }>
                    <Modal.Header textAlign='center'>New Post</Modal.Header>
                    <Modal.Content>
                        <CreatePost />
                    </Modal.Content>
                </Modal>
                <br />
                <Divider section />
                <h2 style={headerStyle}>Edit Posts</h2><br />
                <List divided verticalAlign>
                    {posts.map((post, i) => {
                        return <List.Item>
                            <Image avatar src={sample} />
                            <List.Content>
                                <Modal closeIcon trigger={
                                    <List.Header as='a'>{post.title}</List.Header>
                                }>
                                    <Modal.Header textAlign='center'>Edit Post</Modal.Header>
                                    <Modal.Content>
                                        <UpdateDeletePost />
                                    </Modal.Content>
                                </Modal>
                                <List.Description>
                                    {post.description}
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    })}
                </List>
            </Container>
        </div>
    );
}

export default Dashboard;
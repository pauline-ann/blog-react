import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Button, Modal, Divider, List, Image } from "semantic-ui-react";
import { Redirect } from 'react-router-dom';

import CreatePost from "./CreatePost";
import UpdatePost from './UpdatePost';

import sample from "../assets/images/ramen-icon.png";

//Dashboard
const Dashboard = (props) => {

    let postDeleted = false;

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

    const listItemStyle = {
        'padding': '.75em 0',
        'display': 'block'
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

    function deletePost(post, e) {

        e.preventDefault();

        axios.delete('/api/posts/' + post._id)
            .then(res => {
                console.log(res.data)
                if (res.status === 200) {
                    console.log('Post successfully deleted')
                    // this.forceUpdate();
                } else {
                    console.log('Error: delete post')
                }
            })
        //refresh component
        //ask user if sure        
    }

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
                        console.log('post')
                        console.log(post)
                        return <List.Item style={listItemStyle}>
                            <Image avatar src={sample} />
                            <List.Content>
                                <List.Header>{post.title}</List.Header>
                                <List.Description>
                                    {post.description}
                                </List.Description>
                            </List.Content>
                            <Modal closeIcon trigger={
                                <Button circular icon='edit outline' />
                            }><Modal.Header textAlign='center'>Edit Post</Modal.Header>
                                <Modal.Content>
                                    <UpdatePost
                                        title={post.title}
                                        description={post.description}
                                        content={post.content}
                                        category={post.category}
                                        location={post.location}
                                        aesthetic={post.rating.aesthetic}
                                        vibes={post.rating.vibes}
                                        id={post._id}
                                    />
                                </Modal.Content>
                            </Modal>
                            <Button circular icon='delete' onClick={(e) => { deletePost(post, e) }} />
                        </List.Item>
                    })}
                </List>
            </Container>
        </div>
    );
}

export default Dashboard;
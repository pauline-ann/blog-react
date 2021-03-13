import React, { useState, useEffect } from "react";
import axios from 'axios';
import { List } from "semantic-ui-react";
import moment from 'moment';

import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';

const PostList = (props) => {

    // Component Styling
    const listItemStyle = {
        'padding': '.75em 0',
        'display': 'block'
    }

    const dateStyle = {
        fontStyle: 'italic',
        paddingBottom: '8px'
    }

    const postTitleStyle = {
        paddingBottom: '8px',
        fontSize: '1.2em'
    }

    // Initiate state to store and list posts
    const [posts, setPosts] = useState([]);

    // Hook to grab posts from api
    useEffect(() => {
        async function fetchData() {
            await axios.get('/api/posts')
                .then((res) => {
                    // handle success
                    setPosts(res.data.reverse());
                })
                .catch((err) => {
                    // handle error
                    console.log(err);
                });
        }
        fetchData();
    }, [])

    // Get api info
    const getPosts = () => {
        axios.get('/api/posts')
            .then((res) => {
                // handle success
                setPosts(res.data);
            })
            .catch((err) => {
                // handle error
                console.log(err);
            });
    }

    return (
        <React.Fragment>
            <List divided verticalAlign='middle'>
                {posts.map((post, i) => {
                    console.log(post)
                    return (
                        <List.Item
                            style={listItemStyle}
                            key={post._id}>
                            {/* EDIT POST BUTTON/MODAL */}
                            <UpdateModal
                                title={post.title}
                                description={post.description}
                                content={post.content}
                                category={post.category}
                                location={post.location}
                                aesthetic={post.rating.aesthetic}
                                vibes={post.rating.vibes}
                                id={post._id}
                            />
                            {/* DELETE POST BUTTON/MODAL */}
                            <DeleteModal id={post._id} getPosts={getPosts} />
                            <List.Content>
                                <List.Description style={dateStyle}>{moment(post.createdAt).format('dddd, MMMM Do YYYY')}</List.Description>
                                <List.Header style={postTitleStyle}>{post.title}</List.Header>
                                <List.Description>
                                    {post.description}
                                </List.Description>
                            </List.Content>
                        </List.Item>)
                })}
            </List>
        </React.Fragment>
    );
}

export default PostList;
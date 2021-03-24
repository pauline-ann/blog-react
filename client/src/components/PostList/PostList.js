import React, { useState, useEffect } from "react";
import axios from 'axios';
import { List } from "semantic-ui-react";
import moment from 'moment';
import { Link } from 'react-router-dom';

// Components
import UpdateModal from '../UpdateModal';
import DeleteModal from '../DeleteModal';

// CSS
import './PostList.css';

const PostList = (props) => {

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
                setPosts(res.data.reverse());
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
                            className='postlist-item'
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
                                flavor={post.rating.flavor}
                                fileName={post.photo.fileName}
                                fileID={post.photo.fileID}
                                id={post._id}
                            />
                            {/* DELETE POST BUTTON/MODAL */}
                            <DeleteModal postID={post._id} fileID={post.photo.fileID} getPosts={getPosts} />
                            <List.Content as={Link} to={`/post/${post._id}`}>
                                <List.Description className='postlist-date'>{moment(post.createdAt).format('dddd, MMMM Do YYYY')}</List.Description>
                                <List.Header className='postlist-title'>{post.title}</List.Header>
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
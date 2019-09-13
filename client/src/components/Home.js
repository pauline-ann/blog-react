import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container } from "semantic-ui-react";

//Components
import Navbar from "./Navbar/Navbar";

//GET ALL BLOG POSTS AND DISPLAY ON HOME PAGE
const Home = (props) => {

    const [posts, setPosts] = useState([]);
    // posts: []

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
            <Navbar />
            <Container
                textAlign="center"
            >
                {/* RENDER POSTS HERE */}
                <ul>
                    {posts.map(post => (
                        <li key={post.objectID}>
                            <p>{post.title}</p>
                            <p>{post.description}</p>
                            <p>{post.content}</p>
                            <p>{post.catagory}</p>
                        </li>
                    ))}
                </ul>
            </Container>
        </div >
    );
}

export default Home;
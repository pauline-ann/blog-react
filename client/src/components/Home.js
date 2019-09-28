import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Container, Item } from "semantic-ui-react";
// import { Link } from "react-router-dom";

//Components
import Post from "./Post";

//Homepage
const Home = (props) => {

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
                <Item.Group link>
                    {posts.map(post => {
                        return <Post
                            title={post.title}
                            description={post.description}
                            content={post.content}
                            category={post.category}
                            location={post.location}
                            aesthetic={post.rating.aesthetic}
                            vibes={post.rating.vibes}
                        />
                    }
                    )}
                </Item.Group>
            </Container>
        </div >
    );
}

export default Home;
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Grid, Segment } from "semantic-ui-react";

// Featured Posts

// Import featured posts (rank: 1, 2, 3)
// Add formatting

const FeaturedPosts = (props) => {

    // Initiate state to store and list posts
    const [posts, setPosts] = useState([]);

    // Hook to grab posts from api
    useEffect(() => {
        async function fetchData() {
            await axios.get('/api/posts')
                .then((res) => {
                    // handle success
                    setPosts(res.data);
                })
                .catch((err) => {
                    // handle error
                    console.log(err);
                });
        }
        fetchData();
    }, [])

    console.log(posts)

    return (
        <div>
            <Grid columns='equal' divided>
                <Grid.Row >
                    <Grid.Column width={10}>
                        <Segment>
                            1
                            </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>1</Segment>
                        <Segment>2</Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default FeaturedPosts;
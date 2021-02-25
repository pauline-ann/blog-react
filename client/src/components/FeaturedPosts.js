import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Grid, Segment } from "semantic-ui-react";

// Featured Posts

// Add formatting

const FeaturedPosts = (props) => {

    // Initiate state to store and list featured post IDs
    const [featured, setFeatured ] = useState([]);

    // Hook to grab posts from api
    useEffect(() => {
        async function fetchData() {
            await axios.get('/api/featured')
                .then((res) => {
                    // handle success
                    console.log(res)

                    // Create an array using the response including featured post IDs
                    let featuredArray = Object.values(res.data[0]).slice(1,4)
                    console.log(featuredArray)

                    // Set state using array
                    setFeatured(featuredArray)
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
            <Grid columns='equal' divided>
                <Grid.Row >
                    <Grid.Column width={10}>
                        <Segment>
                            {featured[0]}
                            </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>{featured[1]}</Segment>
                        <Segment>{featured[2]}</Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default FeaturedPosts;
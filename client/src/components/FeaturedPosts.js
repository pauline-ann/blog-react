import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Grid, Segment, Image, Card, Divider } from "semantic-ui-react";

import ramen from '../assets/images/ramen.jpg';


// Featured Posts

// Add formatting

const FeaturedPosts = (props) => {

    // Initiate state to store and list featured post IDs
    const [featured, setFeatured] = useState([]);

    // Hook to grab posts from api
    useEffect(() => {
        async function fetchData() {
            await axios.get('/api/featured')
                .then((res) => {
                    // handle success
                    console.log(res)

                    // Create an array using the response including featured post IDs
                    let featuredArray = Object.values(res.data[0]).slice(1, 4)
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
                <Grid.Row stretched>
                    <Grid.Column width={10}>
                        <Card
                            href={'/post/' + featured[0]}>
                            <Image
                                src={ramen}
                                ui={false}
                            />
                            <Card.Content>
                                <Card.Header>Matthew</Card.Header>
                                <Card.Meta>
                                    <span className='date'>Joined in 2015</span>
                                </Card.Meta>
                                <Card.Description>
                                    Matthew is a musician living in Nashville.
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column>
                        <Image
                            src={ramen}
                            as='a'
                            size=''
                            href={'/post/' + featured[1]}
                            target='_blank'
                        />
                        <Image
                            src={ramen}
                            as='a'
                            size=''
                            href={'/post/' + featured[2]}
                            target='_blank'
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Divider section hidden />
        </div>
    );
}

export default FeaturedPosts;
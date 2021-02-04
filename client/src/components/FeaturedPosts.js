import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Grid, Segment } from "semantic-ui-react";

// Featured Posts

// Import all posts, search through and match the ones with category "featured" to the sections w info

const FeaturedPosts = (props) => {

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
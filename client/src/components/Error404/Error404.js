import React from "react";
import { Grid, Icon, Header, Button, Segment } from 'semantic-ui-react'
import { Link } from "react-router-dom";

//CSS
import './Error404.css'

const Error404 = (props) => {

    const style = {
        textAlign: 'center'
    }

    return (
        <React.Fragment>
            <Grid verticalAlign='middle' centered className='error-page'>
                <Segment basic className='error-page--segment'>
                    <Header as='h2' icon>
                        <Icon name='frown outline' size='massive' />
                Sorry, no page found for {props.location.pathname}.
                </Header>
                    <Segment.Inline>
                        <Link to='/'>
                            <Button>Back to Homepage</Button>
                        </Link>
                    </Segment.Inline>
                </Segment>
            </Grid>
        </React.Fragment>
    );
}

export default Error404;
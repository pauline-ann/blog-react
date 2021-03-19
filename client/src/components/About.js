import React from "react";
import { Container, Header, Image, List, Icon, Divider } from "semantic-ui-react";
import ImageFadeIn from 'react-image-fade-in';

import ramen from '../assets/images/ramen.jpg';

const About = (props) => {

    const style = {
        "width": "50%"
    }

    const style2 = {
        "width": "30%"
    }

    return (
        <div>
            <Container
                style={style}
            >
                <Header as='h1' textAlign="center">About</Header>
                <Divider section />
                <p>
                    Culpa eiusmod amet consequat officia do do. Consectetur nulla commodo mollit cillum deserunt voluptate non. Do dolor laboris do est mollit pariatur dolore enim consequat. Eiusmod pariatur anim dolor dolor nostrud ipsum nulla aliquip. Ea dolor laborum officia velit eiusmod eu cupidatat ullamco commodo id amet. Nostrud proident pariatur magna dolor labore excepteur ipsum. Nisi dolore dolor fugiat duis cupidatat reprehenderit fugiat minim fugiat incididunt excepteur. Aute nisi sunt Lorem nostrud anim. Cillum esse reprehenderit elit duis ex consequat nulla ad.
                </p>
                <Image fluid>
                    <ImageFadeIn src={ramen} />
                </Image>
                <br />
                <p>
                    Culpa eiusmod amet consequat officia do do. Consectetur nulla commodo mollit cillum deserunt voluptate non. Do dolor laboris do est mollit pariatur dolore enim consequat. Eiusmod pariatur anim dolor dolor nostrud ipsum nulla aliquip. Ea dolor laborum officia velit eiusmod eu cupidatat ullamco commodo id amet. Nostrud proident pariatur magna dolor labore excepteur ipsum. Nisi dolore dolor fugiat duis cupidatat reprehenderit fugiat minim fugiat incididunt excepteur. Aute nisi sunt Lorem nostrud anim. Cillum esse reprehenderit elit duis ex consequat nulla ad.
                </p>
                <Divider section />
                <Header as='h2' textAlign="center">Contact</Header>
                <Container style={style2}>
                    <List animated>
                        <List.Item>
                            <Icon name="marker" />
                            <List.Content>Los Angeles, CA</List.Content>
                        </List.Item>
                        <List.Item
                            icon='mail'
                            content={<a href='mailto:paulinebantayan@gmail.com'>email</a>}
                        />
                        <List.Item
                            icon='linkify'
                            content={<a href='https://www.paulineann.me' target='_blank' rel='noopener noreferrer'>portfolio</a>}
                        />
                        <List.Item
                            icon='instagram'
                            content={<a href='https://www.instagram.com/paintwithpau/' target='_blank' rel='noopener noreferrer'>instagram</a>}
                        />
                    </List>
                </Container>
            </Container>
        </div >
    );
}

export default About;
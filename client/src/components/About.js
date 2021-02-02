import React from "react";
import { Container, Header, Image, List, Icon } from "semantic-ui-react";

import me from '../assets/images/me.jpg';

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
                <p>
                    Culpa eiusmod amet consequat officia do do. Consectetur nulla commodo mollit cillum deserunt voluptate non. Do dolor laboris do est mollit pariatur dolore enim consequat. Eiusmod pariatur anim dolor dolor nostrud ipsum nulla aliquip. Ea dolor laborum officia velit eiusmod eu cupidatat ullamco commodo id amet. Nostrud proident pariatur magna dolor labore excepteur ipsum. Nisi dolore dolor fugiat duis cupidatat reprehenderit fugiat minim fugiat incididunt excepteur. Aute nisi sunt Lorem nostrud anim. Cillum esse reprehenderit elit duis ex consequat nulla ad.
                </p>
                <Image src={me} fluid />
                <br />
                <p>
                    Culpa eiusmod amet consequat officia do do. Consectetur nulla commodo mollit cillum deserunt voluptate non. Do dolor laboris do est mollit pariatur dolore enim consequat. Eiusmod pariatur anim dolor dolor nostrud ipsum nulla aliquip. Ea dolor laborum officia velit eiusmod eu cupidatat ullamco commodo id amet. Nostrud proident pariatur magna dolor labore excepteur ipsum. Nisi dolore dolor fugiat duis cupidatat reprehenderit fugiat minim fugiat incididunt excepteur. Aute nisi sunt Lorem nostrud anim. Cillum esse reprehenderit elit duis ex consequat nulla ad.
                </p>
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
                            content={<a href='https://www.paulineann.me' target='_blank'>portfolio</a>}
                        />
                        <List.Item
                            icon='instagram'
                            content={<a href='https://www.instagram.com/paintwithpau/' target='_blank'>instagram</a>}
                        />
                    </List>
                </Container>
            </Container>
        </div >
    );
}

export default About;
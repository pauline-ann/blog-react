import React from "react";
import { Container, Header, List, Icon, Divider } from "semantic-ui-react";

// CSS
import './About.css'

const About = (props) => {

    return (
        <div>
            <Container
                className='about-container'
            >
                <Header as='h1' textAlign="center">About</Header>
                <Divider section />
                <Header as='h2' textAlign='left' className='about-header'>What is Foodie?</Header>
                <p>
                    Foodie is a blogging and social media tool built for food lovers. Here, you can effortlessly share your favorite places to eat, all while discovering hidden gems you've yet to find too!
                </p>
                <Header as='h2' textAlign='left' className='about-header'>What can I share?</Header>
                Each blog post includes a...
                <List bulleted>
                    <List.Item>title</List.Item>
                    <List.Item>description</List.Item>
                    <List.Item>location</List.Item>
                    <List.Item>category</List.Item>
                    <List.Item>rating system (aesthetic, vibes, flavor)</List.Item>
                    <List.Item>text section to describe your experience</List.Item>
                    <List.Item>photo upload</List.Item>
                </List>
                <Header as='h2' textAlign='left' className='about-header'>How can I see other posts?</Header>
                <p>Browse the homepage which displays all posts that currently exist in Foodie! Click each post to see each one in more detail.</p>
                <Divider hidden />
                <Header as='h1' textAlign="center">Contact</Header>
                <Divider section />
                <Container className='about-contact'>
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
                    </List>
                </Container>
            </Container>
        </div >
    );
}

export default About;
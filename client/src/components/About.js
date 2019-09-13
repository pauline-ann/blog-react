import React from "react";
import { Container } from "semantic-ui-react";

//Components
import Navbar from "./Navbar/Navbar";

const About = (props) => {

    return (
        <div>
            <Navbar />
            <Container
                textAlign="center"
            >
                <p>About</p>
            </Container>
        </div >
    );
}

export default About;
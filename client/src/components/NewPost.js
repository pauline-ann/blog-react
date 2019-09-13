import React from "react";
import { Container } from "semantic-ui-react";

//Components
import Navbar from "./Navbar/Navbar";

const NewPost = (props) => {

    return (
        <div>
            <Navbar />
            <Container
                textAlign="center"
            >
                <p>[Insert form here]</p>
            </Container>
        </div >
    );
}

export default NewPost;
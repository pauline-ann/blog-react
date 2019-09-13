import React from "react";

//Components
import Navbar from "./Navbar/Navbar";

const Error404 = (props) => {

    return (
        <div>
            <Navbar />
            <p>Sorry! Page not found for {props.location.pathname}.</p>
        </div >
    );
}

export default Error404;
import React from "react";

const Error404 = (props) => {

    return (
        <div>
            <p>Sorry! Page not found for {props.location.pathname}.</p>
        </div >
    );
}

export default Error404;
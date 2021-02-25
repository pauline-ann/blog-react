import React from "react";

const Error404 = (props) => {

    const style = {
        textAlign: 'center'
    }

    return (
        <div>
            <p style={style}>Sorry! Page not found for {props.location.pathname}.</p>
        </div >
    );
}

export default Error404;
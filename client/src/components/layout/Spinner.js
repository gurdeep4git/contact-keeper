import React, { Fragment } from "react";
import spinner from "./loader.gif";

const Spinner = () => {
    return (
        <Fragment>
            <img
                src={spinner}
                style={{ width: "200px", display: "block", margin: "auto" }}
                alt="loading"
            />
        </Fragment>
    );
};

export default Spinner;

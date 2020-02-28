import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";


const Navbar = ({ title, icon }) => {

    const authContext = useContext(AuthContext);
    const { logout, user, isAuthenticated } = authContext;


    const onLogout = () => {
        logout();
    }

    const authLinks = (
        <Fragment>
            <li>Hello, {user && user.name}</li>
            <li>
                <a href="#!" onClick={onLogout}>
                    Logout
                </a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </Fragment>
    )

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
                {/* <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li> */}
            </ul>
        </div>
    )
}

Navbar.defaultProps = {
    title: "Contact-Keeper",
    icon: "fa fa-user"
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

export default Navbar;

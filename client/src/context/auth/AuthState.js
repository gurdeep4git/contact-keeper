import React, { useReducer } from "react";
import axios from "axios";

import setAuthToken from "../../utils/setAuthToken";

import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
    REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, AUTH_ERROR, USER_LOADED, CLEAR_ERRORS
} from "../types";

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: true,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);


    // LOAD USER
    const loadUser = async () => {

        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }

        try {
            const res = await axios.get('/api/auth');
            dispatch({ type: USER_LOADED, payload: res.data });
        } catch (err) {
            dispatch({ type: AUTH_ERROR });
        }
    }

    // REGISTER
    const register = async formData => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const res = await axios.post('api/users', formData, config);
            dispatch({ type: REGISTER_SUCCESS, payload: res.data });
            loadUser();
        } catch (err) {
            dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
        }

    }

    // LOGIN
    const login = async formData => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const res = await axios.post('api/auth', formData, config);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            loadUser();
        } catch (err) {
            dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
        }

    }

    // LOGOUT
    const logout = () => {
        dispatch({ type: LOGOUT });
    }

    // CLEAR ERRORS
    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS });
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                loading: state.loading,
                error: state.error,
                register,
                clearErrors,
                loadUser,
                login,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthState;
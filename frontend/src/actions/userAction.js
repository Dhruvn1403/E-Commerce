import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_ERRORS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    // UPDATE_PROFILE_RESET,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    // UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    CLEAR_MESSAGES,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
} from '../constants/userConstants';

//login
export const login = (email, password) => async ( dispatch ) => {
    try {
        dispatch( {type: LOGIN_REQUEST} );

        const config = { headers: { "Content-Type": "application/json" } }

        const {data} = await axios.post(
            '/api/v1/login',
            { email, password },
            config
        );

        dispatch( { type: LOGIN_SUCCESS, payload: data.user } );
    }
    catch (error) {
        dispatch( { type: LOGIN_FAIL, payload: error.response.data.message } );
    }
}

//register
export const register = (userData) => async ( dispatch ) => {
    try {
        dispatch( {type: REGISTER_USER_REQUEST} );

        const config = { headers: { "Content-Type": "multipart/form-data" } }

        const {data} = await axios.post(
            '/api/v1/register',
            userData,
            config
        );

        dispatch( { type: REGISTER_USER_SUCCESS, payload: data.user } );
    }
    catch (error) {
        dispatch( { type: REGISTER_USER_FAIL, payload: error.response.data.message } );
    }
}

// Load User
export const loadUser = () => async ( dispatch ) => {
    try {
        dispatch( {type: LOAD_USER_REQUEST} );
        // console.log("before req")
        const {data} = await axios.get('/api/v1/me');
        // console.log("after req")
        dispatch( { type: LOAD_USER_SUCCESS, payload: data.user } );
    }
    catch (error) {
        dispatch( { type: LOAD_USER_FAIL, payload: error.response.data.message } );
    }
}

// LogOut User
export const logOut = () => async ( dispatch ) => {
    try {
        await axios.get('/api/v1/logout');

        dispatch( { type: LOGOUT_SUCCESS } );
    }
    catch (error) {
        dispatch( { type: LOGOUT_FAIL, payload: error.response.data.message } );
    }
}

//Update profile
export const updateProfile = (userData) => async ( dispatch ) => {
    try {
        dispatch( {type: UPDATE_PROFILE_REQUEST} );

        const config = { headers: { "Content-Type": "multipart/form-data" } }

        const {data} = await axios.put(
            '/api/v1/me/update',
            userData,
            config
        );

        dispatch( { type: UPDATE_PROFILE_SUCCESS, payload: data.success } );
    }
    catch (error) {
        dispatch( { type: UPDATE_PROFILE_FAIL, payload: error.response.data.message } );
    }
}

//Update password
export const updatePassword = (passwords) => async ( dispatch ) => {
    try {
        dispatch( {type: UPDATE_PASSWORD_REQUEST} );

        const config = { headers: { "Content-Type": "application/json" } }

        const {data} = await axios.put(
            '/api/v1/password/update',
            passwords,
            config
        );
       
        dispatch( { type: UPDATE_PASSWORD_SUCCESS, payload: data.success } );
    }
    catch (error) {
        dispatch( { type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message } );
    }
}

//forgot Password
export const forgotPassword = (email) => async ( dispatch ) => {
    try {
        dispatch( {type: FORGOT_PASSWORD_REQUEST} );

        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.post(
            '/api/v1/password/forgot',
            email,
            config
        );

        dispatch( { type: FORGOT_PASSWORD_SUCCESS, payload: data.message } );
    }
    catch (error) {
        dispatch( { type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message } );
    }
}

export const resetPassword = (token, passwords) => async ( dispatch ) => {
    try {
        dispatch( {type: RESET_PASSWORD_REQUEST} );

        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.put(
            `/api/v1/password/reset/${token}`,
            passwords,
            config
        );

        dispatch( { type: RESET_PASSWORD_SUCCESS, payload: data.success } );
    }
    catch (error) {
        dispatch( { type: RESET_PASSWORD_FAIL, payload: error.response.data.message } );
    }
}

//Clearing messages in forgot password page
export const clearMessages = () => async(dispatch) => {
    dispatch({
        type: CLEAR_MESSAGES
    });
};

//Clearing errors
export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS 
    });
};
import axios from 'axios';
import { axiosWithAuth } from '../axiosWithAuth';

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL;"
export const login = creds => dispatch => {
    dispatch({ type: LOGIN_START });
    return axios
        .post('http://localhost:3300/api/login', creds)
        .then(res => {
            
            localStorage.setItem("token", res.data.token);
          
            dispatch({ type: LOGIN_SUCCESS, payload: res.data})
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: LOGIN_FAIL, payload: ''})
        })

}


export const SUBMIT_START = "SUBMIT_START"
export const SUBMIT_SUCCESS = "SUBMIT_SUCCESS"
export const SUBMIT_FAIL = "SUBMIT_FAIL"
export const getData = () => dispatch => {
    dispatch({ type: SUBMIT_START });

    return axiosWithAuth()
        .get('http://localhost:3300/api/jokes')
        .then(res => {
            
            
            dispatch({ type: SUBMIT_SUCCESS, payload: res.data.users})
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: SUBMIT_FAIL, payload: err})
        })

}

export const SIGNUP_START = "SIGNUP_START";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAIL = "SIGNUP_FAIL;"
export const signUp = creds => dispatch => {
    console.log(creds)
    dispatch({ type: SIGNUP_START });
    return axios
        .post('http://localhost:3300/api/register', creds)
        .then(res => {
            console.log(res.data.payload)
            //localStorage.setItem("token", res.data.payload);
            dispatch({ type: SIGNUP_SUCCESS, payload: res.data.payload})
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: SIGNUP_FAIL, payload: ''})
        })

}


export const LOGOUT = "LOGOUT"
export const logOut = () => {
    return {
        type: LOGOUT
        
    }
}

export const RESET = "RESET"
export const reset = () => {
    return {
        type: RESET
        
    }
}



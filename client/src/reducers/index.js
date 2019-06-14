import {
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    SUBMIT_START,
    SUBMIT_SUCCESS,
    SUBMIT_FAIL,

    SIGNUP_START,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGOUT,
    RESET

} from '../actions';
const initialState = {
    jokes: [],
    isLoggingIn: false,
    error: false,
    isLoading: false,
    pending: false,
    submitFail: false,
    credentials: [],
    newUser: false,
    user: {},
    loggedIn: false

    // Array characters, Boolean fetching, null error.
  };

  export const rootReducer = (state=initialState, action)=> {
        switch (action.type) {
            case LOGIN_START:
            return {
                ...state,
                loggingIn: true,
                newUser: false
            }
            case LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                credentials: action.payload,
                user: action.payload,
                loggedIn: true
               
            }
            case LOGIN_FAIL:
            return {
                ...state,
                loggingIn: false,
                error: true,
                pending: false
            }
        
            case SUBMIT_START:
            return {
            ...state,
            isLoading: true,
            submitFail: false
            }
            case SUBMIT_FAIL:
            return {
            ...state,
            isLoading: false,
            submitFail: true,
            error: true
            }

            case SUBMIT_SUCCESS:
            return {
            ...state,
            jokes: action.payload,
            isLoading: false,
            error: false
            
            }

            case SIGNUP_START:
            return {
            ...state,
            }

            case SIGNUP_SUCCESS:
            return {
            ...state,
            newUser: true,
            error: false
            }

            case SIGNUP_FAIL:
            return {
            ...state,
            newUser: false,
            error: true
            }

            case LOGOUT:
            return {
            ...state,
            newUser: false,
            error: false,
            user: {},
            loggedIn: false
            }

            case RESET:
            return {
            ...state,
            newUser: false,
            error: false,
            user: {},
            loggedIn: false
            }
           
           
       
           
            
        default:
            return state;
      }
  }
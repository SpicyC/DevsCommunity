import * as actionType from '../actions/actionTypes';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function authReducer(state = initialState, action) {
    const { type, payload} = action;

    switch(type) {

        case (actionType.USER_LOADED):
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }

        case (actionType.REGISTER_SUCCESS):
        case (actionType.LOGIN_SUCCESS):
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }

        case (actionType.REGISTER_FAIL):
        case (actionType.AUTH_ERROR):
        case (actionType.LOGIN_FAIL):
        case (actionType.LOGOUT):
            localStorage.removeItem('token');
                return {
                    ...state,
                    token: null,
                    isAuthenticated: false,
                    loading: false
                }
        default:
            return state;
    }
}
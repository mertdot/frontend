import * as ACTIONS from './Constants';

export const logoutSucces = () => {
    return {
        type: ACTIONS.LOGOUT_SUCESS
    };
};

export const loginSuccess = (authState) => {
    return{
        type: ACTIONS.LOGIN_SUCCESS,
        payload: authState
    }
}
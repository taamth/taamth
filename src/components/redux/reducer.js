/* file nay dung de chuyen doi data */
import * as types from './actionType';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

const useReducer = (state = initialState, action) => {
    switch (action.type) {
        // case value:
        case types.LOGIN_START:
        case types.REGISTER_START:
        case types.LOGOUT_START:
        case types.LOGIN_GOOGLE_START:
        case types.LOGIN_FACEBOOK_START:
            return {
                ...state,
                loading: true,
            }
        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: null,
            }
        case types.LOGIN_SUCCESS:
        case types.REGISTER_SUCCESS:
        case types.SET_USER:
        case types.lOGIN_GOOGLE_SUCCESS:
        case types.LOGIN_FACEBOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload
            }
       
        case types.LOGIN_FAIL:
        case types.REGISTER_FAIL:
        case types.LOGOUT_FAIL:
        case types.LOGIN_GOOGLE_ERROR:
        case types.LOGIN_FACEBOOK_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        
         
        //     break;

        default:
            return state;
            
    }
}

export default useReducer;
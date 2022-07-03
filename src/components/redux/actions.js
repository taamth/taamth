
import * as types from './actionType';
import { auth, googleAuth, facebookAuthProvider } from './../../firebase';


//ACTION TYPE REGISTER
const registerStart = () => ({
    type: types.REGISTER_START,
});

const registerSuccess = (user) => ({
    type: types.REGISTER_SUCCESS,
    payload: user,
});

const registerError = (error) => ({
    type: types.REGISTER_FAIL,
    payload: error,
});

//ACTION TYPE LOGIN 
const loginStart = () => ({
    type: types.LOGIN_START,
});

const loginSuccess = (user) => ({
    type: types.LOGIN_SUCCESS,
    payload: user,
});

const loginError = (error) => ({
    type: types.LOGIN_FAIL,
    payload: error,
});

//ACTION TYPE LOGOUT
const logoutStart = () => ({
    type: types.LOGOUT_START,
});

const logoutSuccess = () => ({
    type: types.LOGOUT_SUCCESS,
});

const logoutError = (error) => ({
    type: types.LOGOUT_FAIL,
    payload: error,
});

//SET USER
export const setUser = (user) => ({
    type: types.SET_USER,
    payload: user,
})

//ACTION TYPES LOGIN WITH GOOGLE 
const loginGoogleStart = () => ({
    type: types.LOGIN_GOOGLE_START
})

const loginGoogleSuccess = (user) => ({
    type: types.lOGIN_GOOGLE_SUCCESS,
    payload: user
})

const loginGoogleError = (err) => ({
    type: types.LOGIN_GOOGLE_ERROR,
    payload: err
})

//ACTION TYPES LOGIN WITH Fb 
const loginFacebookStart = () => ({
    type: types.LOGIN_FACEBOOK_START
})

const loginFacebookSuccess = (user) => ({
    type: types.LOGIN_FACEBOOK_SUCCESS,
    payload: user
})

const loginFacebookError = (err) => ({
    type: types.LOGIN_FACEBOOK_ERROR,
    payload: err
})


export const registerInit = (email, password, displayName) => {
    return function (dispatch) {
        dispatch(registerStart());
        auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {
            user.updateProfile({
                displayName
            })
            localStorage.setItem('myCat', user._delegate.accessToken);
            dispatch(registerSuccess(user));
        }).catch(err => dispatch(registerError(err.message)));
    }
}

export const loginInit = (email, password) => {
    return function (dispatch) {
        dispatch(loginStart());
        auth.signInWithEmailAndPassword(email, password).then(({ user }) => {
            dispatch(loginSuccess(user));
            localStorage.setItem('myCat', user._delegate.accessToken);
        }).catch(err => dispatch(loginError(err.message)));
    }
}

export const logoutInit = () => {
    return function (dispatch) {
        dispatch(logoutStart());
        auth.signOut().then(() => {
            dispatch(logoutSuccess());
            localStorage.removeItem('myCat');
        }).catch(err => dispatch(logoutError(err.message)));
    }
}

export const loginUserGoogle = () => {
    return function (dispatch) {

        dispatch(loginGoogleStart());

        // firebase 
        auth.signInWithPopup(googleAuth).then(({
            user
        }) => {
            dispatch(loginGoogleSuccess(user))
        }).catch(err => dispatch(loginGoogleError(err.message)))
    }
}

export const loginUserFacebook = () => {
    return function (dispatch) {

        dispatch(loginFacebookStart());

        // firebase 
        auth.signInWithPopup(facebookAuthProvider.addScope('user_birthday')).then(({
            user
        }) => {
            dispatch(loginFacebookSuccess(user))
        }).catch(err => dispatch(loginFacebookError(err.message)))
    }
}

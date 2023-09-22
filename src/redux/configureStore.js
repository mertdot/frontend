import { createStore } from 'redux';
import authReducer from './authReducer';

const loggedInState = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: null,
    password: undefined
  };

  const configureStore = () => {
    return createStore(authReducer, loggedInState);
  }

  export default configureStore;
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './authReducer';
import SecureLS from 'secure-ls';

const secureLs = new SecureLS();

const getStateFromStorage = () => {

  const hoaxAuth = secureLs.get('hoax-auth');
    
  let stateInLocalStorage = {
    isLoggedIn: false,
    username: undefined,
    displayName: undefined,
    image: undefined,
    password: undefined
  };

  if(hoaxAuth){
    return hoaxAuth;
  }

  return stateInLocalStorage;

}

const updateStateInStorage = newState => {
  secureLs.set('hoax-auth', newState);
}

  const configureStore = () => {
    const store = createStore(authReducer, getStateFromStorage(), applyMiddleware(thunk));
    store.subscribe(() => {
      updateStateInStorage(store.getState());
    });

    return store;
  }

  export default configureStore;
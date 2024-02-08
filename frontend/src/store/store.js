import {applyMiddleware, compose, createStore} from "redux";
import {thunk} from "redux-thunk";
import {STORE_KEY} from "../constants/constants";
import reducers from "../reducers";
import {initialUser} from "../reducers/login";

export const initialState = {
    user: initialUser
}

/** Check the state in localStorage and set it as initial state if present */
const getInitialState = () => (
    localStorage.getItem(STORE_KEY) ? JSON.parse(localStorage.getItem(STORE_KEY)) : initialState
)

const store = createStore(reducers, getInitialState(), compose(applyMiddleware(thunk)));

/** Each time when the store changes it saves a new state to localStorage */
store.subscribe(() => {
    const serializedState = JSON.stringify(store.getState());
    localStorage.setItem(STORE_KEY, serializedState);
});

export default store;
import {createStore,compose,applyMiddleware} from 'redux';
import rootReducer from '../reducer';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(thunk, createLogger))
    );
}

const store=configureStore();

export default store;
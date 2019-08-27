import {combineReducers} from 'redux';
import login from './login';

const rootReducer = combineReducers({
    loginReducer: login,
});

export default rootReducer;
import Types from '../../action/types';

const defaultState={
}

export default function onAction(state=defaultState, action) {
    switch (action.type) {
        case Types.LOGIN_SUCCESS:
            return {
                ...state,
                username:action.username,
                password:action.password
            }
        case Types.LOGIN_FAIL:
           return {
               ...state,
               error
           }
        default:
            return state;
    }
}
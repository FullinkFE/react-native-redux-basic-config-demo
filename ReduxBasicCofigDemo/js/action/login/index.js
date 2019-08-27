import Types from '../types';

const url='https://www.baidu.com'

/**
 *
 * @param username
 * @param password
 * @returns {Function}
 */
export function onLogin(username,password) {
    return diapatch=>{
        fetch(url)
            .then(res=>{
                diapatch({type:Types.LOGIN_SUCCESS,username:username,password:password})
            })
            .catch(err=>{
                diapatch({type:Types.LOGIN_FAIL,err})
            })
    }
}
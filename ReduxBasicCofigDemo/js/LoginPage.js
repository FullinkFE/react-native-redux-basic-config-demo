import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import actions from "./action";
import LoginContain from "./LoginContain";

class LoginPage extends Component {

    _getUsername(username) {
        this.username = username
    }

    _getPassword(password) {
        this.password = password
    }

    onLogin(username, password) {
        if (username === undefined || username === null || username === '') {
            console.log('账号不能为空！')
            return
        }
        if (password === undefined || password === null || password === '') {
            console.log('密码不能为空！')
            return
        }
        this.props.onLogin(username, password)
    }

    render() {
        return (
            <View style={styles.container}>
                <LoginContain onUserName={username => this._getUsername(username)}
                              onPassword={password => this._getPassword(password)}/>
                <TouchableOpacity onPress={() => {
                    this.onLogin(this.username, this.password)
                }}>
                    <View style={styles.btnStyle}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Login</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnStyle: {
        height: 48,
        borderRadius: 10,
        borderWidth: 1,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }
})

//mapStateToProps 这个函数来指定如何把当前 Redux store state 映射到展示组件的 props 中
const mapStateToProps = state => ({
});
//mapDispatchToProps 接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法
const mapDispatchToProps = dispatch => ({
    onLogin: (username, password) => dispatch(actions.onLogin(username, password)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
import React, {Component} from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text
} from 'react-native';
import {connect} from 'react-redux';

class LoginContain extends Component {
    render() {
        return (
            <View>
                <Text>用户密码为:{this.props.password}</Text>
                <View
                    style={[styles.inputContainer,{marginTop:10}]}>
                    <TextInput
                        placeholder='请输入用户名'
                        placeholderTextColor={'#C3CAD9'}
                        maxLength={11}
                        autoFocus={true}
                        onChangeText={(phone) => {
                            this.props.onUserName(phone)
                        }}
                    />
                </View>
                <View
                    style={[styles.inputContainer,{marginTop:20}]}>
                    <TextInput
                        placeholder='请输入密码'
                        placeholderTextColor={'#C3CAD9'}
                        maxLength={11}
                        maxLength={16}
                        autoFocus={false}
                        secureTextEntry={true}
                        onChangeText={(pwd) => {
                            this.props.onPassword(pwd)
                        }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  inputContainer: {
      borderColor: 'grey', borderWidth: 1, borderRadius: 6,
      height: 40, width: 300, justifyContent: 'center', paddingLeft: 4
  }
})

const mapStateToProps=state=>({
    username:state.loginReducer.username,
    password:state.loginReducer.password,
});
export default connect(mapStateToProps)(LoginContain);
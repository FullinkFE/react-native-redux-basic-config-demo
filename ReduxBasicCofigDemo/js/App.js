import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './store'
import LoginPage from "./LoginPage";

export default class App extends Component<Props> {
  render() {
    /**
     * 将store传递给App框架
     */
    return <Provider store={store}>
      <LoginPage/>
    </Provider>;
  }
}

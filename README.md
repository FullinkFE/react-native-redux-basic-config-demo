# redux 基本配置


![](http://ww4.sinaimg.cn/large/006y8mN6ly1g69q1oltgbj314y0pm0vx.jpg)

### 准备工作

根据需要安装以下组件。

- redux(必选)
- react-redux(必选)：redux作者为方便在react上使用redux开发的一个用户react上的redux库；
- redux-devtools(可选)：Redux开发者工具支持热加载、action 重放、自定义UI等功能；
- redux-thunk：实现action异步的middleware；
- redux-persist(可选)：支持store本地持久化；
- redux-observable(可选)：实现可取消的action；

```
npm install --save redux
npm install --save react-redux
npm install --save-dev redux-devtools
```

注意:(项目中react 16.6.0 之前 建议用redux 6.0.0)

#### 视图层绑定引入了几个概念：

- `<Provider>`组件： 这个组件需要包裹在整个组件树的最外层。这个组件让根组件的所有子孙组件能够轻松的使用 connect() 方法绑定 store。
- `connect()`：这是 react-redux 提供的一个方法。如果一个组件想要响应状态的变化，就把自己作为参数传给 connect() 的结果，connect() 方法会处理与 store 绑定的细节，并通过 selector 确定该绑定 store 中哪一部分的数据。
- `selector`：这是你自己编写的一个函数。这个函数声明了你的组件需要整个 store 中的哪一部分数据作为自己的 props。
- `dispatch`：每当你想要改变应用中的状态时，你就要 dispatch 一个 action，这也是唯一改变状态的方法。

#### Provider

> API原型：`<Provider store>`

使组件层级中的 connect() 方法都能够获得 Redux store(将store传递给App框架)。通常情况下我们需要将根组件嵌套在 标签 中才能使用 connect() 方法。

```
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
```

#### connect

> API原型：`connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`

连接 React 组件与 Redux store，连接操作会返回一个新的与 Redux store 连接的组件类，并且连接操作不会改变原来的组件类。

### 使用步骤

- 定义type类型

  ```
  export default {
      LOGIN_START: 'LOGIN_START',
      LOGIN_SUCCESS: 'LOGIN_SUCCESS',
      LOGIN_FAIL: 'LOGIN_FAIL'
  }
  ```

- 创建action

  ```
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
                  diapatch({type:Types.LOGIN_SUCCESS,username:username})
              })
              .catch(err=>{
                  diapatch({type:Types.LOGIN_FAIL,err})
              })
      }
  }
  ```

- 创建根action

  ```
  import {onLogin} from './login';
  
  export default {
      onLogin,
  }
  ```

- 创建reducer

  ```
  import Types from '../../action/types';
  
  const defaultState={
  }
  
  export default function onAction(state=defaultState, action) {
      switch (action.type) {
          case Types.LOGIN_SUCCESS:
              return {
                  ...state,
                  username:action.username
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
  ```

- 创建根reducer

  ```
  import {combineReducers} from 'redux';
  import login from './login';
  
  const rootReducer = combineReducers({
      loginReducer: login,
  });
  
  export default rootReducer;
  ```

- 创建store

  ```
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
  ```

- 使用`<Provider>`包裹根组件

  ```
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
  ```

  这里我们使用`react-redux`提供的`<Provider>`来包裹我们的根组件，让根组件的所以子组件都能使用 connect() 方法绑定 store。

- 包装 component：

  ```
  //mapStateToProps 这个函数来指定如何把当前 Redux store state 映射到展示组件的 props 中
  const mapStateToProps=state=>({
      username:state.loginReducer.username
  });
  //mapDispatchToProps 接收 dispatch() 方法并返回期望注入到展示组件的 props 中的回调方法
  const mapDispatchToProps=dispatch=>({
      onLogin: (username,password) => dispatch(actions.onLogin(username,password)),
  });
  export default connect(mapStateToProps,mapDispatchToProps)(App);
  ```

  通过上述代码我们声明`App`组件需要整个 store 中的哪一部分数据作为自己的 props，这里用到了`connect`，我们将`mapStateToProps`作为参数传给`connect`，`connect`会返回一个生成组件函数，然后我们将App组件当做参数传给这个函数。

- 发送(dispatch)action

  ```
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
  ```

  在这里我们通过`dispatch`将action发送到store，store会将这个`action`分发给`reducer`，`reducer`会创建当前state的副本，然后修改该副本并返回一个新的state，这样一来store树将被更新，然后对应组件的props将被更新，从而组件被更新；

# 总结

- Redux 应用只有一个单一的 store。当需要拆分数据处理逻辑时，你应该使用 reducer 组合 而不是创建多个 store；
- redux一个特点是：状态共享，所有的状态都放在一个store中，任何component   都可以订阅store中的数据；
- 并不是所有的state都适合放在store中，这样会让store变得非常庞大，如某个状态只被一个组件使用，不存在状态共享，可以不放在store中；
      





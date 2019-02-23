import React from 'react'
import Header from './components/Header/'
import { renderRoutes } from 'react-router-config'
import { actions } from './components/Header/store/'
// 同构 一套react代码，在服务端执行一次，再客户端再执行一次
const App = (props) => {
  return (
    <div>
      <Header staticContext={props.staticContext}/>
      {renderRoutes(props.route.routes)}
    </div>
  )  
}

App.loadData = (store) => {
  return store.dispatch(actions.getHeaderInfo())
}

export default App
// 这个函数 返回一个组件
import React, { Component } from 'react'
export default (DecoratedComponent, styles) => {
  return class NewComponet extends Component {
    componentWillMount() {
      if(this.props.staticContext) {
        this.props.staticContext.css.push(styles._getCss())
      }
    }
    render() {
      return <DecoratedComponent {...this.props}/>
    }
  }
}
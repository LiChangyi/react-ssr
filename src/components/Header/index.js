import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from './store/'
import styles from './style.css'
import WithStyle from '../../WithStyle'
// 同构 一套react代码，在服务端执行一次，再客户端再执行一次

class Header extends Component {
  componentWillMount() {
    if(this.props.staticContext) {
      this.props.staticContext.css.push(styles._getCss())
    }
  }
  render() {
    const { login, handleLogin, handleLogout } = this.props
    return (
      <div className={styles.test}>
        <Link to="/">首页</Link>
        <br/>
        { 
          login ?
          <Fragment>
            <Link to="/translation">翻译列表</Link>
            <br/>
            <div onClick={handleLogout}>退出</div>
          </Fragment>
          :
          <div onClick={handleLogin}>登录</div>
        }
      </div>
    )
  }
}

const mapState = (state) => ({
  login: state.header.login
})
const mapDispatch = (dispatch) => ({
  handleLogin() {
    dispatch(actions.login())
  },
  handleLogout() {
    dispatch(actions.logout())
  }
})
export default connect(mapState, mapDispatch)(WithStyle(Header, styles))
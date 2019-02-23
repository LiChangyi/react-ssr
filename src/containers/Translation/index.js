// 同构 一套react代码，在服务端执行一次，再客户端再执行一次
import React, { Component, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import Header from '../../components/Header'
import { connect } from 'react-redux'
import { getTranslationList } from './store/actions'
import { Redirect } from 'react-router-dom'
import styles from './style.css'
import WithStyle from '../../WithStyle'

// 同构 一套react代码，在服务端执行一次，再客户端再执行一次

class Translation extends Component {

  componentDidMount() {
    if (!this.props.list.length) {
      this.props.getTranslationList()
    }
  }
  getList() {
    const { list } = this.props
    return list.map(item => <div key={item.id}>{item.title}</div>)
  }
  render() {
    if (this.props.login) {
      return (
        <Fragment>
          <Helmet>
            <title>这是翻译页面-丰富多彩的智讯</title>
            <meta name="description" content="这是r翻译页面-丰富多彩的智讯" />
          </Helmet>
          <div className={styles.test}>
            {this.getList()}
          </div>
        </Fragment>
      )  
    } else {
      return <Redirect to='/' />
    }

  }
}

const mapStateToProps = state => ({
  list: state.translation.translationList,
  login: state.header.login
})

const mapDispatchToProps = dispatch => ({
  getTranslationList() {
    dispatch(getTranslationList())
  }
})

const ExportTranslation = connect(mapStateToProps, mapDispatchToProps)(WithStyle(Translation, styles))
ExportTranslation.loadData = (store) => {
  // 这个函数，负责在服务器端渲染之前，吧这个路由需要的数据提前加载好
  return store.dispatch(getTranslationList())
}
export default ExportTranslation
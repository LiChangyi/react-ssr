import React, { Component, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import Header from '../../components/Header'
import { connect } from 'react-redux'
import { getHomeList } from './store/actions'
import styles from './style.css'
import WithStyle from '../../WithStyle'
// 同构 一套react代码，在服务端执行一次，再客户端再执行一次

class Home extends Component {
  componentDidMount() {
    if (!this.props.list.length) {
      this.props.getHomeList()
    }
  }
  getList() {
    const { list } = this.props
    return list.map(item => <div key={item.id}>{item.title}</div>)
  }
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>这是ahiba的srr新闻页面-丰富多彩的智讯</title>
          <meta name="description" content="这是ahiba的srr新闻页面-丰富多彩的智讯" />
        </Helmet>
        <div className={styles.test}>
          {this.getList()}
          <button onClick={() => {alert('click')}}>click</button>
        </div>
      </Fragment>

    )  
  }
}

// Home.loadData = (store) => {
//   // 这个函数，负责在服务器端渲染之前，吧这个路由需要的数据提前加载好
//   return store.dispatch(getHomeList())
// }

const mapStateToProps = state => ({
  list: state.home.newsList,
  name: state.home.name
})

const mapDispatchToProps = dispatch => ({
  getHomeList() {
    dispatch(getHomeList())
  }
})
const ExportHome = connect(mapStateToProps, mapDispatchToProps)(WithStyle(Home, styles))
ExportHome.loadData = (store) => {
  // 这个函数，负责在服务器端渲染之前，吧这个路由需要的数据提前加载好
  return store.dispatch(getHomeList())
}
export default ExportHome
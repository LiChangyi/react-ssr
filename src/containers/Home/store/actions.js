import { CHANGE_LIST } from './contants'

const changeList = (list) => ({
  type: CHANGE_LIST,
  list
})

export const getHomeList = (server = false) => {
  // http://47.95.113.63/ssr/api/news.json?secret=PP87ANTIPIRATE
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get('/api/news.json')
      .then((res) => {
        const list = res.data.data
        dispatch(changeList(list))
      })
  }
} 
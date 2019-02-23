// 如果在这里，我能够拿到异步数据，并填充到store中
// store里面到底填充什么，我们不知道，我们需要结合当前用户请求地址和路径'
// 如果用户访问/路径，我们就拿home组件的异步数据
// 如果用访问login路径，我们就拿login组件的异步数据
//根据路由的路径，来往store里面加数据
import express from 'express'
import proxy from 'express-http-proxy'
import { render } from './utils'
import { getStore } from '../store';
import { matchRoutes } from 'react-router-config'
import routes from '../Routes'

const app = express()
app.use(express.static('public'))
app.use('/api', proxy('http://47.95.113.63', {
  proxyReqPathResolver: function (req) {
    return '/ssr/api' + req.url;
  }
}));

app.get('*', function (req, res) {
	const store = getStore(req);
	// 根据路由的路径，来往store里面加数据
	const matchedRoutes = matchRoutes(routes, req.path);
	// 让matchRoutes里面所有的组件，对应的loadData方法执行一次
	const promises = [];
	matchedRoutes.forEach(item => {
    if (item.route.loadData) {
      const promise = new Promise((resolve, reject) => {
        item.route.loadData(store).then(resolve).catch(resolve)
      })
      promises.push(promise)
    }
  })
  Promise.all(promises).then(() => {
    const context = {
      css: []
    }
    const html = render(store, routes, req, context)

    if (context.action === 'REPLACE') {
      res.redirect(301, context.url)
    } else if (context.NOT_FOUND) {
			res.status(404);
			res.send(html);
		} else {
			res.send(html);
		}
  })
});

var server = app.listen(3000)
import { Hono } from 'hono'
import { html } from 'hono/html'
import { proxy } from 'hono/proxy'
import { matchedRoutes, routePath, baseRoutePath, basePath } from 'hono/route'
import { custMiddleware, custMiddlewareWithParam } from './middleware'
import * as extra from './extra'
import * as urlPath from './route'

const app = new Hono()

/** Static File */
// serve `public` folder as the `/static` route
// `vitest` works in Node environment. So I have use the proper version of
// static server package.
const isNodeEnv = typeof Bun === 'undefined'
const staticServer = await (isNodeEnv
    ? import('@hono/node-server/serve-static')
    : import('hono/bun'))
app.use(
    '/static/*',
    staticServer.serveStatic({
        root: './',
        rewriteRequestPath: (path) => path.replace(/^\/static/, '/public'),
    })
)

/** Custom Middleware */
// custom inline middleware applied to all routes
app.use(async (_c, next) => {
    // middleware start: called before the handler
    //...

    // call the handler
    await next()

    // middleware 1 end: called after the handler
    // ...
})

// custom middleware created by factory
app.use(custMiddleware)

// custom middleware with parameter created by factory
app.use(custMiddlewareWithParam('Good evening!'))

/** Route Handlers */
// GET method handler
// response: plain text
app.get('/', (c) => {
    return c.text('Hello Hono!')
})

// GET method with parameter handler
// response: HTML
app.get('/param/:username', (c) => {
    const { username } = c.req.param()
    return c.html(
        html`<!doctype html>
            <h1>Hello! ${username}!</h1>`
    )
})

// GET method
// response: JSON
// route helpers included
app.get('/posts/:id', (c) => {
    return c.json({
        routePath: routePath(c), // '/posts/:id'
        matchedRoutes: matchedRoutes(c), // Array of matched routes
        baseRoutePath: baseRoutePath(c), // '/api'
        basePath: basePath(c), // '/api' (with actual params)
    })
})

// GET method handler
// use of bundled route handler
app.get('/route', ...urlPath.default)

// proxy handler
// redirects to another link
app.get('/proxy/:path', (c) => {
    return proxy(`http://localhost:3000/param/${c.req.param('path')}`)
})

// `Not Found` handler
app.notFound((c) => {
    return c.text('Custom 404 Message', 404)
})

// uncaught errors handler
app.onError((err, c) => {
    console.error(`${err}`)
    return c.text('Custom Error Message', 500)
})

// Add the routes, APIs, etc to the server
app.route('/extra', extra.default)

// export used by Bun server
export default {
    port: 3000,
    fetch: app.fetch,
}

// export used in tests
export { app }

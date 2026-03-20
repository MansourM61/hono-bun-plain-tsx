import { Hono } from 'hono'

// `vitest` works in Node environment. So I have use the proper version of
// static server package.
const isNodeEnv = typeof Bun === 'undefined'
const staticServer = await (isNodeEnv
    ? import('@hono/node-server/serve-static')
    : import('hono/bun'))

/** Static File */
export default () =>
    // serve `public` folder as the `/static` route
    staticServer.serveStatic({
        root: './',
        rewriteRequestPath: (path) => path.replace(/^\/static/, '/public'),
    })

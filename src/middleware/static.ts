/**
 * Static data server
 */
// `vitest` works in Node environment. So I have use the proper version of
// static server package.
const isNodeEnv = typeof Bun === 'undefined'
const staticServer = await (isNodeEnv
    ? import('@hono/node-server/serve-static')
    : import('hono/bun'))

// static file server used as a middleware
export default () =>
    // serve `public` folder as the `/static` route
    // for this demo, go to <server-url>/static/sample.txt
    staticServer.serveStatic({
        root: './',
        rewriteRequestPath: (path) => path.replace(/^\/static/, '/public'),
    })

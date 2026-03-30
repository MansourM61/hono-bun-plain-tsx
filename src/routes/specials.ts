/**
 * Defining reverse proxies and other special routers/handlers
 */
import { Hono } from 'hono'
import { proxy } from 'hono/proxy'

const app = new Hono()
    // proxy handler
    // redirects to another link
    // For this demo any request to `<server-url>/proxy/:path` is redirected to `http://localhost:3000/param/:path`
    .get('/proxy/:path', (c) => {
        return proxy(`http://localhost:3000/param/${c.req.param('path')}`)
    })

export default app

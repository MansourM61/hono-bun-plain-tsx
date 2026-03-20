/**
 * Defining reverse proxy
 */
import { Hono } from 'hono'
import { proxy } from 'hono/proxy'

const app = new Hono()
    // proxy handler
    // redirects to another link
    .get('/proxy/:path', (c) => {
        return proxy(`http://localhost:3000/param/${c.req.param('path')}`)
    })

export default app

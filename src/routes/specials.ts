import { Hono } from 'hono'
import { proxy } from 'hono/proxy'

const app = new Hono()
    // proxy handler
    // redirects to another link
    .get('/proxy/:path', (c) => {
        return proxy(`http://localhost:3000/param/${c.req.param('path')}`)
    })

    // `Not Found` handler
    .notFound((c) => {
        return c.text('Custom 404 Message', 404)
    })

    // uncaught errors handler
    .onError((err, c) => {
        console.error(`${err}`)
        return c.text('Custom Error Message', 500)
    })

export default app

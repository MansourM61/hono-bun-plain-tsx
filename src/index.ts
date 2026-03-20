import { Hono } from 'hono'
import { cors } from 'hono/cors'
import staticServer from '@middleware/static'
import { custMiddleware, custMiddlewareWithParam } from '@middleware/middleware'
import handlers from '@routes/ind-route'
import jsxRoute from '@routes/jsx-route'
import router from '@routes/router'
import specials from '@routes/specials'

const app = new Hono()
    // enable CORS for specific routes
    .use('/api/*', cors())

    // serving static files
    .use('/static/*', staticServer())

    // middlewares
    .use(custMiddleware)
    .use(custMiddlewareWithParam('Test'))

    // use of bundled route handler
    .all('/route', ...handlers)

    // use of a separate routes
    .route('/extra', jsxRoute)
    .route('/', router)
    .route('/', specials)

// export used by Bun server
export default {
    port: 3000,
    fetch: app.fetch,
}

// export used in tests
export { app }

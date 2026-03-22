/**
 * Server entry point
 */
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import staticServer from '@middleware/static'
import indRoute from '@routes/ind-route'
import jsxRoute from '@routes/jsx-route'
import router from '@routes/router'
import specials from '@routes/specials'
import middleware, { custIndMiddleware } from '@middleware/middleware'
import error from '@routes/error'
import { isDevMode, loadBunEnv } from '@lib/utils'
import { defaultPort } from '@lib/constants'
import docs from '@routes/docs'

const app = new Hono()
    // apply individual middleware
    .use(staticServer())

    .use(custIndMiddleware)

    // apply CORS for a specific route
    .use('/extra/*', cors())

    // apply middleware bundle to top-level (applies to all subsequent routes)
    .route('/', middleware)

    // independent route
    .route('/ind', indRoute)

    // use of a separate routes
    .route('/extra', jsxRoute)
    .route('/', router)

    // error boundary
    .route('/error', error)

    // global error handler, etc
    .route('/', specials)

    // `Not Found` handler
    // must be at the top level
    .notFound((c) => {
        return c.text('Custom 404 Message', 404)
    })

    // uncaught errors global handler
    .onError((err, c) => {
        console.error(`${err}`)
        console.log('Error handling @ global')
        return c.text('Custom Error Message', 500)
    })

// enable OpenAPI documentation only in `development` mode
if (isDevMode()) {
    // Swagger UI
    app.route('/doc', docs)
}

// export used by Bun server
export default {
    port: parseInt(loadBunEnv('PORT', defaultPort)),
    fetch: app.fetch,
}

// export used in tests
export { app }

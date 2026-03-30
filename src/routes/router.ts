/**
 * Common route handling GET and POST methods with different responses (plain text, HTML, JSON).
 * Query and body parameters validated using Hono validator and Zod.
 */
import { sValidator } from '@hono/standard-validator'
import { bodyObj, paramObj } from '@lib/data'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { html } from 'hono/html'
import { basePath, baseRoutePath, matchedRoutes, routePath } from 'hono/route'
import { validator } from 'hono/validator'

/** Route Handlers */
// All the handlers are accessible through `<server-url>/`
const app = new Hono()
    // GET method handler
    // response: plain text
    // To test, goto `<server-url>/`
    .get('/', (c) => {
        return c.text('Hello Hono!')
    })

    // GET method with parameter handler
    // response: HTML
    // To test, goto `<server-url>/param/:username`
    .get('/param/:username', (c) => {
        const { username } = c.req.param()
        return c.html(
            html`<!doctype html>
                <html>
                <head>
                    <title>My Page Title</title>
                    <link rel="icon" type="image/x-icon" href="/static/favicon.ico">
                </head>
                <body>
                    <h1>Hello! ${username}!</h1>
                </body>
                </html>`
        )
    })

    // apply CORS for a specific route
    .use('/posts/*', cors())

    // GET method handler
    // response: JSON
    // route helpers included
    // To test, post the data to `<server-url>/posts/:id`
    .get('/posts/:id', (c) => {
        return c.json({
            routePath: routePath(c), // '/posts/:id'
            matchedRoutes: matchedRoutes(c), // Array of matched routes
            baseRoutePath: baseRoutePath(c), // '/api'
            basePath: basePath(c), // '/api' (with actual params)
        })
    })

    // POST method handler
    // response: JSON
    // validate body and query parameter
    // To test, post the data to `<server-url>/api`
    .post(
        '/api',
        // Validate the JSON body
        validator('json', async (value, c) => {
            const parsed = await bodyObj.safeParseAsync(value)

            if (!parsed.success) {
                return c.text('Invalid tester details!', 401)
            }

            const rawData = parsed.data

            return rawData
        }),
        // Validate the query (search) parameter
        sValidator('query', paramObj),
        // Handle the request and start with validating the body and query
        async (c) => {
            const { param } = c.req.valid('query')
            const { param_1, param_2 } = c.req.valid('json')

            return c.json({
                queryParam: param,
                body: {
                    param_1,
                    param_2,
                },
            })
        }
    )

// export used to perform routing
export default app

// export used to generate OpenAPI document
export type AppType = typeof app

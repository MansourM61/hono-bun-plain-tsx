import { sValidator } from '@hono/standard-validator'
import { Hono } from 'hono'
import { validator } from 'hono/validator'
import { html } from 'hono/html'
import { routePath, matchedRoutes, baseRoutePath, basePath } from 'hono/route'
import { bodyObj, paramObj } from '@lib/data'

/** Route Handlers */
const app = new Hono()
    // GET method handler
    // response: plain text
    .get('/', (c) => {
        return c.text('Hello Hono!')
    })

    // GET method with parameter handler
    // response: HTML
    .get('/param/:username', (c) => {
        const { username } = c.req.param()
        return c.html(
            html`<!doctype html>
                <h1>Hello! ${username}!</h1>`
        )
    })

    // GET method
    // response: JSON
    // route helpers included
    .get('/posts/:id', (c) => {
        return c.json({
            routePath: routePath(c), // '/posts/:id'
            matchedRoutes: matchedRoutes(c), // Array of matched routes
            baseRoutePath: baseRoutePath(c), // '/api'
            basePath: basePath(c), // '/api' (with actual params)
        })
    })

    // POST method handler
    // validate body and query parameter
    // response: JSON
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

export default app

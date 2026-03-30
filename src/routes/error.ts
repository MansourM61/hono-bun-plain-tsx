/**
 * Error handling at local route
 * Catching uncaught errors + dealing with `Not Found` event.
 *
 * Here we catch these errors that happen locally. Each route can have a handler based on this template to deal with these errors individually.
 * The top level error handler and `Not Found` page deals with all errors that are not caught locally.
 */
import { Hono } from 'hono'

// To test the error handler, go to `<server-url>/error`
const app = new Hono()
    .get('/', (c) => {
        if (Math.random() < 0.5) {
            console.warn('Throwing Error!!!')
            throw new Error('<<< This is an error message >>>')
        } else {
            return c.text('No error thi time!')
        }
    })

    // uncaught errors handler
    // local handler
    .onError((err, _c) => {
        console.error(`${err}`)
        console.log('Error handling @ error route')
        throw new Error(err.message)
    })

    // serves as `Not Found` at local level
    .all('*', (c) => {
        return c.text('This route is not found here!', 404)
    })

// export used to perform routing
export default app

// export used to generate OpenAPI document
export type AppType = typeof app

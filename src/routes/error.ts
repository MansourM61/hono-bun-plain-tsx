/**
 * Error handling at local route
 * Catching uncaught errors + dealing with `Not Found` event.
 */
import { Hono } from 'hono'

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
    .onError((err, c) => {
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

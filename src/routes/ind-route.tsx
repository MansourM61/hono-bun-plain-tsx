/**
 * Individual route tha contains separated middlewares and route handler
 */
import { Hono } from 'hono'
import { createFactory } from 'hono/factory'
import { logger } from 'hono/logger'

const factory = createFactory()

// custom middleware dedicated to this individual route
const middleware = factory.createMiddleware(async (c, next) => {
    // middleware start: called before the handler
    //...
    console.log('independent middleware')

    // call the handler
    await next()

    // middleware 1 end: called after the handler
    // ...
})

// bundled handler for this individual route
const handlers = factory.createHandlers(logger(), middleware, (c) => {
    return c.text('Independent Route with middleware, handler, etc')
})

// use of bundled route handler
const app = new Hono().get('/route', ...handlers)

export default app

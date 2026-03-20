import { createFactory } from 'hono/factory'
import { logger } from 'hono/logger'

const factory = createFactory()

const middleware = factory.createMiddleware(async (c, next) => {
    // middleware start: called before the handler
    //...

    // call the handler
    await next()

    // middleware 1 end: called after the handler
    // ...
})

const handlers = factory.createHandlers(logger(), middleware, (c) => {
    return c.text('Independent Route with middleware, handler, etc')
})

export default handlers

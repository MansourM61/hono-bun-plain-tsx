/**
 * Middlewares defined individually or as a bundle
 */
import { Hono } from 'hono'
import { createMiddleware } from 'hono/factory'

// custom middleware
const custBundledMiddleware = createMiddleware(async (_c, next) => {
    // middleware start: called before the handler
    //...
    console.log('bundled middleware 1')

    // call the handler
    await next()

    // middleware 1 end: called after the handler
    // ...
})

// custom middleware
const custIndMiddleware = createMiddleware(async (_c, next) => {
    // middleware start: called before the handler
    //...
    console.log('individual middleware 1')

    // call the handler
    await next()

    // middleware 1 end: called after the handler
    // ...
})

// custom middleware with parameter
const custBundledMiddlewareWithParam = (message: string) => {
    return createMiddleware(async (_c, next) => {
        // middleware start: called before the handler
        //...
        console.log(message)

        // call the handler
        await next()

        // middleware 1 end: called after the handler
        // ...
    })
}

// bundled middlewares
const app = new Hono()
    .use(custBundledMiddleware)
    .use(custBundledMiddlewareWithParam('bundled middleware 2'))

// export individual middleware
export { custIndMiddleware }

// export bundled middlewares
export default app

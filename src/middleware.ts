import { createMiddleware } from 'hono/factory'

// custom middleware
const custMiddleware = createMiddleware(async (_c, next) => {
    // middleware start: called before the handler
    //...

    // call the handler
    await next()

    // middleware 1 end: called after the handler
    // ...
})

// custom middleware with parameter
const custMiddlewareWithParam = (message: string) => {
    return createMiddleware(async (c, next) => {
        // middleware start: called before the handler
        //...

        // call the handler
        await next()

        // middleware 1 end: called after the handler
        // ...
    })
}

export { custMiddleware, custMiddlewareWithParam }

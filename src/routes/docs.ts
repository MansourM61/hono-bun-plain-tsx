/**
 * Documentation generator based on OpenAPI/Swagger
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { swaggerUI } from '@hono/swagger-ui'
import { Scalar } from '@scalar/hono-api-reference'
import { Hono } from 'hono'

const app = new Hono()
    // OpenAPI Swagger UI
    .get(
        '/swagger',
        swaggerUI({
            url: '/doc/open-api',
        })
    )

    // OpenAPI Scalar UI
    .get(
        '/scalar',
        Scalar({
            url: '/doc/open-api',
            theme: 'kepler',
            layout: 'modern',
            defaultHttpClient: { targetKey: 'js', clientKey: 'axios' },
        })
    )

    // OpenAPI endpoint
    .get('/open-api', async (c) => {
        const raw = await fs.readFile(
            path.join(process.cwd(), './openapi/openapi.json'),
            'utf-8'
        )
        return c.json(JSON.parse(raw))
    })

// export used to perform routing
export default app

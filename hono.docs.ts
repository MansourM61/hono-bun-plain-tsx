/** OpenAPI Configuration File */
import { defaultPort } from '@lib/constants'
import { loadNodeEnv } from '@lib/utils'
import { defineConfig } from '@rcmade/hono-docs'
import { name, openapi, version } from '@/package.json'

// configure generation of OpenAPi documentation
export default defineConfig({
    tsConfigPath: './tsconfig.json',
    openApi: {
        openapi: '3.0.0',
        info: { title: `${name} API`, version: version },
        servers: [
            { url: `http://localhost:${loadNodeEnv('PORT', defaultPort)}` },
        ],
    },
    outputs: {
        openApiJson: openapi,
    },
    apis: [
        {
            name: 'Error Routes', // Title of route
            apiPrefix: '/error', // This will be prepended to all `api` values below
            appTypePath: 'src/routes/error.ts', // Path to your AppType export
            api: [
                // ✅ Custom OpenAPI metadata
                {
                    api: '/', // Final route = /error
                    method: 'get',
                    summary: 'Throws an error to test error catching', // Optional: title shown in docs
                    description: 'Throws an error',
                    tag: ['Error Routes'],
                },
            ],
        },
        {
            name: 'Individual Routes',
            apiPrefix: '/ind',
            appTypePath: 'src/routes/ind-route.ts',
            api: [
                {
                    api: '/route',
                    method: 'get',
                    summary: 'Individual route summary',
                    description: 'Individual route description',
                    tag: ['Individual Routes'],
                },
            ],
        },
        {
            name: 'JSX Routes',
            apiPrefix: '/extra',
            appTypePath: 'src/routes/jsx-route.tsx',
            api: [
                {
                    api: '/',
                    method: 'get',
                    summary: 'JSX route summary',
                    description: 'JSX route description',
                    tag: ['JSX Routes'],
                },
            ],
        },
        {
            name: 'Common Routes',
            apiPrefix: '/',
            appTypePath: 'src/routes/router.ts',
            api: [
                {
                    api: '/',
                    method: 'get',
                    summary: 'GET method handler',
                    description: 'Response: plain text',
                    tag: ['Common Routes'],
                },
                {
                    api: '/param/{username}',
                    method: 'get',
                    summary: 'GET method handler',
                    description: 'Response: plain text',
                    tag: ['Common Routes'],
                },
                {
                    api: '/posts/{id}',
                    method: 'get',
                    summary: 'GET method handler',
                    description: 'Response: JSON, Route helpers included',
                    tag: ['Common Routes'],
                },
                {
                    api: '/api',
                    method: 'post',
                    summary: 'POST method handler',
                    description:
                        'Response: JSON, Validates body and query parameters',
                    tag: ['Common Routes'],
                },
            ],
        },
    ],
})

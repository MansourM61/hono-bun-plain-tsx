import { describe, expect, test } from 'vitest'
import { app } from '@src/index'
import { testClient } from 'hono/testing'
import { BodyObj } from '@/src/lib/data'

// framework route test
describe('Framework Routes', () => {
    test('GET / is ok!', async () => {
        const res = await app.request('/')
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('Hello Hono!')
    })

    test('GET /static/sample.txt is ok!', async () => {
        const res = await app.request('/static/sample.txt')
        expect(res.status).toBe(200)
        expect(await res.text()).toBe('Sample public file')
    })
})

// framework test @ client side
describe('Framework Test @ Client Side', () => {
    const client = testClient(app)

    test('GET /static/sample.txt is ok!', async () => {
        const searchParam = '1'
        const bodyParam: BodyObj = {
            param_1: 'val 1',
            param_2: 'val 2',
        }

        const res = await client.api.$post({
            json: bodyParam,
            query: {
                param: searchParam,
            },
        })

        expect(res.status).toBe(200)
        expect(await res.json()).toStrictEqual({
            queryParam: searchParam,
            body: bodyParam,
        })
    })
})

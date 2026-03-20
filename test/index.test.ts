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
    test('GET /static/sample.txt is ok!', async () => {
        const client = testClient(app)
        const searchParam = 1
        const bodyParam: BodyObj = {
            param_1: 'val 1',
            param_2: 'val 2',
        }
    })
})

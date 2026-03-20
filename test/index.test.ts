import { describe, expect, test } from 'vitest'
import { app } from '@src/index'

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

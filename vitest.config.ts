import { defineConfig } from 'vitest/config'

export default defineConfig({
    resolve: {
        tsconfigPaths: true,
    },
    test: {
        include: ['**/test/**/*.test.?(c|m)[jt]s?(x)'],
    },
})

import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
    plugins: [
        tsconfigPaths(), // to avoid extensions when importing modules in test files
    ],
    test: {
        include: ['**/test/**/*.test.?(c|m)[jt]s?(x)'],
    },
})

import { defineConfig } from 'vitest/config'

export default defineConfig ({
    test: {
        environment: 'node',
        include: ['tests/**/*.test.ts', 'tests/**/*.spec.ts'],
        globals: false,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'lcov', 'html'],
            reportsDirectory: 'coverage'
        }
    }
})

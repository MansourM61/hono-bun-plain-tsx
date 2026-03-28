/**
 * Library file defining any commonly used functions
 *
 * @module lib/utils
 */
import dotenv from 'dotenv'

/**
 * Load Env variable (via `Bun` runtime) or load the default
 *
 * @param {string} envVal name of the environment variable
 * @param {string} envDef default value to replace the environment variable is not available
 * @returns {string} loaded environment variable
 */
const loadBunEnv = (envVal: string, envDef: string) => {
    if (typeof Bun === 'undefined') {
        return envDef
    } else {
        return Bun.env[envVal] ?? envDef
    }
}

/**
 * Manually load Env variable (via `Node` runtime) or load the default
 * only used in `./hono.docs.ts`.
 *
 * @param {string} envVal name of the environment variable
 * @param {string} envDef default value to replace the environment variable is not available
 * @returns {string} loaded environment variable
 */
const loadNodeEnv = (envVal: string, envDef: string) => {
    const devResult = dotenv.config({ path: './.env.development' })
    const comResult = dotenv.config({ path: './.env' })

    return devResult?.parsed?.[envVal] ?? comResult?.parsed?.[envVal] ?? envDef
}

/**
 * Decides which mode the server is running in
 *
 * @returns {boolean} `false` if in `development` mode
 */
const isDevMode = () => {
    if (typeof Bun === 'undefined') {
        return true
    } else {
        return Bun.env.NODE_ENV !== 'production'
    }
}

export { isDevMode, loadBunEnv, loadNodeEnv }

/**
 * Library file defining any commonly used functions
 */
import dotenv from 'dotenv'

// load Env variable (via Bun) or load the default
const loadBunEnv = (envVal: string, envDef: string) => {
    if (typeof Bun === 'undefined') {
        return envDef
    } else {
        return Bun.env[envVal] ?? envDef
    }
}

// manually load Env variable (via Node) or load the default
// only used in `./hono.docs.ts`.
const loadNodeEnv = (envVal: string, envDef: string) => {
    const devResult = dotenv.config({ path: './.env.development' })
    const comResult = dotenv.config({ path: './.env' })

    return devResult?.parsed?.[envVal] ?? comResult?.parsed?.[envVal] ?? envDef
}

// returns false in `development` mode (only for `Bun`)
const isDevMode = () => {
    if (typeof Bun === 'undefined') {
        return true
    } else {
        return Bun.env.NODE_ENV !== 'production'
    }
}

export { isDevMode, loadBunEnv, loadNodeEnv }

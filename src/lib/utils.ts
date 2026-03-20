/**
 * Library file defining any commonly used functions
 */

const loadBunEnv = (envVal: string, envDef: string) => {
    if (typeof Bun === 'undefined') {
        return envDef
    } else {
        return Bun.env[envVal] ?? envDef
    }
}

export { loadBunEnv }

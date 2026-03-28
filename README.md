# Hono+Bun+TS+TSX

Hono-based framework fully based on Bun with support for TypeScript syntax and TSX files

## Scaffolding Steps

1. Initial VSCode related files (`extensions.json` and `settings.json`) are added.
2. Git repos is created (commit: `Git repos is created.`).
3. A Hono project based on Bun template is created.
4. `tsconfig.json` is updated (commit: `Hono project is scaffolded.`).
5. Prettier is setup to work with git `pre-commit` hook (commit: `Prettier and git hook is setup.`).
6. Basic supports for JSX, HTML, Routing, reverse proxy, static files, etc are added (commit: `Hono server is equipped with basic features (route, JSX, HTML, reverse proxy, static files, etc).`).
7. Vitest support is added (commit: `Vitest support is added.`).
8. Custom middleware in a separate file with type support is added.
9. Route handler in a separate file with independent middleware, handler and type support is added (commit: `Middleware and route handler in separate files are added.`).
10. Zod validation is added for query parameter and body content (commit: `Zod validation is added.`).
11. The modules are re-arranged and re-written to support inferring types (commit: `Code re-arranged to support inferring types.`).
12. Client side test with full type support is added (commit: `Client side test is added.`).
13. `.env` files are added.
14. Separate files for functions, data types, constants are created in `@lib` folder.
15. Global and local error handlers are added.
16. GLobal and local handlers to deal with page-not-found events (commit: `.env files are added; local and global error handling and `Not Found` are added; local and global CORS are added; code is tidied up.`).
17. Build scripts are added to `package.json` (commit: `Build scripts are added.`).
18. OpenAPI documentation generation is added.
19. Scalar and Swagger UIs are added (commit: `OpenAPI documentation generation, and scalar/swagger UI are added.`).
20. Biome is configured as the linter and formatter.
21. Documentation based on TypeDoc is added (commit: `TypeDoc documentation is added.`).

## Instruction

1. All library files are placed in `src/lib`, and can be imported using `@lib/` prefix.
2. Middlewares are located in `src/middleware`, and accessed by `@middleware/` prefix in the main script.
3. Routes are all placed in `src/routes` folder and accessed by `@routes/`.
4. The routes export `app` which is used in the main script to define a route.
5. The type of `app` is also exported and used to generate OpenAPI documentation.
6. The OpenAPI documentation is configured in `hono.docs.ts` file, where the details of all required routes and endpoints are added manually.

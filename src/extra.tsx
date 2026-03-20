import { Hono } from 'hono'
import type { FC } from 'hono/jsx'

const app = new Hono()

// layout component
const Layout: FC = (props) => {
    return (
        <html>
            <body>{props.children}</body>
        </html>
    )
}

// JSX generator
const Top: FC<{ messages: string[] }> = (props: { messages: string[] }) => {
    return (
        <Layout>
            <h1>Hello From Hono!</h1>
            <ul>
                {props.messages.map((message) => {
                    return <li>{message} 💥</li>
                })}
            </ul>
        </Layout>
    )
}

// GET method handler
// response: converted JSX
app.get('/', (c) => {
    const messages = ['Bun', 'Hono', 'Vite', 'React']
    return c.html(<Top messages={messages} />)
})

export default app

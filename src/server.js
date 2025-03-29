import Hapi from '@hapi/hapi'
import * as admin from 'firebase-admin'
import routes from './routes'
import { db } from './database'
import credentials from '../credentials.json'

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

let server;

const start = async () => {
    server = Hapi.server({
        port: 8000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'], // ✅ Allow all origins (change to specific origin in production)
                headers: ['Accept', 'Content-Type', 'Authorization', 'authtoken'],
                exposedHeaders: ['Authorization'],
                credentials: true, // ✅ Allow cookies & credentials
            },
        },
    })

    routes.forEach(route => server.route(route))

    db.connect();
    await server.start();
    console.log(`Server is listening on port ${server.info.uri}`)
}

process.on('unhandledRejection', err => {
    console.log(err)
    process.exit(1)
})

process.on('SIGINT', async () => {
    console.log('Stopping the server...')
    await server.stop({ timeout: 1000 })

    db.end();
    console.log('Server stopped.')
    process.exit(0)
})
start();
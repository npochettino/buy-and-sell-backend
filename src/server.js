import dotenv from 'dotenv';
dotenv.config();
import Hapi from '@hapi/hapi'
import * as admin from 'firebase-admin'
import routes from './routes'
import { db } from './database'
import credentials from '../credentials.json'
import inert from '@hapi/inert';

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

let server;

const start = async () => {
    server = Hapi.server({
        port: 8080,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
                headers: ['Accept', 'Content-Type', 'Authorization', 'authtoken'],
                exposedHeaders: ['Authorization'],
                credentials: true,
            },
        },
    })

    await server.register(inert);
    
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
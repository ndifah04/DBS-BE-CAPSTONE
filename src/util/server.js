import { server as _server } from '@hapi/hapi';

const server = _server({
    port: 3000,
    host: '0.0.0.0',
    routes: {
        cors: {
            origin: ['*'] // Izinkan semua origin, atau ganti sesuai kebutuhan
        }
    }
});

export default server;
import { server as _server } from '@hapi/hapi';

const server = _server({
    port: 3000,
    host: 'localhost'
});

export default server;
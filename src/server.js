import http from 'http';
import app from './app';

const server = http.Server(app);

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`API UP PORT ${port}`);
});

export default server;

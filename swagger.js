import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Blogging Francisco',
        description: 'Este es mi proyecto final de nivel 2'
    },
    host: 'http://localhost:3050',
    servers: [
        {
            url: 'http://localhost:3050/api/vi',
        },
    ],
};

const outputFile = './swagger-output.json';
const routes = ['./src/routes/index.js'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc).then(async () => {
    await import('./src/index.js');
});
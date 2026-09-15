const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Goalkeeper API',
      version: '1.0.0',
      description: 'REST API for managing football goalkeepers'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./src/swaggerDocs.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
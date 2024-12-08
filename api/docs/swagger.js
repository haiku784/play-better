// Import required modules
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// Create an instance of Express
const app = express();

// Swagger definition
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Recording Service API',
            version: '1.0.0',
            description: 'API documentation for the recording service.',
        },
        servers: [{
            url: 'http://localhost:3000',
        }],
    },
    apis: ['./routes/*.js']
};

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Serve swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

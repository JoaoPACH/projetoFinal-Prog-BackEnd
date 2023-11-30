const swaggerAutogen = require('swagger-autogen')();

output = './swagger_doc.json';
endpoints = [
  './routes/cliente.js',
  './routes/funcionario.js',
  './routes/servico.js'
];

const doc = {
  info: {
    version: "1.0.0",
    title: "Gestão de empresa.",
    description: "API REST para gerenciamento de colaboradores, clientes e servicos.",
  },
  host: "localhost:3001",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [],
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description:
        "Enter your bearer token in the format **Bearer &lt;token>**",
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  definitions: {},
  components: {},
};

swaggerAutogen(output, endpoints, doc);


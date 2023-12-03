const swaggerAutogen = require("swagger-autogen")();

output = "./swagger_doc.json";
endpoints = [
  './routes/cliente.js',
  './routes/colaborador.js',
  './routes/login.js',
  './routes/servico.js',
  './routes/sistema.js',
  './routes/usuario.js',
  './routes/venda.js'
];

const doc = {
  info: {
    version: "1.0.0",
    title: "API REST",
    description: "API REST para gerenciamento de colaboradores, servicos e clientes de uma empresa.",
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

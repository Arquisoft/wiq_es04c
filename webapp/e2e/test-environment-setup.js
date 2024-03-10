const { MongoMemoryServer } = require('mongodb-memory-server');


let mongoserver;
let userservice;
let authservice;
let gatewayservice;

async function startServer() {
    console.log('Starting MongoDB memory server...');
    mongoserver = await MongoMemoryServer.create();
    const mongoUri = mongoserver.getUri();
    process.env.MONGODB_URI = mongoUri;
    userservice = require("../../users/userservice/user-service");
    authservice = require("../../users/authservice/auth-service");
    gatewayservice = require("../../gatewayservice/gateway-service");
  }

  startServer();

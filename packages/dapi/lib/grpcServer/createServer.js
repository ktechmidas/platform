const grpc = require('grpc');

const {
  service: healthCheckServiceDefinition,
  Implementation: HealthCheck,
} = require('grpc-health-check/health');

const {
  HealthCheckResponse: { ServingStatus: healthCheckStatuses },
} = require('grpc-health-check/v1/health_pb');

const { loadPackageDefinition } = require('@dashevo/dapi-grpc');

const wrapInErrorHandlerFactory = require('./error/wrapInErrorHandlerFactory');

const wrapInErrorHandler = wrapInErrorHandlerFactory(console);

const getTransactionsByFilterHandlerFactory = require('./handlers/getTransactionsByFilterHandlerFactory');

function createServer() {
  const server = new grpc.Server();

  // Add health check service

  const statusMap = {
    '': healthCheckStatuses.SERVING,
    'org.dash.platform.dapi.TransactionsFilterStream': healthCheckStatuses.SERVING,
  };

  server.addService(healthCheckServiceDefinition, new HealthCheck(statusMap));

  // Add TransactionsFilterStream service

  const {
    TransactionsFilterStream,
  } = loadPackageDefinition();

  const getTransactionsByFilterHandler = getTransactionsByFilterHandlerFactory();

  server.addService(TransactionsFilterStream.service, {
    getTransactionsByFilter: wrapInErrorHandler(getTransactionsByFilterHandler),
  });

  return server;
}

module.exports = createServer;

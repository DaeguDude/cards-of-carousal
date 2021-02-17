const SocketRouter = require('./SocketRouter');

describe('SocketRouter', () => {
  // ----------------------------------------------------------------
  // Constructor
  describe('constructor', () => {
    it('throws an error for new SocketRouter() without handler', () => {
      expect(() => new SocketRouter()).toThrow(/Missing 404 handler/);
    });
  });

  // ----------------------------------------------------------------
  // Public method - addRoute
  describe('addRoute', () => {
    it('throws an error for socketRouter.addRoute(routeDeclaration) without a handler', () => {
      const socketRouter = new SocketRouter(() => {});

      expect(() => socketRouter.addRoute('GET /test')).toThrow(
        'Missing routeDeclaration',
      );
    });

    it('throws an error for socketRouter.addRoute(routeDeclaration, handler) with wrong route syntax', () => {
      const socketRouter = new SocketRouter(() => {});
      const handler = () => {};

      expect(() => socketRouter.addRoute('GET', handler)).toThrow(
        'Invalid route declaration, check syntax',
      );

      expect(() => socketRouter.addRoute('GET/test', handler)).toThrow(
        'Invalid route declaration, check syntax',
      );

      expect(() => socketRouter.addRoute('GET /test group', handler)).toThrow(
        'Invalid route declaration, check syntax',
      );
    });

    it(`throws an error for socketRouter.addRoute(routeDeclaration, handler) with wrong HTTP method'`, () => {
      const socketRouter = new SocketRouter(() => {});
      const handler = () => {};

      expect(() => socketRouter.addRoute('GTE /test', handler)).toThrow(
        'Route method must be "GET", "PUT", "POST", "DELETE"',
      );

      expect(() => socketRouter.addRoute('COPY /test', handler)).toThrow(
        'Route method must be "GET", "PUT", "POST", "DELETE"',
      );

      expect(() => socketRouter.addRoute('test /test', handler)).toThrow(
        'Route method must be "GET", "PUT", "POST", "DELETE"',
      );
    });

    it(`throws an error for socketRouter.addRoute('routeDeclaration', handler) with wrong route syntax`, () => {
      const socketRouter = new SocketRouter(() => {});
      const handler = () => {};

      expect(() => socketRouter.addRoute('GET test', handler)).toThrow(
        'Route must start from root',
      );

      expect(() => socketRouter.addRoute('GET .test', handler)).toThrow(
        'Route must start from root',
      );

      expect(() =>
        socketRouter.addRoute('GET testgroup/test', handler),
      ).toThrow('Route must start from root');
    });
  });

  // ----------------------------------------------------------------
  // Public method - handleRequest
  describe('handleRequest', () => {
    it(`calls the notFoundHandler passed in the constructor for socketRouter.handleRequest(webSocket, request) with request to undefined route`, () => {
      const notFoundHandler = jest.fn();
      const socketRouter = new SocketRouter(notFoundHandler);

      socketRouter.handleRequest(
        {},
        {
          method: 'GET',
          url: '/test',
        },
      );

      expect(notFoundHandler).toHaveBeenCalled();
    });

    it(`calls the appropriate addRoute handler for socketRouter.handleRequest(webSocket, request) with valid request`, () => {
      const routeHandler = jest.fn();
      const socketRouter = new SocketRouter(() => {});
      socketRouter.addRoute('GET /test', routeHandler);

      socketRouter.handleRequest(
        {},
        {
          method: 'GET',
          url: '/test',
        },
      );

      expect(routeHandler).toHaveBeenCalled();
    });
  });
});

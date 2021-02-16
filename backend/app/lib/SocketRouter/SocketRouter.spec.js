/*
constructor()
- expect new SocketRouter() without handler to throw Error 'Missing 404 handler'
? expect new SocketRouter(handler) with handler in the wrong format to throw error

addRoute()
- expect socketRouter.addRoute('routeDeclaration') without handler to throw Error 'Missing routeDeclaration "${routeDeclaration}" handler'
- expect socketRouter.addRoute('routeDeclaration', handler) with wrong syntax to throw Error "Invalid route declaration, check syntax"
- expect socketRouter.addRoute('routeDeclaration', handler) with wrong HTTP method to throw Error 'Route method must be "GET", "PUT", "POST", "DELETE"' 
- expect socketRouter.addRoute('routeDeclaration', handler) with wrong route syntax to throw Error 'Route must start from root' 
? verify socketRouter.addRoute('routeDeclaration', handler) with correct syntax to properly add given route

handleRequest()
- expect socketRouter.handleRequest(webSocket, request) with request to undefined route to call the original handler passed as a param to socketRouter constructor
- expect socketRouter.handleRequest(webSocket, request) with valid request to call the appropriate addRoute handler
*/

const SocketRouter = require('./SocketRouter');

describe('SocketRouter', () => {
  // ----------------------------------------------------------------
  // Constructor
  describe('constructor', () => {
    it('new SocketRouter() without handler throws "Error Missing 404 handler"', () => {
      expect(() => new SocketRouter()).toThrow(/Missing 404 handler/);
    });
  });

  // ----------------------------------------------------------------
  // Public Methods
  describe('Public Methods', () => {
    it('socketRouter.addRoute(routeDeclaration) without handler throws Error "Missing routeDeclaration {routeDeclaration} handler"', () => {
      const socketRouter = new SocketRouter(() => {});

      expect(() => socketRouter.addRoute('GET /test')).toThrow(
        /Missing routeDeclaration/,
      );
    });

    it('socketRouter.addRoute(routeDeclaration, handler) with wrong route syntax to throw Error "Invalid route declaration, check syntax"', () => {
      const socketRouter = new SocketRouter(() => {});
      const handler = () => {};

      expect(() => socketRouter.addRoute('GET', handler)).toThrow(
        /Invalid route declaration, check syntax/,
      );

      expect(() => socketRouter.addRoute('GET/test', handler)).toThrow(
        /Invalid route declaration, check syntax/,
      );

      expect(() => socketRouter.addRoute('GET /test group', handler)).toThrow(
        /Invalid route declaration, check syntax/,
      );
    });

    it(`socketRouter.addRoute(routeDeclaration, handler) with wrong HTTP method to throw Error 'Route method must be "GET", "PUT", "POST", "DELETE"'`, () => {
      const socketRouter = new SocketRouter(() => {});
      const handler = () => {};

      expect(() => socketRouter.addRoute('GTE /test', handler)).toThrow(
        /Route method must be "GET", "PUT", "POST", "DELETE"/,
      );

      expect(() => socketRouter.addRoute('COPY /test', handler)).toThrow(
        /Route method must be "GET", "PUT", "POST", "DELETE"/,
      );

      expect(() => socketRouter.addRoute('BIND /test', handler)).toThrow(
        /Route method must be "GET", "PUT", "POST", "DELETE"/,
      );
    });

    it(`socketRouter.addRoute('routeDeclaration', handler) with wrong route syntax to throw Error 'Route must start from root'`, () => {
      const socketRouter = new SocketRouter(() => {});
      const handler = () => {};

      expect(() => socketRouter.addRoute('GET test', handler)).toThrow(
        /Route must start from root/,
      );

      expect(() => socketRouter.addRoute('GET .test', handler)).toThrow(
        /Route must start from root/,
      );

      expect(() =>
        socketRouter.addRoute('GET testgroup/test', handler),
      ).toThrow(/Route must start from root/);
    });

    it(`socketRouter.handleRequest(webSocket, request) with request to undefined route to call the original handler passed as a param to socketRouter constructor`, () => {
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

    it(`socketRouter.handleRequest(webSocket, request) with valid request to call the appropriate addRoute handler`, () => {
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

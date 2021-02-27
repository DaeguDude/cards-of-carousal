const Lobby = require('./Lobby');
const { customAlphabet } = require('nanoid');
const customNanoid = customAlphabet('ABCDGHJKMNPRSTUVWXYZ', 4);

describe('Lobby', () => {
  let lobby;
  let hostSocket;
  let onCloseCallBack;
  let playerSocket;
  beforeEach(() => {
    jest.clearAllMocks();
    hostSocket = jest.fn();
    hostSocket.on = jest.fn();
    hostSocket.send = jest.fn();
    hostSocket.close = jest.fn();
    onCloseCallBack = jest.fn();
    lobby = new Lobby(hostSocket, onCloseCallBack);
    playerSocket = {
      id: customNanoid(),
      on: jest.fn(),
      send: jest.fn(),
      close: jest.fn(),
    };
  });

  it('gives lobby a unique ID', () => {
    let messageObject = {
      event: 'create-lobby',
      payload: { id: lobby.id },
      sender: 'server',
    };
    expect(lobby.id).toBeTruthy();
    expect(hostSocket.on).toBeCalledWith('message', expect.any(Function));
    expect(hostSocket.on).toBeCalledWith('close', expect.any(Function));
    expect(hostSocket.send).toBeCalledWith(JSON.stringify(messageObject));
  });

  it('can add a player', () => {
    let messageObject = {
      event: 'player-connect',
      payload: { playerId: playerSocket.id },
      sender: 'server',
    };
    lobby.addPlayer(playerSocket);
    expect(playerSocket.on).toBeCalledWith('message', expect.any(Function));
    expect(playerSocket.on).toBeCalledWith('close', expect.any(Function));
    expect(hostSocket.send).toBeCalledWith(JSON.stringify(messageObject));
  });

  it('can close a lobby', () => {
    let messageObject = {
      event: 'lobby-closed',
      payload: {},
      sender: 'server',
    };
    let playerSocketTwo = {
      id: customNanoid(),
      on: jest.fn(),
      send: jest.fn(),
      close: jest.fn(),
    };
    lobby.addPlayer(playerSocket);
    lobby.addPlayer(playerSocketTwo);
    lobby.closeLobby();
    expect(playerSocket.send).toBeCalledWith(JSON.stringify(messageObject));
    expect(playerSocket.close).toBeCalledWith(1000, messageObject.event);
    expect(playerSocketTwo.send).toBeCalledWith(JSON.stringify(messageObject));
    expect(playerSocketTwo.close).toBeCalledWith(1000, messageObject.event);
  });
});

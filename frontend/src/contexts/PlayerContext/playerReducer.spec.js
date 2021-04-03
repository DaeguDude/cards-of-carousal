import reducer from './playerReducer';
import socketInstance from '../../socket/socket';

jest.mock('../../socket/socket', () => ({
  joinLobby: jest.fn(),
  sendMessage: jest.fn(),
}));

describe('reducer', () => {
  describe('default', () => {
    it('returns a copy of state when no case is matched', () => {
      const state = {
        gameState: 'hello',
        message: {
          big: 'test big',
          small: 'test small',
        },
      };

      const result = reducer(state, {
        type: 'SOME_RANDOM',
        payload: { id: '1234' },
      });
      expect(result).not.toBe(state);
      expect(result).toMatchObject(state);
    });
  });

  describe('JOIN_LOBBY', () => {
    it('returns a copy of state with "gameState" set to the proper value', () => {
      const state = {
        gameState: 'TEST',
      };

      const result = reducer(state, {
        type: 'JOIN_LOBBY',
        payload: { id: '1234' },
      });
      expect(result).not.toBe(state);
      expect(result.gameState).toBe('pending-connection');
    });

    it("updates state's message", () => {
      const state = {
        gameState: 'TEST',
        message: { big: '', small: '' },
      };

      const result = reducer(state, {
        type: 'JOIN_LOBBY',
        payload: { id: '1234' },
      });

      expect(result.message).toEqual({
        big: 'Connecting to Lobby',
        small: 'Please wait',
      });
    });

    it('calls the joinLobby method with the correct id', () => {
      const state = {
        gameState: 'TEST',
      };
      const lobbyId = '1234';
      const playerName = 'FOO';

      reducer(state, {
        type: 'JOIN_LOBBY',
        payload: { lobbyId, playerName },
      });

      expect(socketInstance.joinLobby).toHaveBeenCalledWith(
        lobbyId,
        playerName,
      );
    });
  });

  describe('UPDATE', () => {
    it('updates the state according to the payload', () => {
      const state = {
        gameState: 'foo',
        cards: ['card 1', 'card 2', 'card 3'],
        message: {
          big: 'big message',
          small: 'small message',
        },
      };
      const result = reducer(state, {
        type: 'UPDATE',
        payload: state,
      });

      expect(result).toEqual(state);
    });

    it('updates partial states', () => {
      const initialState = {
        gameState: 'foo',
        cards: ['card 1', 'card 2', 'card 3'],
        message: {
          big: 'big message',
          small: 'small message',
        },
      };
      const updatedState = {
        gameState: 'bar',
        cards: ['card 4', 'card 5', 'card 6'],
      };
      const result = reducer(initialState, {
        type: 'UPDATE',
        payload: updatedState,
      });

      expect(result).not.toEqual(initialState);
      expect(result.message).toEqual(initialState.message);
      expect(result.gameState).toEqual(updatedState.gameState);
      expect(result.cards).toEqual(updatedState.cards);
    });

    it('returns initial state with an empty payload', () => {
      const state = {
        gameState: 'foo',
        cards: ['card 1', 'card 2', 'card 3'],
        message: {
          big: 'big message',
          small: 'small message',
        },
      };
      const result = reducer(state, {});

      expect(result).toEqual(state);
    });
  });

  describe('ERROR_DISCONNECT', () => {
    it('returns a copy of state with the gameState and the message set properly', () => {
      const state = {
        gameState: 'test state',
        message: {
          big: 'deal',
          small: 'pox',
        },
      };

      const result = reducer(state, { type: 'ERROR_DISCONNECT', payload: {} });
      expect(result).not.toBe(state);
      expect(result.gameState).toBe('disconnected-error');
      expect(result.message.big).toBe('AN ERROR OCCURRED');
      expect(result.message.small).toBe('Refresh to try again');
    });
  });

  describe('SUBMIT_CARDS', () => {
    it('returns a copy of state with the gameState and message set properly', () => {
      const state = {
        gameState: 'test state',
        message: {
          big: 'Test',
          small: 'test',
        },
      };

      const result = reducer(state, { type: 'SUBMIT_CARDS', payload: {} });

      expect(result.gameState).toEqual('submitting-cards');
      expect(result.message).toEqual({
        big: 'Submitting your cards',
        small: 'Please wait',
      });
    });

    it('sends a message to the host with the submitted card indexes', () => {
      const state = {};

      const result = reducer(state, {
        type: 'SUBMIT_CARDS',
        payload: { selectedCards: [1, 2, 3] },
      });

      expect(result).not.toBe(state);
      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        event: 'player-submit',
        payload: { selectedCards: [1, 2, 3] },
      });
    });
  });

  describe('SUBMIT_WINNER', () => {
    it('sends a message to the host with the correct event and payload', () => {
      const state = {};

      const result = reducer(state, {
        type: 'SUBMIT_WINNER',
        payload: { id: 2 },
      });
      expect(result).not.toBe(state);

      expect(socketInstance.sendMessage).toHaveBeenCalledWith({
        event: 'select-winner',
        id: 2,
      });
    });
  });
});

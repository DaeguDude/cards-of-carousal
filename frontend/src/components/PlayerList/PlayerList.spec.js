import React from 'react';
import { render, screen } from '@testing-library/react';
import { HostContext } from '../../contexts/HostContext/HostContext';

import PlayerList from './PlayerList';

describe('PlayerList', () => {
  it('renders PlayerList component given a simple playerList object', () => {
    const state = {
      players: {
        playerID1: {
          name: 'Foo',
          score: 3,
          isCzar: false,
          submittedCards: [1, 4],
          cards: [
            { text: 'test', pack: 0 },
            { text: 'test', pack: 0 },
          ],
        },
        playerID2: {
          name: 'Bar',
          score: 5,
          isCzar: true,
          submittedCards: [],
          cards: [],
        },
      },
      playerIDs: ['playerID1', 'playerID2'],
      newPlayerStaging: [],
    };

    render(
      <HostContext.Provider value={{ state }}>
        <PlayerList />
      </HostContext.Provider>,
    );

    expect(screen.getByText(state.players.playerID1.name)).toBeInTheDocument();
    expect(screen.getByText(state.players.playerID2.name)).toBeInTheDocument();
  });

  it('renders players from the newPlayerStaging array', () => {
    const state = {
      players: {},
      playerIDs: [],
      newPlayerStaging: [
        {
          playerId: 'playerID1',
          name: 'Foo',
          score: 3,
          isCzar: false,
          submittedCards: [1, 4],
          cards: [
            { text: 'test', pack: 0 },
            { text: 'test', pack: 0 },
          ],
        },
        {
          playerId: 'playerID2',
          name: 'Bar',
          score: 5,
          isCzar: true,
          submittedCards: [],
          cards: [],
        },
      ],
    };

    render(
      <HostContext.Provider value={{ state }}>
        <PlayerList />
      </HostContext.Provider>,
    );

    expect(
      screen.getByText(state.newPlayerStaging[0].name),
    ).toBeInTheDocument();
    expect(
      screen.getByText(state.newPlayerStaging[1].name),
    ).toBeInTheDocument();
  });

  it('If player has submitted his cards or player is czar, render the icon fully visible', () => {
    const state = {
      players: {
        playerID1: {
          name: 'Foo',
          score: 3,
          isCzar: false,
          submittedCards: [1, 4],
          cards: [
            { text: 'test', pack: 0 },
            { text: 'test', pack: 0 },
          ],
        },
        playerID2: {
          name: 'Bar',
          score: 5,
          isCzar: true,
          submittedCards: [],
          cards: [],
        },
      },
      playerIDs: ['playerID1', 'playerID2'],
      newPlayerStaging: [],
    };

    render(
      <HostContext.Provider value={{ state }}>
        <PlayerList />
      </HostContext.Provider>,
    );

    expect(
      screen.getByTestId(`icon-${state.players.playerID1.name}`),
    ).toBeVisible();
    expect(
      screen.getByTestId(`icon-${state.players.playerID2.name}`),
    ).toBeVisible();
  });

  it('If player has NOT submitted his cards, render the icon with visibility hidden', () => {
    const state = {
      players: {
        playerID1: {
          name: 'Foo',
          score: 3,
          isCzar: false,
          submittedCards: [],
          cards: [],
        },
      },
      playerIDs: ['playerID1'],
      newPlayerStaging: [],
    };

    render(
      <HostContext.Provider value={{ state }}>
        <PlayerList />
      </HostContext.Provider>,
    );

    expect(
      screen.getByTestId(`icon-${state.players.playerID1.name}`),
    ).not.toBeVisible();
  });

  it('If playerIDs and newPlayerStaging is empty, PlayerList still renders as an empty container', () => {
    const state = {
      players: {},
      playerIDs: [],
      newPlayerStaging: [],
    };

    render(
      <HostContext.Provider value={{ state }}>
        <PlayerList />
      </HostContext.Provider>,
    );

    expect(screen.getByTestId('playerList-container')).toBeInTheDocument();
  });

  it('If the player object goes in a different order than playerIDs, the component follow playerIDs order', () => {
    const state = {
      players: {
        playerID1: {
          name: 'Foo',
          score: 3,
          isCzar: false,
          submittedCards: [1, 4],
          cards: [],
        },
        playerID2: {
          name: 'Bar',
          score: 5,
          isCzar: true,
          submittedCards: [],
          cards: [],
        },
      },
      playerIDs: ['playerID2', 'playerID1'],
      newPlayerStaging: [],
    };

    render(
      <HostContext.Provider value={{ state }}>
        <PlayerList />
      </HostContext.Provider>,
    );

    const player2 = screen.getByTestId('row-Bar');

    expect(screen.getByTestId('playerList-container').firstChild).toBe(player2);
  });

  // TODO: test('If player is czar, render the its row with the proper colors', () => {})
});

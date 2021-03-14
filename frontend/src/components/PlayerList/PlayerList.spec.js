import React from 'react';
import { render, screen } from '@testing-library/react';

import PlayerList from './PlayerList';

describe('PlayerList', () => {
  it('renders PlayerList component given a simple playerList object', () => {
    const playerList = {
      players: {
        playerID1: {
          name: 'Foo',
          score: 3,
          czar: false,
          submittedCards: [1, 4],
        },
        playerID2: {
          name: 'Bar',
          score: 5,
          czar: true,
          submittedCards: [],
        },
      },
      playerIDs: ['playerID1', 'playerID2'],
    };

    render(<PlayerList playerList={playerList} />);

    expect(
      screen.getByText(playerList.players.playerID1.name),
    ).toBeInTheDocument();
    expect(
      screen.getByText(playerList.players.playerID2.name),
    ).toBeInTheDocument();
  });

  it('If player has submitted his cards or player is czar, render the icon fully visible', () => {
    const playerList = {
      players: {
        playerID1: {
          name: 'Foo',
          score: 3,
          czar: false,
          submittedCards: [1, 4],
        },
        playerID2: {
          name: 'Bar',
          score: 5,
          czar: true,
          submittedCards: [],
        },
      },
      playerIDs: ['playerID1', 'playerID2'],
    };

    render(<PlayerList playerList={playerList} />);

    expect(
      screen.getByTestId(`icon-${playerList.players.playerID1.name}`),
    ).toBeVisible();
    expect(
      screen.getByTestId(`icon-${playerList.players.playerID2.name}`),
    ).toBeVisible();
  });

  it('If player has NOT submitted his cards, render the icon with visibility hidden', () => {
    const playerList = {
      players: {
        playerID1: {
          name: 'Foo',
          score: 3,
          czar: false,
          submittedCards: [],
        },
      },
      playerIDs: ['playerID1'],
    };

    render(<PlayerList playerList={playerList} />);

    expect(
      screen.getByTestId(`icon-${playerList.players.playerID1.name}`),
    ).not.toBeVisible();
  });

  it('If playerIDs is empty, PlayerList still renders as an empty container', () => {
    const playerList = {
      players: {},
      playerIDs: [],
    };

    render(<PlayerList playerList={playerList} />);

    expect(screen.getByTestId('playerList-container')).toBeInTheDocument();
  });

  it('If the player object goes in a different order than playerIDs, the component follow playerIDs order', () => {
    const playerList = {
      players: {
        playerID1: {
          name: 'Foo',
          score: 3,
          czar: false,
          submittedCards: [1, 4],
        },
        playerID2: {
          name: 'Bar',
          score: 5,
          czar: true,
          submittedCards: [],
        },
      },
      playerIDs: ['playerID2', 'playerID1'],
    };

    render(<PlayerList playerList={playerList} />);

    const player2 = screen.getByTestId('row-Bar');

    expect(screen.getByTestId('playerList-container').firstChild).toBe(player2);
  });

  // TODO: test('If player is czar, render the its row with the proper colors', () => {})
});

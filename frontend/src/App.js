import React, { useState } from 'react';

import Button from './components/Buttons/Button';
import './App.css';
import HamburgerMenu from './components/Buttons/HamburgerMenu/HamburgerMenu';
import SocketTest from './components/SocketTest';
import PlayerList from './components/PlayerList/PlayerList';

import playerList from './temp/playerList';

function App() {
  const [showSocketTest, setShowSocketTest] = useState(false);
  const [showPlayerList, setShowPlayerList] = useState(false);
  const [showHamburgerMenu, setHamburgerMenu] = useState(false);
  const [hamburgerMenuActive, setHamburgerMenuActive] = useState(false);

  return (
    <div className="App">
      <div className="buttons-grid">
        <button type="button" onClick={() => { setShowSocketTest(!showSocketTest); }}>
          Show SocketTest
        </button>

        <button type="button" onClick={() => { setShowPlayerList(!showPlayerList); }}>
          Show PlayerList
        </button>

        <button type="button" onClick={() => { setHamburgerMenu(!showHamburgerMenu); }}>
          Show HamburgerMenu
        </button>
        <Button isActive><p style={{ fontSize: '20px' }}>Click me!</p></Button>
        <Button><p style={{ fontSize: '25px' }}>Do not click me!</p></Button>
      </div>

      {showSocketTest && <SocketTest />}

      {showPlayerList && <PlayerList playerList={playerList} />}

      {showHamburgerMenu
      && (
      <div style={{ backgroundColor: 'grey' }}>
        <HamburgerMenu
          isActive={hamburgerMenuActive}
          onClick={() => {
            setHamburgerMenuActive(!hamburgerMenuActive);
            // eslint-disable-next-line no-console
            console.log('hamburger menu clicked');
          }}
        />
      </div>
      )}
    </div>
  );
}

export default App;

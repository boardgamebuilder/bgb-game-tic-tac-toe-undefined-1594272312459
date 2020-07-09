import React, { useEffect, useState } from 'react';
import './App.css';
import { Client } from "boardgame.io/react";
import TicTacToe from "./Game";
import Board from "./Board";

const App = (props) => {

  const [appSettings, setAppSettings] = useState({ board: { size: 3 } });

  const AppSettingsContext = React.createContext();
  const App = Client({
    game: TicTacToe,
    board: Board,
    debug: false
  });

  useEffect(() => {
    window.addEventListener("message", (event) => {
      console.log(`Game received message`);
      const { action, data } = event.data;
      console.log(`action: ${action}`);
      if (action === "settings") {
        console.log(`data: ${JSON.stringify(data)}`);
        setAppSettings(data);
      }
    }, false);
  }, []);

  return (
    <AppSettingsContext.Provider value={appSettings}>
      <AppSettingsContext.Consumer>
        {context => (
          <App appSettings={context} />
        )}
      </AppSettingsContext.Consumer>
    </AppSettingsContext.Provider>
  );
}

export default App;

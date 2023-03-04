import React from 'react';
import '../styles/index.css';
import Menu from "../components/menu/menu";
import Workspace from "../components/workspace/workspace";

function App() {
  return (
    <div className="App">
        <Menu />
        <Workspace />
    </div>
  );
}

export default App;

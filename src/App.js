import React from "react";
import { Router } from "@reach/router";
import { Coin } from "./Coin";
import "./App.css";

const EmptyCase = () => <></>;

function App() {
  return (
    <div className="App">
      <section className="App-content">
        <Router>
          <Coin sevenTails path="/coin/seventails" />
          <Coin path="/coin" />
          <Coin sevenTails showTrump path="/trump/seventails" />
          <Coin showTrump path="/trump" />
          <Coin sevenTails showShapes path="/shapes/seventails" />
          <Coin showShapes path="/shapes" />
          <EmptyCase path="/" />
        </Router>
      </section>
    </div>
  );
}

export default App;

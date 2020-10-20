import React from "react";
import { Root, Routes } from "react-static";
import "./App.css";

function App() {
  return (
    <Root>
      <div className="App">
        <section className="App-content">
          <React.Suspense fallback={() => <>loading...</>}>
            <Routes />
          </React.Suspense>
        </section>
      </div>
    </Root>
  );
}

export default App;

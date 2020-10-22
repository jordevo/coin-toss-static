import React from "react";
import { Helmet } from "react-helmet";
import { Root, Routes } from "react-static";
import "./App.css";

function App() {
  return (
    <Root>
      <Helmet>
        <script src="//cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.2/web-animations.min.js"></script>
      </Helmet>
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

import logo from "./logo.svg";
import "./App.css";
import { NcLexer } from "@ncstat/parser";
import SplitPane from "react-split-pane";

import InputForm from "./InputForm";

const lexer = new NcLexer({
  newlineTokens: true
});

const input = `%
O1234 (TEST PROGRAM)

N43 ( #14 [.182"] DRILL )
T43 M6
G0 G90 G54 X.75 Y.19
S10495 M3
M50 (TSC COOLANT ON)
G43 H#518 Z1. T44
G98 G81 Z-.5631 R.1 F83.96
X5.
G80
M30
%`;

function App() {
  return (
    <div className="App">
      <SplitPane split="vertical" minSize={50} defaultSize={100}>
        <div>
          <InputForm />
        </div>

        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </SplitPane>
    </div>
  );
}

export default App;

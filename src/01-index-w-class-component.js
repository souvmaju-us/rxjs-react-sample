import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

import { from } from "rxjs";
import { map, filter, delay, mergeMap, tap } from "rxjs/operators";

// import App from "./App";
import "./styles.css";

const numberObservable = from([1, 2, 3, 4, 5]);
const squareNumbers = numberObservable.pipe(
  // tap(console.log),
  filter((val) => val > 2),
  mergeMap((val) => from([val]).pipe(delay(1000 * val))),
  map((val) => val * val)
);

class App extends React.Component {
  constructor() {
    super();
    this.state = { currentNumber: 0 };
  }

  componentDidMount() {
    this.subscription = squareNumbers.subscribe((result) => {
      this.setState({ currentNumber: result });
    });
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <p> Current number is : {this.state.currentNumber}</p>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);

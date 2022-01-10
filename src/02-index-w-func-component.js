import { StrictMode, useState, useEffect } from "react";
import ReactDOM from "react-dom";

// import App from "./App";
import "./styles.css";
import { from } from "rxjs";
import { map, filter, delay, mergeMap } from "rxjs/operators";
import React from "react";

let numberObservable = from([1, 2, 3, 4, 5]);
let squareNumbers = numberObservable.pipe(
  // tap(console.log),
  filter((val) => val > 2),
  mergeMap((val) => from([val]).pipe(delay(1000 * val))),
  map((val) => val * val)
);

const useObservable = (observable, setter) => {
  useEffect(() => {
    const subscription = observable.subscribe((result) => {
      setter(result);
    });

    return () => subscription.unsubscribe();
  }, [observable, setter]);
};

const App = () => {
  // constructor() {
  //   super();
  //   this.state = { currentNumber: 0 };
  // }
  const [currentNumber, setCurrentNumber] = useState(0);

  // componentDidMount() {
  //   this.subscription = squareNumbers.subscribe((result) => {
  //     this.setState({ currentNumber: result });
  //   });
  // }

  // componentWillUnmount() {
  //   this.subscription.unsubscribe();
  // }

  // useEffect(() => {
  //   const subscription = squareNumbers.subscribe((result) => {
  //     setCurrentNumber(result);
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);
  useObservable(squareNumbers, setCurrentNumber);

  // render() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p> Current number is : {currentNumber}</p>
    </div>
  );
  // }
};

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);

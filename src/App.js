import "./styles.css";
import { from } from "rxjs";
import { map, filter, delay, mergeMap, tap } from "rxjs/operators";
import React from "react";

let numberObservable = from([1, 2, 3, 4, 5]);
let squareNumbers = numberObservable.pipe(
  // tap(console.log),
  filter((val) => val > 2),
  map((val) => val * val),
  delay(0)
);

let subscription = squareNumbers.subscribe((result) => {
  console.log(result);
  // https://stackoverflow.com/a/66678860/8036898
  subscription.unsubscribe();
});

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    );
  }
}

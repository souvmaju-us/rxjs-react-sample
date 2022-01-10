import { StrictMode } from "react";
import ReactDOM from "react-dom";

import { from } from "rxjs";
import { map, filter, delay, tap } from "rxjs/operators";

import "./styles.css";

const numberObservable = from([1, 2, 3, 4, 5]);
const squareNumbers = numberObservable.pipe(
  // tap(console.log),
  filter((val) => val > 2),
  map((val) => val * val),
  delay(0)
);

const subscription = squareNumbers.subscribe((result) => {
  console.log(result);
  // https://stackoverflow.com/a/66678860/8036898
  subscription.unsubscribe();
});

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);

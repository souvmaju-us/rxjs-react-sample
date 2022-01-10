// SOURCE:- https://www.youtube.com/watch?v=Urv82SGIu_0

import React, { StrictMode, useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { from, BehaviorSubject } from "rxjs";
import {
  filter,
  mergeMap,
  debounceTime,
  distinctUntilChanged
} from "rxjs/operators";

import "./styles.css";

const getPokemonbyName = async (name) => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=1118");
  const { results } = await res.json();
  return results.filter((pokemon) => pokemon.name.includes(name));
};

const searchSubject = new BehaviorSubject("");
const searchResultObservable = searchSubject.pipe(
  filter((val) => val.length > 1),
  debounceTime(750),
  distinctUntilChanged(),
  mergeMap((val) => from(getPokemonbyName(val)))
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
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useObservable(searchResultObservable, setResults);

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setSearch(newValue);
    searchSubject.next(newValue);
  };

  // render() {
  return (
    <div className="App">
      <div>SOURCE:- https://www.youtube.com/watch?v=Urv82SGIu_0</div>
      <h1>Hello Pokémon Finder</h1>
      <h2>Start typing to see some magic happen!</h2>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearchChange}
      />
      {/* <div>{JSON.stringify(results, null, 2)}</div> */}
      {results.map((pokemon) => (
        <div key={pokemon.name}>{pokemon.name}</div>
      ))}
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

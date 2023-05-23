import React from "react";

// Define the shape of the app state
type AppState = {
  mode: string;
};

/* This logic allows the app to determine the initial mode based on the user's preferences
   or the stored mode in the local storage. */

// Set the initial state of the app
const initialState: AppState = {
  // the mode property represents the current mode of the app (either "dark" or "light").
  mode: localStorage.getItem("mode") // checks if there is a stored mode in the local storage
    ? // If it exists,
      localStorage.getItem("mode")! //it is assigned to the mode property.
    : //If there is no stored mode in the local storage,
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches // checks if the user's preferred color scheme is dark
    ? // If it matches,
      "dark" // the mode is set to "dark"
    : "light", // Otherwise, it is set to "light".
};

// Define the action types
type Action = { type: "SWITCH_MODE" };

// Define the reducer function
const reducer = (state: AppState, action: Action): AppState => {
  // determine the action type and perform the corresponding state update.
  switch (action.type) {
    case "SWITCH_MODE":
      // Toggle between dark and light mode
      return { mode: state.mode === "dark" ? "light" : "dark" };
    // If the dispatched action type doesn't match any case,
    default:
      // the current state is returned unchanged.
      return state;
  }
};

// Define the default dispatch function ( is used when there is no specific dispatch function provided in the context )
const defaultDispatch: React.Dispatch<Action> = () => initialState;

// Create a context for the store
const Store = React.createContext({
  state: initialState, // provides a default value that includes the initial state
  dispatch: defaultDispatch, // provides a default dispatch function
});

// Create a provider component for the store
const StoreProvider = (
  props: React.PropsWithChildren<{}> // allows passing children components to the provider
) => {
  // Use the useReducer hook to manage state and dispatch
  const [
    state, // current state
    dispatch, // dispatch function
  ] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer, // reducer function
    initialState // initialState
  );

  const value = { state, dispatch };

  /* This provider component can be used to wrap the components
     that need access to the state and dispatch function provided by the context. */

  return <Store.Provider value={value} {...props} />;
};

export { Store, StoreProvider };

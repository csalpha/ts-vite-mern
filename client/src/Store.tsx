import React from "react";
import { Cart, CartItem, ShippingAddress } from "./types/Cart";
import { UserInfo } from "./types/UserInfo";

// Define the shape of the app state
type AppState = {
  mode: string;
  cart: Cart;
  userInfo?: UserInfo;
};

/* This logic allows the app to determine the initial mode based on the user's preferences
   or the stored mode in the local storage. */

// Set the initial state of the app
const initialState: AppState = {
  userInfo: localStorage.getItem("userInfo") // Checks if there is a stored value for the key "userInfo" in the localStorage
    ? JSON.parse(localStorage.getItem("userInfo")!) // If there is a stored value, it parses the value from JSON format to an object
    : null, // If there is no stored value, it assigns null to the 'userInfo' property
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
  cart: {
    // Retrieve cart items from local storage or initialize an empty array
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : [],
    // Retrieve shipping address from local storage or initialize an empty object
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress")!)
      : {},
    // Retrieve payment method from local storage or set it to "PayPal" by default
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")!
      : "PayPal",
    // Initialize prices to 0
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
};

// Define the action type
type Action =
  | { type: "SWITCH_MODE" }
  | { type: "CART_ADD_ITEM"; payload: CartItem }
  | { type: "CART_REMOVE_ITEM"; payload: CartItem }
  | { type: "USER_SIGNIN"; payload: UserInfo }
  | { type: "USER_SIGNOUT" }
  | { type: "SAVE_SHIPPING_ADDRESS"; payload: ShippingAddress }
  | { type: "SAVE_PAYMENT_METHOD"; payload: string };

// Define the reducer function
const reducer = (state: AppState, action: Action): AppState => {
  // determine the action type and perform the corresponding state update.
  switch (action.type) {
    case "SWITCH_MODE":
      localStorage.setItem("mode", state.mode === "dark" ? "light" : "dark"); // Setting the "mode" value in localStorage to "light" if the current mode is "dark", and vice versa
      return { ...state, mode: state.mode === "dark" ? "light" : "dark" }; // Creating a new object by spreading the state object and updating the mode property with the switched mode value

    case "CART_ADD_ITEM":
      // Get the new item from the action payload
      const newItem = action.payload;

      // Check if the item already exists in the cart
      const existItem = state.cart.cartItems.find(
        (item: CartItem) => item._id === newItem._id
      );

      // Update the cart items based on whether the item exists or not
      const cartItems = existItem
        ? // If the item already exists, update the existing item with the new item
          state.cart.cartItems.map((item: CartItem) =>
            item._id === existItem._id ? newItem : item
          )
        : // If the item doesn't exist, add the new item to the cart items
          [...state.cart.cartItems, newItem];

      // Update the cart items in the local storage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Return the updated state with the updated cart items
      return { ...state, cart: { ...state.cart, cartItems } };
    case "CART_REMOVE_ITEM": {
      // Filter out the item to be removed from the cartItems array
      const cartItems = state.cart.cartItems.filter(
        (item: CartItem) => item._id !== action.payload._id
      );

      // Update the cartItems in localStorage
      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      // Return a new state object with updated cartItems
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload }; // Updates the state by merging the existing 'state' object with a new 'userInfo' property taken from the 'action' payload

    case "USER_SIGNOUT":
      return {
        mode:
          window.matchMedia && // Sets the 'mode' property of the state based on the user's preferred color scheme (dark or light)
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light",
        cart: {
          cartItems: [], // Resets the cart items to an empty array
          paymentMethod: "PayPal", // Resets the payment method to "PayPal"
          shippingAddress: {
            fullName: "", // Resets the full name in the shipping address to an empty string
            address: "", // Resets the address in the shipping address to an empty string
            postalCode: "", // Resets the postal code in the shipping address to an empty string
            city: "", // Resets the city in the shipping address to an empty string
            country: "", // Resets the country in the shipping address to an empty string
          },
          itemsPrice: 0, // Resets the total price of items in the cart to 0
          shippingPrice: 0, // Resets the shipping price to 0
          taxPrice: 0, // Resets the tax price to 0
          totalPrice: 0, // Resets the total price of the cart to 0
        },
      };
    case "SAVE_SHIPPING_ADDRESS":
      // Update the state by merging the new shipping address into the cart object
      return {
        ...state, // Spread the current state object
        cart: {
          ...state.cart, // Spread the current cart object
          shippingAddress: action.payload, // Update the shippingAddress property with the new payload
        },
      };
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state, // Creating a new object by spreading the state object
        cart: { ...state.cart, paymentMethod: action.payload }, // Updating the cart property of the new object with the updated paymentMethod value from the action payload
      };
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

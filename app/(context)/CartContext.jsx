"use client";
import React, {
  createContext,
  use,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import Commerce from "@chec/commerce.js";

const CartContext = createContext();
const CartDispatchContext = createContext();

const SET_CART = "SET_CART";
const RESET = "RESET";

const initialState = {
  total_items: 0,
  total_unique_items: 0,
  line_items: [],
  subtotal: {},
  hosted_checkout_url: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CART:
      return { ...state, ...action.payload };
    case RESET:
      return initialState;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const CartProvider = ({ children }) => {
  const commerce = new Commerce(process.env.NEXT_PUBLIC_CHEC_PUBLIC_KEY);
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const cart = await commerce.cart.retrieve();

      dispatch({ type: SET_CART, payload: cart });
    } catch (error) {
      console.log(error);
    }
  };

  const setCart = async (payload) => dispatch({ type: SET_CART, payload });

  const reset = async () => dispatch({ type: RESET });

  return (
    <CartDispatchContext.Provider value={{ setCart, reset }}>
      <CartContext.Provider
        value={{
          open,
          setOpen,
          ...state,
        }}
      >
        {children}
      </CartContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export const useCartDispatch = () => useContext(CartDispatchContext);

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log("localstorage", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log("localstorage", error);
    }
  };

  return [storedValue, setValue];
}

export default CartProvider;

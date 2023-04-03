"use client";
import supabase from "@/utils/supabase";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [cartProducts, setCartProducts] = useLocalStorage("cartProducts", []);
  const [total, setTotal] = useState(0);
  const [shippingCost, setShippingCost] = useLocalStorage("shippingCost", 0);
  const [serverProducts, setServerProducts] = useLocalStorage(
    "serverProducts",
    []
  );

  useEffect(() => {
    async function getProducts() {
      let { data: product_item, error } = await supabase
        .from("product_item")
        .select("*");

      setServerProducts(product_item);
    }

    getProducts();
  }, []);

  function getProductQuantity(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;
    if (!quantity) {
      return 0;
    }
    return quantity;
  }

  function addOneToCart(id) {
    const quantity = getProductQuantity(id);

    if (!quantity) {
      setCartProducts([
        ...cartProducts,
        {
          id,
          quantity: 1,
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity == 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }

  function deleteFromCart(id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id != id;
      })
    );
  }

  function getTotalCost() {
    let totalCost = 0;
    if (serverProducts) {
      cartProducts.map((cartItem) => {
        const item = serverProducts?.find(({ id }) => id === cartItem.id);

        totalCost += item.price * cartItem.quantity;
        setTotal(totalCost);
      });
    }

    return totalCost;
  }

  return (
    <CartContext.Provider
      value={{
        open,
        setOpen,
        total,
        cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
        shippingCost,
        setShippingCost,
        serverProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

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

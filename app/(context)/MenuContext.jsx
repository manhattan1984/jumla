"use client";
import React, { createContext, useContext, useState } from "react";

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <MenuContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);

export default MenuProvider;

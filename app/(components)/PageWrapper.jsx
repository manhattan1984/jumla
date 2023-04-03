"use client";
import React from "react";
import { motion as m } from "framer-motion";

const PageWrapper = ({ children }) => {
  return (
    <m.div
      className="min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {children}
    </m.div>
  );
};

export default PageWrapper;

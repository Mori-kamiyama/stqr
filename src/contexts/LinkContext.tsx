"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LinkContextType {
  links: string[];
  addLink: (link: string) => void;
}

const LinkContext = createContext<LinkContextType | undefined>(undefined);

export const LinkProvider = ({ children }: { children: ReactNode }) => {
  const [links, setLinks] = useState<string[]>([]);

  const addLink = (link: string) => {
    setLinks((prev) => [...prev, link]);
  };

  return (
    <LinkContext.Provider value={{ links, addLink }}>
      {children}
    </LinkContext.Provider>
  );
};

export const useLinks = () => {
  const context = useContext(LinkContext);
  if (context === undefined) {
    throw new Error("useLinks must be used within a LinkProvider");
  }
  return context;
};

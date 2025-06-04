"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface LinkItem {
  id: string;
  title: string;
  link: string;
  dueDate?: string;
  tags: string[];
}

interface LinkContextType {
  links: LinkItem[];
  addLink: (link: LinkItem) => void;
  removeLink: (id: string) => void;
}

const LinkContext = createContext<LinkContextType | undefined>(undefined);

export const LinkProvider = ({ children }: { children: ReactNode }) => {
  const [links, setLinks] = useState<LinkItem[]>([]);

  const addLink = (link: LinkItem) => {
    setLinks((prev) => [...prev, link]);
  };

  const removeLink = (id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <LinkContext.Provider value={{ links, addLink, removeLink }}>
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

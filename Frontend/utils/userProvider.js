import React, { createContext, useContext, useState } from 'react';

// 1. Create the UserContext
export const UserContext = createContext();

// 2. Create the Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null means not logged in

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
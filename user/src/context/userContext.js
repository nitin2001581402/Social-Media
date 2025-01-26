import React, { createContext, useState, useContext } from 'react';

// Create a Context for the user
const UserContext = createContext();

// Create a Provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Create a custom hook for using the UserContext
export function useUser() {
  return useContext(UserContext);
}

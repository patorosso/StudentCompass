"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

interface User {
  id: string;
  token: string;
  isLoaded: boolean;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const contextValue = useMemo(() => ({ user, setUser }), [user, setUser]); // wont re-render unnecessarily
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

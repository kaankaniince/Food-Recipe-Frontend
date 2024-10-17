import { createContext, useContext } from "react";

type UserContextType = {
    userId: string;
    isAuthenticated: boolean;
};

export const UserContext = createContext<UserContextType | null>(null);

// Create a custom hook to access the user context
export const useUserContext = () => useContext(UserContext);

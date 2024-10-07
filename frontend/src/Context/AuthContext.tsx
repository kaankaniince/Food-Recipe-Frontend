import {createContext, useContext, useState, ReactNode} from 'react';

// Define the shape of the context value
interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

// Create the context with a default value of null
const AuthContext = createContext<AuthContextType | null>(null);

// Define the props for the AuthProvider component
interface AuthProviderProps {
    children: ReactNode; // Ensure children is of type ReactNode
}

// AuthProvider component
export const AuthProvider = ({children}: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

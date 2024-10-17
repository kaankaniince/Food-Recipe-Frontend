import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
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

// Function to get a specific cookie by name
// @ts-ignore
const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null; // Returns the cookie value or null
};

// AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Check for the cookie on initial load
    useEffect(() => {
        const c = document.cookie;
        console.log(window)
        setIsAuthenticated(!!c); // Update state based on cookie presence
    }, []);

    // Simulated login function (replace with your actual login logic)
    const login = () => {
        setIsAuthenticated(true);
    };

    // Logout function connected to the backend
    const logout = async () => {
        try {
            await axios.post('http://localhost:8080/auth/logout', {}, { withCredentials: true });
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Failed to logout', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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

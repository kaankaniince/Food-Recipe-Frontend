// authContext.tsx

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
    isAuthenticated: boolean;
    loading: boolean; // Add loading state
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Loading starts as true

    // Check authentication status on page load
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('http://localhost:8080/auth/verify', { withCredentials: true });
                if (response.status === 200) {
                    setIsAuthenticated(true); // Authenticated
                } else {
                    setIsAuthenticated(false); // Not authenticated
                }
            } catch (error) {
                setIsAuthenticated(false); // Not authenticated on error
            } finally {
                setLoading(false); // Stop loading after check
            }
        };

        checkAuthStatus();
    }, []);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:8080/auth/logout', {}, { withCredentials: true });
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Failed to logout', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;

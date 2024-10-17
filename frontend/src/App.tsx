import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import { UserContext } from './Store/UserContext.tsx';
import AppRoutes from './routes/Routes.tsx';  // Yeni import

export default function App() {

    const userId = "currentUserId"; // This should come from your authentication logic
    const isAuthenticated = true; // This would be based on whether the user is logged in

    return (
        <UserContext.Provider value={{ userId, isAuthenticated }}>
            <MantineProvider theme={{
                breakpoints: {
                    xs: "0",
                    sm: "768",
                    md: "912", // Özel breakpoint
                    lg: "1200",
                    xl: "1440",
                },
            }}
                             defaultColorScheme='light'
            >
                <Notifications />
                <BrowserRouter>
                    {/* Yeni Route Yapısı */}
                    <AppRoutes />
                </BrowserRouter>
            </MantineProvider>
        </UserContext.Provider>
    );
}

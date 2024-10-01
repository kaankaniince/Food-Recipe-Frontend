import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {MantineProvider} from '@mantine/core';
import BasicAppShell from "./components/BasicAppShell.tsx";
import Home from "./pages/Home/Home.tsx";
import Favorites from "./pages/Favorites/Favorites.tsx";
import Recipes from "./pages/Recipes/Recipes.tsx";
import "@mantine/core/styles.css"
import Register from "./pages/Register/Register.tsx";
import SignIn from "./pages/SignIn/SignIn.tsx";
import Details from "./pages/Details/Details.tsx";
import AddRecipe from "./pages/AddRecipe/AddRecipe.tsx";
import '@mantine/dropzone/styles.css';
import Contact from "./pages/Contact/Contact.tsx";

export default function App() {
    return (
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
            <BrowserRouter>

                <Routes>
                    <Route element={<BasicAppShell/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/favorites" element={<Favorites/>}/>
                        <Route path="/recipes" element={<Recipes/>}/>
                        <Route path="/signin" element={<SignIn/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/details" element={<Details/>}/>
                        <Route path="/addRecipe" element={<AddRecipe/>}/>
                        <Route path="/contact" element={<Contact/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </MantineProvider>
    );
}

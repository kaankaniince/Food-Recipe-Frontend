import { Routes, Route } from 'react-router-dom';
import BasicAppShell from "../components/BasicAppShell.tsx";
import Home from "../pages/Home/Home.tsx";
import Favorites from "../pages/Favorites/Favorites.tsx";
import Recipes from "../pages/Recipes/Recipes.tsx";
import Register from "../pages/Register/Register.tsx";
import SignIn from "../pages/SignIn/SignIn.tsx";
import Details from "../pages/Details/Details.tsx";
import AddRecipe from "../pages/AddRecipe/AddRecipe.tsx";
import Contact from "../pages/Contact/Contact.tsx";
import EditRecipe from "../pages/AddRecipe/EditRecipe.tsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<BasicAppShell/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/favorites" element={<Favorites/>}/>
                <Route path="/recipes" element={<Recipes/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/details/:recipeId" element={<Details/>}/>
                <Route path="/addRecipe" element={<AddRecipe/>}/>
                <Route path="/editRecipe/:recipeId" element={<EditRecipe/>}/>
                <Route path="/contact" element={<Contact/>}/>
            </Route>
        </Routes>
    );
}

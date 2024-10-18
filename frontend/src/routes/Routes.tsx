import {Routes, Route} from 'react-router-dom';
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
import ProtectedRoute from '../Store/ProtectedRoute.tsx';

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<BasicAppShell/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/favorites" element={
                    <ProtectedRoute>
                        <Favorites/>
                    </ProtectedRoute>
                }/>
                <Route path="/recipes" element={
                    <ProtectedRoute>
                        <Recipes/>
                    </ProtectedRoute>
                }/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/details/:recipeId" element={<Details/>}/>
                <Route path="/addRecipe" element={
                    <ProtectedRoute>
                        <AddRecipe/>
                    </ProtectedRoute>
                }/>
                <Route path="/editRecipe/:recipeId" element={
                    <ProtectedRoute>
                        <EditRecipe/>
                    </ProtectedRoute>
                }/>
                <Route path="/contact" element={<Contact/>}/>
            </Route>
        </Routes>
    );
}

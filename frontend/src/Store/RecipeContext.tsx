import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

// Recipe context oluşturma
interface RecipeContextProps {
    recipe: any;
    fetchRecipe: (id: string) => Promise<void>;
    clearRecipe: () => void;
}

const RecipeContext = createContext<RecipeContextProps | undefined>(undefined);

// RecipeProvider bileşeni
export const RecipeProvider = ({ children }: { children: ReactNode }) => {
    const [recipe, setRecipe] = useState(null);

    const fetchRecipe = async (id: string) => {
        try {
            const response = await axios.get(`http://localhost:8080/recipes/${id}`);
            setRecipe(response.data);
        } catch (error) {
            console.error("Error fetching recipe", error);
        }
    };
    const clearRecipe = () => {
        setRecipe(null)
    }

    return (
        <RecipeContext.Provider value={{ recipe, fetchRecipe,clearRecipe }}>
            {children}
        </RecipeContext.Provider>
    );
};

// useRecipeContext Hook'u
export const useRecipeContext = () => {
    const context = useContext(RecipeContext);
    if (!context) {
        throw new Error("useRecipeContext must be used within a RecipeProvider");
    }
    return context;
};

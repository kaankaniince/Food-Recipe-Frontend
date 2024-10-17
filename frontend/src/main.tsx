import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {AuthProvider} from "./Store/AuthContext.tsx";
import {RecipeProvider} from "./Store/RecipeContext.tsx";

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <RecipeProvider>
            <App/>
    </RecipeProvider>
    </AuthProvider>
)

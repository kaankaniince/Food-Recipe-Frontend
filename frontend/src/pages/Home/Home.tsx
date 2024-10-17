import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../../Store/UserContext.tsx";
import CardComponent from "../../components/Card/CardComponent.tsx";
import Search from "../../components/Search/Search.tsx";
import CardCarousel from "../../components/Carousels/CardCarousel.tsx";
import PaginationComponent from "../../components/Pagination/Pagination.tsx";
import './Home.css';

interface Recipe {
    _id: string;
    title: string;
    description: string;
    image: string;
    u_id: {
        userName: string;
    };
    createdAt: string;
}

export default function Home() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [ratings, setRatings] = useState<number[]>(Array(8).fill(0));
    const [searchTerm, setSearchTerm] = useState(""); // State to store search term
    const [currentPage, setCurrentPage] = useState(1); // State to track the current page
    const [sortOrder, setSortOrder] = useState("Newest"); // State to track sorting order
    const itemsPerPage = 8; // Display 8 cards per page

    const userContext = useUserContext();
    const userId = userContext?.userId;
    const isAuthenticated = userContext?.isAuthenticated;

    useEffect(() => {
        const fetchRecipesAndFavorites = async () => {
            try {
                const recipeResponse = await axios.get("http://localhost:8080/recipes");
                setRecipes(recipeResponse.data);

                if (isAuthenticated) {
                    const favoriteResponse = await axios.get(`http://localhost:8080/${userId}`, { withCredentials: true });
                    setFavorites(favoriteResponse.data.favorites.map((fav: any) => fav._id));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchRecipesAndFavorites();
    }, [userId, isAuthenticated]);

    const toggleFavorite = async (recipeId: string) => {
        if (!isAuthenticated) {
            alert("You need to log in to add favorites!");
            return;
        }

        const isFavorite = favorites.includes(recipeId);
        const url = isFavorite ? "http://localhost:8080/remove" : "http://localhost:8080/add";
        await axios.post(url, { userId, recipeId }, { withCredentials: true });

        setFavorites(isFavorite ? favorites.filter(id => id !== recipeId) : [...favorites, recipeId]);
    };

    // Sort recipes based on sort order
    const sortedRecipes = [...recipes].sort((a, b) => {
        if (sortOrder === "Newest") {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Sort by newest
        } else if (sortOrder === "Oldest") {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(); // Sort by oldest
        }
        return 0; // No other sorting options available now
    });



    // Filter recipes based on the search term
    const filteredRecipes = sortedRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

    // Get the recipes for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const recipesToDisplay = filteredRecipes.slice(startIndex, endIndex);

    return (
        <>
            <CardCarousel />
            <Search setSearchTerm={setSearchTerm} setSortOrder={setSortOrder} />
            <div className="grid">
                {recipesToDisplay.map((recipe, index) => (
                    <CardComponent
                        key={recipe._id}
                        recipe={recipe}
                        isFavorite={favorites.includes(recipe._id)}
                        onFavoriteToggle={toggleFavorite}
                        rating={ratings[index]}
                        onRatingChange={(value) => {
                            const updatedRatings = [...ratings];
                            updatedRatings[index] = value;
                            setRatings(updatedRatings);
                        }}
                    />
                ))}
            </div>
            {/* Pagination Component */}
            <PaginationComponent
                total={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </>
    );
}

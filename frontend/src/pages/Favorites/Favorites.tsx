import './Favorites.module.css';
import Search from "../../components/Search/Search.tsx";
import PaginationComponent from "../../components/Pagination/Pagination.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../../Store/UserContext.tsx";
import CardComponent from "../../components/Card/CardComponent.tsx";

type Recipe = {
    _id: string;
    image: string;
    title: string;
    description: string;
    u_id: {
        userName: string;
    };
    createdAt: string; // Assume you have a createdAt field in your recipe
};

export default function Favorites() {
    const [favorites, setFavorites] = useState<Recipe[]>([]);
    const [searchTerm, setSearchTerm] = useState(""); // Search term state
    const [currentPage, setCurrentPage] = useState(1); // State to track the current page
    const [sortOrder, setSortOrder] = useState("Newest"); // State for sorting order
    const itemsPerPage = 8; // Display 8 favorites per page

    const userContext = useUserContext();
    const userId = userContext?.userId;
    const isAuthenticated = userContext?.isAuthenticated;

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                if (isAuthenticated) {
                    const response = await axios.get(`http://localhost:8080/${userId}`, { withCredentials: true });
                    setFavorites(response.data.favorites);
                }
            } catch (error: any) {
                console.error("Error fetching favorites:", error.response?.data || error);
            }
        };
        fetchFavorites();
    }, [userId, isAuthenticated]);

    const toggleFavorite = async (recipeId: string) => {
        if (!isAuthenticated) {
            alert("You need to log in to remove favorites!");
            return;
        }

        try {
            const isFavorite = favorites.some(fav => fav._id === recipeId);
            const url = isFavorite ? "http://localhost:8080/remove" : "http://localhost:8080/add";

            await axios.post(url, { userId, recipeId }, { withCredentials: true });

            setFavorites(isFavorite
                ? favorites.filter(fav => fav._id !== recipeId) // Remove favorite
                : [...favorites]); // Keep the list unchanged if removal fails

        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    // Filter favorites based on search term
    const filteredFavorites = favorites.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort favorites based on selected order
    const sortedFavorites = [...filteredFavorites].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();

        return sortOrder === "Newest" ? dateB - dateA : dateA - dateB; // Sort by date
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(sortedFavorites.length / itemsPerPage);

    // Get the favorites for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const favoritesToDisplay = sortedFavorites.slice(startIndex, endIndex);

    return (
        <>
            <Search setSearchTerm={setSearchTerm} setSortOrder={setSortOrder} /> {/* Pass setSortOrder to Search component */}
            <div className="grid">
                {favoritesToDisplay.map((recipe) => (
                    <CardComponent
                        key={recipe._id}
                        recipe={recipe}
                        isFavorite={true}
                        onFavoriteToggle={toggleFavorite}
                        rating={0} // You can remove this if ratings are not used
                        onRatingChange={() => {}} // Optional if rating is not used
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

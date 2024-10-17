import { ActionIcon, Group, Modal, Button, Text } from '@mantine/core';
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react";
import { useNavigate } from 'react-router-dom';
import './Recipes.module.css';
import Search from "../../components/Search/Search.tsx";
import PaginationComponent from "../../components/Pagination/Pagination.tsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../../Store/UserContext.tsx";
import CardComponent from "../../components/Card/CardComponent.tsx";
import { notifications } from "@mantine/notifications";

type Recipe = {
    _id: string;
    image: string;
    title: string;
    description: string;
    u_id: {
        _id: string;
        userName: string;
    };
    createdAt:string;
};

export default function Recipes() {
    const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [ratings, setRatings] = useState<{ [key: string]: number }>({});
    const [searchTerm, setSearchTerm] = useState(""); // Search term state
    const [currentPage, setCurrentPage] = useState(1); // Pagination state
    const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState("Newest");
    const itemsPerPage = 8; // Number of recipes per page
    const userContext = useUserContext();
    const isAuthenticated = userContext?.isAuthenticated;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                if (isAuthenticated) {
                    const response = await axios.get("http://localhost:8080/userRecipes", { withCredentials: true });
                    setUserRecipes(response.data);
                }
            } catch (error: any) {
                console.error("Error fetching user recipes:", error.response?.data || error);
            }
        };
        fetchUserRecipes();
    }, [isAuthenticated]);

    const toggleFavorite = async (recipeId: string) => {
        try {
            if (favorites.includes(recipeId)) {
                await axios.post(`http://localhost:8080/removeFavorite`, { recipeId }, { withCredentials: true });
                setFavorites(favorites.filter(id => id !== recipeId));
            } else {
                await axios.post(`http://localhost:8080/addFavorite`, { recipeId }, { withCredentials: true });
                setFavorites([...favorites, recipeId]);
            }
        } catch (error: any) {
            console.error("Error toggling favorite:", error.response?.data || error);
        }
    };

    const handleRatingChange = (recipeId: string, newRating: number) => {
        setRatings(prevRatings => ({ ...prevRatings, [recipeId]: newRating }));
    };

    // Silme işlemine onay almak için modal açılır
    const openDeleteModal = (recipeId: string) => {
        setRecipeToDelete(recipeId);
        setDeleteModalOpen(true);
    };

    const handleDeleteRecipe = async () => {
        if (recipeToDelete) {
            try {
                await axios.delete(`http://localhost:8080/recipes/${recipeToDelete}`, { withCredentials: true });
                setUserRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== recipeToDelete));

                notifications.show({
                    title: 'Recipe Deleted',
                    message: 'The recipe has been successfully deleted.',
                    color: 'white',
                    icon: <IconTrash color="red" />,
                    autoClose: 2000,
                    position: 'bottom-right',
                });
                setDeleteModalOpen(false); // Modalı kapat
                setRecipeToDelete(null); // State'i sıfırla
            } catch (error: any) {
                console.error("Error deleting recipe:", error.response?.data || error);
            }
        }
    };

    const handleAddRecipeClick = () => {
        navigate('/addRecipe');
    };

    // Filter recipes based on search term
    const filteredRecipes = userRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedRecipes = [...filteredRecipes].sort((a, b) => {
        if (sortOrder === "Newest") {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
    });

    const totalPages = Math.ceil(sortedRecipes.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const recipesToDisplay = sortedRecipes.slice(startIndex, endIndex);

    return (
        <>
            <Search setSearchTerm={setSearchTerm}  setSortOrder={setSortOrder} /> {/* Pass setSearchTerm to Search component */}
            <div className="grid">
                {recipesToDisplay.map((recipe) => (
                    <CardComponent
                        key={recipe._id}
                        recipe={recipe}
                        isFavorite={favorites.includes(recipe._id)}
                        onFavoriteToggle={() => toggleFavorite(recipe._id)}
                        rating={ratings[recipe._id] || 0}
                        onRatingChange={(newRating) => handleRatingChange(recipe._id, newRating)}
                        isFavoriteVisible={false}
                    >
                        <Group>
                            <ActionIcon
                                variant="default"
                                radius="md"
                                size={36}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent navigating to the recipe page
                                    navigate(`/editRecipe/${recipe._id}`);
                                }}
                            >
                                <IconPencil stroke={1.5} color="#FF8C00" />
                            </ActionIcon>
                            <ActionIcon
                                variant="default"
                                radius="md"
                                size={36}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent navigating to the recipe page when deleting
                                    openDeleteModal(recipe._id);
                                }}
                            >
                                <IconTrash stroke={1.5} color="red" />
                            </ActionIcon>
                        </Group>
                    </CardComponent>
                ))}
            </div>

            <Modal
                opened={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Are you sure you want to delete this recipe?"
            >
                <Text>This action cannot be undone.</Text>
                <Group mt="lg" style={{ justifyContent: 'center' }}>
                    <Button variant="outline" color="gray" onClick={() => setDeleteModalOpen(false)}>
                        Cancel
                    </Button>
                    <Button color="red" onClick={handleDeleteRecipe}>
                        Delete
                    </Button>
                </Group>
            </Modal>

            <ActionIcon
                variant="filled"
                radius="xl"
                size={54}
                color="green"
                onClick={handleAddRecipeClick}
                style={{ position: 'fixed', bottom: '20px', right: '20px' }}
            >
                <IconPlus size={32} />
            </ActionIcon>

            {/* Pagination Component */}
            <PaginationComponent
                total={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </>
    );
}

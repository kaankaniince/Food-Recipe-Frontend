import {Card, Image, Text, Group, ActionIcon, Rating, Avatar, AspectRatio} from '@mantine/core';
import {IconHeart, IconHeartFilled, IconHeartBroken} from "@tabler/icons-react";
import './CardTable.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../Store/UserContext.tsx";
import {notifications} from "@mantine/notifications"; // Import the custom hook

type Recipe = {
    _id: string;
    image: string;
    title: string;
    description: string;
    u_id: {
        userName: string;
    };
};

function CardTable() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [ratings, setRatings] = useState<number[]>(Array(8).fill(0));
    const navigate = useNavigate();
    const userContext = useUserContext(); // Check if userContext is null
    const userId = userContext?.userId; // Safely access userId
    const isAuthenticated = userContext?.isAuthenticated; // Get userId from context

    useEffect(() => {
        const fetchRecipesAndFavorites = async () => {
            try {
                console.log("User ID:", userId);
                console.log("Is Authenticated:", isAuthenticated);

                const recipeResponse = await axios.get("http://localhost:8080/recipes");
                setRecipes(recipeResponse.data);

                if (isAuthenticated) {
                    // Include credentials to ensure cookies are sent
                    const favoriteResponse = await axios.get(`http://localhost:8080/${userId}`, {withCredentials: true});
                    setFavorites(favoriteResponse.data.favorites.map((fav: any) => fav._id));
                }
            } catch (error: any) {
                if (error.response) {
                    console.error("Error fetching data:", error.response.data);
                } else {
                    console.error("Error fetching data:", error);
                }
            }
        };
        fetchRecipesAndFavorites();
    }, [userId, isAuthenticated]); // Add userId and isAuthenticated as dependencies

    const toggleFavorite = async (recipeId: string) => {
        if (!isAuthenticated) {
            alert("You need to log in to add favorites!");
            return;
        }

        try {
            const isFavorite = favorites.includes(recipeId);
            const url = isFavorite ? "http://localhost:8080/remove" : "http://localhost:8080/add";
            const response = await axios.post(url, {userId, recipeId}, {withCredentials: true});

            console.log('Favorite toggled successfully:', response.data);

            // Update favorites based on the action performed
            if (isFavorite) {
                setFavorites(favorites.filter(id => id !== recipeId));
                notifications.show({
                    title: 'Recipe removed from favorites',
                    message: `${recipes.find(recipe => recipe._id === recipeId)?.title} has been removed from your favorites.`,
                    color: 'white',
                    icon: <IconHeartBroken color="red" />,
                    autoClose: 2000,
                    position: 'bottom-right',
                });
            } else {
                setFavorites([...favorites, recipeId]);
                notifications.show({
                    title: 'Recipe added to favorites',
                    message: `${recipes.find(recipe => recipe._id === recipeId)?.title} has been added to your favorites.`,
                    color: 'white',
                    icon: <IconHeartFilled color="red" />,
                    autoClose: 2000,
                    position: 'bottom-right',
                });
            }
        } catch (error: any) {
            if (error.response) {
                console.error("Error toggling favorite:", error.response.data);
                alert(`Error: ${error.response.data}`); // Provide more context to the user
                notifications.show({
                    title: 'Error:',
                    message: `An error occurred while updating favorites for ${recipes.find(recipe => recipe._id === recipeId)?.title}.`,
                    color: 'red',
                    autoClose: 3000,
                    position: 'bottom-right',
                });
            } else {
                console.error("Error toggling favorite:", error);
                notifications.show({
                    title: 'Error',
                    message: 'An unexpected error occurred. Please try again later.',
                    color: 'red',
                    autoClose: 3000,
                    position: 'bottom-right',
                });
            }
        }
    };

    return (
        <div className="grid">
            {recipes.map((recipe, index) => (
                <Card
                    onClick={() => navigate(`/details/${recipe._id}`)}
                    key={recipe._id}
                    className="card"
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    style={{position: 'relative'}}
                >
                    <Card.Section>
                        <AspectRatio ratio={1920 / 1080}>
                            <Image
                                src={recipe.image}
                                width={300}
                                height={200}
                                alt={recipe.title}
                                fit="fill"
                            />
                        </AspectRatio>
                    </Card.Section>

                    <Group justify="space-between" mt="md" mb="xs">
                        <Text fw={500}>{recipe.title}</Text>
                        <Rating value={ratings[index]} onChange={(value) => {
                            const updatedRatings = [...ratings];
                            updatedRatings[index] = value;
                            setRatings(updatedRatings);
                        }}/>
                    </Group>
                    <Text size="sm" c="dimmed" lineClamp={2} mb="20">
                        {recipe.description}
                    </Text>
                    <Group justify="space-between" mt="auto">
                        <Group style={{margin: 0, gap: 0, align:"start" }}>
                            <Avatar
                                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                                size={24}
                                radius="xl"
                                style={{marginRight: 6}}
                            />
                            <Text fz="sm" inline>
                                {recipe.u_id?.userName}
                            </Text>
                        </Group>
                        <ActionIcon
                            className="like-icon"
                            variant="default"
                            radius="md"
                            size={36}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(recipe._id);
                            }}
                        >
                            {favorites.includes(recipe._id) ? (
                                <IconHeartFilled className="like" stroke={1.5} color="red"/>
                            ) : (
                                <IconHeart className="like" stroke={1.5}/>
                            )}
                        </ActionIcon>
                    </Group>
                </Card>
            ))}
        </div>
    );
}

export default CardTable;

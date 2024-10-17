import {Card, Image, Text, Group, ActionIcon, Rating, Avatar, AspectRatio} from '@mantine/core';
import {IconHeartFilled, IconHeartBroken} from "@tabler/icons-react";
import './CardFavorites.module.css';
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

function CardFavorites() {
    const [favorites, setFavorites] = useState<Recipe[]>([]); // Store the user's favorite recipes directly
    const [ratings, setRatings] = useState<number[]>(Array(8).fill(0)); // Ratings state for the displayed recipes
    const navigate = useNavigate();
    const userContext = useUserContext(); // Check if userContext is null
    const userId = userContext?.userId; // Safely access userId
    const isAuthenticated = userContext?.isAuthenticated; // Get userId and isAuthenticated from context

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                if (isAuthenticated) {
                    // Include credentials to ensure cookies are sent
                    const response = await axios.get(`http://localhost:8080/${userId}`, {withCredentials: true});
                    setFavorites(response.data.favorites); // Set the user's favorite recipes
                }
            } catch (error: any) {
                if (error.response) {
                    console.error("Error fetching favorites:", error.response.data);
                } else {
                    console.error("Error fetching favorites:", error);
                }
            }
        };
        fetchFavorites();
    }, [userId, isAuthenticated]); // Re-fetch favorites whenever userId or authentication status changes

    const toggleFavorite = async (recipeId: string) => {
        if (!isAuthenticated) {
            alert("You need to log in to add or remove favorites!");
            return;
        }

        try {
            const isFavorite = favorites.some(recipe => recipe._id === recipeId);
            const url = isFavorite ? "http://localhost:8080/remove" : "http://localhost:8080/add";
            const response = await axios.post(url, {userId, recipeId}, {withCredentials: true});
            console.log('Favorite toggled successfully:', response.data);

            // Update favorites based on the action performed
            if (isFavorite) {
                setFavorites(favorites.filter(recipe => recipe._id !== recipeId));
                notifications.show({
                    title: 'Recipe removed from favorites',
                    message: `${favorites.find(recipe => recipe._id === recipeId)?.title} has been removed from your favorites.`,
                    color: 'white',
                    icon: <IconHeartBroken color="red"/>,
                    autoClose: 2000,
                    position: 'bottom-right',
                });
            } else {
                // Fetch the newly added favorite recipe details
                const addedRecipe = await axios.get(`http://localhost:8080/recipes/${recipeId}`);
                setFavorites([...favorites, addedRecipe.data]);
                notifications.show({
                    title: 'Added to Favorites',
                    message: `${addedRecipe.data.title} has been added to your favorites!`,
                    color: 'white',
                    icon: <IconHeartFilled color="red"/>,
                    autoClose: 2000,
                    position: 'bottom-right',
                });
            }
        } catch (error: any) {
            if (error.response) {
                console.error("Error toggling favorite:", error.response.data);
                alert(`Error: ${error.response.data}`); // Provide more context to the user
                notifications.show({
                    title: 'Error',
                    message: `An error occurred: ${error.response.data}`,
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
            {favorites.map((recipe, index) => (
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
                    <Text size="sm" c="dimmed" lineClamp={2}>
                        {recipe.description}
                    </Text>
                    <Group justify="space-between" mt="xs">
                        <Group style={{margin: 0, gap: 0}}>
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
                            <IconHeartFilled className="like" stroke={1.5} color="red"/>
                        </ActionIcon>
                    </Group>
                </Card>
            ))}
        </div>
    );
}

export default CardFavorites;

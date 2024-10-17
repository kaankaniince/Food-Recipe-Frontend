import {Card, Image, Text, Group, ActionIcon, Rating, Avatar, AspectRatio} from '@mantine/core';
import {IconHeartFilled} from "@tabler/icons-react";
import './CardRecipes.module.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../../Store/UserContext.tsx"; // Import the custom hook

type Recipe = {
    _id: string;
    image: string;
    title: string;
    description: string;
    u_id: {
        _id: string;
        userName: string;
    };
};

function CardRecipes() {
    const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
    const [ratings, setRatings] = useState<number[]>(Array(8).fill(0));
    const navigate = useNavigate();
    const userContext = useUserContext(); // Check if userContext is null
    const isAuthenticated = userContext?.isAuthenticated; // Get userId and isAuthenticated from context

    useEffect(() => {
        const fetchUserRecipes = async () => {
            try {
                if (isAuthenticated) {
                    // Update the API URL to match the new route
                    const response = await axios.get(`http://localhost:8080/userRecipes`, {withCredentials: true});
                    setUserRecipes(response.data); // Set the user's recipes directly
                }
            } catch (error: any) {
                if (error.response) {
                    console.error("Error fetching user recipes:", error.response.data);
                } else {
                    console.error("Error fetching user recipes:", error);
                }
            }
        };
        fetchUserRecipes();
    }, [isAuthenticated]); // Re-fetch recipes whenever authentication status changes

    return (
        <div className="grid">
            {userRecipes.map((recipe, index) => (
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
                                // Implement favorite toggling logic here if needed
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

export default CardRecipes;

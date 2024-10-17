import { Card, Image, Text, Group, ActionIcon, Rating, Avatar, AspectRatio } from '@mantine/core';
import { IconHeart, IconHeartFilled, IconHeartBroken } from "@tabler/icons-react";
import './CardTable.css';
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

type CardComponentProps = {
    recipe: {
        _id: string;
        image: string; // Make image optional
        title: string;
        description: string;
        u_id: {
            userName: string;
        };
    };
    isFavorite: boolean;
    onFavoriteToggle: (recipeId: string) => void;
    rating: number;
    onRatingChange: (value: number) => void;
    isFavoriteVisible?: boolean;
    children?: React.ReactNode;
};

// @ts-ignore
function CardComponent({
                           recipe,
                           isFavorite,
                           onFavoriteToggle,
                           onRatingChange,
                           isFavoriteVisible = true,
                           children
                       }: CardComponentProps) {
    const navigate = useNavigate();
    const [averageRating, setAverageRating] = useState<number>(0);
    const [ratingCount, setRatingCount] = useState<number>(0); // To hold the count of ratings

    useEffect(() => {
        const fetchAverageRating = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/rating/${recipe._id}/average`);
                setAverageRating(response.data.averageRating);
                setRatingCount(response.data.ratingCount); // Fetching the count of ratings as well
            } catch (error) {
                console.error('Error fetching average rating:', error);
            }
        };

        fetchAverageRating();
    }, [recipe._id]);

    const handleFavoriteToggle = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        onFavoriteToggle(recipe._id);

        if (isFavorite) {
            notifications.show({
                title: 'Removed from favorites',
                message: `${recipe.title} has been removed from your favorites.`,
                color: 'white',
                icon: <IconHeartBroken color="red" />,
                autoClose: 2000,
                position: 'bottom-right',
            });
        } else {
            notifications.show({
                title: 'Added to favorites',
                message: `${recipe.title} has been added to your favorites.`,
                color: 'white',
                icon: <IconHeartFilled color="red" />,
                autoClose: 2000,
                position: 'bottom-right',
            });
        }
    }, [isFavorite, onFavoriteToggle, recipe.title]);

    return (
        <Card
            onClick={() => navigate(`/details/${recipe._id}`)}
            key={recipe._id}
            className="card"
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ position: 'relative' }}
        >
            <Card.Section>
                <AspectRatio ratio={1920 / 1080}>
                    <Image
                        src={`http://localhost:8080/${recipe.image}` || 'fallback-image-url.jpg'} // Use a fallback image if no image provided
                        width={300}
                        height={200}
                        alt={recipe.title}
                        fit="fill"
                    />
                </AspectRatio>
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{recipe.title}</Text>
                <Group>
                    <Rating fractions={4} value={averageRating} readOnly /> {/* Display average rating */}
                    <Text size="sm" ml={5}>({ratingCount})</Text>
                </Group>
            </Group>

            <Text size="sm" c="dimmed" lineClamp={2} mb="20">
                {recipe.description}
            </Text>

            <Group justify="space-between" mt="auto">
                <Group style={{ margin: 0, gap: 0 }}>
                    <Avatar
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                        size={24}
                        radius="xl"
                        style={{ marginRight: 6 }}
                    />
                    <Text fz="sm" inline>
                        {recipe.u_id?.userName}
                    </Text>
                </Group>

                {isFavoriteVisible ? (
                    <ActionIcon
                        className="like-icon"
                        variant="default"
                        radius="md"
                        size={36}
                        onClick={handleFavoriteToggle}
                    >
                        {isFavorite ? (
                            <IconHeartFilled className="like" stroke={1.5} color="red" />
                        ) : (
                            <IconHeart className="like" stroke={1.5} />
                        )}
                    </ActionIcon>
                ) : (
                    children
                )}
            </Group>
        </Card>
    );
}

export default CardComponent;

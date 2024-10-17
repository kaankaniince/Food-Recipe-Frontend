import { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Paper, Text, Title, Button, useMantineTheme } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './CardCarousel.module.css';
import '@mantine/carousel/styles.css';

interface Recipe {
    createdAt: string | number | Date;
    _id: string;
    image: string;
    title: string;
    description: string;
    u_id: {
        userName: string;
    };
}

interface CardProps {
    recipe: Recipe; // Adjust to use the Recipe type
}

function Card({ recipe }: CardProps) {
    const navigate = useNavigate();

    return (
        <Paper
            shadow="md"
            radius="md"
            style={{ backgroundImage: `url(http://localhost:8080/${recipe.image})` }}
            className={classes.card}
        >
            <div className={classes.textContainer}>
                <Title order={3} className={classes.title}>
                    {recipe.title}
                </Title>
                <Text className={classes.category} size="xs" lineClamp={2}>
                    {recipe.description}
                </Text>
            </div>
            <Button variant="white" color="dark" onClick={() => navigate(`/details/${recipe._id}`)}>
                Go to Recipe
            </Button>
        </Paper>
    );
}

function CardsCarousel() {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
    const [recipes, setRecipes] = useState<Recipe[]>([]); // Adjusted state type

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/recipes');
                const sortedRecipes = response.data.sort((a: Recipe, b: Recipe) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                setRecipes(sortedRecipes.slice(0, 8));
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, []);

    const slides = recipes.map((recipe) => ( // Directly use recipe instead of item
        <Carousel.Slide key={recipe._id}>
            <Card recipe={recipe} /> {/* Pass recipe as a prop */}
        </Carousel.Slide>
    ));

    return (
        <Carousel
            ml={mobile ? 10 : 20}
            mr={mobile ? 8 : 20}
            slideSize={mobile ? '100%' : '50%'}
            slideGap="sm"
            align="start"
            loop
            slidesToScroll={1}
            styles={{
                control: {
                    backgroundColor: 'whitesmoke',
                },
            }}
        >
            {slides}
        </Carousel>
    );
}

export default CardsCarousel;

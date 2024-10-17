import { Container, Grid, Group, TextInput, rem, Text, Textarea, NumberInput, Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useUserContext } from '../../Store/UserContext.tsx';

export default function AddRecipePage({ isEdit = false }: { isEdit?: boolean }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState<string[]>(['']); // For multiple ingredients
    const [instructions, setInstructions] = useState<string[]>(['']); // For multiple steps
    const [activeTime, setActiveTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [yieldAmount, setYieldAmount] = useState(1);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null); // For image preview
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); // Loading state
    const userContext = useUserContext();
    const isAuthenticated = userContext?.isAuthenticated;
    const userId = userContext?.userId; // Get actual user ID from context
    const navigate = useNavigate();
    const { recipeId } = useParams(); // Get recipe ID from URL

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }

        if (isEdit && recipeId) {
            fetchRecipeData();
        }

    }, [isAuthenticated, isEdit, navigate]);

    const fetchRecipeData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/recipes/${recipeId}`, { withCredentials: true });
            const recipe = response.data;

            setTitle(recipe.title);
            setDescription(recipe.description);
            setIngredients(recipe.ingredients);
            setInstructions(recipe.instructions);
            setActiveTime(recipe.activeTime);
            setTotalTime(recipe.totalTime);
            setYieldAmount(recipe.yield);
            setImagePreview(`http://localhost:8080/${recipe.image}`); // Use existing image for preview
        } catch (error) {
            console.error('Error fetching recipe:', error);
            setErrorMessage('Error loading recipe data.');
        }
    };

    const handleImageDrop = (files: File[]) => {
        if (files.length > 0) {
            setImage(files[0]);
            setImagePreview(URL.createObjectURL(files[0]));
            setErrorMessage(null);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();
        if (image) {
            formData.append('image', image);
        }

        formData.append('title', title);
        formData.append('description', description);
        formData.append('ingredients', JSON.stringify(ingredients));
        formData.append('instructions', JSON.stringify(instructions));
        formData.append('activeTime', activeTime.toString());
        formData.append('totalTime', totalTime.toString());
        formData.append('yield', yieldAmount.toString());
        // @ts-ignore

        try {
            let response;

            if (isEdit && recipeId) {
                // If editing, send a PUT request
                response = await axios.put(`http://localhost:8080/recipes/${recipeId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                });
                console.log('Recipe updated:', response.data);
            } else {
                // If adding, send a POST request
                response = await axios.post('http://localhost:8080/recipes', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                });
                console.log('Recipe added:', response.data);
            }

            navigate('/recipes');
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || 'Error adding or updating recipe';
            setErrorMessage(errorMsg);
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const handleInstructionChange = (index: number, value: string) => {
        const newInstructions = [...instructions];
        newInstructions[index] = value;
        setInstructions(newInstructions);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const addInstruction = () => {
        setInstructions([...instructions, '']);
    };

    const removeIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const removeInstruction = (index: number) => {
        setInstructions(instructions.filter((_, i) => i !== index));
    };

    return (
        <Container>
            <h1>{isEdit ? 'Edit Recipe' : 'Add Recipe'}</h1>
            <form onSubmit={handleSubmit}>
                <Grid>
                    <Grid.Col span={12}>
                        <Dropzone
                            onDrop={handleImageDrop}
                            onReject={(files) => {
                                setErrorMessage(`Rejected file(s): ${files[0].errors[0].message}`);
                                console.log('Rejected files', files);
                            }}
                            maxSize={5 * 1024 ** 2} // 5MB limit
                            accept={IMAGE_MIME_TYPE}
                            style={{
                                border: `2px dashed var(--mantine-color-gray-4)`,
                                borderRadius: rem(8),
                                padding: rem(20),
                                position: 'relative',
                            }}
                        >
                            <Group justify="center" gap="xl" mih={220} style={{pointerEvents: 'none'}}>
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{
                                            maxWidth: rem(420), // Set a maximum width for the image
                                            maxHeight: rem(400), // Set a maximum height for the image
                                            width: 'auto',
                                            height: 'auto',
                                            borderRadius: rem(8),
                                            objectFit: 'contain', // Ensures the image stays within the set dimensions
                                        }}
                                    />
                                ) : (
                                    <>
                                        <Dropzone.Accept>
                                            <IconUpload
                                                style={{
                                                    width: rem(52),
                                                    height: rem(52),
                                                    color: 'var(--mantine-color-blue-6)'
                                                }}
                                                stroke={1.5}
                                            />
                                        </Dropzone.Accept>
                                        <Dropzone.Reject>
                                            <IconX
                                                style={{
                                                    width: rem(52),
                                                    height: rem(52),
                                                    color: 'var(--mantine-color-red-6)'
                                                }}
                                                stroke={1.5}
                                            />
                                        </Dropzone.Reject>
                                        <Dropzone.Idle>
                                            <IconPhoto
                                                style={{
                                                    width: rem(52),
                                                    height: rem(52),
                                                    color: 'var(--mantine-color-dimmed)'
                                                }}
                                                stroke={1.5}
                                            />
                                            <div>
                                                <Text size="xl" inline>
                                                    Drag images here or click to select files
                                                </Text>
                                                <Text size="sm" color="dimmed" inline mt={7}>
                                                    Attach as many files as you like, each file should not exceed 5MB
                                                </Text>
                                            </div>
                                        </Dropzone.Idle>
                                    </>
                                )}
                            </Group>
                        </Dropzone>

                        {errorMessage && (
                            <Text color="red" size="sm" mt="sm">
                                {errorMessage}
                            </Text>
                        )}
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <TextInput
                            label="Title"
                            withAsterisk
                            value={title}
                            onChange={(event) => setTitle(event.currentTarget.value)}
                            placeholder="Title"
                            required
                        />
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Textarea
                            label="Description"
                            withAsterisk
                            value={description}
                            onChange={(event) => setDescription(event.currentTarget.value)}
                            placeholder="Description"
                            required
                        />
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Text size="lg">Instructions</Text>
                        {instructions.map((instruction, index) => (
                            <Group key={index} mb="sm">
                                <TextInput
                                    placeholder={`Step ${index + 1}`}
                                    value={instruction}
                                    onChange={(event) => handleInstructionChange(index, event.currentTarget.value)}
                                    required
                                />
                                {instructions.length > 1 && (
                                    <Button variant="filled" color="red" onClick={() => removeInstruction(index)}>
                                        Remove
                                    </Button>
                                )}
                            </Group>
                        ))}
                        <Button variant="outline" onClick={addInstruction}>
                            Add Instruction
                        </Button>
                    </Grid.Col>

                    <Grid.Col span={6}>
                        <Text size="lg">Ingredients</Text>
                        {ingredients.map((ingredient, index) => (
                            <Group key={index} mb="sm">
                                <TextInput
                                    placeholder={`Ingredient ${index + 1}`}
                                    value={ingredient}
                                    onChange={(event) => handleIngredientChange(index, event.currentTarget.value)}
                                    required
                                />
                                {ingredients.length > 1 && (
                                    <Button variant="filled" color="red" onClick={() => removeIngredient(index)}>
                                        Remove
                                    </Button>
                                )}
                            </Group>
                        ))}
                        <Button variant="outline" onClick={addIngredient}>
                            Add Ingredient
                        </Button>
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <NumberInput
                            label="Active Time (minutes)"
                            value={activeTime}
                            onChange={(value) => setActiveTime(Number(value) || 0)}
                            placeholder="Active Time"
                            required
                        />
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <NumberInput
                            label="Total Time (minutes)"
                            value={totalTime}
                            onChange={(value) => setTotalTime(Number(value) || 0)}
                            placeholder="Total Time"
                            required
                        />
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <NumberInput
                            label="Yield (servings)"
                            value={yieldAmount}
                            onChange={(value) => setYieldAmount(Number(value) || 1)}
                            placeholder="Yield"
                            required
                        />
                    </Grid.Col>

                    <Grid.Col span={12}>
                        <Button type="submit" variant="filled" color="blue" fullWidth loading={loading}>
                            {isEdit ? 'Update Recipe' : 'Add Recipe'}
                        </Button>
                    </Grid.Col>
                </Grid>
            </form>
        </Container>
    );
}

import {useState} from 'react';
import {Textarea, Button, Group, Paper, Rating} from '@mantine/core';
import {useUserContext} from "../../../Store/UserContext.tsx";
import axios from 'axios';
import {notifications} from '@mantine/notifications';
import {IconMessageDots} from "@tabler/icons-react";

interface AddCommentsProps {
    recipeId: string;
    onCommentAdded: () => Promise<void>; // Define the onCommentAdded prop
}

export default function AddComments({recipeId, onCommentAdded}: AddCommentsProps) {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0); // State to track rating value
    const userContext = useUserContext();
    const userId = userContext?.userId; // Safely access userId
    const isAuthenticated = userContext?.isAuthenticated;

    const handleCommentSubmit = async (e: any) => {
        e.preventDefault();

        // Check if user is authenticated before proceeding
        if (!isAuthenticated) {
            notifications.show({
                title: "Authentication Required",
                message: "You need to log in to add a comment.",
                color: "red",
                autoClose: 3000,
            });
            return;
        }

        try {
            // Send both comment and rating in a single request to the /comment-rating route
            // @ts-ignore
            const response = await axios.post(
                'http://localhost:8080/comment-rating', // Updated route to match backend
                {
                    u_id: userId, // User ID from context
                    f_id: recipeId, // Recipe ID
                    comment, // Pass the comment content
                    rating: rating || undefined, // Pass the rating value
                },
                {withCredentials: true}
            );

            // Notify the user that both rating and comment were added successfully
            notifications.show({
                title: "Comment and Rating Added",
                message: "Your comment and rating have been added successfully.",
                color: "green",
                icon: <IconMessageDots color="white"/>,
                autoClose: 3000,
            });

            // Call onCommentAdded prop function after successful submission
            await onCommentAdded();

            // Reset the comment input and rating value
            setComment('');
            setRating(0);
        } catch (error: any) {
            console.error("Error adding comment or rating:", error.response ? error.response.data : error);
            notifications.show({
                title: "Error",
                message: "Failed to add comment and rating. Please try again.",
                color: "red",
                autoClose: 3000,
            });
        }
    };

    return (
        <Paper style={{marginTop: '20px'}}>
            <form onSubmit={handleCommentSubmit}>
                <Textarea
                    placeholder="Add your comment here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
                <Group mt="md">
                    <Rating
                        value={rating}
                        onChange={setRating} // Handle rating selection
                        fractions={4} // Allow fractional ratings
                        size="lg"
                    />
                </Group>
                <Group mt="md">
                    <Button type="submit">Submit Comment</Button>
                </Group>
            </form>
        </Paper>
    );
}

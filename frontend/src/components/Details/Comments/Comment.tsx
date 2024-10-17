import React, { useState } from 'react';
import { Text, Avatar, Group, TypographyStylesProvider, Paper, Rating, ActionIcon, TextInput, Button } from '@mantine/core';
import { IconTrash, IconPencil, IconCheck, IconX } from "@tabler/icons-react";
import classes from './Comment.module.css';
import axios from 'axios';

type CommentProps = {
    c_id: string;
    userName: string;
    timestamp: string;
    rating: number;
    content: string;
    onDelete: (id: string) => void;
    onUpdate: (id: string, newContent: string, newRating: number) => void;
};

export default function Comment({ c_id, userName, timestamp, rating, content, onDelete, onUpdate }: CommentProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);
    const [editedRating, setEditedRating] = useState(rating);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/comment-rating/${c_id}`, { withCredentials: true });
            onDelete(c_id);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedContent(content);
        setEditedRating(rating);
    };

    const handleSaveEdit = async () => {
        try {
            await axios.put(`http://localhost:8080/comment/${c_id}`,
                { comment: editedContent, rating: editedRating },
                { withCredentials: true }
            );
            onUpdate(c_id, editedContent, editedRating);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    return (
        <Paper withBorder radius="md" className={classes.comment}>
            <Group>
                <Avatar
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
                    alt={userName}
                    radius="xl"
                />
                <div>
                    <Text fz="sm">{userName}</Text>
                    <Text fz="xs" c="dimmed">
                        {new Date(timestamp).toLocaleString('en-US')}
                    </Text>
                </div>
                {isEditing ? (
                    <Rating
                        className={classes.rating}
                        value={editedRating}
                        onChange={(value) => setEditedRating(value)}
                        fractions={2}
                    />
                ) : (
                    <Rating className={classes.rating} value={rating} readOnly fractions={4} />
                )}

                {isEditing ? (
                    <>
                        <ActionIcon color="green" onClick={handleSaveEdit}>
                            <IconCheck size={18} />
                        </ActionIcon>
                        <ActionIcon color="red" onClick={handleCancelEdit}>
                            <IconX size={18} />
                        </ActionIcon>
                    </>
                ) : (
                    <>
                        <ActionIcon color="#FF8C00" onClick={handleEdit}>
                            <IconPencil size={18} />
                        </ActionIcon>
                        <ActionIcon color="red" onClick={handleDelete}>
                            <IconTrash size={18} />
                        </ActionIcon>
                    </>
                )}
            </Group>
            <TypographyStylesProvider className={classes.body}>
                {isEditing ? (
                    <TextInput
                        value={editedContent}
                        onChange={(event) => setEditedContent(event.currentTarget.value)}
                        className={classes.content}
                    />
                ) : (
                    <div className={classes.content}>{content}</div>
                )}
            </TypographyStylesProvider>
        </Paper>
    );
}
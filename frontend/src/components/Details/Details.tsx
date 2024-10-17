import {
    Card,
    Container,
    Grid,
    Image,
    Divider,
    Avatar,
    Text,
    ActionIcon,
    rem,
    ScrollArea,
    AspectRatio
} from "@mantine/core";
import TimelineComponent from "./Timeline/Timeline.tsx";
import TabContents from "./TabContents/TabContents.tsx";
import Comment from "./Comments/Comment.tsx";
import AddComments from "./Comments/addComments.tsx"
import {IconAlarm, IconClock, IconHeart, IconUsers, IconHeartFilled, IconHeartBroken} from "@tabler/icons-react";
import {useMediaQuery} from "@mantine/hooks";
import {useParams} from "react-router-dom";
import {useRecipeContext} from "../../Store/RecipeContext";
import {useEffect, useState} from "react";
import axios from "axios";
import {notifications} from "@mantine/notifications";
import {useUserContext} from "../../Store/UserContext";

export default function DetailsComponents() {
    const {recipeId} = useParams();
    const {recipe, fetchRecipe, clearRecipe} = useRecipeContext();
    const isMobile = useMediaQuery('(max-width: 912px)');
    const [isFavorite, setIsFavorite] = useState(false);
    const userContext = useUserContext(); // Check if userContext is null
    const userId = userContext?.userId; // Safely access userId
    const isAuthenticated = userContext?.isAuthenticated;
    const [comments, setComments] = useState<CommentType[]>([])

    interface CommentType {
        _id: string;
        u_id: {
            userName: string;
        };
        createdAt: string;
        r_id?: {
            rating: number | any;
        } | null;
        comment: string;
    }

    useEffect(() => {
        if (recipeId) {
            fetchRecipe(recipeId);
        }
    }, [recipeId, fetchRecipe]);

    useEffect(() => {
        return clearRecipe()
    }, []);

    useEffect(() => {
        if (recipeId && userId && isAuthenticated) {
            const fetchFavoriteStatus = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/${userId}`, {withCredentials: true});
                    setIsFavorite(response.data.favorites.some((fav: any) => fav._id === recipeId));
                } catch (error: any) {
                    console.error("Error fetching favorite status:", error.response ? error.response.data : error);
                }
            };
            fetchFavoriteStatus();
        }
    }, [recipeId, userId, isAuthenticated]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/comment/${recipeId}`);
            setComments(response.data); // Store comments in state
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    useEffect(() => {

        if (recipeId) {
            fetchComments();
        }
    }, [recipeId]);


    const handleCommentAdded = async () => {
        await fetchComments(); // Yorumlar güncelleniyor
    }

    const handleCommentDeleted = (c_id: string) => {
        setComments((prevComments) => prevComments.filter(comment => comment._id !== c_id));
    };

    const handleCommentUpdated = (c_id: string, newContent: string, newRating: number) => {
        setComments((prevComments) =>
            prevComments.map(comment =>
                comment._id === c_id
                    ? {
                        ...comment,
                        comment: newContent,
                        r_id: { ...comment.r_id, rating: newRating }
                    }
                    : comment
            )
        );
    };

    const toggleFavorite = async () => {
        if (!isAuthenticated) {
            alert("You need to log in to add favorites!");
            return;
        }

        try {
            const url = isFavorite ? "http://localhost:8080/remove" : "http://localhost:8080/add";
            const response = await axios.post(url, {userId, recipeId}, {withCredentials: true});
            console.log("Favorite toggled successfully:", response.data);

            // Update the favorite state
            setIsFavorite(!isFavorite);

            // Show notification based on the action
            notifications.show({
                title: isFavorite ? "Recipe removed from favorites" : "Recipe added to favorites",
                message: `${recipe.title} has been ${isFavorite ? "removed from" : "added to"} your favorites.`,
                color: "white",
                icon: isFavorite ? <IconHeartBroken color="red"/> : <IconHeartFilled color="red"/>,
                autoClose: 2000,
                position: "bottom-right",
            });
        } catch (error: any) {
            console.error("Error toggling favorite:", error.response ? error.response.data : error);
            notifications.show({
                title: "Error",
                message: "An unexpected error occurred. Please try again later.",
                color: "red",
                autoClose: 3000,
                position: "bottom-right",
            });
        }
    };



    if (!recipe) return <div>Loading...</div>;

    // @ts-ignore
    // @ts-ignore
    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <>
            <Container fluid>
                <Grid>
                    <Grid.Col span={6}>
                        <AspectRatio ratio={1920 / 1080}>
                            <Image
                                radius="md"
                                src={`http://localhost:8080/${recipe.image}`}
                                fit="fill"
                                w="100%"
                                h="100%"
                            />
                        </AspectRatio>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Card
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder
                            style={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                textAlign: "center",
                                position: "relative",
                            }}
                        >
                            <h2
                                style={{margin: "0 0 10px 0", fontSize: isMobile ? "1rem" : "1.5rem",}}>
                                {recipe.title}
                            </h2>
                            {/* Mobilde kaydırma eklenecek */}
                            <ScrollArea
                                h={isMobile ? 50 : 100} // Mobilde daha düşük bir yükseklik veriliyor
                                scrollbarSize={6}
                                style={{margin: "0 0 20px 0"}}
                            >
                                {recipe.description}
                            </ScrollArea>
                            {/* Avatar kısmı sabit konumda kalacak */}
                            <Avatar
                                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png"
                                radius="sm"
                                style={{
                                    position: "absolute",
                                    bottom: 10,
                                    left: 10,
                                }}
                            />
                            <div style={{position: "absolute", bottom: 10, left: 50}}>
                                <Text fw={500}>{recipe.u_id?.userName}</Text>
                                <Text fz="xs" c="dimmed">
                                    {new Date(recipe.createdAt).toLocaleString('en-US')}
                                </Text>
                            </div>

                            {/* Kalp ikonu sabit konumda kalacak */}
                            <ActionIcon
                                variant="default"
                                radius="md"
                                color="gray"
                                style={{
                                    position: "absolute",
                                    bottom: 10,
                                    right: 10,
                                }}
                                onClick={toggleFavorite}
                            >
                                {isFavorite ? (
                                    <IconHeartFilled style={{width: rem(20), height: rem(20)}} color="red"
                                                     stroke={1.5}/>
                                ) : (
                                    <IconHeart style={{width: rem(20), height: rem(20)}} stroke={1.5}/>
                                )}
                            </ActionIcon>
                        </Card>
                    </Grid.Col>


                    <Grid.Col span={4}>
                        <Card
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder
                            style={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center", // Merkezde konumlandırma
                            }}
                        >
                            <div>
                                <IconAlarm size={30}/>
                            </div>
                            <div style={{marginBottom: "5px"}}>
                                Active Time
                            </div>
                            <div>
                                {recipe.activeTime} mins
                            </div>
                        </Card>

                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Card
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder
                            style={{
                                height: "100%", // Kutu yüksekliğini ayarlama
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <div>
                                <IconClock size={30}/></div>
                            <div style={{marginBottom: "5px"}}>
                                Total Time
                            </div>
                            <div>
                                {recipe.totalTime} mins
                            </div>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Card
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder
                            style={{
                                height: "100%", // Kutu yüksekliğini ayarlama
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <div>
                                <IconUsers size={30}/>
                            </div>
                            <div style={{marginBottom: "5px"}}>
                                Yield
                            </div>
                            <div>
                                {recipe.yield}
                            </div>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Divider my="md"/>

                        <h2>
                            Instructions
                        </h2>
                        <TimelineComponent instructions={recipe.instructions}/>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Divider my="md"/>

                        <h2>
                            Ingredients
                        </h2>
                        <TabContents ingredients={recipe.ingredients}/>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Divider my="md" />
                        <h2>Comments</h2>
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <Comment
                                    key={comment._id}
                                    c_id={comment._id}
                                    userName={comment.u_id?.userName}
                                    timestamp={comment.createdAt}
                                    rating={comment.r_id?.rating}
                                    content={comment.comment}
                                    onDelete={handleCommentDeleted}
                                    onUpdate={handleCommentUpdated}
                                />
                            ))
                        ) : (
                            <div>No comments yet. Be the first to comment!</div>
                        )}
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Divider my="md"/>
                        <h2>Add a Comment</h2>
                        <AddComments recipeId={recipeId} onCommentAdded={handleCommentAdded}/>
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    )
}
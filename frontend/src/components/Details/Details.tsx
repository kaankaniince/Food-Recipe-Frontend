import {Card, Container, Grid, Image, Divider, Avatar, Text, ActionIcon, rem, ScrollArea} from "@mantine/core";
import TimelineComponent from "./Timeline/Timeline.tsx";
import TabContents from "./TabContents/TabContents.tsx";
import Comment from "./Comments/Comment.tsx";
import {IconAlarm, IconClock, IconHeart, IconUsers} from "@tabler/icons-react";
import {useMediaQuery} from "@mantine/hooks";

export default function DetailsComponents() {
    const isMobile = useMediaQuery('(max-width: 912px)');

    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <>
            <Container fluid>
                <Grid>
                    <Grid.Col span={6}>
                        <Image
                            radius="md"
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                            fit="fill"
                            w="100%"
                            h="100%"
                        />
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
                                White calzones with marinara sauce
                            </h2>
                            {/* Mobilde kaydırma eklenecek */}
                            <ScrollArea
                                h={isMobile ? 50 : 100} // Mobilde daha düşük bir yükseklik veriliyor
                                scrollbarSize={6}
                                style={{margin: "0 0 20px 0"}}
                            >
                                Supermarket brands of ricotta contain stabilizers, which can give the cheese a gummy
                                texture when baked. Check the label and choose ricotta made with as few ingredients as
                                possible.
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
                                <Text fw={500}>Elsa Gardenowl</Text>
                                <Text fz="xs" c="dimmed">
                                    posted 34 minutes ago
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
                            >
                                <IconHeart
                                    style={{width: rem(20), height: rem(20)}}
                                    color={"red"}
                                    stroke={1.5}
                                />
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
                                20 mins
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
                                60 mins
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
                                2
                            </div>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Divider my="md"/>

                        <h2>
                            Instructions
                        </h2>
                        <TimelineComponent/>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Divider my="md"/>

                        <h2>
                            Ingredients
                        </h2>
                        <TabContents/>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Divider my="md"/>

                        <h2>
                            Comments
                        </h2>
                        <Comment/>
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    )
}
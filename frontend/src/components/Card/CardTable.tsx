import { Card, Image, Text, Group, ActionIcon, Rating, Avatar } from '@mantine/core';
import { IconHeart } from "@tabler/icons-react";
import { useState } from "react";
import './CardTable.css';
import { useNavigate } from 'react-router-dom';

function CardTable() {
    const [value, setValue] = useState(0);

    const navigate = useNavigate();


    return (
        <div className="grid">
            {[...Array(8)].map((_, index) => (
                <Card onClick={()=> navigate('/details')} key={index} className="card" shadow="sm" padding="lg" radius="md" withBorder style={{ position: 'relative' }}>
                    <Card.Section>
                        <Image
                            src={index % 2 === 0 ? "https://img.freepik.com/free-photo/photo-delicious-hamburger-isolated-white-background_125540-3378.jpg" : "https://img.freepik.com/free-photo/delicious-fried-chicken-plate_144627-27380.jpg"}
                            height={160}
                            alt="Food"
                            fit="contain"
                        />
                    </Card.Section>
                    <Group justify="space-between" mt="md" mb="xs">
                        <Text fw={500}>{index % 2 === 0 ? "Hamburger" : "Fried Chicken"}</Text>
                        <Rating value={value} onChange={setValue} />
                    </Group>
                    <Text size="sm" c="dimmed">Description here...</Text>
                    <Group justify="space-between" mt="xs"> {/* Replace position with justify */}
                        <Group style={{ margin: 0 }}>
                            <Avatar
                                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
                                size={24}
                                radius="xl"
                                style={{ marginRight: 4 }} // Adjust margin here
                            />
                            <Text fz="sm" inline>
                                Bill Wormeater
                            </Text>
                        </Group>
                        <ActionIcon className="like-icon" variant="default" radius="md" size={36}>
                            <IconHeart className="like" stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </Card>
            ))}
        </div>
    );
}

export default CardTable;

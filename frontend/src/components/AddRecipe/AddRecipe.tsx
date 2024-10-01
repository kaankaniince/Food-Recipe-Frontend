import {Container, Grid, Group, TextInput, rem, Text, Textarea, NumberInput, Button} from '@mantine/core';
import {useState} from 'react';
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import {IconPhoto, IconUpload, IconX} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function AddRecipePage() {
    const [value, setValue] = useState('');
    const [number, setNumber] = useState<string | number>('');
    const navigate = useNavigate();

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <Container>
            <h1>Add Recipe</h1>
            <form>
                <Grid>
                    <Grid.Col span={12}>
                        <Dropzone
                            onDrop={(files) => console.log('accepted files', files)}
                            onReject={(files) => console.log('rejected files', files)}
                            maxSize={5 * 1024 ** 2}
                            accept={IMAGE_MIME_TYPE}
                            //{...props}
                            style={{
                                border: `2px dashed var(--mantine-color-gray-4)`, // Çerçeve ekliyoruz
                                borderRadius: rem(8), // Kenarları yuvarlatma
                                padding: rem(20), // İç boşluk ekleme
                            }}
                        >
                            <Group justify="center" gap="xl" mih={220} style={{pointerEvents: 'none'}}>
                                <Dropzone.Accept>
                                    <IconUpload
                                        style={{width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)'}}
                                        stroke={1.5}
                                    />
                                </Dropzone.Accept>
                                <Dropzone.Reject>
                                    <IconX
                                        style={{width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)'}}
                                        stroke={1.5}
                                    />
                                </Dropzone.Reject>
                                <Dropzone.Idle>
                                    <IconPhoto
                                        style={{width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)'}}
                                        stroke={1.5}
                                    />
                                </Dropzone.Idle>

                                <div>
                                    <Text size="xl" inline>
                                        Drag images here or click to select files
                                    </Text>
                                    <Text size="sm" c="dimmed" inline mt={7}>
                                        Attach as many files as you like, each file should not exceed 5mb
                                    </Text>
                                </div>
                            </Group>
                        </Dropzone>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <TextInput
                            label="Title"
                            withAsterisk
                            value={value}
                            onChange={(event) => setValue(event.currentTarget.value)}
                            placeholder="Title"
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Textarea
                            label="Description"
                            withAsterisk
                            value={value}
                            onChange={(event) => setValue(event.currentTarget.value)}
                            placeholder="Description"
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <TextInput
                            label="Ingredients"
                            withAsterisk
                            value={value}
                            onChange={(event) => setValue(event.currentTarget.value)}
                            placeholder="Ingredients"
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <TextInput
                            label="Step by Step Instrucitons"
                            withAsterisk
                            value={value}
                            onChange={(event) => setValue(event.currentTarget.value)}
                            placeholder="Step by Step Instrucitons"
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <NumberInput
                            label="Active Time"
                            withAsterisk
                            value={number}
                            onChange={setNumber}
                            placeholder="0"
                            min={0}
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <NumberInput
                            label="Total Time"
                            withAsterisk
                            value={number}
                            onChange={setNumber}
                            placeholder="0"
                            min={0}
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <NumberInput
                            label="Yield"
                            withAsterisk
                            value={number}
                            onChange={setNumber}
                            placeholder="1"
                            min={1}
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Button
                            type="submit"
                            size="sm"
                            mt="md"
                            onClick={() => navigate("/")}
                        >
                            Add Recipe
                        </Button>
                    </Grid.Col>
                </Grid>
            </form>
        </Container>
    )
}
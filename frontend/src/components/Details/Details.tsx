import {Container, Grid, Image } from "@mantine/core";

export default function DetailsComponents() {
    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <>
            <Container fluid >
                <Grid>
                    <Grid.Col span={6}>
                        <Image
                            radius="md"
                            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png"
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        Description
                    </Grid.Col>
                    <Grid.Col span={3}>
                        Active Time
                    </Grid.Col>
                    <Grid.Col span={3}>
                        Total Time
                    </Grid.Col>
                    <Grid.Col span={3}>
                        Yield
                    </Grid.Col>
                    <Grid.Col span={6}>
                        Step by step instructions
                    </Grid.Col>
                    <Grid.Col span={6}>
                        Ingredients
                    </Grid.Col>
                    <Grid.Col span={6}>
                        Comments
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    )
}
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import classes from './Register.module.css';

function Register() {
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/signin');
    };

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Create Your Account!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Already have an account?{' '}
                <Anchor size="sm" component="button" onClick={handleSignIn}>
                    Sign in
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Name" placeholder="Your name" required />
                <TextInput label="Email" placeholder="you@mantine.dev" required mt="md" />
                <PasswordInput label="Password" placeholder="Your password" required mt="md" />
                <Group justify="space-between" mt="lg">
                    <Checkbox label="I accept terms and conditions" />
                </Group>
                <Button fullWidth mt="xl">
                    Register
                </Button>
            </Paper>
        </Container>
    );
}

export default Register;

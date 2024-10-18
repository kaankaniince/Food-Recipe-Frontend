import { useState } from 'react';
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
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Store/AuthContext'; // Import the authentication context
import classes from './SignIn.module.css';

function SignIn() {
    const navigate = useNavigate();
    const { login } = useAuth(); // Get the login function
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleRegister = () => {
        navigate('/register');
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/auth/login',
                { email, password },
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' }  // Ensure correct headers
                }
            );

            if (response.status === 200) {
                login(); // Call login function from context
                navigate(from, { replace: true }); // Redirect on successful login
            }
        } catch (error) {
            setError('Invalid email or password. Please try again.');
            console.error('Login error:', error);
        }
    };

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button" onClick={handleRegister}>
                    Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                {error && (
                    <Text c="red" size="sm" ta="center" mt={5}>
                        {error}
                    </Text>
                )}
                <TextInput
                    label="Email"
                    placeholder="you@mantine.dev"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    required
                    mt="md"
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                />
                <Group justify="space-between" mt="lg">
                    <Checkbox label="Remember me" />
                    <Anchor component="button" size="sm">
                        Forgot password?
                    </Anchor>
                </Group>
                <Button fullWidth mt="xl" onClick={handleLogin}>
                    Sign in
                </Button>
            </Paper>
        </Container>
    );
}

export default SignIn;

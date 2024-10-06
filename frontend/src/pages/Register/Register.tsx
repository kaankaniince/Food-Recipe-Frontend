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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import classes from './Register.module.css';

function Register() {
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);

    const handleSignIn = () => {
        navigate('/signin');
    };

    // Define the event parameter type
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!termsAccepted) {
            // Handle terms not accepted case
            return alert("You must accept the terms and conditions.");
        }

        try {
            const response = await axios.post('http://localhost:8080/auth/register', {
                userName,
                email,
                password,
            });

            if (response.status === 200) {
                // Optionally, handle successful registration, e.g., navigate or show a success message
                navigate('/signin'); // Redirect to the sign-in page
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                // Handle error, e.g., show a message
                alert(error.response.data.message || 'Registration failed');
            } else {
                console.error('Error during registration:', error);
                alert('Registration failed due to a network error');
            }
        }
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

            <Paper withBorder shadow="md" p={30} mt={30} radius="md" component="form" onSubmit={handleSubmit}>
                <TextInput
                    label="Name"
                    placeholder="Your name"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.currentTarget.value)}
                />
                <TextInput
                    label="Email"
                    placeholder="you@mantine.dev"
                    required
                    mt="md"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    required
                    mt="md"
                    value={password}
                    onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <Group justify="space-between" mt="lg">
                    <Checkbox
                        label="I accept terms and conditions"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.currentTarget.checked)}
                    />
                </Group>
                <Button fullWidth mt="xl" type="submit">
                    Register
                </Button>
            </Paper>
        </Container>
    );
}

export default Register;

import {Group, UnstyledButton, useComputedColorScheme, useMantineColorScheme} from '@mantine/core';
import {FaFileSignature, FaHeart, FaHome, FaMoon, FaSignInAlt, FaSignOutAlt, FaSun} from 'react-icons/fa';
import {GiMeal} from 'react-icons/gi';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../Store/AuthContext.tsx'; // Import the authentication context
import classes from './Header.module.css';

function Header() {
    const {isAuthenticated, logout} = useAuth(); // Get authentication state and logout function
    let navigate = useNavigate();
    const {setColorScheme} = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light');

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <Group h="100%" px="xl" justify="space-between" style={{flex: 1}}>
            <Group>
                <h3 style={{color: 'orangered', cursor: 'pointer'}} onClick={() => navigate('/')}>
                    ****'s Recipes
                </h3>
            </Group>

            {/*might not need this*/}
            <Group hiddenFrom={"md"}></Group>

            <Group gap="md" style={{flex: 1, justifyContent: 'center'}} visibleFrom="md">
                <UnstyledButton className={classes.control} onClick={() => navigate('/')}>
                    <FaHome size={14}/> Home
                </UnstyledButton>
                <UnstyledButton className={classes.control} onClick={() => navigate('/favorites')}>
                    <FaHeart size={14} style={{color: 'red'}}/> Favorites
                </UnstyledButton>
                <UnstyledButton className={classes.control} onClick={() => navigate('/recipes')}>
                    <GiMeal size={14}/> Recipes
                </UnstyledButton>
            </Group>

            <Group visibleFrom={"md"}>
                <UnstyledButton size="xs" onClick={toggleColorScheme}>
                    {computedColorScheme === 'dark' ? <FaSun size={14}/> : <FaMoon size={14}/>}
                </UnstyledButton>
                {!isAuthenticated ? (
                    <>
                        <UnstyledButton className={`${classes.control} ${classes.signIn} ${classes.rounded}`}
                                        onClick={() => navigate('/SignIn')}>
                            <FaSignInAlt size={14}/> Sign In
                        </UnstyledButton>
                        <UnstyledButton className={`${classes.control} ${classes.rounded} ${classes.signUp}`}
                                        onClick={() => navigate('/register')}>
                            <FaFileSignature size={14}/> Sign Up
                        </UnstyledButton>
                    </>
                ) : (
                    <UnstyledButton className={`${classes.control} ${classes.signOut} ${classes.rounded}`}
                                    onClick={logout}>
                        <FaSignOutAlt size={14}/> Sign Out
                    </UnstyledButton>
                )}
            </Group>
        </Group>
    );
}

export default Header;

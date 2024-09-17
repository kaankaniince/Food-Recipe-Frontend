import { Group, UnstyledButton } from '@mantine/core';
import { FaHeart, FaHome, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import classes from './Header.module.css';

function Header() {

    return (
        <Group h="100%" px="md" justify="space-between" style={{ flex: 1 }}>
            <Group>
                <h3 style={{color:"orangered"}}>Semra's Recipes</h3>
            </Group>

            <Group gap="md" style={{ flex: 1, justifyContent: 'center' }} visibleFrom="sm">
                <UnstyledButton className={classes.control}><FaHome size={14} /> Home</UnstyledButton>
                <UnstyledButton className={classes.control}><FaHeart size={14} style={{ color: "red" }} /> Favorites</UnstyledButton>
                <UnstyledButton className={classes.control}><GiMeal size={14} /> Recipes</UnstyledButton>
            </Group>
            <Group>
                <UnstyledButton className={`${classes.control} ${classes.rounded}`}><FaSignInAlt size={14} /> Sign In</UnstyledButton>
                <UnstyledButton className={`${classes.control} ${classes.signOut} ${classes.rounded}`}><FaSignOutAlt size={14} /> Sign Out</UnstyledButton>
            </Group>
        </Group>
    );
}

export default Header;

import { UnstyledButton } from '@mantine/core';
import { FaHeart, FaHome } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import classes from './Navbar.module.css';

function Navbar() {
    return (
        <>
            <UnstyledButton className={classes.control}><FaHome size={14} /> Home</UnstyledButton>
            <UnstyledButton className={classes.control}><FaHeart size={14} style={{ color: "red" }} /> Favorites</UnstyledButton>
            <UnstyledButton className={classes.control}><GiMeal size={14} /> Recipes</UnstyledButton>
        </>
    );
}

export default Navbar;

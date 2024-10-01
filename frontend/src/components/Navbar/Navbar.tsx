import { UnstyledButton } from '@mantine/core';
import { FaHeart, FaHome, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';

function Navbar() {
    return (
        <>
            <Link to="/" className={classes.control}>
                <UnstyledButton><FaHome size={14} /> Home</UnstyledButton>
            </Link>
            <Link to="/favorites" className={classes.control}>
                <UnstyledButton><FaHeart size={14} style={{ color: "red" }} /> Favorites</UnstyledButton>
            </Link>
            <Link to="/recipes" className={classes.control}>
                <UnstyledButton ><GiMeal size={14} /> Recipes</UnstyledButton>
            </Link>

            <div className={classes.authButtons}>
                <Link to="/signin" className={`${classes.control} ${classes.signIn}`}>
                    <UnstyledButton><FaSignInAlt size={14} /> Sign In</UnstyledButton>
                </Link>
                <Link to="/signout" className={`${classes.control} ${classes.signOut}`}>
                    <UnstyledButton><FaSignOutAlt size={14} /> Sign Out</UnstyledButton>
                </Link>
            </div>
        </>
    );
}

export default Navbar;

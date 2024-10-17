import {UnstyledButton} from '@mantine/core';
import {FaHeart, FaHome, FaSignInAlt, FaSignOutAlt, FaFileSignature } from "react-icons/fa";
import {GiMeal} from "react-icons/gi";
import {useNavigate} from 'react-router-dom';
import classes from './Navbar.module.css';
import {useAuth} from "../../Store/AuthContext.tsx";

function Navbar() {
    const {isAuthenticated, logout} = useAuth(); // Get authentication state and logout function
    const navigate = useNavigate(); // React Router's useNavigate hook

    return (
        <>
            <div className={classes.control}>
                <UnstyledButton onClick={() => navigate("/")}>
                    <FaHome size={14}/> Home
                </UnstyledButton>
            </div>
            <div className={classes.control}>
                <UnstyledButton onClick={() => navigate("/favorites")}>
                    <FaHeart size={14} style={{color: "red"}}/> Favorites
                </UnstyledButton>
            </div>
            <div className={classes.control}>
                <UnstyledButton onClick={() => navigate("/recipes")}>
                    <GiMeal size={14}/> Recipes
                </UnstyledButton>
            </div>

            {!isAuthenticated ? (
                <div className={classes.authButtons}>
                    <div className={`${classes.control} ${classes.signIn}`}>
                        <UnstyledButton onClick={() => navigate("/signin")}>
                            <FaSignInAlt size={14}/> Sign In
                        </UnstyledButton>
                    </div>
                    <div className={`${classes.control} ${classes.signUp}`}>
                        <UnstyledButton onClick={() => navigate("/register")}>
                            <FaFileSignature  size={14}/> Sign Up
                        </UnstyledButton>
                    </div>
                </div>
            ) : (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div className={`${classes.control} ${classes.signOut}`}>
                        <UnstyledButton onClick={() => {
                            logout();
                            navigate("/"); // Navigate to the home page after logout
                        }}>
                            <FaSignOutAlt size={14}/> Sign Out
                        </UnstyledButton>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;

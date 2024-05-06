import React, { useContext } from "react";
import { ReactComponent as Homepage } from "../../icons/Homepage/Home.svg";
import { ReactComponent as User } from "../../icons/User/User.svg";
import { ReactComponent as WriteTweet } from "../../icons/WriteTweet/WriteTweet.svg";
import { ReactComponent as Search } from "../../icons/Search/Search.svg";
import { ReactComponent as Logout } from "../../icons/Logout/Logout.svg";
import styles from "./Navbar.module.scss";
import Button from "../Button/Button";
import { useAuth } from "../../context/Auth";

type Props = {
    onLogout: () => void;
    onAllTweets: () => void;
    onMyTweets: () => void;
};

const Navbar = ({ onLogout, onAllTweets, onMyTweets }: Props) => {
    const { user } = useAuth();

    return (
        <nav className={styles.nav}>
            <Button onClick={onAllTweets} className={styles.navButton}>
                <Homepage />
            </Button>
            <Button className={styles.navButton}>
                <WriteTweet />
            </Button>
            <Button onClick={onMyTweets} className={styles.navButton}>
                <User />
            </Button>
            <Button className={styles.navButton}>
                <Search />
            </Button>
            <Button className={styles.navButton} onClick={() => (user ? onLogout() : null)}>
                <Logout />
            </Button>
        </nav>
    );
};

export default Navbar;

import React from "react";
import { ReactComponent as Homepage } from "../../icons/Homepage/Home.svg";
import { ReactComponent as Message } from "../../icons/Message/Message.svg";
import { ReactComponent as WriteTweet } from "../../icons/WriteTweet/WriteTweet.svg";
import { ReactComponent as Search } from "../../icons/Search/Search.svg";
import { ReactComponent as User } from "../../icons/User/User.svg";
import styles from "./Navbar.module.scss";

type Props = {};

const Navbar = (props: Props) => {
    return (
        <nav className={styles.nav}>
            <button className={styles.navButton}>
                <Homepage />
            </button>
            <button className={styles.navButton}>
                <Message />
            </button>
            <button className={styles.navButton}>
                <WriteTweet />
            </button>
            <button className={styles.navButton}>
                <Search />
            </button>
            <button className={styles.navButton}>
                <User />
            </button>
        </nav>
    );
};

export default Navbar;

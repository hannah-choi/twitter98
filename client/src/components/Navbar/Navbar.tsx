import React from "react";
import { ReactComponent as Homepage } from "../../icons/Homepage/Home.svg";
import { ReactComponent as Message } from "../../icons/Message/Message.svg";
import { ReactComponent as WriteTweet } from "../../icons/WriteTweet/WriteTweet.svg";
import { ReactComponent as Search } from "../../icons/Search/Search.svg";
import { ReactComponent as User } from "../../icons/User/User.svg";
import styles from "./Navbar.module.scss";
import Button from "../Button/Button";

type Props = {};

const Navbar = (props: Props) => {
    return (
        <nav className={styles.nav}>
            <Button className={styles.navButton}>
                <Homepage />
            </Button>
            <Button className={styles.navButton}>
                <Message />
            </Button>
            <Button className={styles.navButton}>
                <WriteTweet />
            </Button>
            <Button className={styles.navButton}>
                <Search />
            </Button>
            <Button className={styles.navButton}>
                <User />
            </Button>
        </nav>
    );
};

export default Navbar;

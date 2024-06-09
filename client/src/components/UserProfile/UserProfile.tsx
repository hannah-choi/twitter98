import React from "react";
import styles from "./UserProfile.module.scss";
import LangFontConverter from "../LangFontConverter/LangFontConverter";

type Props = { username: string; url?: string };

const UserProfile = ({ username, url }: Props) => {
    return (
        <section className={styles.profile}>
            <article className={styles.bg} style={{ backgroundImage: `url(${"./images/bg.jpg"})` }} />
            <article className={styles.contents}>
                <figure className={styles.profilePicture} style={{ backgroundImage: `url(${"./images/lola.png"})` }} />
                <LangFontConverter type='nickname-big'>
                    <p className={styles.nickname}>nickname</p>
                </LangFontConverter>
                <p className={styles.Username}>@{username}</p>
                <LangFontConverter>
                    <p>Et Lorem consequat aute laborum magna culpa qui consectetur quis laborum.</p>
                </LangFontConverter>
                {/* <figure className={styles.status}>
                    <p className={styles.statusItem}>United Kingdom</p>
                    <p className={styles.statusItem}>Joined on 15 Mar 1990</p>
                </figure> */}
            </article>
        </section>
    );
};

export default UserProfile;

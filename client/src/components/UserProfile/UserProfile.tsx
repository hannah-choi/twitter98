import React from "react";
import styles from "./UserProfile.module.scss";
import LangFontConverter from "../LangFontConverter/LangFontConverter";

type Props = { userid: string; url?: string };

const UserProfile = ({ userid, url }: Props) => {
    return (
        <section className={styles.profile}>
            <article className={styles.bg} style={{ backgroundImage: `url(${"./images/bg.jpg"})` }} />
            <article className={styles.contents}>
                <figure
                    className={styles.profilePicture}
                    style={{ backgroundImage: `url(${"./images/cat-pic.jpg"})` }}
                />
                <h3 className={styles.nickname}>nickname</h3>
                <p className={styles.userId}>@{userid}</p>
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

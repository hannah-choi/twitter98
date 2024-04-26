import React from "react";
import { Tweet } from "../../model/model";
import Avatar from "../Avatar/Avatar";
import styles from "./TweetCard.module.scss";
import Divider from "../Divider/Divider";
import classNames from "classnames";
import LangFontConverter from "../LangFontConverter/LangFontConverter";
import { ReactComponent as Heart } from "../../icons/Heart/Heart.svg";
import { ReactComponent as Comment } from "../../icons/Comment/Comment.svg";
import { ReactComponent as Retweet } from "../../icons/Retweet/Retweet.svg";
import { ReactComponent as ThreeDots } from "../../icons/ThreeDots/ThreeDots.svg";

type Props = {
    tweet: Tweet;
    onDelete: (tweetId: number) => void;
    onUserIdClick: (tweet: Tweet) => void;
};

export const TweetCard = React.memo(({ tweet, onDelete, onUserIdClick }: Props) => {
    const { id, userid, nickname, url, text, created } = tweet;

    return (
        <>
            <li className={styles.tweetCard}>
                <Avatar url={url} nickname={nickname} />
                <div className={styles.contentsContainer}>
                    <section>
                        <article className={styles.infoContainer}>
                            <p>
                                <LangFontConverter title={true}>
                                    <span className={styles.nickname} onClick={() => onUserIdClick(tweet)}>
                                        {nickname}
                                    </span>
                                </LangFontConverter>
                                <span className={styles.userid}>@{userid}</span>
                            </p>
                            <span className={styles.created}>{created}</span>
                        </article>
                        <p className={styles.tweetbody}>
                            <LangFontConverter>{text}</LangFontConverter>
                        </p>
                    </section>
                    <section className={styles.buttonContainer}>
                        <article>
                            <button className={classNames("title-bar-controls", styles.controlButton)}>
                                <Comment />
                            </button>
                            <button className={styles.controlButton}>
                                <Retweet />
                            </button>
                            <button className={styles.controlButton}>
                                <Heart />
                            </button>
                        </article>
                        <button className={styles.controlButton}>
                            <ThreeDots />
                        </button>
                    </section>
                </div>
            </li>
            <Divider />
        </>
    );
});

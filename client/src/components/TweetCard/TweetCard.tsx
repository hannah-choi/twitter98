import React, { ChangeEvent, useState } from "react";
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
import Button from "../Button/Button";
import TweetEditor from "../TweetEditor/TweetEditor";

type Props = {
    tweet: Tweet;
    onDelete: (tweetId: number) => void;
    onUsernameClick: (tweet: Tweet) => void;
    onUpdate: (tweetId: number, text: string) => void;
};

export const TweetCard = React.memo(({ tweet, onDelete, onUpdate, onUsernameClick }: Props) => {
    const { username, nickname, url, text, created } = tweet;
    const [showTooltip, setShowTooptip] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    const selectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        switch (e.target.value) {
            case "delete":
                setShowTooptip(false);
                onDelete(tweet.id);
                break;
            case "edit":
                setShowTooptip(false);
                setEditMode(true);
                break;
            case "none":
                return;
            default:
                setShowTooptip(false);
                break;
        }
    };

    const editorClose = () => {
        setEditMode(false);
    };

    return (
        <>
            <li className={styles.tweetCard}>
                <Avatar url={url} nickname={nickname} />
                <div className={styles.contentsContainer}>
                    <section>
                        <article className={styles.infoContainer}>
                            <div>
                                <LangFontConverter type='nickname-small'>
                                    <span className={styles.nickname} onClick={() => onUsernameClick(tweet)}>
                                        {nickname}
                                    </span>
                                </LangFontConverter>
                                <span className={styles.username}>@{username}</span>
                            </div>
                            <span className={styles.created}>{created}</span>
                        </article>
                        {!editMode && (
                            <div className={styles.tweetbody}>
                                <LangFontConverter>{text}</LangFontConverter>
                            </div>
                        )}
                    </section>
                    <section className={styles.buttonContainer}>
                        {editMode && <TweetEditor onClose={editorClose} onUpdate={onUpdate} tweet={tweet} />}
                        {!editMode && (
                            <>
                                <article>
                                    <Button className={classNames("title-bar-controls", styles.controlButton)}>
                                        <Comment />
                                    </Button>
                                    <Button className={styles.controlButton}>
                                        <Retweet />
                                    </Button>
                                    <Button className={styles.controlButton}>
                                        <Heart />
                                    </Button>
                                </article>
                                <article>
                                    {showTooltip && (
                                        <select className={styles.select} onChange={selectHandler}>
                                            <option value='none'>Choose an option</option>
                                            <option value='edit'>Edit tweet</option>
                                            <option value='delete'>Delete tweet</option>
                                            <option value='cancel'>Cancel</option>
                                        </select>
                                    )}
                                    <Button
                                        onClick={() => setShowTooptip(!showTooltip)}
                                        className={styles.controlButton}
                                    >
                                        <ThreeDots />
                                    </Button>
                                </article>
                            </>
                        )}
                    </section>
                </div>
            </li>
            <Divider />
        </>
    );
});

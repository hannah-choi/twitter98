import React from "react";
import { Tweet } from "../../model/model";
import Avatar from "../Avatar/Avatar";

type Props = {
    tweet: Tweet;
    onDelete: (tweetId: number) => void;
    onNicknameClick: (tweet: Tweet) => void;
};

export const TweetCard = React.memo(({ tweet, onDelete, onNicknameClick }: Props) => {
    const { id, userid, nickname, url, text, created } = tweet;

    return (
        <li>
            <Avatar url={url} nickname={nickname} />
            <section>
                <p>
                    <span onClick={() => onNicknameClick(tweet)}>{nickname}</span>
                    <span>@{userid}</span>
                    <span>{created}</span>
                </p>
                <p>{text}</p>
            </section>
        </li>
    );
});

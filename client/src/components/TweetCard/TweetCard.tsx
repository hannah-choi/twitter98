import React from "react";
import { Tweet } from "../../model/model";
import Avatar from "../Avatar/Avatar";

type Props = {
    tweet: Tweet;
};

export const TweetCard = ({ tweet }: Props) => {
    const { text, userid, nickname, created, url } = tweet;

    return (
        <article>
            <Avatar url={url} nickname={nickname} />
            <div>
                <p>
                    <span>{nickname}</span>
                    <span>@{userid}</span>
                    <span>{created}</span>
                </p>
                <p>{text}</p>
            </div>
        </article>
    );
};

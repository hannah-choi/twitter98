import React from "react";
import { Tweet } from "../../model/model";

type Props = {
    tweet: Tweet;
};

export const TweetCard = ({ tweet }: Props) => {
    const { text, userid, nickname, created, url } = tweet;

    return (
        <article>
            <div>
                <p>
                    <span>{nickname}</span>
                    <span>@{userid}</span>
                    <span>{created}</span>
                </p>
                <p>{text}</p>
            </div>
            <div>
                <img src={url} alt='profile' />
            </div>
        </article>
    );
};

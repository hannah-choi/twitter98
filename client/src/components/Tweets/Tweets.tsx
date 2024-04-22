import React from "react";
import { Tweet } from "../../model/model";
import { TweetCard } from "../TweetCard/TweetCard";

type Props = {
    tweets: Tweet[];
};

const Tweets = ({ tweets }: Props) => {
    return (
        <ul>
            {tweets.map((tweet) => (
                <TweetCard tweet={tweet} />
            ))}
        </ul>
    );
};

export default Tweets;

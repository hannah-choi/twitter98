import React, { useState, useEffect } from "react";
import { Tweet } from "../../model/model";
import { TweetCard } from "../TweetCard/TweetCard";
import { useHistory } from "react-router-dom";
import TweetWriter from "../TweetWriter/TweetWriter";
import { ITweetService } from "../../services/tweet";
import Message from "../Message/Message";

type Props = {
    tweetService: ITweetService;
    writable: boolean;
    nickname?: string;
};

const Tweets = React.memo(({ tweetService, writable, nickname }: Props) => {
    const [tweets, setTweets] = useState<Tweet[]>([]);
    const [error, setError] = useState<string>("");
    const history = useHistory();

    useEffect(() => {
        tweetService
            .getTweets(nickname)
            .then((tweets) => setTweets([...tweets]))
            .catch(onError);
    }, [tweetService, nickname]);

    const onCreate = (tweet: Tweet) => {
        setTweets((tweets) => [tweet, ...tweets]);
    };

    const onDelete = (tweetId: number) =>
        tweetService
            .deleteTweet(tweetId)
            .then(() => setTweets((tweets) => tweets.filter((tweet) => tweet.id !== tweetId)))
            .catch((error: Error) => setError(error.toString()));

    const onNicknameClick = (tweet: Tweet) => history.push(`/${tweet.nickname}`);

    const onError = (error: Error) => {
        setError(error.toString());
        setTimeout(() => {
            setError("");
        }, 3000);
    };

    return (
        <>
            {writable && <TweetWriter tweetService={tweetService} onError={onError} onCreate={onCreate} />}
            {error && <Message text={error} isAlert={true} />}
            {tweets.length === 0 && <p className='tweets-empty'>No Tweets Yet</p>}
            <ul>
                {tweets.map((tweet) => (
                    <TweetCard key={tweet.id} tweet={tweet} onDelete={onDelete} onNicknameClick={onNicknameClick} />
                ))}
            </ul>
        </>
    );
});

export default Tweets;

import React, { useState } from "react";
import Button from "../Button/Button";
import { ITweetService } from "../../services/tweet";
import { Tweet } from "../../model/model";

type Props = {
    tweetService: ITweetService;
    onCreate: (tweet: Tweet) => void;
    onError: (error: Error) => void;
};

const TweetWriter = ({ tweetService, onCreate, onError }: Props) => {
    const [tweet, setTweet] = useState<string>("");

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        tweetService
            .writeTweet(tweet)
            .then((created) => {
                setTweet("");
                onCreate(created);
            })
            .catch(onError);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTweet(event.target.value);
    };

    return (
        <section>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    placeholder="What\'s happening?"
                    value={tweet}
                    required
                    autoFocus
                    onChange={onChange}
                />
                <Button text='Tweet' type='submit' />
            </form>
        </section>
    );
};

export default TweetWriter;
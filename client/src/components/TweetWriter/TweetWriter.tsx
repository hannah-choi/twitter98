import React, { useState } from "react";
import Button from "../Button/Button";
import { ITweetService } from "../../services/tweet";
import { Tweet } from "../../model/model";
import styles from "./TweetWriter.module.scss";

type Props = {
    tweetService: ITweetService;
    onCreate: (tweet: Tweet) => void;
    onError: (error: Error) => void;
    onWriterClose: () => void;
};

const TweetWriter = ({ tweetService, onCreate, onError, onWriterClose }: Props) => {
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
        <section className={styles.tweetWriter}>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    placeholder="What\'s happening?"
                    value={tweet}
                    required
                    autoFocus
                    onChange={onChange}
                />
                <div className={styles.buttonContainer}>
                    <Button type='submit'>Tweet</Button>
                    <Button onClick={() => onWriterClose()}>Cancel</Button>
                </div>
            </form>
        </section>
    );
};

export default TweetWriter;

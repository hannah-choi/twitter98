import React, { useState } from "react";
import Button from "../Button/Button";
import { ITweetService } from "../../services/tweet";
import { Tweet } from "../../model/model";
import styles from "./TweetWriter.module.scss";
import ButtonContainer from "../ButtonContainer/ButtonContainer";

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
                <ButtonContainer onClose={onWriterClose} className={styles.buttonContainer} submitText='Tweet' />
            </form>
        </section>
    );
};

export default TweetWriter;

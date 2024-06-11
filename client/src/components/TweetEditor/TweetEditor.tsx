import { FormEvent, useState } from "react";
import { Tweet } from "../../model/model";

import styles from "./TweetEditor.module.scss";
import ButtonContainer from "../ButtonContainer/ButtonContainer";

type Props = { tweet: Tweet; onUpdate: (tweetID: number, text: string) => void; onClose: () => void };

const TweetEditor = ({ tweet, onUpdate, onClose }: Props) => {
    const [text, setText] = useState<string>(tweet.text);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onUpdate(tweet.tweetID, text);
        onClose();
    };

    return (
        <form onSubmit={onSubmit} className={styles.tweetEditor}>
            <input type='text' onChange={(e) => setText(e.target.value)} value={text} required autoFocus />
            <ButtonContainer onClose={onClose} className={styles.buttonContainer} />
        </form>
    );
};

export default TweetEditor;

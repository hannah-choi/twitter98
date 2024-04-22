import React from "react";
import Button from "../Button/Button";

type Props = {};

const TweetWriter = (props: Props) => {
    return (
        <section>
            <form>
                <textarea></textarea>
                <Button text='Tweet' />
            </form>
        </section>
    );
};

export default TweetWriter;

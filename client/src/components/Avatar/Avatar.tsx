import React from "react";
import styles from "./Avatar.module.scss";

type Props = {
    nickname: string;
    url?: string;
};

const Avatar = React.memo(({ url, nickname }: Props) => {
    return <figure className={styles.avatar} />;
});

export default Avatar;

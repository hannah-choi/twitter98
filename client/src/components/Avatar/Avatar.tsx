import React from "react";

type Props = {
    nickname: string;
    url?: string;
};

const Avatar = React.memo(({ url, nickname }: Props) => {
    return <figure>Avatar</figure>;
});

export default Avatar;

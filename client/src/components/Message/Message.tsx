import React from "react";

type Props = {
    text: string;
    isAlert: boolean;
};

const Message = React.memo(({ text, isAlert }: Props) => <>{text && <p>{text}</p>}</>);
export default Message;

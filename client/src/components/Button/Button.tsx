import React from "react";

type Props = {
    text: string;
    type?: "button" | "submit";
};

const Button = ({ text, type }: Props) => {
    return <button type={type || "button"}>{text}</button>;
};

export default Button;

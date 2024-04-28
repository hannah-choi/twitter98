import React from "react";

type Props = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit";
};

const Button = ({ type, onClick, children, className }: Props) => {
    return (
        <button type={type || "button"} onClick={() => onClick} className={className}>
            {children}
        </button>
    );
};

export default Button;

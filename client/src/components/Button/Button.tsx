import React from "react";

type Props = {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit";
    disabled?: boolean;
};

const Button = ({ type, onClick, children, className, disabled }: Props) => {
    return (
        <button type={type || "button"} onClick={onClick} className={className} disabled={disabled}>
            {children}
        </button>
    );
};

export default Button;

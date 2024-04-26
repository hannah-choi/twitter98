import React, { ReactNode } from "react";
import { franc } from "franc";

type Props = { children: ReactNode; title?: boolean };

const LangFontConverter = ({ children, title = false }: Props) => {
    const extractText = (node: ReactNode): string => {
        if (typeof node === "string") {
            return node;
        } else if (React.isValidElement(node) && node.props.children) {
            return extractText(node.props.children);
        }
        return "";
    };

    const langCode = franc(extractText(children), { minLength: 3 });

    const computedStyle = {
        display: "inline",
        fontFamily: `${langCode === "kor" ? "DungGeunMo, sans-serif" : title ? "inherit" : "toshiba"}`,
        fontSize: `${langCode === "kor" || !title ? "inherit" : "15px"}`,
        fontWeight: `${title ? "bold" : "500"}`
    };

    return <div style={computedStyle}>{children}</div>;
};

export default LangFontConverter;

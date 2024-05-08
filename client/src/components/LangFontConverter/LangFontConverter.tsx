import React, { ReactNode } from "react";
import { franc } from "franc";

type Type = "nickname-small" | "body" | "nickname-big";

type Props = { children: ReactNode; type?: Type };

const LangFontConverter = ({ children, type = "body" }: Props) => {
    const extractText = (node: ReactNode): string => {
        if (typeof node === "string") {
            return node;
        } else if (React.isValidElement(node) && node.props.children) {
            return extractText(node.props.children);
        }
        return "";
    };

    const langCode = franc(extractText(children), { minLength: 2 });

    const getFontSize = () => {
        if (type === "nickname-big") {
            return langCode === "kor" ? "2rem" : "22px";
        } else if (type === "body" && langCode !== "kor") {
            return "15px";
        } else {
            return "inherit";
        }
    };

    const computedStyle = {
        display: "inline",
        fontFamily: `${langCode === "kor" ? "DungGeunMo, sans-serif" : type === "body" ? "toshiba" : "inherit"}`,
        fontSize: `${getFontSize()}`,
        fontWeight: `${type !== "body" ? "bold" : "500"}`
    };

    return <div style={computedStyle}>{children}</div>;
};

export default LangFontConverter;

import React from "react";
import styles from "./ModalContents.module.scss";
import classNames from "classnames";

type Props = { children: React.ReactNode };

const ModalContents = ({ children }: Props) => {
    return <div className={classNames("window", styles.modalContents)}>{children}</div>;
};

export default ModalContents;

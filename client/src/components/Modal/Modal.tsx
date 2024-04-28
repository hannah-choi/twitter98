import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";
type Props = {
    children: ReactNode;
};

const Modal = ({ children }: Props) => {
    return <div className={styles.modal}>{createPortal(children, document.body)}</div>;
};

export default Modal;

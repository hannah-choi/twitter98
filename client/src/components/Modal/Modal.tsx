import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

type Props = {
    children: ReactNode;
};

const Modal = ({ children }: Props) => {
    const ref = useRef<HTMLDivElement | null>(null);
    if (!ref.current) ref.current = document.createElement("div");

    useEffect(() => {
        const el = ref.current!;
        modalRoot.appendChild(el);
        return () => {
            modalRoot.removeChild(el);
        };
    }, []);

    return createPortal(children, ref.current);
};

export default Modal;

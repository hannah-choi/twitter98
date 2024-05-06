import React from "react";
import styles from "./Header.module.scss";
import { ReactComponent as Minimise } from "../../icons/Minimise/Minimise.svg";
import { ReactComponent as Maximise } from "../../icons/Maximise/Maximise.svg";
import { ReactComponent as Close } from "../../icons/Close/Close.svg";
import { ReactComponent as DisabledClose } from "../../icons/DisabledClose/DisabledClose.svg";
import classNames from "classnames";
import Button from "../Button/Button";

type Props = { simplified?: boolean; title: string; onClose?: () => void; closeDisabled?: boolean };
const Header = ({ simplified = false, title, onClose, closeDisabled }: Props) => {
    return (
        <header>
            <section className={classNames(styles.statusbar, "title-bar")}>
                <p className='title-bar-text'>{title}</p>
                <div className='title-bar-controls'>
                    {!simplified && (
                        <>
                            <Button className={styles.controlButton}>
                                <Minimise />
                            </Button>
                            <Button className={styles.controlButton}>
                                <Maximise />
                            </Button>
                        </>
                    )}
                    <Button className={styles.controlButton} onClick={onClose} disabled={closeDisabled}>
                        {closeDisabled ? <DisabledClose /> : <Close />}
                    </Button>
                </div>
            </section>
        </header>
    );
};

export default Header;

import React, { Dispatch } from "react";
import styles from "./LoginModalContents.module.scss";
import Header from "../Header/Header";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

type Props = { setShowModal: Dispatch<boolean> };

const LoginModalContents = ({ setShowModal }: Props) => {
    const { register } = useForm();
    const onClose = () => {
        setShowModal(false);
    };
    return (
        <div className={classNames("window", styles.modalContents)}>
            <Header title='Register' simplified onClose={onClose} />
            <form className={styles.form}>
                <p>
                    <label>Userid</label>
                    <input type='text' required {...register("userid")}></input>
                </p>
                <p>
                    <label>Password</label>
                    <input type='password' required {...register("password")}></input>
                </p>
                <Button type='submit'>Login</Button>
                <Link to='/register'>
                    <Button>Register</Button>
                </Link>
            </form>
        </div>
    );
};

export default LoginModalContents;

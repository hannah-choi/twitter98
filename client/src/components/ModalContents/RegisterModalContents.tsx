import React, { Dispatch } from "react";
import styles from "./RegisterModalContents.module.scss";
import Header from "../Header/Header";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

type Props = { setShowModal: Dispatch<boolean> };

const RegisterModalContents = ({ setShowModal }: Props) => {
    const { register } = useForm();
    const onClose = () => {
        setShowModal(false);
    };

    return (
        <div className={classNames("window", styles.modalContents)}>
            <Header title='Register' simplified onClose={onClose} />
            <form className={styles.form}>
                <p>
                    <label>Username</label>
                    <input type='text' required {...register("username")}></input>
                </p>
                <p>
                    <label>Nickname</label>
                    <input type='text' required {...register("nickname")}></input>
                </p>
                <p>
                    <label>Password</label>
                    <input type='password' required {...register("password")}></input>
                </p>
                <p>
                    <label>Confirm Password</label>
                    <input type='password' required {...register("password")}></input>
                </p>
                <fieldset>
                    <p className='field-row'>Select Profile picture:</p>
                    <div className={styles.field}>
                        <section className='field-row'>
                            <input id='profile1' type='radio' name='profile-pic' />
                            <label htmlFor='profile1'>Bugs bunny</label>
                        </section>
                        <section className='field-row'>
                            <input id='profile2' type='radio' name='profile-pic' />
                            <label htmlFor='profile2'>Pingu</label>
                        </section>
                        <section className='field-row'>
                            <input id='profile3' type='radio' name='profile-pic' />
                            <label htmlFor='profile3'>Cat</label>
                        </section>
                    </div>
                </fieldset>
                <fieldset>
                    <p className='field-row'>Select Background picture:</p>
                    <div className={styles.field}>
                        <section className='field-row'>
                            <input id='bg1' type='radio' name='bg-pic' />
                            <label htmlFor='bg1'>Room</label>
                        </section>
                        <section className='field-row'>
                            <input id='bg2' type='radio' name='bg-pic' />
                            <label htmlFor='bg2'>City night</label>
                        </section>
                    </div>
                </fieldset>
                <Button>Register</Button>
                <Link to='/login'>
                    <Button>Already have an account?</Button>
                </Link>
            </form>
        </div>
    );
};

export default RegisterModalContents;

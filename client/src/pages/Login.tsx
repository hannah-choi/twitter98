import React, { useState } from "react";
import Modal from "../components/Modal/Modal";
import ModalContents from "../components/LoginModalContents/ModalContents";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Button from "../components/Button/Button";
import { Link } from "react-router-dom";
import { AuthCredential } from "../services/auth";
import Header from "../components/Header/Header";

type Props = {
    onRegister: (
        userid: string,
        password: string,
        nickname: string,
        email: string,
        avatar?: string,
        bg?: string,
        bio?: string
    ) => Promise<void>;
    onLogin: (userid: string, password: string) => Promise<void>;
};

interface IFormInput {
    userid: string;
    password: string;
    nickname: string;
    email: string;
    avatar: string;
    bg: string;
    bio: string;
}

const Login = ({ onRegister, onLogin }: Props) => {
    const [showModal, setShowModal] = useState<boolean>(true);
    const [signup, setSignup] = useState<boolean>(false);
    const [isAlert, setIsAlert] = useState(false);
    const [errormessage, setErrormessage] = useState("");

    const { register, handleSubmit } = useForm();

    const onClose = () => {
        setShowModal(false);
    };

    const setError = (error: Error) => {
        setErrormessage(error.toString());
        setIsAlert(true);
    };

    const onSubmit = (data: FieldValues) => {
        const { userid, password, nickname, email, avatar, bg, bio } = data;
        if (signup) {
            onRegister(userid, password, nickname, email, avatar, bg, bio).catch(setError);
        } else {
            onLogin(userid, password).catch(setError);
        }
    };

    return (
        <>
            {showModal && (
                <Modal>
                    <ModalContents>
                        <Header title={signup ? "Register" : "Log in"} simplified onClose={onClose} />
                        <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                            <p>
                                <label>Userid</label>
                                <input type='text' required {...register("userid")}></input>
                            </p>
                            <p>
                                <label>Password</label>
                                <input type='password' required {...register("password")}></input>
                            </p>
                            {signup && (
                                <>
                                    <fieldset>
                                        <p className='field-row'>Select Profile picture:</p>
                                        <div>
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
                                        <div>
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
                                </>
                            )}
                            <Button type='submit'>{signup ? "Register" : "Sign In"}</Button>
                            <Button onClick={() => setSignup(true)}>Register</Button>
                        </form>
                    </ModalContents>
                </Modal>
            )}
        </>
    );
};

export default Login;

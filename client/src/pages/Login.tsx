import React, { useState } from "react";
import Modal from "../components/Modal/Modal";
import LoginModalContents from "../components/LoginModalContents/LoginModalContents";

type Props = {};

const Login = ({}: Props) => {
    const [showModal, setShowModal] = useState<boolean>(true);
    return (
        <>
            {showModal && (
                <Modal>
                    <LoginModalContents setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
};

export default Login;

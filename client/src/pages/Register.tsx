import React, { useState } from "react";
import Modal from "../components/Modal/Modal";
import RegisterModalContents from "../components/ModalContents/RegisterModalContents";

type Props = {};

const Register = ({}: Props) => {
    const [showModal, setShowModal] = useState<boolean>(true);
    return (
        <>
            {showModal && (
                <Modal>
                    <RegisterModalContents setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
};

export default Register;

import Button from "../Button/Button";

type Props = { onClose: () => void; submitText?: string; className?: string };

const ButtonContainer = ({ submitText = "Submit", onClose, className }: Props) => {
    return (
        <div className={className}>
            <Button type='submit'>{submitText}</Button>
            <Button onClick={() => onClose()}>Cancel</Button>
        </div>
    );
};

export default ButtonContainer;

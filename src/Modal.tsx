import useClickOutside from 'hooks/useClickOutside';

interface ModalProps {
    children: React.ReactNode;
    show: boolean;
    onClose: () => void;
    closeButton?: boolean;
}

function Modal({ children, show, onClose, closeButton = false }: ModalProps) {
    const domNode = useClickOutside<HTMLDivElement>({
        callback: onClose
    });

    return show ? (
        <div className="modal" ref={domNode}>
            {closeButton && (
                <button style={{ alignSelf: 'end', fontSize: '8px', padding: '5px 10px' }} onClick={onClose}>
                    X
                </button>
            )}
            {children}
        </div>
    ) : (
        <></>
    );
}

export default Modal;

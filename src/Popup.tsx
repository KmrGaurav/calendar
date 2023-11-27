import useClickOutside from './useClickOutside';

interface PopupProps {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
  closeButton?: boolean;
}

function Popup({ children, show, onClose, closeButton = false }: PopupProps) {
  const domNode = useClickOutside<HTMLDivElement>({
    callback: onClose
  });

  return show ? (
    <div className="popup" ref={domNode}>
      {closeButton && (
        <button
          style={{ alignSelf: 'end', fontSize: '8px', padding: '5px 10px' }}
          onClick={onClose}
        >
          X
        </button>
      )}
      {children}
    </div>
  ) : (
    <></>
  );
}

export default Popup;

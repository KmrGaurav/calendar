import useClickOutside from "./useClickOutside";

interface PopupProps {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
}

function Popup({ children, show, onClose }: PopupProps) {
  const domNode = useClickOutside<HTMLDivElement>({
    callback: onClose
  });

  return show ? (
    <div style={{ position: "relative" }}>
      <div className="popup" ref={domNode}>
        {children}
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Popup;

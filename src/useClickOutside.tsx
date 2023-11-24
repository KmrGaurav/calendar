import { useEffect, useRef } from "react";

interface UseClickOutsideProps {
  callback: () => void;
}

function useClickOutside<T extends HTMLElement>({
  callback
}: UseClickOutsideProps) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return ref;
}

export default useClickOutside;

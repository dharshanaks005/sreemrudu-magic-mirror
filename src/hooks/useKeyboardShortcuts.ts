import { useEffect } from "react";

interface KeyboardShortcutsProps {
  onSreemrudu: () => void;
  onOther: () => void;
  onNone: () => void;
}

export const useKeyboardShortcuts = ({ onSreemrudu, onOther, onNone }: KeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only trigger if no input element is focused
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case '1':
          onSreemrudu();
          break;
        case '2':
          onOther();
          break;
        case '3':
          onNone();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onSreemrudu, onOther, onNone]);
};
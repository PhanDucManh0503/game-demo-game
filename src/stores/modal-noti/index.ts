import { create } from 'zustand';

interface IState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const useModalNotiStore = create<IState>()((set) => ({
  isOpen: false,
  open: () => {
    set(() => ({
      isOpen: true,
    }));
  },
  close: () => {
    set(() => ({
      isOpen: false,
    }));
  },
}));

export { useModalNotiStore };

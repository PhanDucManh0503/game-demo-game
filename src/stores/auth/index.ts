import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { create } from 'zustand';
import {
  createJSONStorage,
  devtools,
  persist,
  StateStorage,
} from 'zustand/middleware';

import { AUTH_COOKIE_CONFIG } from './auth.constant';

// Custom storage object
export const storage: StateStorage = {
  getItem: (name: string) => {
    return (getCookie(name) as string) || null;
  },
  setItem: (name: string, value: string) => {
    setCookie(name, value, { ...AUTH_COOKIE_CONFIG });
  },
  removeItem: (name: string) => {
    deleteCookie(name);
  },
};

const useAuthStore = create<IAuthState>()(
  devtools(
    persist(
      (set) => ({
        auth: null,
        login: (auth: TDefaultAuth) => {
          set({
            auth,
          });
        },
        logout: () => {
          set({
            auth: null,
          });
        },
      }),
      {
        name: 'auth',
        storage: createJSONStorage(() => storage),
      },
    ),
    {
      name: 'auth',
    },
  ),
);

export { useAuthStore };

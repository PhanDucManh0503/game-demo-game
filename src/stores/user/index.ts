import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useUserStore = create<IUserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        updateUser: (staff: IStaffDto) => {
          set((state) => {
            return {
              ...state,
              user: staff,
            };
          });
        },
      }),
      {
        name: 'userStore',
      },
    ),
    {
      name: 'userStore',
    },
  ),
);

export { useUserStore };

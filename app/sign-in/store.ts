import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  id: number | null;
  username: string | null;
  email: string | null;
  phoneNumber: string | null;
  address: string | null;
  role: string | null;
  status: string | null;
  description: string | null;
}
export interface Permission {
  code: string | null;
  createdAt: string | null;
  description: string | null;
  groupName: string | null;
  id: number | null;
  index: number | null;
  updatedAt: string | null;
}
interface State {
  isLogged: boolean;
  accessToken: string;
  urlCurrent: string;
  permissions: Permission[];
  user: User;
  login: ({
    accessToken,
    user,
    permissions
  }: {
    accessToken: string;
    user: User;
    permissions: Permission[];
  }) => void;
  logout: () => void;
  setUrlCurrent: (urlCurrent: string) => void;
}
export const useLoginStore = create<State>()(
  persist(
    (set) => ({
      urlCurrent: "",
      isLogged: false,
      accessToken: "",
      permissions: [],
      user: {
        id: null,
        username: null,
        email: null,
        phoneNumber: null,
        role: null,
        status: null,
        description: null,
        address: null
      },
      login: ({
        accessToken,
        user,
        permissions
      }: {
        accessToken: string;
        user: User;
        permissions: Permission[];
      }) =>
        set({
          isLogged: true,
          accessToken: accessToken,
          user: user,
          permissions: permissions
        }),
      logout: () =>
        set({
          isLogged: false,
          accessToken: "",
          user: {
            id: null,
            username: null,
            email: null,
            phoneNumber: null,
            role: null,
            status: null,
            description: null,
            address: null
          }
        }),
      setUrlCurrent: (urlCurrent: string) => set({ urlCurrent })
    }),
    {
      name: "EID_CMS_AUTH",
      storage: createJSONStorage(() => localStorage)
    }
  )
);

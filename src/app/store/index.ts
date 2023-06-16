import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type AuthStore = {
    encryptedMnemonic: string,
    setEncryptedMnemonic: (encryptedMnemonic: string) => void
}
export const useAuthStore = create<AuthStore, [['zustand/persist', Partial<AuthStore>]]>
    (
        persist(
            (set) => ({
                encryptedMnemonic: '',
                setEncryptedMnemonic: (encryptedMnemonic: string) => set({ encryptedMnemonic }),
            }),
            {
                name: 'cosmos-wallet-storage',
                storage: createJSONStorage(() => sessionStorage),
            }
        )
    )

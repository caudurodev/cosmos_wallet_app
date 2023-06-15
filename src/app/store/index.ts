import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
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

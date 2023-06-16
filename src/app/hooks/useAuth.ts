"use client"
import toast from 'react-hot-toast';
import { useAuthStore } from '@/app/store';
import { encrypt, decrypt } from "@/app/utils/encrypt";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Secp256k1HdWallet } from "@cosmjs/amino";

type UseAuth = {
    email: string,
    password: string,
    setDecryptedMnemonic?: (decryptedMnemonic: string) => void
}
export const useAuth = ({
    email,
    password,
    setDecryptedMnemonic,
}: UseAuth) => {

    const {
        encryptedMnemonic,
        setEncryptedMnemonic
    } = useAuthStore()

    const doCreateAccount = async () => {
        if (email && password) {
            try {
                const wallet = await Secp256k1HdWallet.generate();
                const mnemonic = wallet.mnemonic;
                const key = `${email}${password}`

                const encryptedMnemonic = await encrypt(key, mnemonic)
                setEncryptedMnemonic(encryptedMnemonic)

                const decryptedMnemonic = await decrypt(key, encryptedMnemonic)
                if (setDecryptedMnemonic) setDecryptedMnemonic(decryptedMnemonic)

                toast.success('Account Created Successfully')
            } catch (e) {
                console.error(e)
                toast.error('Unknown error ocurred creating account')
            }
        } else {
            toast.error('Error creating account')
        }
    };

    const doLogin = async () => {
        if (email && password && encryptedMnemonic) {
            try {
                // TODO: consider splitting into 2 keys, one for email and one for password
                const key = `${email}${password}`
                const decryptedMnemonic = await decrypt(key, encryptedMnemonic)
                if (setDecryptedMnemonic) setDecryptedMnemonic(decryptedMnemonic)
                toast.success('Logged in Successfully')
            } catch (e) {
                console.error(e)
                toast.error('User does not exist or password is incorrect')
            }
        } else {
            toast.error('User does not exist or password is incorrect')
        }
    }

    const getWallet = async (decryptedMnemonic: string) => {
        try {
            return await DirectSecp256k1HdWallet.fromMnemonic(decryptedMnemonic)
        } catch (e) {
            console.error(e)
            toast.error('Unknown error ocurred getting wallet information')
        }
    }

    const doLogOut = () => {
        // TODO: implement complete removal of data from local storage 
        if (setDecryptedMnemonic) setDecryptedMnemonic('')
    }

    const getMnemonic = async () => {
        if (email && password && encryptedMnemonic) {
            const decryptedMnemonic = await decrypt(password, encryptedMnemonic);
            return decryptedMnemonic
        }
    }

    return {
        doCreateAccount,
        doLogin,
        getWallet,
        doLogOut,
        getMnemonic
    }
}
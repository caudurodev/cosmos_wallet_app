"use client"
import toast from 'react-hot-toast';
import { useAuthStore } from '@/app/store';
import { encrypt, decrypt } from "@/app/utils/encrypt";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Bip39, Random } from "@cosmjs/crypto";

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

    const { encryptedMnemonic, setEncryptedMnemonic } = useAuthStore()

    const doCreateAccount = async () => {
        console.log('do create', { email, password })
        if (email && password) {
            try {
                const mnemonic = Bip39.encode(Random.getBytes(16)).toString()
                const key = `${email}${password}`

                const encryptedMnemonic = await encrypt(key, mnemonic)
                setEncryptedMnemonic(encryptedMnemonic)

                const decryptedMnemonic = await decrypt(key, encryptedMnemonic)
                setDecryptedMnemonic(decryptedMnemonic)

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
                const wallet = await DirectSecp256k1HdWallet.fromMnemonic(decryptedMnemonic)
                if (setDecryptedMnemonic) setDecryptedMnemonic(decryptedMnemonic)
                console.log(wallet)
                toast.success('Logged in Successfully')
            } catch (e) {
                console.error(e)
                toast.error('An unknown error ocurred logging in.')
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
            toast.error('Unknown error ocurred getting account')
        }
    }

    const doLogOut = () => {
        // TODO: implement complete removal of data from local storage 
        // what would be the best way to communicate this action to the user?
        setDecryptedMnemonic('')
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